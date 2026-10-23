import type { Question } from "./types";

// \u2066…\u2069 (LTR isolate) keeps expressions like 15 − 8 in the right order inside Urdu/Sindhi text.
export const MATH_QUESTIONS: Question[] = [
  // ---------- Easy ----------
  {
    id: "math-1",
    difficulty: "easy",
    q: { en: "What is 7 + 5?", ur: "\u20667 + 5\u2069 کتنے ہوتے ہیں؟", sd: "\u20667 + 5\u2069 ڪيترا ٿين ٿا؟" },
    options: ["10", "11", "12", "13"],
    answer: 2,
  },
  {
    id: "math-2",
    difficulty: "easy",
    q: { en: "What is 15 − 8?", ur: "\u206615 − 8\u2069 کتنے ہوتے ہیں؟", sd: "\u206615 − 8\u2069 ڪيترا ٿين ٿا؟" },
    options: ["6", "7", "8", "9"],
    answer: 1,
  },
  {
    id: "math-3",
    difficulty: "easy",
    q: { en: "What is 3 × 4?", ur: "\u20663 × 4\u2069 کتنے ہوتے ہیں؟", sd: "\u20663 × 4\u2069 ڪيترا ٿين ٿا؟" },
    options: ["7", "12", "14", "16"],
    answer: 1,
  },
  {
    id: "math-4",
    difficulty: "easy",
    q: { en: "What is 20 ÷ 4?", ur: "\u206620 ÷ 4\u2069 کتنے ہوتے ہیں؟", sd: "\u206620 ÷ 4\u2069 ڪيترا ٿين ٿا؟" },
    options: ["4", "5", "6", "8"],
    answer: 1,
  },
  {
    id: "math-5",
    difficulty: "easy",
    q: { en: "Which number is the biggest?", ur: "سب سے بڑا عدد کون سا ہے؟", sd: "سڀ کان وڏو انگ ڪهڙو آهي؟" },
    options: ["89", "97", "79", "98"],
    answer: 3,
  },
  // ---------- Medium ----------
  {
    id: "math-6",
    difficulty: "medium",
    q: { en: "What is 12 × 8?", ur: "\u206612 × 8\u2069 کتنے ہوتے ہیں؟", sd: "\u206612 × 8\u2069 ڪيترا ٿين ٿا؟" },
    options: ["86", "96", "98", "108"],
    answer: 1,
  },
  {
    id: "math-7",
    difficulty: "medium",
    q: { en: "What is 144 ÷ 12?", ur: "\u2066144 ÷ 12\u2069 کتنے ہوتے ہیں؟", sd: "\u2066144 ÷ 12\u2069 ڪيترا ٿين ٿا؟" },
    options: ["11", "12", "13", "14"],
    answer: 1,
  },
  {
    id: "math-8",
    difficulty: "medium",
    q: { en: "What is half of 150?", ur: "150 کا آدھا کتنا ہے؟", sd: "150 جو اڌ ڪيترو آهي؟" },
    options: ["50", "65", "75", "85"],
    answer: 2,
  },
  {
    id: "math-9",
    difficulty: "medium",
    q: { en: "How many minutes are there in 2 hours?", ur: "2 گھنٹوں میں کتنے منٹ ہوتے ہیں؟", sd: "2 ڪلاڪن ۾ ڪيترا منٽ ٿين ٿا؟" },
    options: ["60", "100", "120", "200"],
    answer: 2,
  },
  {
    id: "math-10",
    difficulty: "medium",
    q: { en: "What is 25% of 200?", ur: "200 کا 25٪ کتنا ہے؟", sd: "200 جو 25٪ ڪيترو آهي؟" },
    options: ["25", "40", "50", "75"],
    answer: 2,
  },
  // ---------- Hard ----------
  {
    id: "math-11",
    difficulty: "hard",
    q: { en: "What is 15 × 15?", ur: "\u206615 × 15\u2069 کتنے ہوتے ہیں؟", sd: "\u206615 × 15\u2069 ڪيترا ٿين ٿا؟" },
    options: ["205", "215", "225", "250"],
    answer: 2,
  },
  {
    id: "math-12",
    difficulty: "hard",
    q: { en: "What is the LCM of 4 and 6?", ur: "4 اور 6 کا ذو اضعافِ اقل (LCM) کیا ہے؟", sd: "4 ۽ 6 جو ننڍي ۾ ننڍو گڏيل ضربي (LCM) ڇا آهي؟" },
    options: ["2", "10", "12", "24"],
    answer: 2,
  },
  {
    id: "math-13",
    difficulty: "hard",
    q: { en: "A square has sides of 9 cm. What is its perimeter?", ur: "ایک مربع کا ہر ضلع 9 سینٹی میٹر ہے۔ اس کا احاطہ کتنا ہے؟", sd: "هڪ چورس جو هر پاسو 9 سينٽي ميٽر آهي. ان جو گهيرو ڪيترو آهي؟" },
    options: ["18 cm", "27 cm", "36 cm", "81 cm"],
    answer: 2,
  },
  {
    id: "math-14",
    difficulty: "hard",
    q: { en: "What comes next? 2, 4, 8, 16, …", ur: "اگلا عدد کیا ہے؟ 2، 4، 8، 16، …", sd: "ايندڙ انگ ڪهڙو آهي؟ 2، 4، 8، 16، …" },
    options: ["18", "24", "30", "32"],
    answer: 3,
  },
  {
    id: "math-15",
    difficulty: "hard",
    q: { en: "What is ½ + ¼?", ur: "⁦½ + ¼⁩ کتنا ہوتا ہے؟", sd: "⁦½ + ¼⁩ ڪيترو ٿئي ٿو؟" },
    options: ["¼", "⅔", "¾", "1"],
    answer: 2,
  },
];
