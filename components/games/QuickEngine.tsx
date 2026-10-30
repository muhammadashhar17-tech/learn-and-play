"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Timer, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { QuickGame } from "@/data/games";
import { pick } from "@/data/types";
import { playSound } from "@/lib/sound";
import { Button } from "@/components/ui/Button";
import { ListenButton } from "@/components/learn/ListenButton";
import { GameVisual } from "./Visuals";
import { GameCard, GameProgress, OPTION_BASE, OPTION_DIM, OPTION_IDLE, OPTION_RIGHT, OPTION_WRONG, useOptionText, type EngineProps } from "./shared";

/** Multiple-choice questions, optionally against the clock (race mode). */
export function QuickEngine({ game, onDone }: EngineProps<QuickGame>) {
  const t = useTranslations("Games");
  const { locale, text, font } = useOptionText();
  const [questions] = useState(() => game.questions(locale));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game.seconds ?? 0);
  const race = !!game.seconds;
  const finished = useRef(false);
  const score = useRef({ correct: 0, answered: 0 });

  const q = questions[index];
  const total = questions.length;

  function finish() {
    if (finished.current) return;
    finished.current = true;
    onDone(score.current.correct, Math.max(score.current.answered, 1));
  }

  // Race clock.
  useEffect(() => {
    if (!race) return;
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setTimeout(finish, 0);
          return 0;
        }
        if (s <= 6) playSound("tick");
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [race]);

  function choose(i: number) {
    // `answered` also guards against a second tap before React re-renders.
    if (picked !== null || finished.current || score.current.answered > index) return;
    setPicked(i);
    const ok = i === q.answer;
    playSound(ok ? "correct" : "wrong");
    score.current.answered++;
    if (ok) {
      score.current.correct++;
      setCorrect((c) => c + 1);
    }
    if (race) setTimeout(() => next(), ok ? 350 : 900);
  }

  function next() {
    // Read the live count from `score`, not `index`: race mode calls this from a timer.
    if (score.current.answered >= questions.length || index >= questions.length - 1) return finish();
    setIndex((n) => Math.min(n + 1, questions.length - 1));
    setPicked(null);
  }

  const prompt = text(q.prompt);

  return (
    <div className="mx-auto max-w-2xl">
      {race ? (
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-3 font-bold text-ink">
          <span className="flex items-center gap-2" role="timer" aria-live="off">
            <Timer className={`size-5 ${timeLeft <= 10 ? "text-rose-500" : "text-brand-600"}`} aria-hidden />
            {t("timeLeft", { seconds: timeLeft })}
          </span>
          <span>{t("scoreSoFar", { correct })}</span>
        </div>
      ) : (
        <GameProgress value={index + (picked !== null ? 1 : 0)} total={total} label={t("questionOf", { current: index + 1, total })} />
      )}

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          <GameCard>
            {q.visual && (
              <div className="mb-5">
                <GameVisual visual={q.visual} />
              </div>
            )}
            <div className="flex items-start justify-center gap-3">
              <h2 id="game-q" className={`text-center text-xl font-bold text-ink sm:text-2xl ${font(q.prompt)}`}>
                {prompt}
              </h2>
              {typeof q.prompt !== "string" && <ListenButton text={prompt} lang={locale} className="size-9" />}
            </div>
            <div role="group" aria-labelledby="game-q" className={`mt-5 grid gap-3 ${q.options.length === 2 ? "grid-cols-2" : q.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answer;
                let style = OPTION_IDLE;
                if (picked !== null && isAnswer) style = OPTION_RIGHT;
                else if (picked === i) style = OPTION_WRONG;
                else if (picked !== null) style = OPTION_DIM;
                const big = typeof opt === "string" && [...opt].length <= 3;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => choose(i)}
                    className={`${OPTION_BASE} ${style} ${big ? "text-3xl" : ""}`}
                  >
                    <span dir={typeof opt === "string" ? "ltr" : undefined} className={font(opt)}>
                      {text(opt)}
                    </span>
                    {picked !== null && isAnswer && <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />}
                    {picked === i && !isAnswer && <X className="size-5 shrink-0 text-rose-600" aria-hidden />}
                  </button>
                );
              })}
            </div>

            {picked !== null && !race && (
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <div role="status" className="text-center sm:text-start">
                  <p className={`font-bold ${picked === q.answer ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                    {picked === q.answer ? t("correct") : t("wrong")}
                  </p>
                  {q.explain && <p className="mt-1 text-muted">{pick(q.explain, locale)}</p>}
                </div>
                <Button onClick={next} autoFocus className="shrink-0">
                  {index < questions.length - 1 ? t("next") : t("finish")}
                  <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
                </Button>
              </div>
            )}
          </GameCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
