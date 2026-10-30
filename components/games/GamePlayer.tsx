"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Lightbulb, LayoutGrid, Play, RotateCcw, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GAMES, getGame, type Game } from "@/data/games";
import { pick } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { saveGame } from "@/lib/progress";
import { playSound } from "@/lib/sound";
import { celebrate } from "@/lib/confetti";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { ListenButton } from "@/components/learn/ListenButton";
import { SCRIPT_CLASS } from "@/components/learn/Flashcard";
import { GameCard } from "./shared";
import { QuickEngine } from "./QuickEngine";
import { MatchEngine } from "./MatchEngine";
import { SortEngine } from "./SortEngine";
import { OrderEngine } from "./OrderEngine";
import { SpellEngine } from "./SpellEngine";

type Phase = "learn" | "play" | "done";

/** Race games are scored by how many you get right; the others by accuracy. */
function starsFor(game: Game, correct: number, total: number): 0 | 1 | 2 | 3 {
  if (game.kind === "quick" && game.seconds) return correct >= 15 ? 3 : correct >= 10 ? 2 : correct >= 5 ? 1 : 0;
  const pct = correct / total;
  return pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
}

export function GamePlayer({ gameId }: { gameId: string }) {
  const game = getGame(gameId)!;
  const t = useTranslations("Games");
  const locale = useLocale() as Locale;
  const [phase, setPhase] = useState<Phase>("learn");
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ correct: 0, total: 0, stars: 0 as 0 | 1 | 2 | 3 });

  const sameSubject = GAMES.filter((g) => g.subject === game.subject);
  const next = sameSubject[(sameSubject.indexOf(game) + 1) % sameSubject.length];

  function finish(correct: number, total: number) {
    const stars = starsFor(game, correct, total);
    saveGame(game.id, Math.round((correct / total) * 100), stars);
    setResult({ correct, total, stars });
    setPhase("done");
    playSound(stars >= 2 ? "win" : "click");
  }

  useEffect(() => {
    if (phase === "done" && result.stars >= 2) celebrate();
  }, [phase, result.stars]);

  function start() {
    playSound("click");
    setAttempt((a) => a + 1);
    setPhase("play");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (phase === "learn") {
    return (
      <div className="mx-auto max-w-2xl">
        <GameCard>
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink">
            <Lightbulb className="size-6 text-amber-500" aria-hidden />
            {t("learnFirst")}
          </h2>
          <ol className="mt-4 grid gap-3">
            {game.lesson.map((point, i) => {
              const text = pick(point, locale);
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-2xl bg-surface-2 p-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-400 font-black text-amber-950">{i + 1}</span>
                  <p className={`flex-1 pt-1 text-lg text-ink ${SCRIPT_CLASS[locale]}`}>{text}</p>
                  <ListenButton text={text} lang={locale} className="size-9" />
                </motion.li>
              );
            })}
          </ol>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-brand-300 p-4 dark:border-brand-700">
            <p className="font-bold text-brand-700 dark:text-brand-200">{t("howToPlay")}</p>
            <p className="mt-1 text-ink">{pick(game.intro, locale)}</p>
          </div>
          <Button onClick={start} className="mt-6 w-full text-lg">
            <Play className="size-5 rtl:-scale-x-100" aria-hidden />
            {t("startGame")}
          </Button>
        </GameCard>
      </div>
    );
  }

  if (phase === "play") {
    switch (game.kind) {
      case "quick":
        return <QuickEngine key={attempt} game={game} onDone={finish} />;
      case "match":
        return <MatchEngine key={attempt} game={game} onDone={finish} />;
      case "sort":
        return <SortEngine key={attempt} game={game} onDone={finish} />;
      case "order":
        return <OrderEngine key={attempt} game={game} onDone={finish} />;
      case "spell":
        return <SpellEngine key={attempt} game={game} onDone={finish} />;
    }
  }

  const titleKey = (["title0", "title1", "title2", "title3"] as const)[result.stars];
  return (
    <div className="mx-auto max-w-2xl">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-8 text-center text-white shadow-lift"
      >
        <Aurora variant="dark" />
        <div className="relative">
          <div className="flex justify-center gap-3" role="img" aria-label={t("stars", { stars: result.stars })}>
            {[1, 2, 3].map((n) => (
              <motion.span key={n} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + n * 0.18, type: "spring", stiffness: 260, damping: 12 }}>
                <Star className={`size-14 ${n <= result.stars ? "fill-amber-400 text-amber-400 drop-shadow-lg" : "fill-white/15 text-white/30"}`} aria-hidden />
              </motion.span>
            ))}
          </div>
          <h2 className="mt-4 text-3xl font-black">{t(titleKey)}</h2>
          <p className="mt-2 text-lg text-brand-100">{t("scoreLine", { correct: result.correct, total: result.total })}</p>
        </div>
      </motion.section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button onClick={start}>
          <RotateCcw className="size-5" aria-hidden />
          {t("playAgain")}
        </Button>
        <ButtonLink href={`/games/${next.id}`} variant="secondary">
          {t("nextGame", { game: pick(next.title, locale) })}
          <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
        </ButtonLink>
        <Button variant="ghost" onClick={() => setPhase("learn")}>
          <BookOpen className="size-5" aria-hidden />
          {t("readLesson")}
        </Button>
        <ButtonLink href="/games" variant="ghost">
          <LayoutGrid className="size-5" aria-hidden />
          {t("allGames")}
        </ButtonLink>
      </div>
    </div>
  );
}
