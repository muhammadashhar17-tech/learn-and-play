import { ALL_WORDS, type Word } from "@/data/lessons";
import { FUN_FACTS, TOPICS } from "@/data/chatbot/knowledge";
import { pick } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { findMath } from "./math";
import { hasAny, hasPhrase, normalize } from "./normalize";
import type { BotReply, ChatContext, ChatEngine, ChatLink } from "./types";

/**
 * Free, offline chatbot. It understands English, Urdu, Sindhi and Roman Urdu
 * by looking for keywords — no internet or API key needed.
 *
 * Order of checks: greeting → sum → translation → known topic → fun fact →
 * small talk → open a page → friendly fallback.
 */

// ---------- Keyword lists (any script, matched after normalize()) ----------

const GREETING = ["hi", "hello", "hey", "salam", "salaam", "assalam", "aoa", "asalam", "السلام", "سلام", "ہیلو", "هيلو", "ہائے"];
const THANKS = ["thank", "thanks", "shukriya", "shukria", "jazakallah", "شکریہ", "شڪريو", "مهرباني", "مہربانی", "جزاک"];
const WHO = ["who are you", "your name", "tum kaun", "aap kaun", "ap kon", "aap kon", "tum kon", "آپ کون", "تم کون", "تون ڪير", "توهان ڪير", "تنهنجو نالو", "آپ کا نام", "تمہارا نام", "saathi"];
const HOW_ARE_YOU = ["how are you", "kaise ho", "kese ho", "kaisy ho", "کیسے ہو", "کیسی ہو", "آپ کیسے", "ڪيئن آهيو", "ڪيئن آهين", "حال"];
const HELP = ["help", "madad", "what can you do", "kya kar sakte", "مدد", "ڇا ڪري سگهين", "کیا کر سکتے"];
const FACT = ["fact", "fun", "interesting", "did you know", "mazedar", "mazay", "dilchasp", "مزے", "مزیدار", "دلچسپ", "مزيدار", "حیران", "عجيب", "عجیب"];
const TRANSLATE = [
  "translate", "translation", "meaning", "mean", "say", "in sindhi", "in urdu", "in english", "tarjuma", "matlab", "maani",
  "kehte", "kahte", "kya hai", "ترجمہ", "ترجمو", "مطلب", "معنی", "معني", "کہتے", "چوندا", "چئبو", "سندھی میں", "اردو میں", "انگریزی میں", "سنڌي ۾", "اردو ۾", "انگريزي ۾", "سندھی", "سنڌي", "انگریزی", "انگريزي",
];

const LANGUAGE_NAMES: Record<Locale, string[]> = {
  en: ["english", "angrezi", "انگریزی", "انگريزي"],
  ur: ["urdu", "اردو"],
  sd: ["sindhi", "سندھی", "سنڌي"],
};

const NAV: { page: ChatLink["page"]; href: string; keywords: string[] }[] = [
  { page: "quiz", href: "/quiz", keywords: ["quiz", "game", "play", "khel", "test", "کوئز", "ڪوئز", "کھیل", "کيڏ", "راند", "امتحان"] },
  { page: "learn", href: "/learn", keywords: ["learn", "lesson", "flashcard", "alphabet", "seekh", "sikh", "سیکھ", "سبق", "سکو", "سکڻ", "فلیش", "الف ب"] },
  { page: "progress", href: "/progress", keywords: ["progress", "badge", "my score", "history", "achievement", "پیش رفت", "ترقي", "بیج", "بيج"] },
  { page: "leaderboard", href: "/leaderboard", keywords: ["leaderboard", "top score", "ranking", "high score", "لیڈر", "ليڊر"] },
  { page: "about", href: "/about", keywords: ["about", "this app", "اس ایپ", "بارے میں", "بابت"] },
  { page: "contact", href: "/contact", keywords: ["contact", "email", "رابطہ", "رابطو", "ای میل", "اي ميل"] },
];

// ---------- Word index for translations ----------

interface IndexedForm {
  form: string;
  word: Word;
}

const WORD_INDEX: IndexedForm[] = ALL_WORDS.flatMap((w) => {
  const forms = [w.en.replace(/\s*\(.*\)/, ""), w.ur, w.sd, w.roman.ur, w.roman.sd];
  return forms
    .map((f) => normalize(f))
    .filter((f, i, arr) => f.length >= 2 && arr.indexOf(f) === i)
    .map((form) => ({ form, word: w }));
}).sort((a, b) => b.form.length - a.form.length); // longest first

function findWord(text: string): Word | undefined {
  return WORD_INDEX.find((entry) => hasPhrase(text, entry.form, { prefix: false }))?.word;
}

function targetLanguage(text: string): Locale | undefined {
  return (Object.keys(LANGUAGE_NAMES) as Locale[]).find((l) => hasAny(text, LANGUAGE_NAMES[l]));
}

function bestTopic(text: string) {
  let best: { topic: (typeof TOPICS)[number]; score: number } | undefined;
  for (const topic of TOPICS) {
    const score = topic.keywords
      .map(normalize)
      .filter((k) => hasPhrase(text, k))
      .reduce((n, k) => n + k.length, 0);
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  return best?.topic;
}

function randomOf<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// ---------- Engine ----------

export class RuleBasedEngine implements ChatEngine {
  async reply(message: string, { locale, t }: ChatContext): Promise<BotReply> {
    const text = normalize(message);
    const words = text.split(" ").filter(Boolean);
    const suggestions = [t("suggestions.fact"), t("suggestions.translate"), t("suggestions.math")];

    if (!text) return { text: t("fallback"), suggestions };

    // 1. Short greeting or thank-you ("hi", "Assalam o Alaikum", "shukriya") —
    //    unless the student is asking how to say it in another language.
    const wantsTranslation = hasAny(text, TRANSLATE);
    if (words.length <= 4 && !wantsTranslation) {
      if (hasAny(text, GREETING)) return { text: t("greeting"), suggestions };
      if (hasAny(text, THANKS)) return { text: t("thanks") };
    }

    // 2. Sums
    const math = findMath(message);
    if (math) {
      if (math.result === null) return { text: t("divideByZero") };
      return {
        text: t("mathResult", { expression: math.expression, result: math.result }),
        suggestions: [t("suggestions.math2"), t("suggestions.quiz")],
      };
    }

    // 3. Translations from the lesson words
    const word = findWord(text);
    if (word && (wantsTranslation || normalize(word[locale]) === text || words.length <= 2)) {
      const target = targetLanguage(text);
      const source = word.letter ? word.en : word[locale];
      if (target && target !== locale) {
        const roman = target === "en" ? "" : ` (${word.roman[target]})`;
        return {
          text: t("translateTo", { word: source, language: t(`languages.${target}`), answer: `${word[target]}${roman}` }),
          word,
        };
      }
      return { text: t("translateAll", { word: source }), word };
    }

    // 4. Known topics (Pakistan, Sindh, Bhittai, Iqbal…)
    const topic = bestTopic(text);
    if (topic) {
      return {
        text: `${topic.emoji} ${pick(topic.answer, locale)}`,
        suggestions: [t("suggestions.more"), t("suggestions.quiz")],
      };
    }

    // 5. Fun fact
    if (hasAny(text, FACT)) {
      return { text: `${t("factIntro")} ${pick(randomOf(FUN_FACTS), locale)}`, suggestions: [t("suggestions.fact2")] };
    }

    // 6. Small talk
    if (hasAny(text, THANKS)) return { text: t("thanks") };
    if (hasAny(text, WHO)) return { text: t("intro"), suggestions };
    if (hasAny(text, HOW_ARE_YOU)) return { text: t("howAreYou"), suggestions };
    if (hasAny(text, HELP)) return { text: t("help"), suggestions };
    if (hasAny(text, GREETING)) return { text: t("greeting"), suggestions };

    // 7. Open a page of the app
    const pages = NAV.filter((n) => hasAny(text, n.keywords));
    if (pages.length) {
      return { text: t("navigate"), links: pages.slice(0, 3).map(({ page, href }) => ({ page, href })) };
    }

    // 8. Translation asked for a word we don't know yet
    if (wantsTranslation) return { text: t("unknownWord"), suggestions: [t("suggestions.translate")] };

    return {
      text: t("fallback"),
      suggestions: [t("suggestions.bhittai"), t("suggestions.fact"), t("suggestions.translate")],
    };
  }
}
