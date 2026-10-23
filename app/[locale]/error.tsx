"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { ErrorState } from "@/components/ui/States";

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("Common");
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <ErrorState
        title={t("errorTitle")}
        text={t("errorText")}
        action={
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95"
          >
            <RotateCcw className="size-5" aria-hidden />
            {t("tryAgain")}
          </button>
        }
      />
    </div>
  );
}
