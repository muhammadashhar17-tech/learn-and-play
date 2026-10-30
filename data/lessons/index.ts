import { ALPHABET } from "./alphabet";
import { ANIMALS, COLORS, DAYS, FAMILY, FRUITS, GREETINGS, NUMBERS } from "./words";
import { BODY, MORE_ANIMALS, MORE_FRUITS, MORE_GREETINGS, SCHOOL, TRANSPORT, VEGETABLES, WEATHER } from "./more";
import type { Lesson, LessonId, Word } from "./types";

export * from "./types";

export const LESSONS: Lesson[] = [
  { id: "alphabet", words: ALPHABET },
  { id: "numbers", words: NUMBERS },
  { id: "colors", words: COLORS },
  { id: "animals", words: [...ANIMALS, ...MORE_ANIMALS] },
  { id: "family", words: FAMILY },
  { id: "greetings", words: [...GREETINGS, ...MORE_GREETINGS] },
  { id: "fruits", words: [...FRUITS, ...MORE_FRUITS] },
  { id: "days", words: DAYS },
  { id: "body", words: BODY },
  { id: "vegetables", words: VEGETABLES },
  { id: "transport", words: TRANSPORT },
  { id: "school", words: SCHOOL },
  { id: "weather", words: WEATHER },
];

export const LESSON_IDS = LESSONS.map((l) => l.id);

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export const ALL_WORDS: (Word & { lesson: LessonId })[] = LESSONS.flatMap((l) =>
  l.words.map((w) => ({ ...w, lesson: l.id })),
);

export const TOTAL_WORDS = ALL_WORDS.length;
