"use client";

import { useEffect } from "react";
import { Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Visual } from "@/data/games";
import { say, useCanSay } from "@/lib/speech";
import { SCRIPT_CLASS } from "@/components/learn/Flashcard";

/** The picture part of a question: objects to count, a clock, a pizza, big text or a word to hear. */
export function GameVisual({ visual }: { visual: Visual }) {
  switch (visual.type) {
    case "count":
      return (
        <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-2 text-4xl sm:text-5xl" aria-hidden>
          {Array.from({ length: visual.n }, (_, i) => (
            <span key={i}>{visual.emoji}</span>
          ))}
        </div>
      );
    case "clock":
      return <ClockFace h={visual.h} m={visual.m} />;
    case "pie":
      return <Pie parts={visual.parts} filled={visual.filled} />;
    case "big":
      return (
        <p dir="ltr" className="text-center text-4xl font-black tracking-wide text-ink sm:text-5xl">
          {visual.text}
        </p>
      );
    case "listen":
      return <ListenVisual text={visual.text} lang={visual.lang} />;
  }
}

function ClockFace({ h, m }: { h: number; m: number }) {
  const minuteAngle = m * 6;
  const hourAngle = (h % 12) * 30 + m * 0.5;
  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-48 sm:size-56" role="img" aria-label="clock">
      <circle cx="100" cy="100" r="94" className="fill-surface stroke-brand-600" strokeWidth="8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) * 30 * Math.PI) / 180;
        return (
          <text
            key={i}
            x={100 + Math.sin(a) * 72}
            y={100 - Math.cos(a) * 72}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-ink font-latin text-[18px] font-bold"
          >
            {i + 1}
          </text>
        );
      })}
      <line x1="100" y1="100" x2="100" y2="52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-ink" transform={`rotate(${hourAngle} 100 100)`} />
      <line x1="100" y1="100" x2="100" y2="30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-rose-500" transform={`rotate(${minuteAngle} 100 100)`} />
      <circle cx="100" cy="100" r="7" className="fill-ink" />
    </svg>
  );
}

function Pie({ parts, filled }: { parts: number; filled: number }) {
  const slice = (i: number) => {
    const a0 = (i / parts) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M100 100 L${100 + 90 * Math.cos(a0)} ${100 + 90 * Math.sin(a0)} A90 90 0 ${large} 1 ${100 + 90 * Math.cos(a1)} ${100 + 90 * Math.sin(a1)} Z`;
  };
  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-48 sm:size-56" role="img" aria-label={`${filled}/${parts}`}>
      {Array.from({ length: parts }, (_, i) => (
        <path key={i} d={slice(i)} className={i < filled ? "fill-amber-400" : "fill-amber-100 dark:fill-amber-950"} stroke="#b45309" strokeWidth="3" />
      ))}
    </svg>
  );
}

function ListenVisual({ text, lang }: { text: string; lang: "en" | "ur" | "sd" }) {
  const t = useTranslations("Games");
  const language = useTranslations("Language");
  const canSay = useCanSay(text, lang);

  // Play the word as soon as the question appears.
  useEffect(() => {
    if (canSay) say(text, lang);
  }, [text, lang, canSay]);

  if (!canSay) {
    // No clip and no device voice: turn it into a reading question instead.
    return (
      <p lang={lang} className={`text-center text-4xl font-bold text-ink ${SCRIPT_CLASS[lang]}`}>
        {text}
      </p>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => say(text, lang)}
        className="btn-clay grid size-24 place-items-center rounded-full bg-gradient-to-b from-brand-500 to-brand-700 text-white transition active:scale-95"
        aria-label={t("playWord")}
      >
        <Volume2 className="size-12 rtl:-scale-x-100" aria-hidden />
      </button>
      <span className="text-sm font-semibold text-muted">
        {t("hearIn", { language: language(lang) })}
      </span>
    </div>
  );
}
