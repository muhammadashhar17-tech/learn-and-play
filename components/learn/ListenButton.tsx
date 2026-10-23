"use client";

import { Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { speak, useVoice, type SpeechLang } from "@/lib/speech";

/** Renders nothing when the device has no voice for this language. */
export function ListenButton({ text, lang, className = "" }: { text: string; lang: SpeechLang; className?: string }) {
  const t = useTranslations("Learn");
  const language = useTranslations("Language");
  const voice = useVoice(lang);
  if (!voice) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, voice);
      }}
      aria-label={t("listen", { language: language(lang) })}
      title={t("listen", { language: language(lang) })}
      className={`grid size-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-sm transition hover:scale-110 hover:bg-brand-700 active:scale-95 ${className}`}
    >
      <Volume2 className="size-5 rtl:-scale-x-100" aria-hidden />
    </button>
  );
}
