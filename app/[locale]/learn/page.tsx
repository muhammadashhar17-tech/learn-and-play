import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
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
      <PageHeader icon={BookOpen} tile="from-emerald-400 to-teal-600" title={t("title")} subtitle={t("subtitle")} />
      <LessonList />
    </>
  );
}
