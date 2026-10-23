import type { Question } from "./types";

export const SCIENCE_QUESTIONS: Question[] = [
  // ---------- Easy ----------
  {
    id: "sci-1",
    difficulty: "easy",
    q: { en: "Which planet do we live on?", ur: "ہم کس سیارے پر رہتے ہیں؟", sd: "اسين ڪهڙي سياري تي رهون ٿا؟" },
    options: [
      { en: "Mars", ur: "مریخ", sd: "مريخ" },
      { en: "Earth", ur: "زمین", sd: "ڌرتي" },
      { en: "Venus", ur: "زہرہ", sd: "زهره" },
      { en: "Jupiter", ur: "مشتری", sd: "مشتري" },
    ],
    answer: 1,
  },
  {
    id: "sci-2",
    difficulty: "easy",
    q: { en: "What do green plants need from the sky to make their food?", ur: "سبز پودوں کو اپنی غذا بنانے کے لیے آسمان سے کیا چاہیے؟", sd: "سائن ٻوٽن کي پنهنجو کاڌو ٺاهڻ لاءِ آسمان مان ڇا گهرجي؟" },
    options: [
      { en: "Moonlight", ur: "چاندنی", sd: "چانڊوڪي" },
      { en: "Sunlight", ur: "دھوپ", sd: "سج جي روشني" },
      { en: "Darkness", ur: "اندھیرا", sd: "اونداهي" },
      { en: "Thunder", ur: "گرج", sd: "گجگوڙ" },
    ],
    answer: 1,
  },
  {
    id: "sci-3",
    difficulty: "easy",
    q: { en: "How many legs does an insect have?", ur: "کیڑے کی کتنی ٹانگیں ہوتی ہیں؟", sd: "جيت کي ڪيتريون ٽنگون ٿينديون آهن؟" },
    options: ["4", "6", "8", "10"],
    answer: 1,
  },
  {
    id: "sci-4",
    difficulty: "easy",
    q: { en: "Which star is closest to the Earth?", ur: "زمین کے سب سے قریب ستارہ کون سا ہے؟", sd: "ڌرتي جي سڀ کان ويجهو تارو ڪهڙو آهي؟" },
    options: [
      { en: "The Moon", ur: "چاند", sd: "چنڊ" },
      { en: "The Pole Star", ur: "قطبی ستارہ", sd: "قطبي تارو" },
      { en: "The Sun", ur: "سورج", sd: "سج" },
      { en: "Mars", ur: "مریخ", sd: "مريخ" },
    ],
    answer: 2,
  },
  {
    id: "sci-5",
    difficulty: "easy",
    q: { en: "At what temperature does water freeze into ice?", ur: "پانی کس درجۂ حرارت پر جم کر برف بنتا ہے؟", sd: "پاڻي ڪهڙي گرمي پد تي ڄمي برف بڻجي ٿو؟" },
    options: ["0 °C", "10 °C", "50 °C", "100 °C"],
    answer: 0,
  },
  // ---------- Medium ----------
  {
    id: "sci-6",
    difficulty: "medium",
    q: { en: "Which gas do we need to breathe in to stay alive?", ur: "زندہ رہنے کے لیے ہمیں سانس میں کون سی گیس چاہیے؟", sd: "جيئرو رهڻ لاءِ اسان کي ساهه ۾ ڪهڙي گئس گهرجي؟" },
    options: [
      { en: "Oxygen", ur: "آکسیجن", sd: "آڪسيجن" },
      { en: "Carbon dioxide", ur: "کاربن ڈائی آکسائیڈ", sd: "ڪاربن ڊاءِ آڪسائيڊ" },
      { en: "Helium", ur: "ہیلیم", sd: "هيليم" },
      { en: "Smoke", ur: "دھواں", sd: "دونهون" },
    ],
    answer: 0,
  },
  {
    id: "sci-7",
    difficulty: "medium",
    q: { en: "Which is the largest planet in our solar system?", ur: "ہمارے نظامِ شمسی کا سب سے بڑا سیارہ کون سا ہے؟", sd: "اسان جي شمسي نظام جو سڀ کان وڏو سيارو ڪهڙو آهي؟" },
    options: [
      { en: "Saturn", ur: "زحل", sd: "زحل" },
      { en: "Earth", ur: "زمین", sd: "ڌرتي" },
      { en: "Jupiter", ur: "مشتری", sd: "مشتري" },
      { en: "Mars", ur: "مریخ", sd: "مريخ" },
    ],
    answer: 2,
  },
  {
    id: "sci-8",
    difficulty: "medium",
    q: { en: "Which organ pumps blood around our body?", ur: "کون سا عضو ہمارے جسم میں خون پمپ کرتا ہے؟", sd: "ڪهڙو عضوو اسان جي جسم ۾ رت پمپ ڪري ٿو؟" },
    options: [
      { en: "Lungs", ur: "پھیپھڑے", sd: "ڦڦڙ" },
      { en: "Brain", ur: "دماغ", sd: "دماغ" },
      { en: "Stomach", ur: "معدہ", sd: "معدو" },
      { en: "Heart", ur: "دل", sd: "دل" },
    ],
    answer: 3,
  },
  {
    id: "sci-9",
    difficulty: "medium",
    q: { en: "Which planet is known as the Red Planet?", ur: "کون سا سیارہ سرخ سیارہ کہلاتا ہے؟", sd: "ڪهڙو سيارو ڳاڙهو سيارو سڏجي ٿو؟" },
    options: [
      { en: "Mars", ur: "مریخ", sd: "مريخ" },
      { en: "Venus", ur: "زہرہ", sd: "زهره" },
      { en: "Mercury", ur: "عطارد", sd: "عطارد" },
      { en: "Neptune", ur: "نیپچون", sd: "نيپچون" },
    ],
    answer: 0,
  },
  {
    id: "sci-10",
    difficulty: "medium",
    q: { en: "Which part of a plant makes food using sunlight?", ur: "پودے کا کون سا حصہ دھوپ سے غذا بناتا ہے؟", sd: "ٻوٽي جو ڪهڙو حصو سج جي روشني سان کاڌو ٺاهي ٿو؟" },
    options: [
      { en: "Root", ur: "جڑ", sd: "پاڙ" },
      { en: "Leaf", ur: "پتا", sd: "پن" },
      { en: "Flower", ur: "پھول", sd: "گل" },
      { en: "Seed", ur: "بیج", sd: "ٻج" },
    ],
    answer: 1,
  },
  // ---------- Hard ----------
  {
    id: "sci-11",
    difficulty: "hard",
    q: { en: "How many bones are there in an adult human body?", ur: "ایک بالغ انسان کے جسم میں کتنی ہڈیاں ہوتی ہیں؟", sd: "هڪ بالغ انسان جي جسم ۾ ڪيتريون هڏيون ٿينديون آهن؟" },
    options: ["106", "206", "306", "406"],
    answer: 1,
  },
  {
    id: "sci-12",
    difficulty: "hard",
    q: {
      en: "What do we call it when water slowly turns into water vapour in the sun?",
      ur: "دھوپ میں پانی کا آہستہ آہستہ بخارات بن جانا کیا کہلاتا ہے؟",
      sd: "سج ۾ پاڻيءَ جو آهستي آهستي ٻاڦ بڻجي وڃڻ ڇا سڏبو آهي؟",
    },
    options: [
      { en: "Freezing", ur: "جمنا", sd: "ڄمڻ" },
      { en: "Evaporation", ur: "عملِ تبخیر", sd: "ٻاڦ ٿيڻ" },
      { en: "Melting", ur: "پگھلنا", sd: "ڳرڻ" },
      { en: "Condensation", ur: "تکثیف", sd: "ٺهڪڻ" },
    ],
    answer: 1,
  },
  {
    id: "sci-13",
    difficulty: "hard",
    q: { en: "At sea level, water boils at…", ur: "سطحِ سمندر پر پانی کس درجۂ حرارت پر ابلتا ہے؟", sd: "سمنڊ جي سطح تي پاڻي ڪهڙي گرمي پد تي ٽهڪي ٿو؟" },
    options: ["50 °C", "75 °C", "90 °C", "100 °C"],
    answer: 3,
  },
  {
    id: "sci-14",
    difficulty: "hard",
    q: { en: "Our skin makes which vitamin when it gets sunlight?", ur: "دھوپ لگنے پر ہماری جلد کون سا وٹامن بناتی ہے؟", sd: "سج جي روشني لڳڻ تي اسان جي چمڙي ڪهڙو وٽامن ٺاهي ٿي؟" },
    options: [
      { en: "Vitamin A", ur: "وٹامن اے", sd: "وٽامن اي" },
      { en: "Vitamin C", ur: "وٹامن سی", sd: "وٽامن سي" },
      { en: "Vitamin D", ur: "وٹامن ڈی", sd: "وٽامن ڊي" },
      { en: "Vitamin K", ur: "وٹامن کے", sd: "وٽامن ڪي" },
    ],
    answer: 2,
  },
  {
    id: "sci-15",
    difficulty: "hard",
    q: { en: "Which force pulls everything down towards the Earth?", ur: "کون سی قوت ہر چیز کو زمین کی طرف کھینچتی ہے؟", sd: "ڪهڙي قوت هر شيءِ کي ڌرتيءَ ڏانهن ڇڪي ٿي؟" },
    options: [
      { en: "Magnetism", ur: "مقناطیسیت", sd: "مقناطيسيت" },
      { en: "Friction", ur: "رگڑ", sd: "رڳڙ" },
      { en: "Gravity", ur: "کششِ ثقل", sd: "ڪشش ثقل" },
      { en: "Wind", ur: "ہوا", sd: "هوا" },
    ],
    answer: 2,
  },
];
