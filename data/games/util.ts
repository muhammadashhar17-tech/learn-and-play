import { shuffle } from "@/lib/quiz";
import type { Option, QuickQuestion } from "./types";

export const rand = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

/**
 * Wraps maths in invisible left-to-right marks so it reads correctly inside
 * Urdu/Sindhi text, with no-break spaces so it never splits across two lines.
 */
export const ltr = (s: string | number) => `⁦${String(s).replace(/ /g, " ")}⁩`;

/** Builds a question with the right answer and wrong ones in random order. */
export function choice(
  prompt: QuickQuestion["prompt"],
  right: Option,
  wrong: Option[],
  extra: Omit<QuickQuestion, "prompt" | "options" | "answer"> = {},
): QuickQuestion {
  const options = shuffle([right, ...wrong]);
  return { prompt, options, answer: options.indexOf(right), ...extra };
}

/** `count` different wrong numbers close to `right` (never below `min`). */
export function nearNumbers(right: number, count = 3, spread = 5, min = 0): number[] {
  const set = new Set<number>();
  let guard = 0;
  while (set.size < count && guard++ < 200) {
    const n = right + rand(-spread, spread);
    if (n !== right && n >= min) set.add(n);
  }
  for (let n = right + 1; set.size < count; n++) set.add(n);
  return [...set];
}

/** Picks `n` random items. */
export function sample<T>(items: readonly T[], n: number): T[] {
  return shuffle(items).slice(0, n);
}
