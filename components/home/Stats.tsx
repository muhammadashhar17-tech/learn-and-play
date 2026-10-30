"use client";

import { BookOpen, CircleHelp, Gamepad2, Type, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { CountUp } from "@/components/ui/CountUp";

export interface StatValues {
  questions: number;
  lessons: number;
  games: number;
  words: number;
}

const ITEMS: { key: keyof StatValues; icon: LucideIcon }[] = [
  { key: "questions", icon: CircleHelp },
  { key: "games", icon: Gamepad2 },
  { key: "lessons", icon: BookOpen },
  { key: "words", icon: Type },
];

export function Stats({ values }: { values: StatValues }) {
  const t = useTranslations("Home.stats");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 px-6 py-12 text-white shadow-lift sm:px-12">
        <Aurora variant="dark" />
        <div className="bg-dots absolute inset-0 -z-10 opacity-40" aria-hidden />
        <Reveal>
          <h2 className="relative text-center text-2xl font-extrabold sm:text-3xl">{t("title")}</h2>
        </Reveal>
        <dl className="relative mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ITEMS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className="rounded-[1.5rem] bg-white/10 p-5 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] ring-1 ring-white/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
              <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25" aria-hidden>
                <s.icon className="size-6" strokeWidth={2.25} />
              </span>
              <dd className="font-latin mt-3 text-4xl font-black sm:text-5xl">
                <CountUp to={values[s.key]} />
              </dd>
              <dt className="mt-1 font-semibold text-brand-100">{t(s.key)}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
