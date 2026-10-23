"use client";

import { useTranslations } from "next-intl";

export function TimerRing({ seconds, total }: { seconds: number; total: number }) {
  const t = useTranslations("Quiz.play");
  const r = 26;
  const c = 2 * Math.PI * r;
  const ratio = Math.max(0, seconds / total);
  const color = ratio > 0.5 ? "text-emerald-500" : ratio > 0.25 ? "text-amber-500" : "text-rose-500";

  return (
    <div
      className={`relative grid size-16 shrink-0 place-items-center ${ratio <= 0.25 && seconds > 0 ? "animate-pulse" : ""}`}
      role="timer"
      aria-label={t("timeLeft", { seconds })}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className="stroke-surface-2" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          className={`${color} transition-[stroke-dashoffset] duration-1000 ease-linear`}
        />
      </svg>
      <span className={`font-latin text-xl font-extrabold ${color}`} aria-hidden>
        {seconds}
      </span>
    </div>
  );
}
