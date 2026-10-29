"use client";

import { useSyncExternalStore } from "react";
import { withBase } from "./base-path";

/** Bridge added by the Windows app (desktop/preload.js); absent in browsers. */
interface DesktopBridge {
  updateReady: () => Promise<boolean>;
  onUpdateReady: (cb: () => void) => void;
  installUpdate: () => void;
}

declare global {
  interface Window {
    lpDesktop?: DesktopBridge;
  }
}

// Set when a new version is ready to use: a waiting service worker (phone /
// browser app) or a downloaded installer (Windows app). Shared by the UI.
let apply: (() => void) | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function offer(fn: () => void) {
  apply = fn;
  notify();
}

/**
 * Registers the service worker (offline + installable) and watches for new
 * versions. Call once, in production only.
 */
export function startUpdates() {
  const desktop = window.lpDesktop;
  if (desktop) {
    // The Windows app downloads updates itself; we only show the button.
    const ready = () => offer(() => desktop.installUpdate());
    desktop.updateReady().then((yes) => yes && ready());
    desktop.onUpdateReady(ready);
    return;
  }
  if (!("serviceWorker" in navigator)) return;

  let reloading = false;
  navigator.serviceWorker
    .register(withBase("/sw.js"), { scope: withBase("/") })
    .then((reg) => {
      const check = () => {
        const waiting = reg.waiting;
        // No controller = first visit: the new worker just takes over, nothing to offer.
        if (!waiting || !navigator.serviceWorker.controller) return;
        offer(() => {
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (reloading) return;
            reloading = true;
            location.reload();
          });
          waiting.postMessage("SKIP_WAITING");
        });
      };
      check();
      reg.addEventListener("updatefound", () => {
        const w = reg.installing;
        w?.addEventListener("statechange", () => w.state === "installed" && check());
      });
      // Phones keep apps open for days: look again whenever it comes back on screen.
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") reg.update().catch(() => {});
      });
    })
    .catch(() => {});
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** The function that installs the new version, or null when there is none. */
export function useUpdate() {
  return useSyncExternalStore(subscribe, () => apply, () => null);
}
