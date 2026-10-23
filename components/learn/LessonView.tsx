"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ClipboardCheck, Shuffle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLesson, LESSONS, type LessonId, type Word } from "@/data/lessons";
import { isRtl } from "@/i18n/routing";
import { shuffle } from "@/lib/quiz";
import { playSound } from "@/lib/sound";
import { useVoice } from "@/lib/speech";
import { useHydrated } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Flashcard } from "./Flashcard";
import { LessonPractice } from "./LessonPractice";

export function LessonView({ lessonId }: { lessonId: LessonId }) {
  const lesson = getLesson(lessonId)!;
  const t = useTranslations("Learn");
  const locale = useLocale();
  const rtl = isRtl(locale);
  const hydrated = useHydrated();
  const urduVoice = useVoice("ur");

  const [mode, setMode] = useState<"cards" | "practice">("cards");
  const [cards, setCards] = useState<Word[]>(lesson.words);
  const [[index, direction], setPosition] = useState<[number, number]>([0, 1]);
  const [flipped, setFlipped] = useState(false);
  const [seenAll, setSeenAll] = useState(false);

  const lessonIndex = LESSONS.findIndex((l) => l.id === lessonId);
  const nextLesson = LESSONS[lessonIndex + 1];

  const go = useCallback(
    (step: number) => {
      const next = Math.min(Math.max(index + step, 0), cards.length - 1);
      if (next === index) return;
      setFlipped(false);
      setPosition([next, step]);
      if (next === cards.length - 1) setSeenAll(true);
    },
    [index, cards.length],
  );

  const flip = useCallback(() => {
    playSound("flip");
    setFlipped((f) => !f);
  }, []);

  // ← / → move between cards (mirrored for right-to-left languages).
  useEffect(() => {
    if (mode !== "cards") return;
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) go(1);
      else if (e.key === back) go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, rtl, mode]);

  const sign = rtl ? -1 : 1;
  const card = cards[index];

  if (mode === "practice") {
    return (
      <div className="px-4 py-8 sm:px-6">
        <LessonPractice lesson={lesson} nextLessonId={nextLesson?.id} onBack={() => setMode("cards")} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold text-muted" aria-live="polite">
          {t("card", { current: index + 1, total: cards.length })}
        </p>
        <button
          type="button"
          onClick={() => {
            setCards(shuffle(lesson.words));
            setPosition([0, 1]);
            setFlipped(false);
          }}
          className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition hover:border-brand-300 active:scale-95"
        >
          <Shuffle className="size-4" aria-hidden />
          {t("shuffle")}
        </button>
      </div>

      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction * sign}>
          <motion.div
            key={`${card.id}-${index}`}
            custom={direction * sign}
            variants={{
              enter: (d: number) => ({ x: d * 120, opacity: 0, scale: 0.95 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -120, opacity: 0, scale: 0.95 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Flashcard word={card} flipped={flipped} onFlip={flip} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <NavButton label={t("previousCard")} onClick={() => go(-1)} disabled={index === 0}>
          <ChevronLeft className="size-6 rtl:-scale-x-100" aria-hidden />
        </NavButton>
        <div className="flex max-w-[60vw] flex-wrap justify-center gap-1.5" aria-hidden>
          {cards.map((c, i) => (
            <span
              key={c.id}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-brand-600" : "w-2 bg-brand-200 dark:bg-brand-800"}`}
            />
          ))}
        </div>
        <NavButton label={t("nextCard")} onClick={() => go(1)} disabled={index === cards.length - 1}>
          <ChevronRight className="size-6 rtl:-scale-x-100" aria-hidden />
        </NavButton>
      </div>

      {hydrated && !urduVoice && (
        <p className="mt-4 text-center text-xs text-muted">{t("noVoices")}</p>
      )}

      <motion.div
        layout
        className={`mt-8 flex flex-col items-center gap-3 rounded-3xl border p-6 text-center transition-colors ${
          seenAll ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-line bg-surface"
        }`}
      >
        {seenAll && <p className="font-semibold text-ink">{t("practiceReady")}</p>}
        <Button onClick={() => setMode("practice")} variant={seenAll ? "primary" : "secondary"}>
          <ClipboardCheck className="size-5" aria-hidden />
          {t("practice")}
        </Button>
      </motion.div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
