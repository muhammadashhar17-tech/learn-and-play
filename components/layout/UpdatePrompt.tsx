"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUpdate } from "@/lib/update";

/**
 * "A new version is ready" card, shown in the installed app (phone, browser or
 * Windows) when an update has been published. "Update" switches to it at once;
 * closing the card leaves it for the next time the app is opened.
 */
export function UpdatePrompt() {
  const t = useTranslations("Update");
  const apply = useUpdate();
  const [busy, setBusy] = useState(false);
  const [hidden, setHidden] = useState(false);

  return (
    <AnimatePresence>
      {apply && !hidden && (
        <motion.div
          role="alertdialog"
          aria-labelledby="update-title"
          aria-describedby="update-text"
          initial={{ opacity: 0, y: -40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-3 top-20 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-[1.75rem] border-2 border-white bg-surface/95 p-3 pe-2 shadow-lift backdrop-blur-xl lg:top-24 dark:border-white/10"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white">
            <RefreshCw className="size-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p id="update-title" className="font-extrabold text-ink">{t("title")}</p>
            <p id="update-text" className="text-sm text-muted">{t("text")}</p>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              apply();
            }}
            className="btn-clay btn-shine inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-700 px-4 font-bold text-white transition active:translate-y-0.5 disabled:opacity-70"
          >
            <RefreshCw className={`size-4 ${busy ? "animate-spin" : ""}`} aria-hidden />
            {busy ? t("updating") : t("button")}
          </button>
          <button
            type="button"
            onClick={() => setHidden(true)}
            aria-label={t("later")}
            className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
