"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const dark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  function toggle() {
    const next = !isDarkNow();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("lp-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t("toLight") : t("toDark")}
      title={dark ? t("toLight") : t("toDark")}
      className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 active:scale-95 dark:hover:text-brand-300"
    >
      {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  );
}
