"use client";

import { ArrowRight, BookOpen, Brain, MessageCircle, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const FEATURES: { key: "quiz" | "learn" | "chat"; href: string; icon: LucideIcon; gradient: string; glow: string; emoji: string }[] = [
  { key: "quiz", href: "/quiz", icon: Brain, gradient: "from-brand-500 to-brand-700", glow: "group-hover:shadow-brand-500/30", emoji: "🧠" },
  { key: "learn", href: "/learn", icon: BookOpen, gradient: "from-emerald-500 to-teal-600", glow: "group-hover:shadow-emerald-500/30", emoji: "📚" },
  { key: "chat", href: "/chat", icon: MessageCircle, gradient: "from-amber-400 to-orange-500", glow: "group-hover:shadow-amber-500/30", emoji: "🤖" },
];

export function Features() {
  const t = useTranslations("Home.features");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-lg text-muted">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.key} delay={i * 0.1} className="h-full">
              <TiltCard className="rounded-3xl">
                <Link
                  href={f.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-2xl dark:hover:border-brand-700 ${f.glow}`}
                >
                  <span
                    className="pointer-events-none absolute -end-6 -top-6 text-8xl opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                    aria-hidden
                  >
                    {f.emoji}
                  </span>
                  <span
                    className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                  >
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{t(`${f.key}.title`)}</h3>
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
