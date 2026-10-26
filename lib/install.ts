"use client";

import { useSyncExternalStore } from "react";

/** The browser event fired when the site can be installed as an app (Chrome, Edge, Android). */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// One shared copy of the install event, so the pop-up card and the footer
// button (phone or laptop) can both use it. The event fires only once per page.
let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // we show our own, nicer prompt
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** The pending install event, or null when the browser has not offered one. */
export function useInstallEvent() {
  return useSyncExternalStore(subscribe, () => deferred, () => null);
}

/** Shows the browser's own install dialog. Resolves true if the student said yes. */
export async function promptInstall() {
  const e = deferred;
  if (!e) return false;
  await e.prompt();
  const { outcome } = await e.userChoice;
  deferred = null;
  notify();
  return outcome === "accepted";
}

/** True when already running as the installed app (its own window, no address bar). */
export function isInstalledApp() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
