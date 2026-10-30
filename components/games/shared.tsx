"use client";

import { useLocale } from "next-intl";
import type { Option } from "@/data/games";
import type { Locale } from "@/i18n/routing";
import { optionText } from "@/lib/quiz";
import { SCRIPT_CLASS } from "@/components/learn/Flashcard";

export interface EngineProps<G> {
  game: G;
  /** Called once when the round is over. */
  onDone: (correct: number, total: number) => void;
}

/** Text of an option in the page language, plus the matching font class. */
export function useOptionText() {
  const locale = useLocale() as Locale;
  return {
    locale,
    text: (opt: Option) => optionText(opt, locale),
    /** Plain strings (numbers, English spellings) read left-to-right in Latin type. */
    font: (opt: Option) => (typeof opt === "string" ? "font-latin" : SCRIPT_CLASS[locale]),
  };
}

/** Card that holds one game screen. */
export function GameCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.75rem] border-2 border-white bg-surface p-5 shadow-soft sm:p-6 dark:border-white/5 ${className}`}>{children}</div>
  );
}

/** "3 / 10" progress bar on top of a game. */
export function GameProgress({ value, total, label }: { value: number; total: number; label: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm font-semibold text-muted">
        <span>{label}</span>
        <span dir="ltr">
          {Math.min(value, total)} / {total}
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-[width] duration-500"
          style={{ width: `${(Math.min(value, total) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export const OPTION_BASE =
  "flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-center text-lg font-bold text-ink transition active:scale-[0.98] disabled:cursor-default";
export const OPTION_IDLE = "border-line bg-surface hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30";
export const OPTION_RIGHT = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
export const OPTION_WRONG = "animate-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40";
export const OPTION_DIM = "border-line opacity-50";
