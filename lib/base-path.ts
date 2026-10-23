/**
 * Sub-folder the site is served from. Empty on Vercel / a custom domain;
 * "/learn-and-play" on GitHub Pages (https://<user>.github.io/learn-and-play/).
 * Set at build time with the NEXT_PUBLIC_BASE_PATH environment variable.
 *
 * Next.js <Link> adds it automatically — use withBase() only for plain
 * <a href>, metadata files, window.location and the service worker.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}
