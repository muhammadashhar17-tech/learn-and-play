"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, Check, Dumbbell, Layers, RotateCcw, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Lesson, Word } from "@/data/lessons";
import type { Locale } from "@/i18n/routing";
import { shuffle } from "@/lib/quiz";
import { completeLesson } from "@/lib/progress";
import { playSound } from "@/lib/sound";
import { celebrate } from "@/lib/confetti";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { SCRIPT_CLASS } from "./Flashcard";

const QUESTION_COUNT = 6;
export const PASS_MARK = 4;

interface PracticeQuestion {
  word: Word;
  target: Locale;
  options: string[];
  answer: number;
}

/** Ask for the word in one of the two other languages, alternating between them. */
function buildPractice(lesson: Lesson, locale: Locale): PracticeQuestion[] {
  const others = (["en", "ur", "sd"] as Locale[]).filter((l) => l !== locale);
  const words = shuffle(lesson.words).slice(0, QUESTION_COUNT);
  return words.map((word, i) => {
    const target = others[i % 2];
    const distractors = shuffle(
      lesson.words.filter((w) => w.id !== word.id && w[target] !== word[target]).map((w) => w[target]),
    ).slice(0, 3);
    const options = shuffle([word[target], ...distractors]);
    return { word, target, options, answer: options.indexOf(word[target]) };
  });
}

export function LessonPractice({
  lesson,
  nextLessonId,
  onBack,
}: {
  lesson: Lesson;
  nextLessonId?: string;
  onBack: () => void;
}) {
  const t = useTranslations("Learn");
  const language = useTranslations("Language");
  const locale = useLocale() as Locale;
  const [attempt, setAttempt] = useState(0);
  const [questions, setQuestions] = useState(() => buildPractice(lesson, locale));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const prompt = (word: Word) => (word.letter ? word.letter.name : word[locale]);

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === q.answer;
    playSound(ok ? "correct" : "wrong");
    if (ok) setCorrect((c) => c + 1);
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setPicked(null);
      return;
    }
    const score = Math.round((correct / questions.length) * 100);
    completeLessonIfPassed(lesson.id, correct, score);
    setDone(true);
    if (correct >= PASS_MARK) {
      playSound("win");
      celebrate();
    }
  }

  function restart() {
    setAttempt((a) => a + 1);
    setQuestions(buildPractice(lesson, locale));
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setDone(false);
  }

  if (done) {
    const passed = correct >= PASS_MARK;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-[2rem] border-2 border-white bg-surface dark:border-white/5 p-8 text-center shadow-lift"
      >
        <ClayIcon
          icon={passed ? Award : Dumbbell}
          tile={passed ? "from-yellow-300 to-amber-500" : "from-sky-400 to-brand-600"}
          size="lg"
          className="mx-auto"
        />
        <h2 className="mt-4 text-2xl font-extrabold text-ink">
          {t("resultTitle", { correct, total: questions.length })}
        </h2>
        <p className={`mt-2 font-semibold ${passed ? "text-emerald-700 dark:text-emerald-300" : "text-muted"}`} role="status">
          {passed ? t("passed") : t("failed", { needed: PASS_MARK })}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {passed && nextLessonId ? (
            <ButtonLink href={`/learn/${nextLessonId}`}>
              {t("nextLesson")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </ButtonLink>
          ) : null}
          <Button variant={passed ? "secondary" : "primary"} onClick={restart}>
            <RotateCcw className="size-5" aria-hidden />
            {t("tryAgain")}
          </Button>
          <Button variant="ghost" onClick={onBack}>
            <Layers className="size-5" aria-hidden />
            {t("backToCards")}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm font-semibold text-muted">
        <span>{t("questionOf", { current: index + 1, total: questions.length })}</span>
        <button type="button" onClick={onBack} className="rounded-lg px-2 py-1 hover:text-ink">
          {t("backToCards")}
        </button>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
          animate={{ width: `${((index + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${attempt}-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="mt-5 rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft"
        >
          {q.word.emoji && !q.word.letter && <div className="text-center text-6xl" aria-hidden>{q.word.emoji}</div>}
          {q.word.swatch && (
            <div className="mx-auto size-16 rounded-full border-4 border-white shadow ring-1 ring-line" style={{ backgroundColor: q.word.swatch }} aria-hidden />
          )}
          <h2 id="practice-q" className="mt-3 text-center text-xl font-bold text-ink sm:text-2xl">
            {t("practiceQuestion", { word: prompt(q.word), language: language(q.target) })}
          </h2>
          <div role="group" aria-labelledby="practice-q" className="mt-5 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isPicked = picked === i;
              let style = "border-line hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30";
              if (picked !== null && isAnswer) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
              else if (isPicked) style = "animate-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40";
              else if (picked !== null) style = "border-line opacity-50";
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => choose(i)}
                  lang={q.target}
                  className={`flex min-h-14 items-center justify-between gap-2 rounded-2xl border-2 px-4 py-3 text-xl font-bold text-ink transition ${style}`}
                >
                  <span className={SCRIPT_CLASS[q.target]}>{opt}</span>
                  {picked !== null && isAnswer && <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />}
                  {isPicked && !isAnswer && <X className="size-5 shrink-0 text-rose-600" aria-hidden />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p role="status" className={`font-bold ${picked === q.answer ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                {picked === q.answer ? t("correct") : t("wrong", { answer: q.options[q.answer] })}
              </p>
              <Button onClick={next} autoFocus>
                {index < questions.length - 1 ? t("next") : t("finish")}
                <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function completeLessonIfPassed(lessonId: string, correct: number, score: number) {
  if (correct >= PASS_MARK) completeLesson(lessonId, score);
}
