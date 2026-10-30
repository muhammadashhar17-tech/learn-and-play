"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Check, LayoutGrid, RotateCcw, Star, Trophy, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { pick } from "@/data/types";
import { optionText, type RoundQuestion } from "@/lib/quiz";
import { addLeaderboardEntry, settingsStore, type LeaderboardEntry, type QuizRecord } from "@/lib/progress";
import { onlineEnabled, submitOnline } from "@/lib/online";
import { celebrate } from "@/lib/confetti";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { CountUp } from "@/components/ui/CountUp";
import type { AnswerRecord } from "./QuizGame";

export function QuizResults({
  record,
  round,
  answers,
  onPlayAgain,
  onChangeCategory,
}: {
  record: QuizRecord;
  round: RoundQuestion[];
  answers: AnswerRecord[];
  onPlayAgain: () => void;
  onChangeCategory: () => void;
}) {
  const t = useTranslations("Quiz.results");
  const quiz = useTranslations("Quiz");
  const locale = useLocale();
  const accuracy = Math.round((record.correct / record.total) * 100);
  const mistakes = round
    .map((q, i) => ({ q, a: answers[i] }))
    .filter(({ a }) => a && !a.correct);

  useEffect(() => {
    if (record.stars >= 2) celebrate();
  }, [record.id, record.stars]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-8 text-center text-white shadow-lift"
      >
        <Aurora variant="dark" />
        <div className="bg-dots absolute inset-0 -z-10 opacity-30" aria-hidden />
        <div className="relative">
          <div className="flex justify-center gap-3" role="img" aria-label={t("stars", { stars: record.stars })}>
            {[1, 2, 3].map((n) => (
              <motion.span
                key={n}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25 + n * 0.2, type: "spring", stiffness: 260, damping: 12 }}
              >
                <Star
                  className={`size-14 sm:size-16 ${n <= record.stars ? "fill-amber-400 text-amber-400 drop-shadow-lg" : "fill-white/15 text-white/30"}`}
                  aria-hidden
                />
              </motion.span>
            ))}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{t(`title${record.stars}`)}</h2>
          <p className="mt-2 text-lg text-brand-100">{t("scoreLine", { correct: record.correct, total: record.total })}</p>
          <p className="mt-1 text-sm text-brand-200">
            {quiz(`categories.${record.category}.name`)} · {quiz(`difficulty.${record.difficulty}`)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="text-sm text-brand-100">{t("points")}</dt>
              <dd className="font-latin text-3xl font-extrabold">
                <CountUp to={record.points} duration={1.2} />
              </dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="text-sm text-brand-100">{t("accuracy")}</dt>
              <dd className="font-latin text-3xl font-extrabold">
                <CountUp to={accuracy} duration={1.2} suffix="%" />
              </dd>
            </div>
          </dl>
        </div>
      </motion.section>

      <SaveScore record={record} />

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={onPlayAgain}>
          <RotateCcw className="size-5" aria-hidden />
          {t("playAgain")}
        </Button>
        <Button variant="secondary" onClick={onChangeCategory}>
          <LayoutGrid className="size-5" aria-hidden />
          {t("newCategory")}
        </Button>
        <ButtonLink href="/progress" variant="ghost">
          <BarChart3 className="size-5" aria-hidden />
          {t("viewProgress")}
        </ButtonLink>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">{t("review")}</h2>
        {mistakes.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            {t("noMistakes")}
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {mistakes.map(({ q, a }, i) => (
              <motion.li
                key={q.question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="rounded-[1.25rem] border-2 border-white bg-surface p-5 shadow-soft dark:border-white/5"
              >
                <p className="font-bold text-ink">{pick(q.question.q, locale)}</p>
                <p className="mt-3 flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <X className="mt-1 size-5 shrink-0" aria-hidden />
                  <span>
                    <span className="font-semibold">{t("yourAnswer")}: </span>
                    {a.picked === null ? t("noAnswer") : optionText(q.options[a.picked], locale)}
                  </span>
                </p>
                <p className="mt-1 flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <Check className="mt-1 size-5 shrink-0" aria-hidden />
                  <span>
                    <span className="font-semibold">{t("correctAnswer")}: </span>
                    {optionText(q.options[q.answer], locale)}
                  </span>
                </p>
              </motion.li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function SaveScore({ record }: { record: QuizRecord }) {
  const t = useTranslations("Quiz.results");
  const [name, setName] = useState(() => settingsStore.get().playerName);
  const [error, setError] = useState(false);
  const [share, setShare] = useState(onlineEnabled);
  const [saved, setSaved] = useState<null | "local" | "online" | "pending">(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const clean = name.trim().replace(/\s+/g, " ");
    if (clean.length < 2 || clean.length > 20) {
      setError(true);
      return;
    }
    const entry: LeaderboardEntry = {
      id: record.id,
      name: clean,
      points: record.points,
      correct: record.correct,
      total: record.total,
      category: record.category,
      difficulty: record.difficulty,
      date: record.date,
    };
    addLeaderboardEntry(entry);
    settingsStore.set((s) => ({ ...s, playerName: clean }));
    if (!share) return setSaved("local");
    setBusy(true);
    setSaved((await submitOnline(entry)) ? "online" : "pending");
    setBusy(false);
  }

  if (saved) {
    const message = saved === "online" ? t("savedOnline") : saved === "pending" ? t("savedPending") : t("saved");
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 text-center shadow-soft sm:flex-row sm:justify-between sm:text-start">
        <p role="status" className="text-lg font-bold text-ink">{message}</p>
        <ButtonLink href="/leaderboard" variant="secondary">
          <Trophy className="size-5 text-amber-500" aria-hidden />
          {t("openLeaderboard")}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6 rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
        <Trophy className="size-5 text-amber-500" aria-hidden />
        {t("saveTitle")}
      </h2>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="player-name" className="sr-only">
          {t("nameLabel")}
        </label>
        <input
          id="player-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          maxLength={24}
          autoComplete="nickname"
          placeholder={t("namePlaceholder")}
          aria-invalid={error}
          aria-describedby={error ? "player-name-error" : undefined}
          className={`flex-1 rounded-2xl border-2 bg-bg px-4 py-3 text-ink outline-none transition focus:border-brand-500 ${
            error ? "border-rose-400" : "border-line"
          }`}
        />
        <Button type="submit" disabled={busy}>{t("save")}</Button>
      </div>
      {onlineEnabled && (
        <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-brand-600"
          />
          <span>{t("shareOnline")}</span>
        </label>
      )}
      {error && (
        <p id="player-name-error" role="alert" className="mt-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
          {t("nameError")}
        </p>
      )}
    </form>
  );
}
