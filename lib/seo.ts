import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LOCALE_TAGS, routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";

export type PageKey =
  | "home"
  | "quiz"
  | "learn"
  | "chat"
  | "progress"
  | "leaderboard"
  | "about"
  | "contact";

/** Builds per-page, per-language metadata (title, description, hreflang, Open Graph). */
export async function pageMetadata(
  locale: string,
  page: PageKey,
  path = "",
  overrides?: { title?: string; description?: string },
): Promise<Metadata> {
  const t = await getTranslations({ locale: locale as Locale, namespace: "Meta" });
  const appName = t("appName");
  const title = overrides?.title ?? t(`${page}.title`);
  const description = overrides?.description ?? t(`${page}.description`);
  // Absolute URLs (they must include the GitHub Pages sub-folder, which
  // relative metadata URLs would drop).
  const url = `${site.url}/${locale}${path}/`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[LOCALE_TAGS[l].bcp47] = `${site.url}/${l}${path}/`;
  languages["x-default"] = `${site.url}/${routing.defaultLocale}${path}/`;

  return {
    title: page === "home" ? { absolute: `${appName} — ${title}` } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: appName,
      title: `${title} | ${appName}`,
      description,
      url,
      locale: LOCALE_TAGS[locale as Locale]?.og,
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: appName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${appName}`,
      description,
      images: [`${site.url}/og.png`],
    },
  };
}

export const metadataBase = new URL(site.url);
