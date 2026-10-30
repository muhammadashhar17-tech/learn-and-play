/**
 * Site-wide settings. Edit these before deploying for your school.
 * Text shown to users lives in /messages; this file only holds values
 * that are not translations (URLs, e-mail address).
 */
export const site = {
  /** Public URL of the deployed site, including any sub-folder (no trailing slash). Used for SEO / Open Graph links. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://learn-and-play.vercel.app",
  /** Where the Contact form sends e-mails (opens the visitor's mail app). */
  contactEmail: "sanaqureshi1947@gmail.com",
  /**
   * Online leaderboard (Supabase). Leave both empty to keep scores on each device only.
   * `key` is the project's public "anon" / "publishable" key — never the secret
   * "service_role" key. Set up the table with supabase/schema.sql.
   */
  online: {
    url: "https://ufmgmyyhyksmzombqdwq.supabase.co",
    key: "sb_publishable_nvnbYyIfO1B325cWZP5A_g_R6C9G4Q9",
  },
  /** The Android app (mobile/); uploaded to each GitHub release by desktop/release.mjs. */
  androidDownload:
    "https://github.com/muhammadashhar17-tech/learn-and-play/releases/latest/download/Learn-and-Play.apk",
  /** Always the newest Windows app (see desktop/ and "npm run release" there). */
  windowsDownload:
    "https://github.com/muhammadashhar17-tech/learn-and-play/releases/latest/download/Learn-and-Play-Setup.exe",
} as const;
