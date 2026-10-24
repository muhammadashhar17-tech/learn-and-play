"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DIFFICULTIES } from "@/data/quiz";
import { Link } from "@/i18n/navigation";
import { DIFFICULTY_ICONS } from "@/lib/icons";
import { DIFFICULTY_SETTINGS } from "@/lib/quiz";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

/** "A level for every class": Class 1–2 = Easy, Class 3–4 = Medium, Class 5 = Hard. */
export function Levels() {
  const t = useTranslations("Home.levels");
  const quiz = useTranslations("Quiz");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-pink-600 dark:text-pink-400">{t("eyebrow")}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-lg text-muted">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {DIFFICULTIES.map((level, i) => {
          const look = DIFFICULTY_ICONS[level];
          return (
            <Reveal key={level} delay={i * 0.1} className="h-full">
              <TiltCard className="rounded-[1.75rem]">
                <Link
                  href="/quiz"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-surface p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-white/5"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${look.tile}`} aria-hidden />
                  <div className="flex items-center justify-between gap-3">
                    <ClayIcon icon={look.icon} tile={look.tile} className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                    <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-extrabold text-brand-700 dark:text-brand-200">
                      {quiz(`difficulty.${level}`)} · {quiz("difficulty.seconds", { seconds: DIFFICULTY_SETTINGS[level].seconds })}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-ink">{t(`${level}.title`)}</h3>
                  <p className="mt-2 flex-1 text-muted">{t(`${level}.text`)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-300">
                    {t("cta")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
