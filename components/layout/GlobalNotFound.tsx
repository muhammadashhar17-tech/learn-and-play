"use client";

import { useEffect, useSyncExternalStore } from "react";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import ur from "@/messages/ur.json";
import sd from "@/messages/sd.json";
import { isRtl, LOCALE_STORAGE_KEY, routing, type Locale } from "@/i18n/routing";
import { BASE_PATH, withBase } from "@/lib/base-path";
import { LogoMark } from "./Logo";
import { NotFoundView } from "./NotFoundView";

const MESSAGES = { en, ur, sd } as const;

function detectLocale(): Locale {
  const fromPath = window.location.pathname.slice(BASE_PATH.length).split("/")[1];
  if ((routing.locales as readonly string[]).includes(fromPath)) return fromPath as Locale;
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && (routing.locales as readonly string[]).includes(saved)) return saved as Locale;
  } catch {
    /* ignore */
  }
  return routing.defaultLocale;
}

const noop = () => () => {};

export function GlobalNotFound() {
  const locale = useSyncExternalStore(noop, detectLocale, () => routing.defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="Asia/Karachi">
      <header className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-4 sm:px-6">
        <a href={withBase(`/${locale}/`)} className="flex items-center gap-2.5">
          <LogoMark className="size-10" />
          <span className="text-lg font-extrabold text-ink">{MESSAGES[locale].App.name}</span>
        </a>
      </header>
      <main>
        <NotFoundView />
      </main>
    </NextIntlClientProvider>
  );
}
