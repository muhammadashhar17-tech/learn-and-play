"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GAME_SUBJECTS, GAMES, type GameSubject } from "@/data/games";
import { pick } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { GAME_ICONS, GAME_SUBJECT_ICONS } from "@/lib/icons";
import { progressStore } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { TiltCard } from "@/components/ui/TiltCard";

export function GameList() {
  const t = useTranslations("Games");
  const quiz = useTranslations("Quiz.difficulty.classes");
  const locale = useLocale();
  const progress = useStore(progressStore);
  const hydrated = useHydrated();
  const [subject, setSubject] = useState<GameSubject | "all">("all");

  const shown = GAMES.filter((g) => subject === "all" || g.subject === subject);
  const played = hydrated ? GAMES.filter((g) => progress.games[g.id]).length : 0;
  const stars = hydrated ? GAMES.reduce((n, g) => n + (progress.games[g.id]?.stars ?? 0), 0) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.75rem] border-2 border-white bg-surface p-5 shadow-soft dark:border-white/5">
        <p className="font-semibold text-ink">{t("overview", { played, total: GAMES.length })}</p>
        <p className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-300">
          <Star className="size-5 fill-current" aria-hidden />
          {t("starsTotal", { stars, total: GAMES.length * 3 })}
        </p>
      </div>

      <div role="group" aria-label={t("filter")} className="mb-8 flex flex-wrap gap-2">
        {(["all", ...GAME_SUBJECTS] as const).map((s) => {
          const active = subject === s;
          const Icon = s === "all" ? null : GAME_SUBJECT_ICONS[s].icon;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => setSubject(s)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 font-bold transition ${
                active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink hover:border-brand-400"
              }`}
            >
              {Icon && <Icon className="size-4" aria-hidden />}
              {t(`subjects.${s}`)}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((game, i) => {
          const Icon = GAME_ICONS[game.id];
          const tile = GAME_SUBJECT_ICONS[game.subject].tile;
          const record = hydrated ? progress.games[game.id] : undefined;
          return (
            <motion.li key={game.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
              <TiltCard className="h-full rounded-[1.75rem]">
                <Link
                  href={`/games/${game.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-surface shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift dark:border-white/5"
                >
                  <div className={`clay-tile relative grid h-28 place-items-center overflow-hidden bg-gradient-to-br ${tile}`}>
                    <Icon className="absolute -end-4 -top-4 size-24 text-white/15" aria-hidden />
                    <span className="grid size-14 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" aria-hidden>
                      <Icon className="size-8 text-white drop-shadow" strokeWidth={2.25} />
                    </span>
                    <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink">{quiz(game.level)}</span>
                    {record && (
                      <span className="absolute end-3 top-3 flex gap-0.5 rounded-full bg-white/95 px-2 py-1" aria-label={t("stars", { stars: record.stars })}>
                        {[1, 2, 3].map((n) => (
                          <Star key={n} className={`size-3.5 ${n <= record.stars ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} aria-hidden />
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold text-ink">{pick(game.title, locale)}</h2>
                    <p className="mt-1 flex-1 text-sm text-muted">{pick(game.intro, locale)}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-300">
                      {record ? t("playAgain") : t("play")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
