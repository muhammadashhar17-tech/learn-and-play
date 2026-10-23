"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { QuizRecord } from "@/lib/progress";

const TICKS = [100, 50, 0];

/**
 * Single-series bar chart (accuracy per quiz). One hue, bars anchored to the
 * baseline with rounded data ends, a recessive grid, a tooltip on hover/focus
 * and a screen-reader table with the same numbers.
 */
export function AccuracyChart({ quizzes }: { quizzes: QuizRecord[] }) {
  const t = useTranslations("Progress");
  const quiz = useTranslations("Quiz");
  const recent = quizzes.slice(-10);
  const offset = quizzes.length - recent.length;

  if (recent.length === 0) {
    return <p className="py-10 text-center text-muted">{t("chartEmpty")}</p>;
  }

  return (
    <figure>
      <div className="flex gap-3" aria-hidden>
        {/* Y axis */}
        <div className="font-latin flex h-56 flex-col justify-between pb-0 text-end text-xs text-muted">
          {TICKS.map((v) => (
            <span key={v} className="-translate-y-1/2 first:translate-y-0 last:translate-y-1/2">
              {v}%
            </span>
          ))}
        </div>

        <div className="relative flex-1">
          {/* Recessive grid */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56">
            {TICKS.map((v) => (
              <div
                key={v}
                className={`absolute inset-x-0 border-t ${v === 0 ? "border-muted/40" : "border-dashed border-line"}`}
                style={{ top: `${100 - v}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="relative flex h-56 items-end gap-[2px]">
            {recent.map((q, i) => {
              const accuracy = Math.round((q.correct / q.total) * 100);
              const label = t("chartBar", {
                number: offset + i + 1,
                category: quiz(`categories.${q.category}.name`),
                accuracy,
              });
              return (
                <div key={q.id} className="group relative flex h-full flex-1 items-end justify-center">
                  <motion.div
                    tabIndex={0}
                    aria-label={label}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(accuracy, 2)}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    className="w-full max-w-10 rounded-t-[4px] bg-brand-600 outline-none transition-colors group-hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-300 dark:bg-brand-400 dark:group-hover:bg-brand-300"
                  />
                  {/* Tooltip (hover target is the full column) */}
                  <div className="pointer-events-none absolute bottom-full z-10 mb-1 hidden w-max max-w-44 rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink shadow-lift group-focus-within:block group-hover:block">
                    <p className="font-bold">{quiz(`categories.${q.category}.name`)}</p>
                    <p className="text-muted">
                      {quiz(`difficulty.${q.difficulty}`)} · <span className="font-latin">{q.correct}/{q.total} · {accuracy}%</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X axis labels */}
          <div className="font-latin mt-2 flex gap-[2px] text-xs text-muted">
            {recent.map((q, i) => (
              <span key={q.id} className="flex-1 text-center">
                {offset + i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Same data as a table for screen readers */}
      <table className="sr-only">
        <caption>{t("chartSubtitle")}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("tableSubject")}</th>
            <th scope="col">{t("tableScore")}</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((q, i) => (
            <tr key={q.id}>
              <td>{offset + i + 1}</td>
              <td>{quiz(`categories.${q.category}.name`)}</td>
              <td>
                {q.correct}/{q.total} ({Math.round((q.correct / q.total) * 100)}%)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
