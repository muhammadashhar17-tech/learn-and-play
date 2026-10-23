import type { Locale } from "@/i18n/routing";

/** A piece of content written in all three app languages. */
export type Trilingual = Record<Locale, string>;

export function pick(text: Trilingual, locale: string): string {
  return text[locale as Locale] ?? text.en;
}
