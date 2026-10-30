import type { MetadataRoute } from "next";
import { GAME_IDS } from "@/data/games";
import { LESSON_IDS } from "@/data/lessons";
import { LOCALE_TAGS, routing } from "@/i18n/routing";
import { site } from "@/data/site";

export const dynamic = "force-static";

const PATHS = [
  "",
  "/quiz",
  "/games",
  ...GAME_IDS.map((id) => `/games/${id}`),
  "/learn", "/chat", "/progress", "/leaderboard", "/about", "/contact",
  ...LESSON_IDS.map((id) => `/learn/${id}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}/`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [LOCALE_TAGS[l].bcp47, `${site.url}/${l}${path}/`])),
      },
    })),
  );
}
