"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_STORAGE_KEY, routing, type Locale } from "@/i18n/routing";

// Each language name is written in its own script, whatever the page language.
const LABEL_CLASS: Record<Locale, string> = {
  en: "font-latin",
  ur: "font-urdu text-[0.95em]",
  sd: "font-sindhi",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("Language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale) return;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex items-center gap-1 rounded-xl border border-line bg-surface p-1 ${pending ? "opacity-70" : ""} ${className}`}
    >
      <Languages className="mx-1 hidden size-4 text-muted md:block" aria-hidden />
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => choose(l)}
            aria-pressed={active}
            aria-label={t("switchTo", { name: t(l) })}
            className={`relative rounded-lg px-2 py-1 text-sm font-semibold sm:px-2.5 transition ${LABEL_CLASS[l]} ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-muted hover:bg-surface-2 hover:text-ink"
            }`}
          >
            {t(`short.${l}`)}
          </button>
        );
      })}
    </div>
  );
}
