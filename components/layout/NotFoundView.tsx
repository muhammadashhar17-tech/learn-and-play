"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { withBase } from "@/lib/base-path";

export function NotFoundView() {
  const t = useTranslations("NotFound");
  const locale = useLocale();
  const href = (path: string) => withBase(`/${locale}${path}/`);

  return (
    <section className="relative mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative"
      >
        <span className="font-latin bg-gradient-to-br from-brand-400 to-brand-700 bg-clip-text text-[7rem] font-extrabold leading-none text-transparent sm:text-[9rem]">
          {t("code")}
        </span>
        <motion.span
          aria-hidden
          className="absolute -end-6 -top-2 text-5xl"
          animate={{ rotate: [0, 14, -8, 0], y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🎈
        </motion.span>
      </motion.div>
      <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-lg text-muted">{t("text")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={href("")}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700 active:scale-95"
        >
          <Home className="size-5" aria-hidden />
          {t("home")}
        </a>
        <a
          href={href("/quiz")}
          className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-5 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-300 active:scale-95"
        >
          <Brain className="size-5" aria-hidden />
          {t("quiz")}
        </a>
        <a
          href={href("/learn")}
          className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-5 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-300 active:scale-95"
        >
          <BookOpen className="size-5" aria-hidden />
          {t("learn")}
        </a>
      </div>
    </section>
  );
}
