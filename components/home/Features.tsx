"use client";

import { ArrowRight, BookOpen, Brain, Gamepad2, MessageCircle, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ClayIcon } from "@/components/ui/ClayIcon";

const FEATURES: { key: "quiz" | "games" | "learn" | "chat"; href: string; icon: LucideIcon; tile: string; wash: string }[] = [
  { key: "quiz", href: "/quiz", icon: Brain, tile: "from-brand-400 to-brand-700", wash: "from-brand-50" },
  { key: "games", href: "/games", icon: Gamepad2, tile: "from-pink-400 to-violet-600", wash: "from-pink-50" },
  { key: "learn", href: "/learn", icon: BookOpen, tile: "from-emerald-400 to-teal-600", wash: "from-emerald-50" },
  { key: "chat", href: "/chat", icon: MessageCircle, tile: "from-amber-300 to-orange-500", wash: "from-amber-50" },
];

export function Features() {
  const t = useTranslations("Home.features");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-lg text-muted">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.key} delay={i * 0.1} className="h-full">
              <TiltCard className="rounded-[1.75rem]">
                <Link
                  href={f.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-gradient-to-b ${f.wash} to-surface to-60% p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-white/5 dark:from-surface-2`}
                >
                  <Icon
                    className="pointer-events-none absolute -end-6 -top-6 size-36 text-ink/[0.04] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 dark:text-white/[0.05]"
                    aria-hidden
                  />
                  <ClayIcon icon={Icon} tile={f.tile} className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  <h3 className="mt-5 text-xl font-extrabold text-ink">{t(`${f.key}.title`)}</h3>
                  <p className="mt-2 flex-1 text-muted">{t(`${f.key}.text`)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-600 dark:text-brand-300">
                    {t("open")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
