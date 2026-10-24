import type { Trilingual } from "../types";

export type Difficulty = "easy" | "medium" | "hard";
export type CategoryId = "gk" | "science" | "math" | "history" | "language";

/** An answer option: either translated text, or a value that reads the same in every language (numbers, words being taught). */
export type Option = Trilingual | string;

export interface Question {
  id: string;
  difficulty: Difficulty;
  q: Trilingual;
  options: [Option, Option, Option, Option];
  /** Index of the correct option (before shuffling). */
  answer: 0 | 1 | 2 | 3;
}

export interface Category {
  id: CategoryId;
  questions: Question[];
}
