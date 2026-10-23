"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Trash2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { CATEGORIES, type CategoryId } from "@/data/quiz";
import { clearLeaderboard, leaderboardStore, settingsStore, type LeaderboardEntry } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState, Skeleton } from "@/components/ui/States";

const MEDALS = ["🥇", "🥈", "🥉"];
// Podium order on screen: 2nd, 1st, 3rd (mirrors automatically in RTL).
const PODIUM_ORDER = [1, 0, 2];
const PODIUM_HEIGHT = ["h-36", "h-28", "h-20"];

export function LeaderboardView() {
  const t = useTranslations("Leaderboard");
  const quiz = useTranslations("Quiz");
  const common = useTranslations("Common");
  const format = useFormatter();
  const hydrated = useHydrated();
  const entries = useStore(leaderboardStore);
  const { playerName } = useStore(settingsStore);
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [confirm, setConfirm] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10 sm:px-6" aria-busy="true">
        <Skeleton className="h-12" />
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const list = entries.filter((e) => filter === "all" || e.category === filter);
  const isMe = (e: LeaderboardEntry) => !!playerName && e.name === playerName;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Filters */}
      <div role="radiogroup" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        {(["all", ...CATEGORIES.map((c) => c.id)] as const).map((id) => {
          const active = filter === id;
          const cat = CATEGORIES.find((c) => c.id === id);
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                active
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-surface text-ink hover:border-brand-300"
              }`}
            >
              {cat && <span aria-hidden>{cat.emoji} </span>}
              {id === "all" ? t("all") : quiz(`categories.${id}.name`)}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            emoji="🏆"
            title={t("emptyTitle")}
            text={t("emptyText")}
            action={
              <ButtonLink href="/quiz">
                <Brain className="size-5" aria-hidden />
                {t("play")}
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <>
          {/* Podium */}
          <ol className="mt-10 grid grid-cols-3 items-end gap-3 sm:gap-6" aria-label={t("title")}>
            {PODIUM_ORDER.map((rank) => {
              const e = list[rank];
              return (
                <li key={rank} className={`flex flex-col items-center ${e ? "" : "invisible"}`}>
                  {e && (
                    <>
                      <motion.span
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.15 + rank * 0.15, type: "spring", stiffness: 220, damping: 12 }}
                        className="text-4xl sm:text-5xl"
                        aria-hidden
                      >
                        {MEDALS[rank]}
                      </motion.span>
                      <p className="mt-1 max-w-full truncate text-center font-bold text-ink" dir="auto">{e.name}</p>
                      <p className="font-latin text-sm font-semibold text-muted">{e.points}</p>
                      <span className="sr-only">{t("place", { rank: rank + 1 })}</span>
                    </>
                  )}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.5, delay: rank * 0.1 }}
                    className={`mt-2 w-full overflow-hidden rounded-t-2xl bg-gradient-to-b ${
                      rank === 0 ? "from-amber-300 to-amber-500" : rank === 1 ? "from-slate-200 to-slate-400 dark:from-slate-500 dark:to-slate-700" : "from-orange-300 to-orange-500"
                    }`}
                  >
                    <div className={`font-latin grid ${PODIUM_HEIGHT[rank]} place-items-center text-3xl font-extrabold text-white/90`} aria-hidden>
                      {rank + 1}
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Full table */}
          <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-surface shadow-soft">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("rank")}</th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("name")}</th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("points")}</th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("subject")}</th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("score")}</th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">{t("date")}</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {list.map((e, i) => (
                    <motion.tr
                      key={e.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`border-b border-line/60 last:border-0 ${isMe(e) ? "bg-brand-50 dark:bg-brand-900/30" : ""}`}
                    >
                      <td className="font-latin px-4 py-3 font-bold text-ink">{i < 3 ? MEDALS[i] : i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-ink">
                        <span dir="auto">{e.name}</span>
                        {isMe(e) && (
                          <span className="ms-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">{t("you")}</span>
                        )}
                      </td>
                      <td className="font-latin px-4 py-3 font-bold text-ink">{e.points}</td>
                      <td className="px-4 py-3 text-muted">
                        {quiz(`categories.${e.category}.name`)} · {quiz(`difficulty.${e.difficulty}`)}
                      </td>
                      <td className="font-latin px-4 py-3 text-ink">{e.correct}/{e.total}</td>
                      <td className="px-4 py-3 text-muted">
                        {format.dateTime(new Date(e.date), { day: "numeric", month: "short", numberingSystem: "latn" })}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}

      {entries.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" onClick={() => setConfirm(true)} className="text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40">
            <Trash2 className="size-5" aria-hidden />
            {t("clear")}
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={confirm}
        message={t("clearConfirm")}
        confirmLabel={t("clear")}
        cancelLabel={common("cancel")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          clearLeaderboard();
          setConfirm(false);
        }}
      />
    </div>
  );
}
