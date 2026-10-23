"use client";

import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { CATEGORIES, DIFFICULTIES, type CategoryId, type Difficulty } from "@/data/quiz";
import { DIFFICULTY_SETTINGS, QUESTIONS_PER_ROUND } from "@/lib/quiz";
import { bestByCategory, progressStore } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Button } from "@/components/ui/Button";

export function QuizSetup({
  category,
  difficulty,
  onSelect,
  onStart,
}: {
  category: CategoryId | null;
  difficulty: Difficulty;
  onSelect: (sel: { category?: CategoryId; difficulty?: Difficulty }) => void;
  onStart: () => void;
}) {
  const t = useTranslations("Quiz");
  const progress = useStore(progressStore);
  const hydrated = useHydrated();
  const best = bestByCategory(progress.quizzes);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-xl font-bold text-ink">{t("setup.chooseCategory")}</h2>
      <div role="radiogroup" aria-label={t("setup.chooseCategory")} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const selected = category === c.id;
          const bestPts = hydrated ? best[c.id]?.points : undefined;
          return (
            <motion.button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect({ category: c.id })}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative overflow-hidden rounded-3xl border-2 bg-surface p-5 text-start shadow-soft transition-colors ${
                selected ? "border-brand-500 ring-4 ring-brand-500/20" : "border-line hover:border-brand-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${c.gradient} text-3xl shadow-md`} aria-hidden>
                  {c.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold text-ink">{t(`categories.${c.id}.name`)}</span>
                  <span className="mt-0.5 block text-sm text-muted">{t(`categories.${c.id}.text`)}</span>
                  <span className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
                      {t("setup.questions", { count: c.questions.length })}
                    </span>
                    {bestPts !== undefined && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                        🏆 {t("setup.best", { points: bestPts })}
                      </span>
                    )}
                  </span>
                </span>
              </div>
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute end-3 top-3 grid size-7 place-items-center rounded-full bg-brand-600 text-white"
                >
                  <Check className="size-4" aria-hidden />
                  <span className="sr-only">{t("setup.selected")}</span>
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <h2 className="mt-10 text-xl font-bold text-ink">{t("setup.chooseLevel")}</h2>
      <div role="radiogroup" aria-label={t("setup.chooseLevel")} className="mt-4 grid gap-3 sm:grid-cols-3">
        {DIFFICULTIES.map((d) => {
          const selected = difficulty === d;
          const s = DIFFICULTY_SETTINGS[d];
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect({ difficulty: d })}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-start transition active:scale-[0.98] ${
                selected
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/40"
                  : "border-line bg-surface hover:border-brand-300"
              }`}
            >
              <span className="text-3xl" aria-hidden>{s.emoji}</span>
              <span>
                <span className="block font-bold text-ink">{t(`difficulty.${d}`)}</span>
                <span className="block text-sm text-muted">
                  {t("difficulty.seconds", { seconds: s.seconds })} · {t("difficulty.multiplier", { value: s.multiplier })}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <Button onClick={onStart} disabled={!category} className="px-10 py-4 text-lg">
          <Play className="size-5 rtl:-scale-x-100" aria-hidden />
          {t("setup.start")}
        </Button>
        <p className="text-sm text-muted">{t("setup.questions", { count: QUESTIONS_PER_ROUND })}</p>
      </div>
    </div>
  );
}
