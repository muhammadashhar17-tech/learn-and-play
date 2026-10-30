"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import type { MatchGame, Option } from "@/data/games";
import { shuffle } from "@/lib/quiz";
import { playSound } from "@/lib/sound";
import { GameCard, GameProgress, useOptionText, type EngineProps } from "./shared";

type Side = "left" | "right";

/** Tap one card on each side to make a pair. */
export function MatchEngine({ game, onDone }: EngineProps<MatchGame>) {
  const t = useTranslations("Games");
  const { locale, text, font } = useOptionText();
  const [round] = useState(() => {
    const pairs = game.pairs(locale);
    return {
      left: shuffle(pairs.map((p, i) => ({ id: i, opt: p[0] }))),
      right: shuffle(pairs.map((p, i) => ({ id: i, opt: p[1] }))),
      total: pairs.length,
    };
  });
  const [selected, setSelected] = useState<{ side: Side; id: number } | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ left: number; right: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  function tap(side: Side, id: number) {
    if (matched.has(id)) return;
    if (!selected || selected.side === side) {
      playSound("click");
      setSelected({ side, id });
      setWrong(null);
      return;
    }
    const leftId = side === "left" ? id : selected.id;
    const rightId = side === "right" ? id : selected.id;
    setSelected(null);
    if (leftId === rightId) {
      playSound("correct");
      const next = new Set(matched).add(id);
      setMatched(next);
      if (next.size === round.total) setTimeout(() => onDone(round.total, round.total + mistakes), 500);
    } else {
      playSound("wrong");
      setMistakes((m) => m + 1);
      setWrong({ left: leftId, right: rightId });
    }
  }

  const column = (side: Side, items: { id: number; opt: Option }[]) => (
    <ul className="grid gap-3">
      {items.map(({ id, opt }) => {
        const isMatched = matched.has(id);
        const isSelected = selected?.side === side && selected.id === id;
        const isWrong = wrong?.[side] === id;
        return (
          <li key={id}>
            <motion.button
              layout
              type="button"
              onClick={() => tap(side, id)}
              disabled={isMatched}
              aria-pressed={isSelected}
              className={`flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2 text-center text-base font-bold leading-snug transition sm:text-lg ${
                isMatched
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800 opacity-70 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : isWrong
                    ? "animate-shake border-rose-500 bg-rose-50 text-ink dark:bg-rose-950/40"
                    : isSelected
                      ? "border-brand-500 bg-brand-100 text-ink ring-4 ring-brand-200 dark:bg-brand-900/50 dark:ring-brand-800"
                      : "border-line bg-surface text-ink hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30"
              }`}
            >
              {isMatched && <Check className="size-4 shrink-0" aria-hidden />}
              <span className={font(opt)}>{text(opt)}</span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <GameProgress value={matched.size} total={round.total} label={t("pairsFound")} />
      <GameCard>
        <p className="mb-4 text-center font-semibold text-muted">{t("matchHint")}</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {column("left", round.left)}
          {column("right", round.right)}
        </div>
      </GameCard>
    </div>
  );
}
