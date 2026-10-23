import type { Question } from "./types";

export const HISTORY_QUESTIONS: Question[] = [
  // ---------- Easy ----------
  {
    id: "his-1",
    difficulty: "easy",
    q: { en: "Who is the founder of Pakistan?", ur: "پاکستان کے بانی کون ہیں؟", sd: "پاڪستان جو باني ڪير آهي؟" },
    options: [
      { en: "Allama Iqbal", ur: "علامہ اقبال", sd: "علامه اقبال" },
      { en: "Quaid-e-Azam Muhammad Ali Jinnah", ur: "قائداعظم محمد علی جناح", sd: "قائداعظم محمد علي جناح" },
      { en: "Liaquat Ali Khan", ur: "لیاقت علی خان", sd: "لياقت علي خان" },
      { en: "Sir Syed Ahmad Khan", ur: "سر سید احمد خان", sd: "سر سيد احمد خان" },
    ],
    answer: 1,
  },
  {
    id: "his-2",
    difficulty: "easy",
    q: { en: "On which date did Pakistan become independent?", ur: "پاکستان کس تاریخ کو آزاد ہوا؟", sd: "پاڪستان ڪهڙي تاريخ تي آزاد ٿيو؟" },
    options: [
      { en: "23 March 1940", ur: "23 مارچ 1940", sd: "23 مارچ 1940" },
      { en: "14 August 1947", ur: "14 اگست 1947", sd: "14 آگسٽ 1947" },
      { en: "25 December 1947", ur: "25 دسمبر 1947", sd: "25 ڊسمبر 1947" },
      { en: "14 August 1950", ur: "14 اگست 1950", sd: "14 آگسٽ 1950" },
    ],
    answer: 1,
  },
  {
    id: "his-3",
    difficulty: "easy",
    q: { en: "What is the capital city of Sindh?", ur: "سندھ کا دارالحکومت کون سا شہر ہے؟", sd: "سنڌ جي گادي جو هنڌ ڪهڙو شهر آهي؟" },
    options: [
      { en: "Hyderabad", ur: "حیدرآباد", sd: "حيدرآباد" },
      { en: "Sukkur", ur: "سکھر", sd: "سکر" },
      { en: "Karachi", ur: "کراچی", sd: "ڪراچي" },
      { en: "Larkana", ur: "لاڑکانہ", sd: "لاڙڪاڻو" },
    ],
    answer: 2,
  },
  {
    id: "his-4",
    difficulty: "easy",
    q: { en: "Who is called the national poet of Pakistan?", ur: "پاکستان کا قومی شاعر کسے کہا جاتا ہے؟", sd: "پاڪستان جو قومي شاعر ڪنهن کي سڏيو وڃي ٿو؟" },
    options: [
      { en: "Allama Muhammad Iqbal", ur: "علامہ محمد اقبال", sd: "علامه محمد اقبال" },
      { en: "Mirza Ghalib", ur: "مرزا غالب", sd: "مرزا غالب" },
      { en: "Faiz Ahmed Faiz", ur: "فیض احمد فیض", sd: "فيض احمد فيض" },
      { en: "Sachal Sarmast", ur: "سچل سرمست", sd: "سچل سرمست" },
    ],
    answer: 0,
  },
  {
    id: "his-5",
    difficulty: "easy",
    q: { en: "What is the capital of Pakistan?", ur: "پاکستان کا دارالحکومت کون سا ہے؟", sd: "پاڪستان جي گادي جو هنڌ ڪهڙو آهي؟" },
    options: [
      { en: "Karachi", ur: "کراچی", sd: "ڪراچي" },
      { en: "Lahore", ur: "لاہور", sd: "لاهور" },
      { en: "Quetta", ur: "کوئٹہ", sd: "ڪوئيٽا" },
      { en: "Islamabad", ur: "اسلام آباد", sd: "اسلام آباد" },
    ],
    answer: 3,
  },
  // ---------- Medium ----------
  {
    id: "his-6",
    difficulty: "medium",
    q: { en: "Mohenjo-daro was a city of which ancient civilization?", ur: "موہن جو دڑو کس قدیم تہذیب کا شہر تھا؟", sd: "موهن جو دڙو ڪهڙي قديم تهذيب جو شهر هو؟" },
    options: [
      { en: "Indus Valley Civilization", ur: "وادیٔ سندھ کی تہذیب", sd: "سنڌو ماٿري جي تهذيب" },
      { en: "Egyptian Civilization", ur: "مصری تہذیب", sd: "مصري تهذيب" },
      { en: "Roman Civilization", ur: "رومی تہذیب", sd: "رومي تهذيب" },
      { en: "Greek Civilization", ur: "یونانی تہذیب", sd: "يوناني تهذيب" },
    ],
    answer: 0,
  },
  {
    id: "his-7",
    difficulty: "medium",
    q: { en: "Which great Sufi poet of Sindh wrote 'Shah Jo Risalo'?", ur: "سندھ کے کس عظیم صوفی شاعر نے 'شاہ جو رسالو' لکھا؟", sd: "سنڌ جي ڪهڙي عظيم صوفي شاعر 'شاهه جو رسالو' لکيو؟" },
    options: [
      { en: "Sachal Sarmast", ur: "سچل سرمست", sd: "سچل سرمست" },
      { en: "Bulleh Shah", ur: "بلھے شاہ", sd: "بلهي شاهه" },
      { en: "Shah Abdul Latif Bhittai", ur: "شاہ عبداللطیف بھٹائی", sd: "شاهه عبداللطيف ڀٽائي" },
      { en: "Sami", ur: "سامی", sd: "سامي" },
    ],
    answer: 2,
  },
  {
    id: "his-8",
    difficulty: "medium",
    q: { en: "In which year was the Pakistan Resolution passed?", ur: "قراردادِ پاکستان کس سال منظور ہوئی؟", sd: "پاڪستان جو ٺهراءُ ڪهڙي سال منظور ٿيو؟" },
    options: ["1930", "1940", "1947", "1956"],
    answer: 1,
  },
  {
    id: "his-9",
    difficulty: "medium",
    q: { en: "Which great river flows through the whole of Sindh?", ur: "کون سا بڑا دریا پورے سندھ سے گزرتا ہے؟", sd: "ڪهڙو وڏو درياهه سڄي سنڌ مان وهي ٿو؟" },
    options: [
      { en: "Ravi", ur: "راوی", sd: "راوي" },
      { en: "Indus", ur: "سندھ", sd: "سنڌو" },
      { en: "Jhelum", ur: "جہلم", sd: "جهلم" },
      { en: "Chenab", ur: "چناب", sd: "چناب" },
    ],
    answer: 1,
  },
  {
    id: "his-10",
    difficulty: "medium",
    q: { en: "In which city was Quaid-e-Azam born?", ur: "قائداعظم کس شہر میں پیدا ہوئے؟", sd: "قائداعظم ڪهڙي شهر ۾ ڄاوا؟" },
    options: [
      { en: "Lahore", ur: "لاہور", sd: "لاهور" },
      { en: "Mumbai", ur: "ممبئی", sd: "ممبئي" },
      { en: "Karachi", ur: "کراچی", sd: "ڪراچي" },
      { en: "Delhi", ur: "دہلی", sd: "دهلي" },
    ],
    answer: 2,
  },
  // ---------- Hard ----------
  {
    id: "his-11",
    difficulty: "hard",
    q: { en: "Who was the first Prime Minister of Pakistan?", ur: "پاکستان کے پہلے وزیرِ اعظم کون تھے؟", sd: "پاڪستان جو پهريون وزيراعظم ڪير هو؟" },
    options: [
      { en: "Khawaja Nazimuddin", ur: "خواجہ ناظم الدین", sd: "خواجه ناظم الدين" },
      { en: "Liaquat Ali Khan", ur: "لیاقت علی خان", sd: "لياقت علي خان" },
      { en: "Muhammad Ali Bogra", ur: "محمد علی بوگرہ", sd: "محمد علي بوگرا" },
      { en: "Huseyn Shaheed Suhrawardy", ur: "حسین شہید سہروردی", sd: "حسين شهيد سهروردي" },
    ],
    answer: 1,
  },
  {
    id: "his-12",
    difficulty: "hard",
    q: { en: "In which town is the shrine of Shah Abdul Latif Bhittai?", ur: "شاہ عبداللطیف بھٹائی کا مزار کس قصبے میں ہے؟", sd: "شاهه عبداللطيف ڀٽائي جي درگاهه ڪهڙي شهر ۾ آهي؟" },
    options: [
      { en: "Sehwan", ur: "سیہون", sd: "سيوهڻ" },
      { en: "Thatta", ur: "ٹھٹھہ", sd: "ٺٽو" },
      { en: "Bhit Shah", ur: "بھٹ شاہ", sd: "ڀٽ شاهه" },
      { en: "Daraza", ur: "درازا", sd: "درازا" },
    ],
    answer: 2,
  },
  {
    id: "his-13",
    difficulty: "hard",
    q: {
      en: "In which year was Sindh separated from the Bombay Presidency to become its own province?",
      ur: "سندھ کس سال بمبئی پریذیڈنسی سے الگ ہو کر الگ صوبہ بنا؟",
      sd: "سنڌ ڪهڙي سال بمبئي پريزيڊنسي کان الڳ ٿي الڳ صوبو بڻي؟",
    },
    options: ["1912", "1936", "1947", "1955"],
    answer: 1,
  },
  {
    id: "his-14",
    difficulty: "hard",
    q: {
      en: "Makli Necropolis, a UNESCO World Heritage Site, is near which city?",
      ur: "مکلی کا قبرستان، جو یونیسکو کا عالمی ورثہ ہے، کس شہر کے قریب ہے؟",
      sd: "مڪلي جو قبرستان، جيڪو يونيسڪو جو عالمي ورثو آهي، ڪهڙي شهر جي ويجهو آهي؟",
    },
    options: [
      { en: "Larkana", ur: "لاڑکانہ", sd: "لاڙڪاڻو" },
      { en: "Thatta", ur: "ٹھٹھہ", sd: "ٺٽو" },
      { en: "Mirpur Khas", ur: "میرپور خاص", sd: "ميرپورخاص" },
      { en: "Jacobabad", ur: "جیکب آباد", sd: "جيڪب آباد" },
    ],
    answer: 1,
  },
  {
    id: "his-15",
    difficulty: "hard",
    q: { en: "The shrine of which Sufi saint is in Sehwan Sharif?", ur: "سیہون شریف میں کس صوفی بزرگ کا مزار ہے؟", sd: "سيوهڻ شريف ۾ ڪهڙي صوفي بزرگ جي درگاهه آهي؟" },
    options: [
      { en: "Data Ganj Bakhsh", ur: "داتا گنج بخش", sd: "داتا گنج بخش" },
      { en: "Lal Shahbaz Qalandar", ur: "لعل شہباز قلندر", sd: "لعل شهباز قلندر" },
      { en: "Bahauddin Zakariya", ur: "بہاؤالدین زکریا", sd: "بهاءُالدين زڪريا" },
      { en: "Abdullah Shah Ghazi", ur: "عبداللہ شاہ غازی", sd: "عبدالله شاهه غازي" },
    ],
    answer: 1,
  },
];
