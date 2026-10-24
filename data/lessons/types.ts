export type LessonId =
  | "alphabet"
  | "numbers"
  | "colors"
  | "animals"
  | "family"
  | "greetings"
  | "fruits"
  | "days";

/**
 * One flashcard. `en`/`ur`/`sd` are the word in each language and
 * `roman` is how to say the Urdu and Sindhi words in Latin letters.
 */
export interface Word {
  id: string;
  en: string;
  ur: string;
  sd: string;
  roman: { ur: string; sd: string };
  emoji?: string;
  /** Colour lesson: the colour itself. */
  swatch?: string;
  /** Numbers lesson: the number in Urdu/Sindhi digits, e.g. ۱۲. */
  digits?: string;
  /** Alphabet lesson: the Sindhi letter, its nearest Urdu letter and its name. */
  letter?: { sd: string; ur: string; name: string; sindhiOnly?: boolean };
}

export interface Lesson {
  id: LessonId;
  words: Word[];
}
