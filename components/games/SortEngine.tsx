"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SortGame } from "@/data/games";
import { pick } from "@/data/types";
import { playSound } from "@/lib/sound";
import { Button } from "@/components/ui/Button";
import { ListenButton } from "@/components/learn/ListenButton";
import { sample } from "@/data/games/util";
import { GameCard, GameProgress, useOptionText, type EngineProps } from "./shared";

const ROUND = 10;

/** One thing at a time: tap the group it belongs to. */
export function SortEngine({ game, onDone }: EngineProps<SortGame>) {
  const t = useTranslations("Games");
  const { locale, text, font } = useOptionText();
  const [items] = useState(() => sample(game.items, ROUND));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);

  const item = items[index];
  const right = game.bins.find((b) => b.id === item.bin)!;

  function next(score = correct) {
    if (index >= items.length - 1) return onDone(score, items.length);
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function choose(binId: string) {
    if (picked) return;
    setPicked(binId);
    const ok = binId === item.bin;
    playSound(ok ? "correct" : "wrong");
    if (ok) {
      setCorrect((c) => c + 1);
      setTimeout(() => next(correct + 1), 700);
    }
  }

  const label = text(item.label);

  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress value={index + (picked ? 1 : 0)} total={items.length} label={t("itemOf", { current: index + 1, total: items.length })} />
      <GameCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: picked === item.bin ? 40 : -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <span className="text-7xl sm:text-8xl" aria-hidden>
              {item.emoji}
            </span>
            <div className="mt-2 flex items-center gap-2">
              <p className={`text-2xl font-extrabold text-ink ${font(item.label)}`}>{label}</p>
              <ListenButton text={label} lang={locale} className="size-9" />
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-center font-semibold text-muted">{t("sortHint")}</p>
        <div className={`mt-3 grid gap-3 ${game.bins.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {game.bins.map((bin) => {
            const isRight = picked !== null && bin.id === item.bin;
            const isWrong = picked === bin.id && bin.id !== item.bin;
            return (
              <button
                key={bin.id}
                type="button"
                disabled={!!picked}
                onClick={() => choose(bin.id)}
                className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-3 text-center font-bold text-ink transition active:scale-[0.98] ${
                  isRight
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                    : isWrong
                      ? "animate-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40"
                      : picked
                        ? "border-line opacity-50"
                        : "border-dashed border-brand-300 bg-brand-50/60 hover:border-brand-500 hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-900/20"
                }`}
              >
                <span className="text-3xl" aria-hidden>
                  {bin.emoji}
                </span>
                <span className="text-sm leading-tight sm:text-base">{pick(bin.label, locale)}</span>
              </button>
            );
          })}
        </div>

        {picked && picked !== item.bin && (
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p role="status" className="font-bold text-rose-700 dark:text-rose-300">
              {t("belongsTo", { item: label, group: pick(right.label, locale) })}
            </p>
            <Button onClick={() => next()} autoFocus className="shrink-0">
              {index < items.length - 1 ? t("next") : t("finish")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
        )}
        {picked === item.bin && (
          <p role="status" className="mt-5 text-center font-bold text-emerald-700 dark:text-emerald-300">
            {t("correct")}
          </p>
        )}
      </GameCard>
    </div>
  );
}
