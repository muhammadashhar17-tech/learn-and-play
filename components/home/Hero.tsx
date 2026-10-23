"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { FRUITS } from "@/data/lessons/words";

const MANGO = FRUITS[0];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative overflow-hidden">
      {/* Soft background shapes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-100/70 via-bg to-bg dark:from-brand-950/70" aria-hidden />
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <div className="absolute -top-24 end-[-10%] -z-10 size-[28rem] rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-600/20" aria-hidden />
      <div className="absolute bottom-0 start-[-8%] -z-10 size-72 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-16 lg:grid-cols-2 lg:pb-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm dark:border-brand-800 dark:text-brand-200"
          >
            <Sparkles className="size-4 text-amber-500" aria-hidden />
            {t("badge")}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {t("titleStart")}{" "}
            <span className="bg-gradient-to-r from-brand-600 via-sky-500 to-brand-500 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
            {t("subtitle")}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quiz" className="px-6 py-3.5 text-lg">
              <Brain className="size-5" aria-hidden />
              {t("ctaQuiz")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/learn" variant="secondary" className="px-6 py-3.5 text-lg">
              <BookOpen className="size-5" aria-hidden />
              {t("ctaLearn")}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  const t = useTranslations("Home.hero");
  return (
    <div role="img" aria-label={t("illustration")} className="relative mx-auto h-[29rem] w-full max-w-md sm:h-[27rem]">
      {/* Quiz card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
        className="absolute start-0 top-4 w-[78%] rounded-3xl border border-line bg-surface p-5 shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-200">
            <Brain className="size-3.5" aria-hidden />
            {t("cardQuizLabel")}
          </span>
          <span className="font-latin text-sm font-bold text-muted">3/10</span>
        </div>
        <p className="mt-3 font-bold text-ink">{t("cardQuestion")}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400"
            initial={{ width: "0%" }}
            animate={{ width: "30%" }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
          <CheckCircle2 className="size-5 shrink-0" aria-hidden />
          {t("cardAnswer")}
        </div>
      </motion.div>

      {/* Flashcard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}
        className="absolute bottom-12 end-0 w-[52%] sm:bottom-6 sm:w-[56%]"
      >
        <div className="animate-float rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-center text-white shadow-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-100">{t("cardFlash")}</span>
          <div className="mt-1 text-5xl" aria-hidden>{MANGO.emoji}</div>
          <p className="font-sindhi mt-1 text-2xl font-bold" lang="sd">{MANGO.sd}</p>
          <p className="font-latin text-sm text-brand-100">
            {MANGO.en} · <span className="font-urdu" lang="ur">{MANGO.ur}</span>
          </p>
        </div>
      </motion.div>

      {/* Chat bubble */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 14 }}
        className="absolute bottom-0 start-2 flex max-w-[60%] items-end gap-2 sm:bottom-2"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-amber-400 text-amber-950 shadow-soft">
          <MessageCircle className="size-5" aria-hidden />
        </span>
        <span className="rounded-2xl rounded-es-sm border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-soft">
          {t("cardChat")}
        </span>
      </motion.div>

      {/* Points pop */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 12 }}
        className="absolute end-6 top-0 rounded-full bg-amber-400 px-3 py-1.5 text-sm font-extrabold text-amber-950 shadow-soft"
      >
        ⭐ {t("cardPoints")}
      </motion.span>
    </div>
  );
}
