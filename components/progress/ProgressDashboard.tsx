"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, CheckCircle2, Circle, Library, Lock, Sprout, Star, Target, Trash2, Trophy } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { CATEGORIES } from "@/data/quiz";
import { LESSONS } from "@/data/lessons";
import { Link } from "@/i18n/navigation";
import { BADGES, summarize } from "@/lib/badges";
import { bestByCategory, progressStore, resetProgress } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { Reveal } from "@/components/ui/Reveal";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { BADGE_ICONS, CATEGORY_ICONS, LESSON_ICONS } from "@/lib/icons";
import { AccuracyChart } from "./AccuracyChart";

export function ProgressDashboard() {
  const t = useTranslations("Progress");
  const quiz = useTranslations("Quiz");
  const learn = useTranslations("Learn");
  const common = useTranslations("Common");
  const format = useFormatter();
  const hydrated = useHydrated();
  const progress = useStore(progressStore);
  const [confirm, setConfirm] = useState(false);
  const [announce, setAnnounce] = useState("");

  if (!hydrated) return <DashboardSkeleton />;

  const stats = summarize(progress);
  const best = bestByCategory(progress.quizzes);
  const earned = BADGES.filter((b) => b.earned(progress));
  const empty = progress.quizzes.length === 0 && stats.lessons === 0 && progress.chatMessages === 0;

  if (empty) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <EmptyState
          icon={Sprout}
          tile="from-emerald-400 to-green-600"
          title={t("emptyTitle")}
          text={t("emptyText")}
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/quiz">
                <Brain className="size-5" aria-hidden />
                {t("playQuiz")}
              </ButtonLink>
              <ButtonLink href="/learn" variant="secondary">
                <BookOpen className="size-5" aria-hidden />
                {t("startLesson")}
              </ButtonLink>
            </div>
          }
        />
        <p className="sr-only" role="status">{announce}</p>
      </div>
    );
  }

  const tiles = [
    { label: t("stats.quizzes"), value: stats.quizzes, icon: Brain, tile: "from-brand-400 to-brand-700" },
    { label: t("stats.points"), value: stats.points, icon: Star, tile: "from-yellow-300 to-amber-500" },
    { label: t("stats.best"), value: stats.best, icon: Trophy, tile: "from-amber-300 to-orange-500" },
    { label: t("stats.lessons"), value: `${stats.lessons}/${LESSONS.length}`, icon: Library, tile: "from-emerald-400 to-teal-600" },
    { label: t("stats.accuracy"), value: `${stats.accuracy}%`, icon: Target, tile: "from-pink-400 to-rose-600" },
  ];

  const history = [...progress.quizzes].reverse().slice(0, 20);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6">
      {/* Stat tiles */}
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-[1.75rem] border-2 border-white bg-surface p-5 shadow-soft dark:border-white/5 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <ClayIcon icon={tile.icon} tile={tile.tile} size="sm" />
            <dt className="mt-3 text-sm font-semibold text-muted">{tile.label}</dt>
            <dd className="font-latin text-3xl font-extrabold text-ink">{tile.value}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Chart */}
        <Card title={t("chartTitle")} subtitle={t("chartSubtitle")}>
          <AccuracyChart quizzes={progress.quizzes} />
        </Card>

        {/* Best per category */}
        <Card title={t("categoriesTitle")}>
          <ul className="space-y-4">
            {CATEGORIES.map((c) => {
              const rec = best[c.id];
              const pct = rec ? Math.round((rec.correct / rec.total) * 100) : 0;
              return (
                <li key={c.id}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2.5 font-semibold text-ink">
                      <ClayIcon icon={CATEGORY_ICONS[c.id].icon} tile={CATEGORY_ICONS[c.id].tile} size="xs" />
                      {quiz(`categories.${c.id}.name`)}
                    </span>
                    {rec && (
                      <span className="font-latin flex shrink-0 items-center gap-1.5 text-muted">
                        <Stars count={rec.stars} />
                        {rec.points}
                      </span>
                    )}
                  </div>
                  {rec ? (
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`${pct}%`}>
                      <motion.div
                        className="h-full rounded-full bg-brand-600 dark:bg-brand-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-muted">{t("notPlayed")}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Badges */}
      <Reveal>
        <Card title={t("badgesTitle")} subtitle={t("badgesCount", { earned: earned.length, total: BADGES.length })}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b) => {
              const got = b.earned(progress);
              return (
                <li
                  key={b.id}
                  className={`relative flex flex-col items-center rounded-[1.5rem] border-2 p-4 text-center transition duration-200 ${
                    got
                      ? "border-white bg-gradient-to-b from-amber-50 to-surface shadow-soft hover:-translate-y-1 dark:border-white/5 dark:from-amber-950/30"
                      : "border-dashed border-line bg-surface-2/50"
                  }`}
                >
                  <ClayIcon
                    icon={BADGE_ICONS[b.id].icon}
                    tile={got ? BADGE_ICONS[b.id].tile : "from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700"}
                    className={got ? "" : "opacity-60"}
                  />
                  {!got && (
                    <span className="absolute end-2 top-2 text-muted">
                      <Lock className="size-4" aria-hidden />
                      <span className="sr-only">{t("locked")}</span>
                    </span>
                  )}
                  <p className={`mt-3 text-sm font-bold ${got ? "text-ink" : "text-muted"}`}>{t(`badges.${b.id}.name`)}</p>
                  <p className="mt-0.5 text-xs text-muted">{t(`badges.${b.id}.text`)}</p>
                </li>
              );
            })}
          </ul>
        </Card>
      </Reveal>

      {/* Lessons */}
      <Reveal>
        <Card title={t("lessonsTitle")}>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {LESSONS.map((l) => {
              const done = progress.lessons[l.id];
              return (
                <li key={l.id}>
                  <Link
                    href={`/learn/${l.id}`}
                    className="flex items-center gap-3 rounded-2xl border-2 border-white bg-surface px-4 py-3 shadow-soft transition duration-200 hover:-translate-y-0.5 dark:border-white/5"
                  >
                    <ClayIcon icon={LESSON_ICONS[l.id].icon} tile={LESSON_ICONS[l.id].tile} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{learn(`lessons.${l.id}.title`)}</span>
                      <span className="block text-xs text-muted">{done ? t("lessonDone") : t("lessonTodo")}</span>
                    </span>
                    {done ? (
                      <CheckCircle2 className="size-5 shrink-0 text-emerald-600" aria-hidden />
                    ) : (
                      <Circle className="size-5 shrink-0 text-line" aria-hidden />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </Reveal>

      {/* History */}
      {history.length > 0 && (
        <Reveal>
          <Card title={t("historyTitle")}>
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="border-b border-line text-start text-muted">
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tableDate")}</th>
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tableSubject")}</th>
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tableLevel")}</th>
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tableScore")}</th>
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tablePoints")}</th>
                    <th scope="col" className="px-2 py-2 text-start font-semibold">{t("tableStars")}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((q) => (
                    <tr key={q.id} className="border-b border-line/60 last:border-0">
                      <td className="px-2 py-2.5 text-muted">
                        {format.dateTime(new Date(q.date), { day: "numeric", month: "short", numberingSystem: "latn" })}
                      </td>
                      <td className="px-2 py-2.5 font-semibold text-ink">{quiz(`categories.${q.category}.name`)}</td>
                      <td className="px-2 py-2.5 text-muted">{quiz(`difficulty.${q.difficulty}`)}</td>
                      <td className="font-latin px-2 py-2.5 text-ink">{q.correct}/{q.total}</td>
                      <td className="font-latin px-2 py-2.5 font-bold text-ink">{q.points}</td>
                      <td className="px-2 py-2.5 text-amber-500" aria-label={quiz("results.stars", { stars: q.stars })}>
                        <Stars count={q.stars} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Reveal>
      )}

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={() => setConfirm(true)} className="text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40">
          <Trash2 className="size-5" aria-hidden />
          {t("reset")}
        </Button>
      </div>

      <ConfirmDialog
        open={confirm}
        message={t("resetConfirm")}
        confirmLabel={t("reset")}
        cancelLabel={common("cancel")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          resetProgress();
          setConfirm(false);
          setAnnounce(t("resetDone"));
        }}
      />
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6" aria-busy="true">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
      <Skeleton className="h-56" />
    </div>
  );
}

/** 0–3 small stars (filled = earned). Decorative; the number is announced nearby. */
function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {[1, 2, 3].map((n) => (
        <Star key={n} className={`size-3.5 ${n <= count ? "fill-amber-400 text-amber-400" : "fill-surface-2 text-line"}`} />
      ))}
    </span>
  );
}
