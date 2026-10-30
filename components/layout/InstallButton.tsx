"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Download, Laptop, Smartphone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { isInstalledApp, promptInstall, useInstallEvent } from "@/lib/install";

/**
 * Footer button to install the app on a laptop/computer or phone, always there
 * (unless already running as the app). Uses the browser's install dialog when it
 * offers one; otherwise shows simple steps for Chrome/Edge, Android and iPhone.
 */
export function InstallButton() {
  const t = useTranslations("Install");
  const event = useInstallEvent();
  const installed = useSyncExternalStore(noop, isInstalledApp, () => false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  if (installed) return null;

  async function onClick() {
    if (event) await promptInstall();
    else setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="btn-clay mt-5 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-700 px-4 text-sm font-bold text-white transition active:translate-y-0.5"
      >
        <Download className="size-4" aria-hidden />
        {t("footerButton")}
      </button>

      <dialog
        ref={ref}
        aria-labelledby="install-help-title"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        className="m-auto w-[min(92vw,30rem)] rounded-[1.75rem] border-2 border-white bg-surface p-0 text-ink shadow-lift backdrop:bg-brand-950/50 backdrop:backdrop-blur-sm dark:border-white/5"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 id="install-help-title" className="text-xl font-extrabold">{t("helpTitle")}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="-me-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted">{t("text")}</p>

          <HelpSection icon={<Laptop className="size-5" aria-hidden />} title={t("laptopTitle")}>
            <li>{t("laptop1")}</li>
            <li>{t("laptop2")}</li>
            <li>{t("laptop3")}</li>
          </HelpSection>

          <a
            href={site.windowsDownload}
            className="btn-clay mt-3 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-700 px-4 text-sm font-bold text-white transition active:translate-y-0.5"
          >
            <Download className="size-4" aria-hidden />
            {t("windowsDownload")}
          </a>
          <p className="mt-1.5 text-center text-xs text-muted">{t("windowsNote")}</p>

          <HelpSection icon={<Smartphone className="size-5" aria-hidden />} title={t("phoneTitle")}>
            <li>{t("android")}</li>
            <li>{t("iphone")}</li>
          </HelpSection>

          <a
            href={site.androidDownload}
            className="btn-clay mt-3 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 px-4 text-sm font-bold text-white transition active:translate-y-0.5"
          >
            <Download className="size-4" aria-hidden />
            {t("androidDownload")}
          </a>
          <p className="mt-1.5 text-center text-xs text-muted">{t("androidNote")}</p>
        </div>
      </dialog>
    </>
  );
}

const noop = () => () => {};

function HelpSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 rounded-2xl bg-surface-2 p-4">
      <h3 className="flex items-center gap-2 font-bold text-brand-700 dark:text-brand-300">
        {icon}
        {title}
      </h3>
      <ol className="mt-2 list-decimal space-y-1.5 ps-5 text-sm">{children}</ol>
    </section>
  );
}
