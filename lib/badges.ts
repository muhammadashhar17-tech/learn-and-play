import { CATEGORY_IDS } from "@/data/quiz";
import { LESSONS } from "@/data/lessons";
import type { ProgressState } from "./progress";

export type BadgeId =
  | "firstQuiz"
  | "quizFan"
  | "quizChampion"
  | "perfect"
  | "superstar"
  | "hardHero"
  | "explorer"
  | "collector"
  | "wordLearner"
  | "bookworm"
  | "languageMaster"
  | "chatterbox";

export interface Badge {
  id: BadgeId;
  earned: (p: ProgressState) => boolean;
}

const totalPoints = (p: ProgressState) => p.quizzes.reduce((n, q) => n + q.points, 0);
const lessonsDone = (p: ProgressState) => Object.keys(p.lessons).length;

/** Badges are worked out from saved progress, so they can never get out of sync. */
export const BADGES: Badge[] = [
  { id: "firstQuiz", earned: (p) => p.quizzes.length >= 1 },
  { id: "quizFan", earned: (p) => p.quizzes.length >= 5 },
  { id: "quizChampion", earned: (p) => p.quizzes.length >= 20 },
  { id: "perfect", earned: (p) => p.quizzes.some((q) => q.correct === q.total) },
  { id: "superstar", earned: (p) => p.quizzes.some((q) => q.stars === 3) },
  { id: "hardHero", earned: (p) => p.quizzes.some((q) => q.difficulty === "hard" && q.stars >= 2) },
  { id: "explorer", earned: (p) => CATEGORY_IDS.every((c) => p.quizzes.some((q) => q.category === c)) },
  { id: "collector", earned: (p) => totalPoints(p) >= 500 },
  { id: "wordLearner", earned: (p) => lessonsDone(p) >= 1 },
  { id: "bookworm", earned: (p) => lessonsDone(p) >= 4 },
  { id: "languageMaster", earned: (p) => lessonsDone(p) >= LESSONS.length },
  { id: "chatterbox", earned: (p) => p.chatMessages >= 5 },
];

export function summarize(p: ProgressState) {
  const quizzes = p.quizzes;
  const accuracy = quizzes.length
    ? Math.round((quizzes.reduce((n, q) => n + q.correct / q.total, 0) / quizzes.length) * 100)
    : 0;
  return {
    quizzes: quizzes.length,
    points: totalPoints(p),
    best: quizzes.reduce((m, q) => Math.max(m, q.points), 0),
    lessons: lessonsDone(p),
    accuracy,
  };
}
