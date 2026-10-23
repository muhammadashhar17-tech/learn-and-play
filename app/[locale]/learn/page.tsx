import { useTranslations } from "next-intl";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { LessonList } from "@/components/learn/LessonList";

export async function generateMetadata({ params }: PageProps<"/[locale]/learn">) {
  const { locale } = await params;
  return pageMetadata(locale, "learn", "/learn");
}

export default async function LearnPage({ params }: PageProps<"/[locale]/learn">) {
  await initLocale(params);
  return <LearnContent />;
}

function LearnContent() {
  const t = useTranslations("Learn");
  return (
    <>
      <PageHeader emoji="📚" title={t("title")} subtitle={t("subtitle")} />
      <LessonList />
    </>
  );
}
