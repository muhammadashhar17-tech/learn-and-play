import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "sd"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: readonly Locale[] = ["ur", "sd"];

export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

/** BCP-47 tags used for speech synthesis, Intl formatting and Open Graph. */
export const LOCALE_TAGS: Record<Locale, { bcp47: string; og: string }> = {
  en: { bcp47: "en-US", og: "en_US" },
  ur: { bcp47: "ur-PK", og: "ur_PK" },
  sd: { bcp47: "sd-PK", og: "sd_PK" },
};

export const LOCALE_STORAGE_KEY = "lp-locale";
