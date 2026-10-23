import { ALPHABET } from "./alphabet";
import { ANIMALS, COLORS, DAYS, FAMILY, FRUITS, GREETINGS, NUMBERS } from "./words";
import type { Lesson, LessonId, Word } from "./types";

export * from "./types";

export const LESSONS: Lesson[] = [
  { id: "alphabet", emoji: "🔤", gradient: "from-brand-500 to-brand-700", words: ALPHABET },
  { id: "numbers", emoji: "🔢", gradient: "from-violet-500 to-indigo-600", words: NUMBERS },
  { id: "colors", emoji: "🎨", gradient: "from-rose-500 to-orange-500", words: COLORS },
  { id: "animals", emoji: "🦁", gradient: "from-amber-500 to-orange-600", words: ANIMALS },
  { id: "family", emoji: "👨‍👩‍👧‍👦", gradient: "from-pink-500 to-rose-600", words: FAMILY },
  { id: "greetings", emoji: "👋", gradient: "from-sky-500 to-cyan-600", words: GREETINGS },
  { id: "fruits", emoji: "🍉", gradient: "from-emerald-500 to-green-600", words: FRUITS },
  { id: "days", emoji: "📅", gradient: "from-teal-500 to-emerald-600", words: DAYS },
];

export const LESSON_IDS = LESSONS.map((l) => l.id);

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export const ALL_WORDS: (Word & { lesson: LessonId })[] = LESSONS.flatMap((l) =>
  l.words.map((w) => ({ ...w, lesson: l.id })),
);

export const TOTAL_WORDS = ALL_WORDS.length;
