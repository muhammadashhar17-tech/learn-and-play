import type { Locale } from "@/i18n/routing";
import type { Difficulty, Option } from "../quiz/types";
import type { Trilingual } from "../types";

export type { Option };

export type GameSubject = "math" | "science" | "language" | "gk";

/** Short helper so game data stays readable: t3("Cat", "بلی", "ٻلي"). */
export function t3(en: string, ur: string, sd: string): Trilingual {
  return { en, ur, sd };
}

/** A picture inside a question (drawn by the game screen). */
export type Visual =
  | { type: "count"; emoji: string; n: number }
  | { type: "clock"; h: number; m: number }
  | { type: "pie"; parts: number; filled: number }
  | { type: "big"; text: string }
  /** Play the word aloud; `text` is the word, `lang` the language it is spoken in. */
  | { type: "listen"; text: string; lang: Locale };

export interface QuickQuestion {
  prompt: Option;
  visual?: Visual;
  options: Option[];
  answer: number;
  /** Shown after answering — the "why", so every answer teaches something. */
  explain?: Trilingual;
}

export interface SortItem {
  label: Option;
  emoji: string;
  bin: string;
}

export interface OrderSet {
  prompt: Trilingual;
  steps: { label: Option; emoji?: string }[];
}

export interface SpellWord {
  word: string;
  emoji: string;
  hint: Trilingual;
}

interface GameBase {
  id: string;
  subject: GameSubject;
  /** Easy = Class 1–2, Medium = Class 3–4, Hard = Class 5 (same as the quiz). */
  level: Difficulty;
  title: Trilingual;
  intro: Trilingual;
  /** "Learn first" points shown before the game starts. */
  lesson: Trilingual[];
}

export interface MatchGame extends GameBase {
  kind: "match";
  /** A fresh set of pairs each round (left, right). */
  pairs: (locale: Locale) => [Option, Option][];
}

export interface SortGame extends GameBase {
  kind: "sort";
  bins: { id: string; label: Trilingual; emoji: string }[];
  items: SortItem[];
}

export interface OrderGame extends GameBase {
  kind: "order";
  sets: () => OrderSet[];
}

export interface QuickGame extends GameBase {
  kind: "quick";
  questions: (locale: Locale) => QuickQuestion[];
  /** Race mode: answer as many as you can in this many seconds. */
  seconds?: number;
}

export interface SpellGame extends GameBase {
  kind: "spell";
  words: SpellWord[];
}

export type Game = MatchGame | SortGame | OrderGame | QuickGame | SpellGame;
