"use client";

import { useTranslations } from "next-intl";
import type { Word } from "@/data/lessons";
import type { Locale } from "@/i18n/routing";
import { ListenButton } from "@/components/learn/ListenButton";
import { SCRIPT_CLASS } from "@/components/learn/Flashcard";

/** A compact word card shown inside a chatbot reply. */
export function WordBubble({ word }: { word: Word }) {
  const language = useTranslations("Language");
  const rows: { lang: Locale; text: string; roman?: string }[] = [
    { lang: "en", text: word.en },
    { lang: "ur", text: word.ur, roman: word.roman.ur },
    { lang: "sd", text: word.sd, roman: word.roman.sd },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-surface shadow-sm dark:border-brand-800 dark:from-brand-950/60">
      {(word.emoji || word.swatch) && (
        <div className="flex justify-center pt-3 text-4xl" aria-hidden>
          {word.swatch ? (
            <span className="size-10 rounded-full border-2 border-white shadow ring-1 ring-line" style={{ backgroundColor: word.swatch }} />
          ) : (
            word.emoji
          )}
        </div>
      )}
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.lang} className="flex items-center gap-3 px-4 py-2">
            <span className={`w-10 shrink-0 text-xs font-bold text-muted ${SCRIPT_CLASS[r.lang]}`}>{language(`short.${r.lang}`)}</span>
            <span className="min-w-0 flex-1">
              <span className={`block text-lg font-bold text-ink ${SCRIPT_CLASS[r.lang]}`} lang={r.lang} dir={r.lang === "en" ? "ltr" : "rtl"}>
                {r.text}
              </span>
              {r.roman && (
                <span className="font-latin block text-xs text-muted" dir="ltr">
                  “{r.roman}”
                </span>
              )}
            </span>
            <ListenButton text={r.text} lang={r.lang} className="size-9" />
          </li>
        ))}
      </ul>
    </div>
  );
}
