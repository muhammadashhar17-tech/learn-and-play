/**
 * Text clean-up so that "Bhittai's", "BHITTAI" and "bhittai" all match, and
 * Urdu/Sindhi/Arabic keyboard variants of the same letter compare equal.
 */

const ARABIC_DIGITS = /[٠-٩۰-۹]/g;

export function toWesternDigits(text: string): string {
  return text.replace(ARABIC_DIGITS, (d) => String(d.charCodeAt(0) & 0xf));
}

const LETTER_VARIANTS: [RegExp, string][] = [
  [/[يیى]/g, "ی"], // Arabic yeh, Farsi yeh, alef maksura
  [/[كک]/g, "ک"], // Arabic kaf → keheh
  [/[هہۀ]/g, "ہ"], // heh variants (not ھ, which marks aspiration)
  [/[ةۃ]/g, "ہ"],
  [/[أإآٱ]/g, "ا"],
  [/ؤ/g, "و"],
];

const DIACRITICS = /[ً-ٰٟـ‌‍⁦-⁩]/g; // harakat, tatweel, joiners, isolates
const LATIN_MARKS: [RegExp, string][] = [
  [/[ṭ]/g, "t"],
  [/[ḍ]/g, "d"],
  [/[ṛ]/g, "r"],
  [/[ṇ]/g, "n"],
];

export function normalize(text: string): string {
  let s = toWesternDigits(text).toLowerCase().normalize("NFC");
  s = s.replace(DIACRITICS, "");
  for (const [re, to] of LETTER_VARIANTS) s = s.replace(re, to);
  for (const [re, to] of LATIN_MARKS) s = s.replace(re, to);
  // Punctuation (Latin + Arabic) becomes a space; keep math symbols for the calculator.
  s = s.replace(/[“”"'‘’`.,!?؟،۔;:()\[\]{}«»\-–—_/\\|]+/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

const LATIN = /^[a-z0-9 ]+$/;

/**
 * True if `phrase` occurs in `text` as whole word(s). With `prefix`, a Latin
 * phrase may be followed by extra letters ("pakistan" matches "pakistani").
 * Without it, only an English plural "s" is allowed ("cat" matches "cats").
 */
export function hasPhrase(text: string, phrase: string, { prefix = true } = {}): boolean {
  if (!phrase) return false;
  if (LATIN.test(phrase)) {
    const body = phrase.replace(/\s+/g, "\\s+");
    const re = new RegExp(prefix ? `(^|\\s)${body}` : `(^|\\s)${body}s?(\\s|$)`);
    return re.test(text);
  }
  return ` ${text} `.includes(` ${phrase} `);
}

export function hasAny(text: string, phrases: string[]): boolean {
  return phrases.some((p) => hasPhrase(text, normalize(p)));
}
