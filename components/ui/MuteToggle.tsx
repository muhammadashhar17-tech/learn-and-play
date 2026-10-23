"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { settingsStore } from "@/lib/progress";
import { toggleMute } from "@/lib/sound";
import { useStore } from "@/lib/storage";

export function MuteToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("Quiz.sound");
  const { muted } = useStore(settingsStore);
  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={muted}
      aria-label={muted ? t("unmute") : t("mute")}
      title={muted ? t("unmute") : t("mute")}
      className={`grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink transition hover:border-brand-300 active:scale-95 ${className}`}
    >
      {muted ? <VolumeX className="size-5" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
    </button>
  );
}
