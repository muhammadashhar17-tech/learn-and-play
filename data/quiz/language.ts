import type { Question } from "./types";

// Options written as plain strings are the words being taught, so they stay
// the same whatever language the app is shown in.
export const LANGUAGE_QUESTIONS: Question[] = [
  // ---------- Easy ----------
  {
    id: "lang-1",
    difficulty: "easy",
    q: { en: "What is 'water' in Urdu?", ur: "'Water' کو اردو میں کیا کہتے ہیں؟", sd: "'Water' کي اردو ۾ ڇا چوندا آهن؟" },
    options: ["آگ", "پانی", "ہوا", "مٹی"],
    answer: 1,
  },
  {
    id: "lang-2",
    difficulty: "easy",
    q: { en: "What is 'mother' in Sindhi?", ur: "'Mother' کو سندھی میں کیا کہتے ہیں؟", sd: "'Mother' کي سنڌي ۾ ڇا چوندا آهن؟" },
    options: ["پيءُ", "ڀاءُ", "ماءُ", "ڀيڻ"],
    answer: 2,
  },
  {
    id: "lang-3",
    difficulty: "easy",
    q: { en: "What is the opposite of 'hot'?", ur: "'گرم' کا الٹ کیا ہے؟", sd: "'گرم' جو ابتڙ ڇا آهي؟" },
    options: [
      { en: "Warm", ur: "نیم گرم", sd: "ڪوسو" },
      { en: "Cold", ur: "ٹھنڈا", sd: "ٿڌو" },
      { en: "Big", ur: "بڑا", sd: "وڏو" },
      { en: "Fast", ur: "تیز", sd: "تيز" },
    ],
    answer: 1,
  },
  {
    id: "lang-4",
    difficulty: "easy",
    q: { en: "How many letters are there in the English alphabet?", ur: "انگریزی حروفِ تہجی میں کتنے حروف ہیں؟", sd: "انگريزي الف ب ۾ ڪيترا اکر آهن؟" },
    options: ["24", "26", "28", "30"],
    answer: 1,
  },
  {
    id: "lang-5",
    difficulty: "easy",
    q: { en: "What is 'book' in Urdu?", ur: "'Book' کو اردو میں کیا کہتے ہیں؟", sd: "'Book' کي اردو ۾ ڇا چوندا آهن؟" },
    options: ["قلم", "کتاب", "کاپی", "بستہ"],
    answer: 1,
  },
  // ---------- Medium ----------
  {
    id: "lang-6",
    difficulty: "medium",
    q: { en: "How do you say 'thank you' in Sindhi?", ur: "سندھی میں 'شکریہ' کیسے کہتے ہیں؟", sd: "سنڌي ۾ 'Thank you' ڪيئن چئبو آهي؟" },
    options: ["ڀلي ڪري آيا", "مهرباني", "خدا حافظ", "معاف ڪجو"],
    answer: 1,
  },
  {
    id: "lang-7",
    difficulty: "medium",
    q: { en: "What is 'friend' in Urdu?", ur: "'Friend' کو اردو میں کیا کہتے ہیں؟", sd: "'Friend' کي اردو ۾ ڇا چوندا آهن؟" },
    options: ["دشمن", "استاد", "دوست", "مہمان"],
    answer: 2,
  },
  {
    id: "lang-8",
    difficulty: "medium",
    q: { en: "What is the plural of the English word 'child'?", ur: "انگریزی لفظ 'child' کی جمع کیا ہے؟", sd: "انگريزي لفظ 'child' جو جمع ڇا آهي؟" },
    options: ["childs", "childes", "children", "childrens"],
    answer: 2,
  },
  {
    id: "lang-9",
    difficulty: "medium",
    q: { en: "What is 'moon' in Sindhi?", ur: "'Moon' کو سندھی میں کیا کہتے ہیں؟", sd: "'Moon' کي سنڌي ۾ ڇا چوندا آهن؟" },
    options: ["سج", "چنڊ", "تارو", "آسمان"],
    answer: 1,
  },
  {
    id: "lang-10",
    difficulty: "medium",
    q: { en: "Which English word is a noun (a naming word)?", ur: "ان میں سے کون سا انگریزی لفظ اسم ہے؟", sd: "هنن مان ڪهڙو انگريزي لفظ اسم آهي؟" },
    options: ["run", "happy", "school", "quickly"],
    answer: 2,
  },
  // ---------- Hard ----------
  {
    id: "lang-11",
    difficulty: "hard",
    q: { en: "Which of these letters is found in Sindhi but NOT in Urdu?", ur: "ان میں سے کون سا حرف سندھی میں ہے مگر اردو میں نہیں؟", sd: "هنن مان ڪهڙو اکر سنڌي ۾ آهي پر اردو ۾ ناهي؟" },
    options: ["ب", "ت", "ڻ", "س"],
    answer: 2,
  },
  {
    id: "lang-12",
    difficulty: "hard",
    q: { en: "In which script is Sindhi mostly written in Pakistan today?", ur: "آج پاکستان میں سندھی زیادہ تر کس رسم الخط میں لکھی جاتی ہے؟", sd: "اڄ پاڪستان ۾ سنڌي گهڻو ڪري ڪهڙي لپيءَ ۾ لکي وڃي ٿي؟" },
    options: [
      { en: "Latin (ABC)", ur: "لاطینی (ABC)", sd: "لاطيني (ABC)" },
      { en: "Arabic script (Perso-Arabic)", ur: "عربی رسم الخط", sd: "عربي لپي" },
      { en: "Chinese characters", ur: "چینی حروف", sd: "چيني اکر" },
      { en: "Greek letters", ur: "یونانی حروف", sd: "يوناني اکر" },
    ],
    answer: 1,
  },
  {
    id: "lang-13",
    difficulty: "hard",
    q: { en: "What is 'water' in Sindhi?", ur: "'Water' کو سندھی میں کیا کہتے ہیں؟", sd: "'Water' کي سنڌي ۾ ڇا چوندا آهن؟" },
    options: ["باهه", "هوا", "مٽي", "پاڻي"],
    answer: 3,
  },
  {
    id: "lang-14",
    difficulty: "hard",
    q: { en: "Which English word means the same as 'big'?", ur: "کون سا انگریزی لفظ 'big' کا ہم معنی ہے؟", sd: "ڪهڙو انگريزي لفظ 'big' جو هم معنيٰ آهي؟" },
    options: ["tiny", "large", "short", "small"],
    answer: 1,
  },
  {
    id: "lang-15",
    difficulty: "hard",
    q: { en: "What is 'knowledge' in Urdu?", ur: "'Knowledge' کو اردو میں کیا کہتے ہیں؟", sd: "'Knowledge' کي اردو ۾ ڇا چوندا آهن؟" },
    options: ["عمل", "علم", "عالم", "علامت"],
    answer: 1,
  },
];
