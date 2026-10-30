"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Delete } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SpellGame } from "@/data/games";
import { sample } from "@/data/games/util";
import { pick } from "@/data/types";
import { shuffle } from "@/lib/quiz";
import { playSound } from "@/lib/sound";
import { Button } from "@/components/ui/Button";
import { ListenButton } from "@/components/learn/ListenButton";
import { GameCard, GameProgress, useOptionText, type EngineProps } from "./shared";

const ROUND = 6;

/** Build the English word from shuffled letter tiles. */
export function SpellEngine({ game, onDone }: EngineProps<SpellGame>) {
  const t = useTranslations("Games");
  const { locale } = useOptionText();
  const [words] = useState(() => sample(game.words, ROUND));
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState(() => tilesFor(words[0].word));
  const [typed, setTyped] = useState<number[]>([]);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [correct, setCorrect] = useState(0);

  const w = words[index];
  const guess = typed.map((i) => tiles[i]).join("");

  function add(i: number) {
    if (result || typed.includes(i)) return;
    playSound("click");
    const next = [...typed, i];
    setTyped(next);
    if (next.length === w.word.length) {
      const ok = next.map((k) => tiles[k]).join("") === w.word;
      setResult(ok ? "right" : "wrong");
      playSound(ok ? "correct" : "wrong");
      if (ok) setCorrect((c) => c + 1);
    }
  }

  function removeLast() {
    if (result) return;
    setTyped((t) => t.slice(0, -1));
  }

  function next() {
    if (index >= words.length - 1) return onDone(correct, words.length);
    const n = index + 1;
    setIndex(n);
    setTiles(tilesFor(words[n].word));
    setTyped([]);
    setResult(null);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress value={index + (result ? 1 : 0)} total={words.length} label={t("wordOf", { current: index + 1, total: words.length })} />
      <GameCard>
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
            <span className="text-7xl sm:text-8xl" aria-hidden>
              {w.emoji}
            </span>
            <p className="mt-2 text-lg font-semibold text-muted">{pick(w.hint, locale)}</p>
          </motion.div>
        </AnimatePresence>

        <div dir="ltr" className="mt-5 flex justify-center gap-2" aria-live="polite" aria-label={guess}>
          {[...w.word].map((_, i) => (
            <span
              key={i}
              className={`grid size-12 place-items-center rounded-xl border-2 font-latin text-2xl font-black sm:size-14 ${
                result === "right"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : result === "wrong"
                    ? "animate-shake border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
                    : "border-brand-300 bg-brand-50 text-ink dark:border-brand-700 dark:bg-brand-900/30"
              }`}
            >
              {guess[i] ?? ""}
            </span>
          ))}
        </div>

        {!result ? (
          <div dir="ltr" className="mt-5 flex flex-wrap justify-center gap-2">
            {tiles.map((letter, i) => (
              <button
                key={i}
                type="button"
                onClick={() => add(i)}
                disabled={typed.includes(i)}
                className="btn-clay grid size-12 place-items-center rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 font-latin text-2xl font-black text-amber-950 transition active:translate-y-0.5 disabled:opacity-25 sm:size-14"
              >
                {letter}
              </button>
            ))}
            <button
              type="button"
              onClick={removeLast}
              aria-label={t("undo")}
              className="grid size-12 place-items-center rounded-xl border-2 border-line text-muted transition hover:text-ink sm:size-14"
            >
              <Delete className="size-6" aria-hidden />
            </button>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div role="status" className="flex items-center gap-2">
              <p className={`font-bold ${result === "right" ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                {result === "right" ? t("correct") : t("spelledAs", { word: w.word })}
              </p>
              <ListenButton text={w.word.toLowerCase()} lang="en" className="size-9" />
            </div>
            <Button onClick={next} autoFocus>
              {index < words.length - 1 ? t("next") : t("finish")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
        )}
      </GameCard>
    </div>
  );
}

/** The word's letters, shuffled so they never already spell the word. */
function tilesFor(word: string) {
  const letters = [...word];
  let tiles = shuffle(letters);
  for (let i = 0; i < 5 && tiles.join("") === word; i++) tiles = shuffle(letters);
  return tiles;
}
