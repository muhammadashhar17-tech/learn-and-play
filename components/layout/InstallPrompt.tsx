"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { promptInstall, useInstallEvent } from "@/lib/install";
import { LogoMark } from "./Logo";

const DISMISS_KEY = "lp-install-dismissed";

function wasDismissed() {
  try {
    return !!localStorage.getItem(DISMISS_KEY);
  } catch {
    return false; // storage blocked: still offer it
  }
}

/**
 * A friendly card offering to install Learn & Play, so it gets its own icon on
 * the home screen / desktop and opens like an app. Only shown when the browser
 * says the site is installable, and not again once installed or dismissed.
 * (The footer's "Install app" button stays available after "Not now".)
 */
export function InstallPrompt() {
  const t = useTranslations("Install");
  const event = useInstallEvent();
  const [hidden, setHidden] = useState(false);
  const show = !!event && !hidden && !wasDismissed();

  async function install() {
    await promptInstall();
    setHidden(true);
  }

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setHidden(true);
  }

  return (
    <AnimatePresence>
      {show && (
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
