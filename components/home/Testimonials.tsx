"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TESTIMONIALS } from "@/data/testimonials";
import { pick } from "@/data/types";
import { isRtl } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const t = useTranslations("Home.testimonials");
  const locale = useLocale();
  const rtl = isRtl(locale);
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + count) % count, step]),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go]);

  // "Next" slides in from the end side: right in LTR, left in RTL.
  const sign = rtl ? -1 : 1;
  const item = TESTIMONIALS[index];

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x * sign;
    if (swipe < -60) go(1);
    else if (swipe > 60) go(-1);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6" aria-roledescription="carousel" aria-label={t("title")}>
      <Reveal>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
      </Reveal>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="relative min-h-[17rem] overflow-hidden sm:min-h-[15rem]" aria-live={paused ? "polite" : "off"}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction * sign}>
            <motion.figure
              key={item.id}
              custom={direction * sign}
              variants={{
                enter: (d: number) => ({ x: d * 80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -80, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={onDragEnd}
              className="cursor-grab rounded-3xl border border-line bg-surface p-7 shadow-soft active:cursor-grabbing sm:p-9"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}`}
            >
              <Quote className="size-9 text-brand-300 rtl:-scale-x-100" aria-hidden />
              <blockquote className="mt-3 text-lg font-medium text-ink sm:text-xl">
                {pick(item.quote, locale)}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-2xl dark:bg-brand-900/50" aria-hidden>
                  {item.emoji}
                </span>
                <span>
                  <span className="block font-bold text-ink">{pick(item.name, locale)}</span>
                  <span className="block text-sm text-muted">
                    {item.role === "student" ? t("student", { grade: item.grade ?? 0 }) : t(item.role)}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <SliderButton label={t("previous")} onClick={() => go(-1)}>
            <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
          </SliderButton>
          <div className="flex gap-2">
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={tm.id}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={t("goTo", { number: i + 1 })}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-brand-600" : "w-2.5 bg-brand-200 hover:bg-brand-300 dark:bg-brand-800"
                }`}
              />
            ))}
          </div>
          <SliderButton label={t("next")} onClick={() => go(1)}>
            <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
          </SliderButton>
        </div>
      </div>
    </section>
  );
}

function SliderButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 active:scale-90"
    >
      {children}
    </button>
  );
}
