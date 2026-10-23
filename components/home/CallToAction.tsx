import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

export function CallToAction() {
  const t = useTranslations("Home.cta");
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center shadow-soft">
          <Aurora variant="header" />
          <div className="absolute -start-10 -top-10 size-40 rounded-full bg-amber-200/50 blur-2xl dark:bg-amber-500/10" aria-hidden />
          <div className="absolute -bottom-10 -end-10 size-48 rounded-full bg-brand-200/60 blur-2xl dark:bg-brand-600/20" aria-hidden />
          <div className="relative">
            <span className="animate-float inline-block text-5xl" aria-hidden>🚀</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{t("text")}</p>
            <ButtonLink href="/quiz" className="mt-8 px-8 py-4 text-lg">
              {t("button")}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
