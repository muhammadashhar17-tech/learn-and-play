"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { LOCALE_STORAGE_KEY } from "@/i18n/routing";
import { withBase } from "@/lib/base-path";

export function Providers({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  // Remember the language so "/" sends the student back to it next time.
  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* storage blocked */
    }
  }, [locale]);

  // Offline support / installable app (production builds only).
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register(withBase("/sw.js"), { scope: withBase("/") }).catch(() => {});
    }
  }, []);

  // "user" = follow the OS "reduce motion" setting for every Framer animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
