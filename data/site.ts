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
} as const;
