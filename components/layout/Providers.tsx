"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { LOCALE_STORAGE_KEY } from "@/i18n/routing";
import { startUpdates } from "@/lib/update";
import { flushPending } from "@/lib/online";

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

  // Offline support / installable app / "new version" updates (production builds only).
  useEffect(() => {
    if (process.env.NODE_ENV === "production") startUpdates();
  }, []);

  // Send online-leaderboard scores that were saved while offline.
  useEffect(() => {
    void flushPending();
    const onOnline = () => void flushPending();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  // "user" = follow the OS "reduce motion" setting for every Framer animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
