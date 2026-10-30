"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Crown, Globe2, RotateCcw, Smartphone, Trash2, Trophy, WifiOff } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { CATEGORIES, type CategoryId } from "@/data/quiz";
import { clearLeaderboard, leaderboardStore, settingsStore, type LeaderboardEntry } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { CATEGORY_ICONS } from "@/lib/icons";
import { fetchOnline, onlineEnabled } from "@/lib/online";

const MEDAL_TONES = [
  "from-yellow-300 via-amber-400 to-amber-600 text-amber-950",
  "from-slate-100 via-slate-300 to-slate-500 text-slate-800",
  "from-orange-300 via-orange-400 to-amber-700 text-orange-950",
];

/** Gold / silver / bronze clay medal with the place number. */
function RankMedal({ rank, large = false }: { rank: number; large?: boolean }) {
  return (
    <span
      className={`clay-tile font-latin relative grid place-items-center rounded-full bg-gradient-to-br font-black ring-2 ring-white/70 ${MEDAL_TONES[rank]} ${
        large ? "size-14 text-2xl sm:size-16" : "size-8 text-sm"
      }`}
      aria-hidden
    >
      {rank === 0 && large && <Crown className="absolute -top-5 size-6 fill-amber-300 text-amber-500" />}
      {rank + 1}
    </span>
  );
}
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
  const [mode, setMode] = useState<"online" | "device">(onlineEnabled ? "online" : "device");
  const [online, setOnline] = useState<{ key: string; list?: LeaderboardEntry[]; failed?: boolean }>({ key: "" });
  const [retry, setRetry] = useState(0);
  const onlineKey = `${filter}-${retry}`;

  useEffect(() => {
    if (mode !== "online") return;
    let live = true;
    fetchOnline(filter)
      .then((list) => live && setOnline({ key: onlineKey, list }))
      .catch(() => live && setOnline({ key: onlineKey, failed: true }));
    return () => {
      live = false;
    };
  }, [mode, filter, onlineKey]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10 sm:px-6" aria-busy="true">
        <Skeleton className="h-12" />
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const myIds = new Set(entries.map((e) => e.id));
  const isMe = (e: LeaderboardEntry) => myIds.has(e.id) || (mode === "device" && !!playerName && e.name === playerName);
  const loading = mode === "online" && online.key !== onlineKey;
  const list = mode === "online" ? (loading ? [] : (online.list ?? [])) : entries.filter((e) => filter === "all" || e.category === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {onlineEnabled && (
        <div role="radiogroup" aria-label={t("modeLabel")} className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1">
          {(["online", "device"] as const).map((m) => {
            const Icon = m === "online" ? Globe2 : Smartphone;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 font-bold transition ${
                  mode === m ? "bg-surface text-ink shadow-soft" : "text-muted hover:text-ink"
                }`}
              >
                <Icon className="size-4" aria-hidden />
                {m === "online" ? t("modeOnline") : t("modeDevice")}
              </button>
            );
          })}
        </div>
      )}

      {/* Filters */}
      <div role="radiogroup" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        {(["all", ...CATEGORIES.map((c) => c.id)] as const).map((id) => {
          const active = filter === id;
          const CatIcon = id === "all" ? null : CATEGORY_ICONS[id].icon;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition duration-200 active:translate-y-0.5 ${
                active
                  ? "btn-clay border-transparent bg-gradient-to-b from-brand-500 to-brand-700 text-white"
                  : "border-white bg-surface text-ink shadow-soft hover:-translate-y-0.5 dark:border-white/5"
              }`}
            >
              {CatIcon && <CatIcon className="size-4" aria-hidden />}
              {id === "all" ? t("all") : quiz(`categories.${id}.name`)}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="mt-8 space-y-4" aria-busy="true">
          <Skeleton className="h-48" />
          <Skeleton className="h-64" />
        </div>
      ) : mode === "online" && online.failed ? (
        <div className="mt-8">
          <EmptyState
            icon={WifiOff}
            tile="from-slate-400 to-slate-600"
            title={t("offlineTitle")}
            text={t("offlineText")}
            action={
              <Button onClick={() => setRetry((r) => r + 1)}>
                <RotateCcw className="size-5" aria-hidden />
                {common("tryAgain")}
              </Button>
            }
          />
        </div>
      ) : list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Trophy}
            tile="from-amber-300 to-amber-600"
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
                        className="mt-5"
                      >
                        <RankMedal rank={rank} large />
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
                    className={`clay-tile mt-2 w-full overflow-hidden rounded-t-[1.5rem] bg-gradient-to-b ${
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
          <div className="mt-8 overflow-x-auto rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 shadow-soft">
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
                      <td className="font-latin px-4 py-3 font-bold text-ink">{i < 3 ? <RankMedal rank={i} /> : <span className="grid size-8 place-items-center">{i + 1}</span>}</td>
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

      {mode === "online" && !loading && !online.failed && list.length > 0 && (
        <p className="mt-4 text-center text-sm text-muted">{t("onlineNote")}</p>
      )}

      {mode === "device" && entries.length > 0 && (
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
