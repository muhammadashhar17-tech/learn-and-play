import { GK_QUESTIONS } from "./gk";
import { SCIENCE_QUESTIONS } from "./science";
import { MATH_QUESTIONS } from "./math";
import { HISTORY_QUESTIONS } from "./history";
import { LANGUAGE_QUESTIONS } from "./language";
import type { Category, CategoryId, Difficulty } from "./types";

export * from "./types";

export const CATEGORIES: Category[] = [
  { id: "gk", emoji: "🌍", gradient: "from-sky-500 to-brand-600", questions: GK_QUESTIONS },
  { id: "science", emoji: "🔬", gradient: "from-emerald-500 to-teal-600", questions: SCIENCE_QUESTIONS },
  { id: "math", emoji: "➗", gradient: "from-violet-500 to-indigo-600", questions: MATH_QUESTIONS },
  { id: "history", emoji: "🏛️", gradient: "from-amber-500 to-orange-600", questions: HISTORY_QUESTIONS },
  { id: "language", emoji: "🔤", gradient: "from-rose-500 to-pink-600", questions: LANGUAGE_QUESTIONS },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
