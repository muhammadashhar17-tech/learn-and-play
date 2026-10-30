import { GK_QUESTIONS } from "./gk";
import { SCIENCE_QUESTIONS } from "./science";
import { MATH_QUESTIONS } from "./math";
import { HISTORY_QUESTIONS } from "./history";
import { LANGUAGE_QUESTIONS } from "./language";
import { EXTRA_QUESTIONS } from "./extra";
import type { Category, CategoryId, Difficulty } from "./types";

export * from "./types";

export const CATEGORIES: Category[] = [
  { id: "gk", questions: [...GK_QUESTIONS, ...EXTRA_QUESTIONS.gk] },
  { id: "science", questions: [...SCIENCE_QUESTIONS, ...EXTRA_QUESTIONS.science] },
  { id: "math", questions: [...MATH_QUESTIONS, ...EXTRA_QUESTIONS.math] },
  { id: "history", questions: [...HISTORY_QUESTIONS, ...EXTRA_QUESTIONS.history] },
  { id: "language", questions: [...LANGUAGE_QUESTIONS, ...EXTRA_QUESTIONS.language] },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
