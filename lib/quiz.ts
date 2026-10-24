import { getCategory, type CategoryId, type Difficulty, type Option, type Question } from "@/data/quiz";
import { pick } from "@/data/types";

export const QUESTIONS_PER_ROUND = 10;

// Each level matches primary classes: Easy = Class 1–2, Medium = Class 3–4, Hard = Class 5.
// Young readers get generous time (Urdu/Sindhi also take longer to read).
export const DIFFICULTY_SETTINGS: Record<Difficulty, { seconds: number; multiplier: number }> = {
  easy: { seconds: 40, multiplier: 1 },
  medium: { seconds: 30, multiplier: 1.5 },
  hard: { seconds: 20, multiplier: 2 },
};

/** Questions closest to the chosen level come first when a round needs filling. */
const NEIGHBOURS: Record<Difficulty, Difficulty[]> = {
  easy: ["easy", "medium", "hard"],
  medium: ["medium", "easy", "hard"],
  hard: ["hard", "medium", "easy"],
};

export interface RoundQuestion {
  question: Question;
  /** Options in the order shown on screen. */
  options: Option[];
  /** Index of the correct option in `options`. */
  answer: number;
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Builds a round of 10: every question of the chosen level first (shuffled),
 * then the nearest level to fill the rest. Option order is shuffled too.
 */
export function buildRound(categoryId: CategoryId, difficulty: Difficulty): RoundQuestion[] {
  const pool = getCategory(categoryId).questions;
  const picked: Question[] = [];
  for (const level of NEIGHBOURS[difficulty]) {
    const batch = shuffle(pool.filter((q) => q.difficulty === level));
    picked.push(...batch.slice(0, QUESTIONS_PER_ROUND - picked.length));
    if (picked.length >= QUESTIONS_PER_ROUND) break;
  }
  return shuffle(picked).map((question) => {
    const order = shuffle([0, 1, 2, 3]);
    return {
      question,
      options: order.map((i) => question.options[i]),
      answer: order.indexOf(question.answer),
    };
  });
}

export function optionText(option: Option, locale: string): string {
  return typeof option === "string" ? option : pick(option, locale);
}

/** 10 base points + up to 5 for speed, times the level multiplier. */
export function pointsFor(difficulty: Difficulty, secondsLeft: number): number {
  const { seconds, multiplier } = DIFFICULTY_SETTINGS[difficulty];
  const speedBonus = Math.round((secondsLeft / seconds) * 5);
  return Math.round((10 + speedBonus) * multiplier);
}

export function starsFor(correct: number, total: number): 0 | 1 | 2 | 3 {
  const pct = total ? correct / total : 0;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}
