import { useTranslations } from "next-intl";
import { Clock, Info, Mail, School, UserRound } from "lucide-react";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq } from "@/components/contact/Faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  await initLocale(params);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("Contact");
  const about = useTranslations("About");
  return (
    <>
      <PageHeader width="max-w-6xl" icon={Mail} tile="from-sky-400 to-brand-600" title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        <ContactForm />
        <aside className="space-y-5">
          <section className="rounded-[1.75rem] border-2 border-white bg-surface p-6 shadow-soft dark:border-white/5">
            <h2 className="text-lg font-bold text-ink">{t("infoTitle")}</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <InfoRow icon={<UserRound className="size-5" aria-hidden />} title={t("infoPerson")}>
                <span className="font-semibold text-ink">{t("personName")}</span>
              </InfoRow>
              <InfoRow icon={<Mail className="size-5" aria-hidden />} title={t("infoEmail")}>
                <a
                  href={`mailto:${site.contactEmail}`}
                  dir="ltr"
                  className="font-latin break-all text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
                >
                  {site.contactEmail}
                </a>
              </InfoRow>
              <InfoRow icon={<School className="size-5" aria-hidden />} title={t("infoSchool")}>
                <span className="text-muted">{about("schoolName")}</span>
              </InfoRow>
              <InfoRow icon={<Clock className="size-5" aria-hidden />}>
                <span className="text-muted">{t("infoNote")}</span>
              </InfoRow>
            </ul>
          </section>
          <section className="rounded-3xl border border-line bg-surface-2/60 p-6">
            <h2 className="flex items-center gap-2 font-bold text-ink">
              <Info className="size-5 text-brand-600 dark:text-brand-300" aria-hidden />
              {t("howTitle")}
            </h2>
            <p className="mt-2 text-sm text-muted">{t("howText")}</p>
          </section>
        </aside>
      </div>
      <Faq />
    </>
  );
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title?: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/50 dark:text-brand-300">
        {icon}
      </span>
      <span className={title ? "" : "pt-2"}>
        {title && <span className="block font-semibold text-ink">{title}</span>}
        {children}
      </span>
    </li>
  );
}
