"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export interface StatValues {
  questions: number;
  lessons: number;
  languages: number;
  words: number;
}

const ITEMS: { key: keyof StatValues; emoji: string }[] = [
  { key: "questions", emoji: "❓" },
  { key: "lessons", emoji: "📖" },
  { key: "languages", emoji: "🌍" },
  { key: "words", emoji: "🔤" },
];

export function Stats({ values }: { values: StatValues }) {
  const t = useTranslations("Home.stats");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-12 text-white shadow-lift sm:px-12">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />
        <Reveal>
          <h2 className="relative text-center text-2xl font-extrabold sm:text-3xl">{t("title")}</h2>
        </Reveal>
        <dl className="relative mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ITEMS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">
              <span className="text-3xl" aria-hidden>{s.emoji}</span>
              <dd className="font-latin mt-2 text-4xl font-extrabold sm:text-5xl">
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

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  // Western digits everywhere keeps numbers easy to read on projectors.
  return (
    <span ref={ref} aria-label={String(to)}>
      {(reduce && inView ? to : value).toLocaleString("en-US")}
    </span>
  );
}
