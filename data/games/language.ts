import type { Locale } from "@/i18n/routing";
import { ALL_WORDS } from "../lessons";
import type { Game, OrderSet, QuickQuestion } from "./types";
import { t3 } from "./types";
import { sample } from "./util";

/** Lesson words that have a picture (animals, fruits, body, transport…). */
const PICTURE_WORDS = ALL_WORDS.filter((w) => w.emoji && !w.letter);

/** The language to practise: for English speakers Urdu or Sindhi, otherwise the other one. */
function otherLanguage(locale: Locale): "ur" | "sd" {
  if (locale === "ur") return "sd";
  if (locale === "sd") return "ur";
  return Math.random() < 0.5 ? "ur" : "sd";
}

function wordPairs(locale: Locale): [string, string][] {
  const target = otherLanguage(locale);
  const seen = new Set<string>();
  const words = sample(PICTURE_WORDS, 30).filter((w) => {
    if (seen.has(w[target]) || seen.has(w.en)) return false;
    seen.add(w[target]);
    seen.add(w.en);
    return true;
  });
  return words.slice(0, 6).map((w) => [`${w.emoji} ${w[locale === "en" ? "en" : locale]}`, w[target]]);
}

function listenQuestions(locale: Locale): QuickQuestion[] {
  const langs: Locale[] = locale === "en" ? ["ur", "sd", "en"] : [locale === "ur" ? "sd" : "ur", "en", locale];
  return sample(PICTURE_WORDS, 10).map((w, i) => {
    const lang = langs[i % langs.length];
    const wrong = sample(
      PICTURE_WORDS.filter((o) => o.emoji !== w.emoji),
      3,
    ).map((o) => o.emoji!);
    const options = sample([w.emoji!, ...new Set(wrong)], 4);
    return {
      prompt: t3("Listen and tap the right picture.", "سنیں اور صحیح تصویر دبائیں۔", "ٻڌو ۽ صحيح تصوير دٻايو."),
      visual: { type: "listen", text: w[lang], lang },
      options,
      answer: options.indexOf(w.emoji!),
      explain: t3(`${w.emoji} ${w.en} · ${w.ur} · ${w.sd}`, `${w.emoji} ${w.ur} · ${w.en} · ${w.sd}`, `${w.emoji} ${w.sd} · ${w.en} · ${w.ur}`),
    };
  });
}

const DAYS: OrderSet = {
  prompt: t3("Days of the week, starting Monday", "ہفتے کے دن، پیر سے شروع", "هفتي جا ڏينهن، سومر کان شروع"),
  steps: [
    { label: t3("Monday", "پیر", "سومر") },
    { label: t3("Tuesday", "منگل", "اڱارو") },
    { label: t3("Wednesday", "بدھ", "اربع") },
    { label: t3("Thursday", "جمعرات", "خميس") },
    { label: t3("Friday", "جمعہ", "جمعو") },
    { label: t3("Saturday", "ہفتہ", "ڇنڇر") },
    { label: t3("Sunday", "اتوار", "آچر") },
  ],
};

const MONTHS = [
  t3("January", "جنوری", "جنوري"),
  t3("February", "فروری", "فيبروري"),
  t3("March", "مارچ", "مارچ"),
  t3("April", "اپریل", "اپريل"),
  t3("May", "مئی", "مئي"),
  t3("June", "جون", "جون"),
  t3("July", "جولائی", "جولاءِ"),
  t3("August", "اگست", "آگسٽ"),
  t3("September", "ستمبر", "سيپٽمبر"),
  t3("October", "اکتوبر", "آڪٽوبر"),
  t3("November", "نومبر", "نومبر"),
  t3("December", "دسمبر", "ڊسمبر"),
];

const SEASONS: OrderSet = {
  prompt: t3("Seasons of the year, starting with spring", "سال کے موسم، بہار سے شروع", "سال جون موسمون، بهار کان شروع"),
  steps: [
    { emoji: "🌸", label: t3("Spring", "بہار", "بهار") },
    { emoji: "☀️", label: t3("Summer", "گرمی", "اونهارو") },
    { emoji: "🍂", label: t3("Autumn", "خزاں", "سرءُ") },
    { emoji: "❄️", label: t3("Winter", "سردی", "سيارو") },
  ],
};

export const LANGUAGE_GAMES: Game[] = [
  {
    id: "word-match",
    kind: "match",
    subject: "language",
    level: "easy",
    title: t3("Word Match", "لفظوں کا میل", "لفظن جو ميل"),
    intro: t3("Match each picture word with the same word in Urdu or Sindhi.", "ہر تصویر والے لفظ کو اردو یا سندھی کے اسی لفظ سے ملائیں۔", "هر تصوير واري لفظ کي اردو يا سنڌيءَ جي ساڳئي لفظ سان ملايو."),
    lesson: [
      t3("Urdu and Sindhi are both written from right to left.", "اردو اور سندھی دونوں دائیں سے بائیں لکھی جاتی ہیں۔", "اردو ۽ سنڌي ٻئي ساڄي کان کاٻي لکيون وڃن ٿيون."),
      t3("Many words look alike in Urdu and Sindhi, like کتاب (book) — but Sindhi has extra letters such as ٻ ڄ ڏ ڪ.", "بہت سے لفظ اردو اور سندھی میں ملتے جلتے ہیں، جیسے کتاب — لیکن سندھی میں ٻ ڄ ڏ ڪ جیسے اضافی حروف ہیں۔", "ڪيترائي لفظ اردو ۽ سنڌيءَ ۾ هڪجهڙا آهن، جيئن ڪتاب — پر سنڌيءَ ۾ ٻ ڄ ڏ ڪ جهڙا وڌيڪ اکر آهن."),
      t3("Say each word out loud — that helps you remember it.", "ہر لفظ بلند آواز سے بولیں — اس سے یاد رکھنے میں مدد ملتی ہے۔", "هر لفظ وڏي آواز ۾ چئو — ان سان ياد رکڻ ۾ مدد ملي ٿي."),
    ],
    pairs: wordPairs,
  },
  {
    id: "listen-pick",
    kind: "quick",
    subject: "language",
    level: "easy",
    title: t3("Listen and Pick", "سنیں اور چنیں", "ٻڌو ۽ چونڊيو"),
    intro: t3("Listen to the word and tap its picture.", "لفظ سنیں اور اس کی تصویر دبائیں۔", "لفظ ٻڌو ۽ ان جي تصوير دٻايو."),
    lesson: [
      t3("Listening carefully is the first step to learning a new language.", "غور سے سننا نئی زبان سیکھنے کا پہلا قدم ہے۔", "غور سان ٻڌڻ نئين ٻولي سکڻ جو پهريون قدم آهي."),
      t3("You can play the word again as many times as you like.", "آپ لفظ جتنی بار چاہیں دوبارہ سن سکتے ہیں۔", "توهان لفظ جيترا ڀيرا چاهيو ٻيهر ٻڌي سگهو ٿا."),
      t3("Words come in English, Urdu and Sindhi — try to say them back!", "لفظ انگریزی، اردو اور سندھی میں آئیں گے — انہیں دہرانے کی کوشش کریں!", "لفظ انگريزي، اردو ۽ سنڌيءَ ۾ ايندا — انهن کي ورجائڻ جي ڪوشش ڪريو!"),
    ],
    questions: listenQuestions,
  },
  {
    id: "spell-it",
    kind: "spell",
    subject: "language",
    level: "medium",
    title: t3("Spell It!", "ہجے کریں!", "هِجي ڪريو!"),
    intro: t3("Tap the letters in the right order to spell the English word.", "انگریزی لفظ کے ہجے کرنے کے لیے حروف صحیح ترتیب میں دبائیں۔", "انگريزي لفظ جا هِجي ڪرڻ لاءِ اکر صحيح ترتيب ۾ دٻايو."),
    lesson: [
      t3("English has 26 letters. Five of them are vowels: A, E, I, O, U.", "انگریزی میں 26 حروف ہیں۔ ان میں سے پانچ حروفِ علت ہیں: A, E, I, O, U", "انگريزيءَ ۾ 26 اکر آهن. انهن مان پنج سُر آهن: A, E, I, O, U"),
      t3("Say the word slowly and listen for each sound: c-a-t.", "لفظ آہستہ بولیں اور ہر آواز سنیں: c-a-t", "لفظ آهستي چئو ۽ هر آواز ٻڌو: c-a-t"),
      t3("Most short words have a vowel in the middle, like d-o-g and s-u-n.", "اکثر چھوٹے لفظوں کے درمیان میں حرفِ علت ہوتا ہے، جیسے d-o-g اور s-u-n", "اڪثر ننڍن لفظن جي وچ ۾ سُر هوندو آهي، جيئن d-o-g ۽ s-u-n"),
    ],
    words: [
      { word: "CAT", emoji: "🐱", hint: t3("A pet that says meow", "بلی", "ٻلي") },
      { word: "DOG", emoji: "🐶", hint: t3("A pet that barks", "کتا", "ڪتو") },
      { word: "SUN", emoji: "☀️", hint: t3("It shines in the day", "سورج", "سج") },
      { word: "FISH", emoji: "🐟", hint: t3("It swims in water", "مچھلی", "مڇي") },
      { word: "BOOK", emoji: "📕", hint: t3("We read it", "کتاب", "ڪتاب") },
      { word: "TREE", emoji: "🌳", hint: t3("It has leaves and branches", "درخت", "وڻ") },
      { word: "MILK", emoji: "🥛", hint: t3("A white drink from cows", "دودھ", "کير") },
      { word: "STAR", emoji: "⭐", hint: t3("It twinkles at night", "ستارہ", "تارو") },
      { word: "BIRD", emoji: "🐦", hint: t3("It has wings", "پرندہ", "پکي") },
      { word: "MOON", emoji: "🌙", hint: t3("We see it at night", "چاند", "چنڊ") },
      { word: "CAKE", emoji: "🎂", hint: t3("A sweet birthday treat", "کیک", "ڪيڪ") },
      { word: "BALL", emoji: "⚽", hint: t3("We kick or throw it", "گیند", "بال") },
      { word: "DUCK", emoji: "🦆", hint: t3("It says quack", "بطخ", "بدڪ") },
      { word: "FROG", emoji: "🐸", hint: t3("It jumps and says croak", "مینڈک", "ڏيڏر") },
      { word: "LION", emoji: "🦁", hint: t3("King of the jungle", "شیر", "شينهن") },
      { word: "RAIN", emoji: "🌧️", hint: t3("Water falling from clouds", "بارش", "مينهن") },
      { word: "APPLE", emoji: "🍎", hint: t3("A red or green fruit", "سیب", "صوف") },
      { word: "HOUSE", emoji: "🏠", hint: t3("We live in it", "گھر", "گهر") },
      { word: "MANGO", emoji: "🥭", hint: t3("Sindh's favourite summer fruit", "آم", "انب") },
      { word: "WATER", emoji: "💧", hint: t3("We drink it every day", "پانی", "پاڻي") },
    ],
  },
  {
    id: "opposites",
    kind: "match",
    subject: "language",
    level: "easy",
    title: t3("Opposites", "متضاد الفاظ", "ابتڙ لفظ"),
    intro: t3("Match each word with its opposite.", "ہر لفظ کو اس کے الٹ سے ملائیں۔", "هر لفظ کي ان جي ابتڙ سان ملايو."),
    lesson: [
      t3("Opposites are words that mean completely different things, like hot and cold.", "متضاد وہ الفاظ ہیں جن کا مطلب بالکل الٹ ہو، جیسے گرم اور ٹھنڈا۔", "ابتڙ اهي لفظ آهن جن جو مطلب بلڪل ابتڙ هجي، جيئن گرم ۽ ٿڌو."),
      t3("Opposites help us describe and compare things: a big elephant, a small mouse.", "متضاد الفاظ چیزوں کو بیان کرنے اور موازنہ کرنے میں مدد دیتے ہیں: بڑا ہاتھی، چھوٹا چوہا۔", "ابتڙ لفظ شين کي بيان ڪرڻ ۽ ڀيٽ ڪرڻ ۾ مدد ڏين ٿا: وڏو هاٿي، ننڍو ڪُوئو."),
    ],
    pairs: () =>
      sample(
        [
          [t3("Big", "بڑا", "وڏو"), t3("Small", "چھوٹا", "ننڍو")],
          [t3("Hot", "گرم", "گرم"), t3("Cold", "ٹھنڈا", "ٿڌو")],
          [t3("Up", "اوپر", "مٿي"), t3("Down", "نیچے", "هيٺ")],
          [t3("Day", "دن", "ڏينهن"), t3("Night", "رات", "رات")],
          [t3("Happy", "خوش", "خوش"), t3("Sad", "اداس", "اداس")],
          [t3("Fast", "تیز", "تيز"), t3("Slow", "آہستہ", "سست")],
          [t3("Open", "کھلا", "کليل"), t3("Closed", "بند", "بند")],
          [t3("Full", "بھرا", "ڀريل"), t3("Empty", "خالی", "خالي")],
          [t3("Old", "پرانا", "پراڻو"), t3("New", "نیا", "نئون")],
          [t3("Tall", "لمبا", "ڊگهو"), t3("Short", "چھوٹا (قد)", "ننڍو (قد)")],
          [t3("In", "اندر", "اندر"), t3("Out", "باہر", "ٻاهر")],
          [t3("Clean", "صاف", "صاف"), t3("Dirty", "گندا", "گندو")],
        ] as [ReturnType<typeof t3>, ReturnType<typeof t3>][],
        6,
      ),
  },
  {
    id: "calendar",
    kind: "order",
    subject: "language",
    level: "medium",
    title: t3("Days, Months and Seasons", "دن، مہینے اور موسم", "ڏينهن، مهينا ۽ موسمون"),
    intro: t3("Put the days, months and seasons in order.", "دن، مہینے اور موسم ترتیب سے لگائیں۔", "ڏينهن، مهينا ۽ موسمون ترتيب سان رکو."),
    lesson: [
      t3("A week has 7 days. Friday (Jumu'ah) is a special day for prayers.", "ہفتے میں 7 دن ہوتے ہیں۔ جمعہ نماز کے لیے خاص دن ہے۔", "هفتي ۾ 7 ڏينهن ٿين ٿا. جمعو نماز لاءِ خاص ڏينهن آهي."),
      t3("A year has 12 months, from January to December.", "سال میں 12 مہینے ہوتے ہیں، جنوری سے دسمبر تک۔", "سال ۾ 12 مهينا ٿين ٿا، جنوري کان ڊسمبر تائين."),
      t3("Sindh has a long hot summer and a short cool winter.", "سندھ میں گرمی لمبی اور سردی مختصر ہوتی ہے۔", "سنڌ ۾ اونهارو ڊگهو ۽ سيارو ننڍو ٿئي ٿو."),
    ],
    sets: () => {
      const half = Math.random() < 0.5 ? 0 : 6;
      return [
        DAYS,
        {
          prompt: half === 0 ? t3("The first six months", "پہلے چھ مہینے", "پهريان ڇهه مهينا") : t3("The last six months", "آخری چھ مہینے", "آخري ڇهه مهينا"),
          steps: MONTHS.slice(half, half + 6).map((label) => ({ label })),
        },
        SEASONS,
      ];
    },
  },
];
