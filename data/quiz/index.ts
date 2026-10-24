import { GK_QUESTIONS } from "./gk";
import { SCIENCE_QUESTIONS } from "./science";
import { MATH_QUESTIONS } from "./math";
import { HISTORY_QUESTIONS } from "./history";
import { LANGUAGE_QUESTIONS } from "./language";
import type { Category, CategoryId, Difficulty } from "./types";

export * from "./types";

export const CATEGORIES: Category[] = [
  { id: "gk", questions: GK_QUESTIONS },
  { id: "science", questions: SCIENCE_QUESTIONS },
  { id: "math", questions: MATH_QUESTIONS },
  { id: "history", questions: HISTORY_QUESTIONS },
  { id: "language", questions: LANGUAGE_QUESTIONS },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
