"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { LESSONS, type LessonId } from "@/data/lessons";
import { Link } from "@/i18n/navigation";
import { progressStore } from "@/lib/progress";
import { useHydrated, useStore } from "@/lib/storage";
import { Skeleton } from "@/components/ui/States";
import { TiltCard } from "@/components/ui/TiltCard";
import { LESSON_ICONS } from "@/lib/icons";

export function LessonList() {
  const t = useTranslations("Learn");
  const progress = useStore(progressStore);
  const hydrated = useHydrated();
  const done = LESSONS.filter((l) => progress.lessons[l.id]).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-5 shadow-soft">
        {hydrated ? (
          <>
            <p className="font-semibold text-ink">{t("overview", { done, total: LESSONS.length })}</p>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={LESSONS.length}
              aria-valuenow={done}
              aria-label={t("overview", { done, total: LESSONS.length })}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                initial={{ width: 0 }}
                animate={{ width: `${(done / LESSONS.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-6 w-56" />
            <Skeleton className="mt-3 h-3 w-full" />
          </>
        )}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {LESSONS.map((lesson, i) => {
          const record = hydrated ? progress.lessons[lesson.id] : undefined;
          return (
            <motion.li
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="rounded-[1.75rem]">
              <Link
                href={`/learn/${lesson.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-surface shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift dark:border-white/5"
              >
                <LessonBanner id={lesson.id}>
                  {record && (
                    <span className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="size-4" aria-hidden />
                      {t("completed")}
                    </span>
                  )}
                </LessonBanner>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-bold text-ink">{t(`lessons.${lesson.id}.title`)}</h2>
                  <p className="mt-1 flex-1 text-sm text-muted">{t(`lessons.${lesson.id}.text`)}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-muted">
                      {record ? t("best", { score: record.bestScore }) : t("cards", { count: lesson.words.length })}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-brand-600 dark:text-brand-300">
                      {record ? t("review") : t("start")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
                    </span>
                  </div>
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

/** Coloured top of a lesson card: the lesson's icon on a glossy gradient. */
function LessonBanner({ id, children }: { id: LessonId; children?: React.ReactNode }) {
  const { icon: Icon, tile } = LESSON_ICONS[id];
  return (
    <div className={`clay-tile relative grid h-32 place-items-center overflow-hidden bg-gradient-to-br ${tile}`}>
      <Icon className="absolute -end-4 -top-4 size-28 text-white/15" aria-hidden />
      <span
        className="grid size-16 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
        aria-hidden
      >
        <Icon className="size-9 text-white drop-shadow" strokeWidth={2.25} />
      </span>
      {children}
    </div>
  );
}
