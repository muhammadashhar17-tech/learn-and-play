import { useTranslations } from "next-intl";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressDashboard } from "@/components/progress/ProgressDashboard";

export async function generateMetadata({ params }: PageProps<"/[locale]/progress">) {
  const { locale } = await params;
  return pageMetadata(locale, "progress", "/progress");
}

export default async function ProgressPage({ params }: PageProps<"/[locale]/progress">) {
  await initLocale(params);
  return <ProgressContent />;
}

function ProgressContent() {
  const t = useTranslations("Progress");
  return (
    <>
      <PageHeader emoji="📊" title={t("title")} subtitle={t("subtitle")} />
      <ProgressDashboard />
    </>
  );
}
