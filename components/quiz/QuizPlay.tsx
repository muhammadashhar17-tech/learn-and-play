"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Flag, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getCategory, type CategoryId, type Difficulty } from "@/data/quiz";
import { pick } from "@/data/types";
import { DIFFICULTY_SETTINGS, optionText, type RoundQuestion } from "@/lib/quiz";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { burstFrom } from "@/lib/confetti";
import { MuteToggle } from "@/components/ui/MuteToggle";
import { TimerRing } from "./TimerRing";
import type { AnswerRecord } from "./QuizGame";

export function QuizPlay({
  category,
  difficulty,
  question,
  index,
  total,
  secondsLeft,
  revealed,
  answer,
  score,
  isLast,
  onAnswer,
  onNext,
  onQuit,
}: {
  category: CategoryId;
  difficulty: Difficulty;
  question: RoundQuestion;
  index: number;
  total: number;
  secondsLeft: number;
  revealed: boolean;
  answer?: AnswerRecord;
  score: number;
  isLast: boolean;
  onAnswer: (picked: number) => void;
  onNext: () => void;
  onQuit: () => void;
}) {
  const t = useTranslations("Quiz");
  const common = useTranslations("Common");
  const locale = useLocale();
  const [confirmQuit, setConfirmQuit] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = getCategory(category);

  // Picking the right answer sends a little sparkle burst out of that button.
  const choose = useCallback(
    (i: number) => {
      if (i === question.answer) burstFrom(optionRefs.current[i]);
      onAnswer(i);
    },
    [question, onAnswer],
  );

  // Keyboard: 1–4 picks an answer, Enter goes on.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (confirmQuit || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea")) return;
      const n = Number(e.key);
      if (!revealed && n >= 1 && n <= question.options.length) choose(n - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, question, confirmQuit, choose]);

  // Move focus to "Next" once the answer is shown (good for keyboards & screen readers).
  useEffect(() => {
    if (revealed) nextRef.current?.focus({ preventScroll: true });
  }, [revealed]);

  const feedback = !revealed
    ? null
    : answer?.picked === null
      ? { text: t("play.timeUp"), tone: "amber" as const }
      : answer?.correct
        ? { text: t("play.correct"), tone: "green" as const }
        : { text: t("play.wrong"), tone: "rose" as const };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${cat.gradient} text-xl`} aria-hidden>
            {cat.emoji}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">{t(`categories.${category}.name`)}</p>
            <p className="text-xs text-muted">
              {DIFFICULTY_SETTINGS[difficulty].emoji} {t(`difficulty.${difficulty}`)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={score}
            initial={{ scale: score ? 1.3 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="rounded-xl bg-gradient-to-r from-amber-100 to-amber-200 px-3 py-2 text-sm font-bold text-amber-900 shadow-sm dark:from-amber-900/50 dark:to-amber-800/40 dark:text-amber-100"
            aria-live="polite"
          >
            ⭐ {t("play.points", { points: score })}
          </motion.span>
          <MuteToggle />
          <button
            type="button"
            onClick={() => setConfirmQuit(true)}
            className="flex h-10 items-center gap-1.5 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-muted transition hover:border-rose-300 hover:text-rose-600 active:scale-95"
          >
            <Flag className="size-4" aria-hidden />
            {t("play.quit")}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-sm font-semibold text-muted">
          <span>{t("play.questionOf", { current: index + 1, total })}</span>
        </div>
        <div
          className="mt-2 h-3 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={index + (revealed ? 1 : 0)}
          aria-label={t("play.questionOf", { current: index + 1, total })}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 rtl:bg-gradient-to-l"
            animate={{ width: `${((index + (revealed ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.question.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-8"
        >
          <div className="flex items-start gap-4">
            <TimerRing seconds={secondsLeft} total={DIFFICULTY_SETTINGS[difficulty].seconds} />
            <h2 className="flex-1 pt-2 text-xl font-bold text-ink sm:text-2xl" id="question-text">
              {pick(question.question.q, locale)}
            </h2>
          </div>

          <div role="group" aria-labelledby="question-text" className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const isAnswer = i === question.answer;
              const isPicked = answer?.picked === i;
              let style = "border-line bg-surface hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30";
              if (revealed && isAnswer) style = "ring-pulse border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
              else if (revealed && isPicked) style = "animate-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40";
              else if (revealed) style = "border-line bg-surface opacity-50";
              return (
                <motion.button
                  key={i}
                  ref={(el) => {
                    optionRefs.current[i] = el;
                  }}
                  type="button"
                  disabled={revealed}
                  onClick={() => choose(i)}
                  whileHover={revealed ? undefined : { y: -3 }}
                  whileTap={revealed ? undefined : { scale: 0.96 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, scale: revealed && isAnswer ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.35, delay: revealed ? 0 : 0.12 + i * 0.07 }}
                  aria-label={`${t("play.option", { number: i + 1 })}: ${optionText(opt, locale)}`}
                  className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-start text-lg font-semibold text-ink transition-colors disabled:cursor-default ${style}`}
                >
                  <span
                    className={`font-latin grid size-9 shrink-0 place-items-center rounded-xl text-base font-bold ${
                      revealed && isAnswer
                        ? "bg-emerald-500 text-white"
                        : revealed && isPicked
                          ? "bg-rose-500 text-white"
                          : "bg-surface-2 text-muted"
                    }`}
                    aria-hidden
                  >
                    {revealed && isAnswer ? <Check className="size-5" /> : revealed && isPicked ? <X className="size-5" /> : i + 1}
                  </span>
                  <span className="flex-1">{optionText(opt, locale)}</span>
                  {revealed && isAnswer && isPicked && answer && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: -2 }}
                      className="font-latin rounded-full bg-amber-400 px-2 py-0.5 text-sm font-extrabold text-amber-950"
                    >
                      {t("play.earned", { points: answer.points })}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <p
                    role="status"
                    className={`text-lg font-bold ${
                      feedback.tone === "green"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : feedback.tone === "amber"
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-rose-700 dark:text-rose-300"
                    }`}
                  >
                    {feedback.text}
                  </p>
                  <Button ref={nextRef} onClick={onNext} className="w-full sm:w-auto">
                    {isLast ? t("play.finish") : t("play.next")}
                    <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 hidden text-center text-sm text-muted md:block">{t("play.hint")}</p>

      <ConfirmDialog
        open={confirmQuit}
        message={t("play.quitConfirm")}
        confirmLabel={t("play.quit")}
        cancelLabel={common("cancel")}
        onConfirm={() => {
          setConfirmQuit(false);
          onQuit();
        }}
        onCancel={() => setConfirmQuit(false)}
      />
    </div>
  );
}
