"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Word } from "@/data/lessons";
import { isRtl, type Locale } from "@/i18n/routing";
import { ListenButton } from "./ListenButton";

export const SCRIPT_CLASS: Record<Locale, string> = { en: "font-latin", ur: "font-urdu", sd: "font-sindhi" };

/**
 * 3D flip card. Only the visible face is interactive (the hidden one is `inert`),
 * so the Listen buttons on the back never sit inside the flip button.
 */
export function Flashcard({
  word,
  flipped,
  onFlip,
}: {
  word: Word;
  flipped: boolean;
  onFlip: () => void;
}) {
  const t = useTranslations("Learn");
  const locale = useLocale() as Locale;
  // Turn the other way in right-to-left languages so the motion feels natural.
  const turn = isRtl(locale) ? -180 : 180;

  return (
    <div className="mx-auto w-full max-w-md transition-transform duration-300 [perspective:1400px] hover:-translate-y-1.5">
      <motion.div
        animate={{ rotateY: flipped ? turn : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
        className="relative h-[25rem] w-full transform-3d sm:h-[26rem]"
      >
        {/* Front */}
        <button
          type="button"
          onClick={onFlip}
          inert={flipped}
          aria-label={`${t("flip")}: ${word.letter ? word.letter.name : word[locale]}`}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 shadow-lift backface-hidden"
        >
          <span className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(circle,black,transparent_75%)]" aria-hidden />
          <FrontVisual word={word} locale={locale} />
          <span className="absolute bottom-5 flex items-center gap-1.5 text-sm font-semibold text-muted">
            <RefreshCw className="size-4" aria-hidden />
            {t("flipHint")}
          </span>
        </button>

        {/* Back */}
        <div
          inert={!flipped}
          onClick={onFlip}
          className="absolute inset-0 flex cursor-pointer flex-col justify-center gap-2.5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lift backface-hidden [transform:rotateY(180deg)] sm:p-6"
        >
          {word.letter && (
            <p className="text-center text-sm font-bold uppercase tracking-wider text-brand-100">
              <span aria-hidden>{word.emoji} </span>
              {t("example")}
            </p>
          )}
          <BackRow lang="en" text={word.en} />
          <BackRow lang="ur" text={word.ur} roman={word.roman.ur} />
          <BackRow lang="sd" text={word.sd} roman={word.roman.sd} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFlip();
            }}
            className="mx-auto mt-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-brand-100 transition hover:bg-white/10"
          >
            <RefreshCw className="size-4" aria-hidden />
            {t("flip")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FrontVisual({ word, locale }: { word: Word; locale: Locale }) {
  const t = useTranslations("Learn");

  if (word.letter) {
    return (
      <>
        <span className="font-sindhi relative text-[8rem] font-bold leading-none text-brand-600 dark:text-brand-300" lang="sd">
          {word.letter.sd}
        </span>
        <span className="font-latin relative text-2xl font-bold text-ink">{word.letter.name}</span>
        <span className="relative flex flex-wrap justify-center gap-2 text-sm font-semibold">
          {word.letter.sindhiOnly && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
              ⭐ {t("sindhiOnly")}
            </span>
          )}
          <span className="rounded-full bg-surface-2 px-3 py-1 text-muted">
            {t("nearestUrdu", { letter: word.letter.ur })}
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      {word.swatch ? (
        <span
          className="relative size-36 rounded-full border-4 border-white shadow-lift ring-1 ring-line"
          style={{ backgroundColor: word.swatch }}
          aria-hidden
        />
      ) : word.digits ? (
        <span className="relative flex items-baseline gap-5" aria-hidden>
          <span className="font-latin text-8xl font-extrabold text-brand-600 dark:text-brand-300">{word.id.slice(1)}</span>
          <span className="font-urdu text-6xl text-muted" lang="ur">{word.digits}</span>
        </span>
      ) : (
        <span className="relative text-[7rem] leading-none" aria-hidden>
          {word.emoji}
        </span>
      )}
      <span className={`relative text-center text-3xl font-extrabold text-ink ${SCRIPT_CLASS[locale]}`} lang={locale}>
        {word[locale]}
      </span>
    </>
  );
}

function BackRow({ lang, text, roman }: { lang: Locale; text: string; roman?: string }) {
  const t = useTranslations("Learn");
  const language = useTranslations("Language");
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2">
      <span className={`w-12 shrink-0 text-center text-xs font-bold text-brand-100 ${SCRIPT_CLASS[lang]}`} lang={lang}>
        {language(`short.${lang}`)}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-xl font-bold ${SCRIPT_CLASS[lang]}`} lang={lang} dir={lang === "en" ? "ltr" : "rtl"}>
          {text}
        </p>
        {roman && (
          <p className="font-latin text-sm text-brand-100" dir="ltr">
            <span className="sr-only">{t("sayIt")}: </span>“{roman}”
          </p>
        )}
      </div>
      <ListenButton text={text} lang={lang} className="bg-white/20 hover:bg-white/30" />
    </div>
  );
}
