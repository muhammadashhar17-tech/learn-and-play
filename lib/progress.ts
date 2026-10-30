"use client";

import type { CategoryId, Difficulty } from "@/data/quiz";
import { createLocalStore } from "./storage";

export interface QuizRecord {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  correct: number;
  total: number;
  points: number;
  stars: 0 | 1 | 2 | 3;
  date: number;
}

export interface LessonRecord {
  completedAt: number;
  /** Best mini-quiz score, 0–100. */
  bestScore: number;
}

export interface GameRecord {
  /** Best score, 0–100. */
  best: number;
  stars: 0 | 1 | 2 | 3;
  plays: number;
  lastPlayed: number;
}

export interface ProgressState {
  quizzes: QuizRecord[];
  lessons: Record<string, LessonRecord>;
  games: Record<string, GameRecord>;
  chatMessages: number;
}

const EMPTY: ProgressState = { quizzes: [], lessons: {}, games: {}, chatMessages: 0 };

export const progressStore = createLocalStore<ProgressState>("lp-progress", EMPTY);

export function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function saveQuiz(record: QuizRecord) {
  progressStore.set((p) => ({ ...p, quizzes: [...p.quizzes, record].slice(-200) }));
}

export function completeLesson(lessonId: string, score: number) {
  progressStore.set((p) => {
    const prev = p.lessons[lessonId];
    return {
      ...p,
      lessons: {
        ...p.lessons,
        [lessonId]: {
          completedAt: prev?.completedAt ?? Date.now(),
          bestScore: Math.max(prev?.bestScore ?? 0, score),
        },
      },
    };
  });
}

export function saveGame(gameId: string, score: number, stars: GameRecord["stars"]) {
  progressStore.set((p) => {
    const prev = p.games[gameId];
    return {
      ...p,
      games: {
        ...p.games,
        [gameId]: {
          best: Math.max(prev?.best ?? 0, score),
          stars: Math.max(prev?.stars ?? 0, stars) as GameRecord["stars"],
          plays: (prev?.plays ?? 0) + 1,
          lastPlayed: Date.now(),
        },
      },
    };
  });
}

export function countChatMessage() {
  progressStore.set((p) => ({ ...p, chatMessages: p.chatMessages + 1 }));
}

export function resetProgress() {
  progressStore.reset();
}

/** Best result (by points) per category. */
export function bestByCategory(quizzes: QuizRecord[]) {
  const best: Partial<Record<CategoryId, QuizRecord>> = {};
  for (const q of quizzes) {
    const cur = best[q.category];
    if (!cur || q.points > cur.points) best[q.category] = q;
  }
  return best;
}

// ---------------- Settings ----------------

export interface Settings {
  muted: boolean;
  playerName: string;
}

export const settingsStore = createLocalStore<Settings>("lp-settings", { muted: false, playerName: "" });

// ---------------- Leaderboard ----------------

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  correct: number;
  total: number;
  category: CategoryId;
  difficulty: Difficulty;
  date: number;
}

export const leaderboardStore = createLocalStore<LeaderboardEntry[]>("lp-leaderboard", []);

export const LEADERBOARD_SIZE = 50;

export function addLeaderboardEntry(entry: LeaderboardEntry) {
  leaderboardStore.set((list) =>
    [...list.filter((e) => e.id !== entry.id), entry]
      .sort((a, b) => b.points - a.points || a.date - b.date)
      .slice(0, LEADERBOARD_SIZE),
  );
}

export function clearLeaderboard() {
  leaderboardStore.reset();
}
