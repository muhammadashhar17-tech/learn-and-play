"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LogoMark } from "./Logo";

/** The browser event fired when the site can be installed as an app (Chrome, Edge, Android). */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "lp-install-dismissed";

/**
 * A friendly card offering to install Learn & Play, so it gets its own icon on
 * the home screen / desktop and opens like an app. Only shown when the browser
 * says the site is installable, and not again once installed or dismissed.
 */
export function InstallPrompt() {
  const t = useTranslations("Install");
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    function onPrompt(e: Event) {
      e.preventDefault(); // we show our own, nicer prompt
      try {
        if (localStorage.getItem(DISMISS_KEY)) return;
      } catch {
        /* storage blocked: still offer it */
      }
      setEvent(e as BeforeInstallPromptEvent);
    }
    function onInstalled() {
      setEvent(null);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    setEvent(null);
  }

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setEvent(null);
  }

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          role="dialog"
          aria-labelledby="install-title"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-[1.75rem] border-2 border-white bg-surface/95 p-3 pe-2 shadow-lift backdrop-blur-xl sm:bottom-5 dark:border-white/10"
        >
          <LogoMark className="size-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <p id="install-title" className="font-extrabold text-ink">{t("title")}</p>
            <p className="text-sm text-muted">{t("text")}</p>
          </div>
          <button
            type="button"
            onClick={install}
            className="btn-clay btn-shine inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-700 px-4 font-bold text-white transition active:translate-y-0.5"
          >
            <Download className="size-4" aria-hidden />
            {t("button")}
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("dismiss")}
            className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
