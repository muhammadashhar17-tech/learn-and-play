"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { CATEGORIES, DIFFICULTIES, type CategoryId, type Difficulty } from "@/data/quiz";
import { DIFFICULTY_SETTINGS, QUESTIONS_PER_ROUND } from "@/lib/quiz";
import { bestByCategory, progressStore } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { CATEGORY_ICONS, DIFFICULTY_ICONS } from "@/lib/icons";

/** Spring-like "back out" easing (UI/UX Pro Max: stagger list preset). */
const BACK_OUT = [0.34, 1.56, 0.64, 1] as const;

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
      <StepTitle number={1} text={t("setup.chooseCategory")} />
      <div role="radiogroup" aria-label={t("setup.chooseCategory")} className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const selected = category === c.id;
          const bestPts = hydrated ? best[c.id]?.points : undefined;
          const look = CATEGORY_ICONS[c.id];
          return (
            <TiltCard key={c.id} className="rounded-[1.75rem]" max={5}>
              <motion.button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect({ category: c.id })}
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: BACK_OUT }}
                whileTap={{ scale: 0.97 }}
                className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] border-2 bg-surface p-5 text-start shadow-soft transition-[border-color,box-shadow] duration-200 ${
                  selected
                    ? "border-brand-500 shadow-lift ring-4 ring-brand-500/15"
                    : "border-white hover:shadow-lift dark:border-white/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <ClayIcon icon={look.icon} tile={look.tile} className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold text-ink">{t(`categories.${c.id}.name`)}</span>
                    <span className="mt-0.5 block text-sm text-muted">{t(`categories.${c.id}.text`)}</span>
                    <span className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
                        {t("setup.questions", { count: c.questions.length })}
                      </span>
                      {bestPts !== undefined && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                          <Trophy className="size-3.5" aria-hidden />
                          {t("setup.best", { points: bestPts })}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="btn-clay absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-brand-600 text-white"
                    >
                      <Check className="size-4" strokeWidth={3} aria-hidden />
                      <span className="sr-only">{t("setup.selected")}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </TiltCard>
          );
        })}
      </div>

      <StepTitle number={2} text={t("setup.chooseLevel")} className="mt-12" />
      <div role="radiogroup" aria-label={t("setup.chooseLevel")} className="mt-5 grid gap-4 sm:grid-cols-3">
        {DIFFICULTIES.map((d) => {
          const selected = difficulty === d;
          const s = DIFFICULTY_SETTINGS[d];
          const look = DIFFICULTY_ICONS[d];
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect({ difficulty: d })}
              className={`flex items-center gap-4 rounded-[1.5rem] border-2 p-4 text-start shadow-soft transition-[border-color,background-color,transform] duration-200 active:translate-y-0.5 ${
                selected
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/40"
                  : "border-white bg-surface hover:-translate-y-0.5 dark:border-white/5"
              }`}
            >
              <ClayIcon icon={look.icon} tile={look.tile} size="sm" />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2">
                  <span className="font-bold text-ink">{t(`difficulty.${d}`)}</span>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-bold text-brand-700 dark:text-brand-200">
                    {t(`difficulty.classes.${d}`)}
                  </span>
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {t("difficulty.seconds", { seconds: s.seconds })} · {t("difficulty.multiplier", { value: s.multiplier })}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-2">
        <Button onClick={onStart} disabled={!category} className="px-10 py-4 text-lg">
          <Play className="size-5 fill-current rtl:-scale-x-100" aria-hidden />
          {t("setup.start")}
        </Button>
        <p className="text-sm text-muted">{t("setup.questions", { count: QUESTIONS_PER_ROUND })}</p>
      </div>
    </div>
  );
}

function StepTitle({ number, text, className = "" }: { number: number; text: string; className?: string }) {
  return (
    <h2 className={`flex items-center gap-3 text-xl font-extrabold text-ink ${className}`}>
      <span className="font-latin btn-clay grid size-9 place-items-center rounded-xl bg-gradient-to-b from-brand-500 to-brand-700 text-base text-white" aria-hidden>
        {number}
      </span>
      {text}
    </h2>
  );
}
