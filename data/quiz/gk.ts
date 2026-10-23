import type { Question } from "./types";

export const GK_QUESTIONS: Question[] = [
  // ---------- Easy ----------
  {
    id: "gk-1",
    difficulty: "easy",
    q: { en: "How many days are there in a week?", ur: "ایک ہفتے میں کتنے دن ہوتے ہیں؟", sd: "هڪ هفتي ۾ ڪيترا ڏينهن ٿين ٿا؟" },
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    id: "gk-2",
    difficulty: "easy",
    q: { en: "What colours are on the flag of Pakistan?", ur: "پاکستان کے جھنڈے میں کون سے رنگ ہیں؟", sd: "پاڪستان جي جهنڊي ۾ ڪهڙا رنگ آهن؟" },
    options: [
      { en: "Green and white", ur: "سبز اور سفید", sd: "سائو ۽ اڇو" },
      { en: "Red and white", ur: "سرخ اور سفید", sd: "ڳاڙهو ۽ اڇو" },
      { en: "Blue and white", ur: "نیلا اور سفید", sd: "نيرو ۽ اڇو" },
      { en: "Green and yellow", ur: "سبز اور پیلا", sd: "سائو ۽ پيلو" },
    ],
    answer: 0,
  },
  {
    id: "gk-3",
    difficulty: "easy",
    q: { en: "What is the national language of Pakistan?", ur: "پاکستان کی قومی زبان کون سی ہے؟", sd: "پاڪستان جي قومي ٻولي ڪهڙي آهي؟" },
    options: [
      { en: "Urdu", ur: "اردو", sd: "اردو" },
      { en: "English", ur: "انگریزی", sd: "انگريزي" },
      { en: "Arabic", ur: "عربی", sd: "عربي" },
      { en: "Persian", ur: "فارسی", sd: "فارسي" },
    ],
    answer: 0,
  },
  {
    id: "gk-4",
    difficulty: "easy",
    q: { en: "How many months are there in a year?", ur: "ایک سال میں کتنے مہینے ہوتے ہیں؟", sd: "هڪ سال ۾ ڪيترا مهينا ٿين ٿا؟" },
    options: ["10", "11", "12", "13"],
    answer: 2,
  },
  {
    id: "gk-5",
    difficulty: "easy",
    q: { en: "Which animal is called the 'ship of the desert'?", ur: "کس جانور کو 'ریگستان کا جہاز' کہا جاتا ہے؟", sd: "ڪهڙي جانور کي 'رڻ جو جهاز' سڏيو وڃي ٿو؟" },
    options: [
      { en: "Horse", ur: "گھوڑا", sd: "گهوڙو" },
      { en: "Camel", ur: "اونٹ", sd: "اُٺ" },
      { en: "Elephant", ur: "ہاتھی", sd: "هاٿي" },
      { en: "Donkey", ur: "گدھا", sd: "گڏهه" },
    ],
    answer: 1,
  },
  // ---------- Medium ----------
  {
    id: "gk-6",
    difficulty: "medium",
    q: { en: "What is the national animal of Pakistan?", ur: "پاکستان کا قومی جانور کون سا ہے؟", sd: "پاڪستان جو قومي جانور ڪهڙو آهي؟" },
    options: [
      { en: "Lion", ur: "شیر", sd: "شينهن" },
      { en: "Tiger", ur: "چیتا", sd: "چيتو" },
      { en: "Markhor", ur: "مارخور", sd: "مارخور" },
      { en: "Deer", ur: "ہرن", sd: "هرڻ" },
    ],
    answer: 2,
  },
  {
    id: "gk-7",
    difficulty: "medium",
    q: { en: "What is the national flower of Pakistan?", ur: "پاکستان کا قومی پھول کون سا ہے؟", sd: "پاڪستان جو قومي گل ڪهڙو آهي؟" },
    options: [
      { en: "Rose", ur: "گلاب", sd: "گلاب" },
      { en: "Jasmine", ur: "چنبیلی", sd: "چنبيلي" },
      { en: "Tulip", ur: "ٹیولپ", sd: "ٽيولپ" },
      { en: "Sunflower", ur: "سورج مکھی", sd: "سورج مکي" },
    ],
    answer: 1,
  },
  {
    id: "gk-8",
    difficulty: "medium",
    q: { en: "Which is the highest mountain in Pakistan?", ur: "پاکستان کا سب سے اونچا پہاڑ کون سا ہے؟", sd: "پاڪستان جو سڀ کان اوچو جبل ڪهڙو آهي؟" },
    options: [
      { en: "Nanga Parbat", ur: "نانگا پربت", sd: "نانگا پربت" },
      { en: "Tirich Mir", ur: "ترچ میر", sd: "ترچ مير" },
      { en: "Rakaposhi", ur: "راکاپوشی", sd: "راڪاپوشي" },
      { en: "K2", ur: "کے ٹو", sd: "ڪي ٽو" },
    ],
    answer: 3,
  },
  {
    id: "gk-9",
    difficulty: "medium",
    q: { en: "What is the national bird of Pakistan?", ur: "پاکستان کا قومی پرندہ کون سا ہے؟", sd: "پاڪستان جو قومي پکي ڪهڙو آهي؟" },
    options: [
      { en: "Peacock", ur: "مور", sd: "مور" },
      { en: "Chukar partridge", ur: "چکور", sd: "چڪور" },
      { en: "Parrot", ur: "طوطا", sd: "طوطو" },
      { en: "Eagle", ur: "عقاب", sd: "عقاب" },
    ],
    answer: 1,
  },
  {
    id: "gk-10",
    difficulty: "medium",
    q: { en: "Which is the largest ocean in the world?", ur: "دنیا کا سب سے بڑا سمندر کون سا ہے؟", sd: "دنيا جو سڀ کان وڏو سمنڊ ڪهڙو آهي؟" },
    options: [
      { en: "Atlantic Ocean", ur: "بحرِ اوقیانوس", sd: "ائٽلانٽڪ سمنڊ" },
      { en: "Indian Ocean", ur: "بحرِ ہند", sd: "هندي سمنڊ" },
      { en: "Pacific Ocean", ur: "بحرالکاہل", sd: "پئسفڪ سمنڊ" },
      { en: "Arctic Ocean", ur: "بحرِ منجمد شمالی", sd: "آرڪٽڪ سمنڊ" },
    ],
    answer: 2,
  },
  // ---------- Hard ----------
  {
    id: "gk-11",
    difficulty: "hard",
    q: { en: "What is the national tree of Pakistan?", ur: "پاکستان کا قومی درخت کون سا ہے؟", sd: "پاڪستان جو قومي وڻ ڪهڙو آهي؟" },
    options: [
      { en: "Neem", ur: "نیم", sd: "نم" },
      { en: "Banyan", ur: "برگد", sd: "ٻڙ" },
      { en: "Deodar", ur: "دیودار", sd: "ديودار" },
      { en: "Mango tree", ur: "آم کا درخت", sd: "انب جو وڻ" },
    ],
    answer: 2,
  },
  {
    id: "gk-12",
    difficulty: "hard",
    q: { en: "K2 is part of which mountain range?", ur: "کے ٹو کس پہاڑی سلسلے کا حصہ ہے؟", sd: "ڪي ٽو ڪهڙي جبلن جي سلسلي جو حصو آهي؟" },
    options: [
      { en: "Himalaya", ur: "ہمالیہ", sd: "هماليه" },
      { en: "Karakoram", ur: "قراقرم", sd: "قراقرم" },
      { en: "Hindu Kush", ur: "ہندوکش", sd: "هندوڪش" },
      { en: "Kirthar", ur: "کیرتھر", sd: "ڪيرٿر" },
    ],
    answer: 1,
  },
  {
    id: "gk-13",
    difficulty: "hard",
    q: { en: "Which is the largest desert in Pakistan?", ur: "پاکستان کا سب سے بڑا صحرا کون سا ہے؟", sd: "پاڪستان جو سڀ کان وڏو رڻ ڪهڙو آهي؟" },
    options: [
      { en: "Thar", ur: "تھر", sd: "ٿر" },
      { en: "Cholistan", ur: "چولستان", sd: "چولستان" },
      { en: "Thal", ur: "تھل", sd: "ٿل" },
      { en: "Kharan", ur: "خاران", sd: "خاران" },
    ],
    answer: 0,
  },
  {
    id: "gk-14",
    difficulty: "hard",
    q: {
      en: "Which lake in Sindh is the largest freshwater lake in Pakistan?",
      ur: "سندھ کی کون سی جھیل پاکستان میں میٹھے پانی کی سب سے بڑی جھیل ہے؟",
      sd: "سنڌ جي ڪهڙي ڍنڍ پاڪستان ۾ مٺي پاڻي جي سڀ کان وڏي ڍنڍ آهي؟",
    },
    options: [
      { en: "Keenjhar Lake", ur: "کینجھر جھیل", sd: "ڪينجهر ڍنڍ" },
      { en: "Haleji Lake", ur: "ہالیجی جھیل", sd: "هاليجي ڍنڍ" },
      { en: "Manchar Lake", ur: "منچھر جھیل", sd: "منڇر ڍنڍ" },
      { en: "Saiful Muluk Lake", ur: "سیف الملوک جھیل", sd: "سيف الملوڪ ڍنڍ" },
    ],
    answer: 2,
  },
  {
    id: "gk-15",
    difficulty: "hard",
    q: { en: "What is the national game of Pakistan?", ur: "پاکستان کا قومی کھیل کون سا ہے؟", sd: "پاڪستان جي قومي راند ڪهڙي آهي؟" },
    options: [
      { en: "Cricket", ur: "کرکٹ", sd: "ڪرڪيٽ" },
      { en: "Squash", ur: "اسکواش", sd: "اسڪواش" },
      { en: "Football", ur: "فٹ بال", sd: "فٽبال" },
      { en: "Hockey", ur: "ہاکی", sd: "هاڪي" },
    ],
    answer: 3,
  },
];
