"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { OrderGame } from "@/data/games";
import { pick } from "@/data/types";
import { shuffle } from "@/lib/quiz";
import { playSound } from "@/lib/sound";
import { Button } from "@/components/ui/Button";
import { GameCard, GameProgress, useOptionText, type EngineProps } from "./shared";

/** Tap the steps in the right order; each step done without a mistake scores a point. */
export function OrderEngine({ game, onDone }: EngineProps<OrderGame>) {
  const t = useTranslations("Games");
  const { locale, text, font } = useOptionText();
  const [sets] = useState(() => game.sets());
  const [setIndex, setSetIndex] = useState(0);
  const [pool, setPool] = useState(() => shuffledPool(sets[0].steps.length));
  const [placed, setPlaced] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [slipped, setSlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const set = sets[setIndex];
  const complete = placed === set.steps.length;

  function tap(stepIndex: number) {
    if (complete || stepIndex < placed) return;
    if (stepIndex === placed) {
      playSound("correct");
      setPlaced((p) => p + 1);
      setWrong(null);
      setScore((s) => ({ correct: s.correct + (slipped ? 0 : 1), total: s.total + 1 }));
      setSlipped(false);
      if (placed + 1 === set.steps.length) setTimeout(() => playSound("win"), 250);
    } else {
      playSound("wrong");
      setWrong(stepIndex);
      setSlipped(true);
    }
  }

  function nextSet() {
    if (setIndex >= sets.length - 1) return onDone(score.correct, score.total);
    const n = setIndex + 1;
    setSetIndex(n);
    setPool(shuffledPool(sets[n].steps.length));
    setPlaced(0);
    setWrong(null);
    setSlipped(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress value={setIndex + (complete ? 1 : 0)} total={sets.length} label={t("roundOf", { current: setIndex + 1, total: sets.length })} />
      <GameCard>
        <h2 className="text-center text-xl font-extrabold text-ink sm:text-2xl">{pick(set.prompt, locale)}</h2>

        <ol className="mt-5 grid gap-2">
          {set.steps.map((step, i) => (
            <li
              key={i}
              className={`flex min-h-12 items-center gap-3 rounded-2xl border-2 px-3 py-2 ${
                i < placed ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40" : "border-dashed border-line"
              }`}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-black text-white">{i + 1}</span>
              {i < placed && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`text-lg font-bold text-ink ${font(step.label)}`}>
                  {step.emoji && <span aria-hidden>{step.emoji} </span>}
                  {text(step.label)}
                </motion.span>
              )}
            </li>
          ))}
        </ol>

        {!complete ? (
          <>
            <p className="mt-5 text-center font-semibold text-muted">{t("orderHint")}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {pool
                .filter((i) => i >= placed)
                .map((i) => {
                  const step = set.steps[i];
                  return (
                    <motion.button
                      layout
                      key={`${setIndex}-${i}`}
                      type="button"
                      onClick={() => tap(i)}
                      className={`min-h-12 rounded-2xl border-2 px-4 py-2 text-lg font-bold text-ink transition active:scale-95 ${
                        wrong === i ? "animate-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40" : "border-line bg-surface hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30"
                      }`}
                    >
                      {step.emoji && <span aria-hidden>{step.emoji} </span>}
                      <span className={font(step.label)}>{text(step.label)}</span>
                    </motion.button>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p role="status" className="font-bold text-emerald-700 dark:text-emerald-300">
              {t("orderDone")}
            </p>
            <Button onClick={nextSet} autoFocus>
              {setIndex < sets.length - 1 ? t("next") : t("finish")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
        )}
      </GameCard>
    </div>
  );
}

function shuffledPool(n: number) {
  return shuffle(Array.from({ length: n }, (_, i) => i));
}
