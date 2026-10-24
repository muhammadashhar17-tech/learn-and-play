import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Globe2,
  GraduationCap,
  Heart,
  MessageCircle,
  School,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  await initLocale(params);
  return <AboutContent />;
}

const FEATURES = [
  { key: "feature1", icon: Brain },
  { key: "feature2", icon: BookOpen },
  { key: "feature3", icon: MessageCircle },
  { key: "feature4", icon: Trophy },
] as const;

function AboutContent() {
  const t = useTranslations("About");
  return (
    <>
      <PageHeader width="max-w-6xl" icon={Heart} tile="from-pink-400 to-rose-600" title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <Reveal>
          <section className="grid gap-6 rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-lift md:grid-cols-[auto_1fr] md:items-center">
            <span className="grid size-20 place-items-center rounded-3xl bg-white/15">
              <School className="size-10" aria-hidden />
            </span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-100">{t("schoolTitle")}</h2>
              <p className="mt-1 text-2xl font-extrabold">{t("schoolName")}</p>
              <p className="mt-2 text-brand-100">{t("schoolText", { school: t("schoolName") })}</p>
            </div>
          </section>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <InfoCard icon={<Heart className="size-6" aria-hidden />} title={t("missionTitle")} text={t("missionText")} />
          </Reveal>
          <Reveal delay={0.05}>
            <InfoCard icon={<Globe2 className="size-6" aria-hidden />} title={t("languagesTitle")} text={t("languagesText")} />
          </Reveal>
        </div>

        <Reveal>
          <section className="rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold text-ink">{t("featuresTitle")}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ key, icon: Icon }) => (
                <li key={key} className="flex items-start gap-3 rounded-2xl bg-surface-2/60 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="pt-1.5 text-ink">{t(key)}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <InfoCard icon={<ShieldCheck className="size-6" aria-hidden />} title={t("privacyTitle")} text={t("privacyText")} />
          </Reveal>
          <Reveal delay={0.05}>
            <InfoCard icon={<GraduationCap className="size-6" aria-hidden />} title={t("teachersTitle")} text={t("teachersText")} />
          </Reveal>
        </div>

        <div className="flex justify-center pt-4">
          <ButtonLink href="/learn" className="px-8 py-4 text-lg">
            {t("cta")}
            <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <section className="h-full rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/50 dark:text-brand-300">
        {icon}
      </span>
      <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 text-muted">{text}</p>
    </section>
  );
}
