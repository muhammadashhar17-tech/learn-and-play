// Learn & Play service worker: makes the app installable and usable offline.
// Pages: network first (fresh content), falling back to cache when offline.
// Static assets (/_next/static, fonts, icons, voice clips): cache first (they never change).
// BASE is "/" on Vercel and "/learn-and-play/" on GitHub Pages.
// CACHE gets a new build stamp on every build (scripts/stamp-sw.mjs), so each
// deploy is a new version that the app offers as an update.
const CACHE = "lp-20261030170215";
const BASE = new URL(self.registration.scope).pathname;
const PRECACHE = ["", "en/", "ur/", "sd/", "icon.svg", "icon-192.png", "manifest.webmanifest"].map((p) => BASE + p);

self.addEventListener("install", (event) => {
  // A first install takes over at once; an update waits until the student
  // taps "Update" (the page then sends SKIP_WAITING).
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  const isStatic =
    url.pathname.includes("/_next/static/") ||
    /\.(png|svg|ico|woff2?|webmanifest|mp3)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            // Only whole files: audio can arrive as 206 partial responses, which the cache refuses.
            if (res.status === 200) {
              const copy = res.clone(); // clone now, before the page reads the body
              caches.open(CACHE).then((c) => c.put(request, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match(BASE + "en/"))),
  );
});
