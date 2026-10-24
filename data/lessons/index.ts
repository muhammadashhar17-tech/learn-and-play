import { ALPHABET } from "./alphabet";
import { ANIMALS, COLORS, DAYS, FAMILY, FRUITS, GREETINGS, NUMBERS } from "./words";
import type { Lesson, LessonId, Word } from "./types";

export * from "./types";

export const LESSONS: Lesson[] = [
  { id: "alphabet", words: ALPHABET },
  { id: "numbers", words: NUMBERS },
  { id: "colors", words: COLORS },
  { id: "animals", words: ANIMALS },
  { id: "family", words: FAMILY },
  { id: "greetings", words: GREETINGS },
  { id: "fruits", words: FRUITS },
  { id: "days", words: DAYS },
];

export const LESSON_IDS = LESSONS.map((l) => l.id);

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export const ALL_WORDS: (Word & { lesson: LessonId })[] = LESSONS.flatMap((l) =>
  l.words.map((w) => ({ ...w, lesson: l.id })),
);

export const TOTAL_WORDS = ALL_WORDS.length;
