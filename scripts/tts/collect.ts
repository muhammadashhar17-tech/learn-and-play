// Lists every text the app can read aloud, per language, into scripts/tts/texts.json.
// Run with:  npx tsx scripts/tts/collect.ts
// Then:      python scripts/tts/generate.py   (makes the clips in public/audio)
import { writeFileSync } from "node:fs";
import { GAMES, type Game, type Option } from "@/data/games";
import { ALL_WORDS } from "@/data/lessons";
import { CATEGORIES } from "@/data/quiz";
import type { Trilingual } from "@/data/types";
import { routing, type Locale } from "@/i18n/routing";
import { speechText } from "@/lib/speech";

const texts: Record<Locale, Set<string>> = { en: new Set(), ur: new Set(), sd: new Set() };
const add = (lang: Locale, text: string) => {
  const t = speechText(text);
  if (t) texts[lang].add(t);
};
const addAll = (tri: Trilingual) => routing.locales.forEach((l) => add(l, tri[l]));
const addOption = (opt: Option) => (typeof opt === "string" ? null : addAll(opt));

// Flashcards, chatbot word cards and the Listen-and-Pick game.
for (const w of ALL_WORDS) {
  add("en", w.en);
  add("ur", w.ur);
  add("sd", w.sd);
}

// Quiz questions (the Listen button next to each question).
for (const c of CATEGORIES) for (const q of c.questions) addAll(q.q);

// Games: lesson points always; prompts and labels that never change.
// Game rounds are random, so sample them many times to see every fixed text.
const hasDigit = (opt: Option) => /\d/.test(typeof opt === "string" ? opt : opt.en);
function collectGame(game: Game) {
  game.lesson.forEach(addAll);
  for (let i = 0; i < 60; i++) {
    for (const locale of routing.locales) {
      switch (game.kind) {
        case "quick":
          for (const q of game.questions(locale)) if (!hasDigit(q.prompt)) addOption(q.prompt);
          break;
        case "sort":
          game.items.forEach((it) => addOption(it.label));
          break;
        case "spell":
          game.words.forEach((w) => add("en", w.word.toLowerCase()));
          break;
        default:
          break;
      }
    }
  }
}
GAMES.forEach(collectGame);

const out = Object.fromEntries(routing.locales.map((l) => [l, [...texts[l]].sort()]));
writeFileSync(new URL("./texts.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(Object.entries(out).map(([l, list]) => `${l}: ${list.length}`).join(", "));
