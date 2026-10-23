import { useTranslations } from "next-intl";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuizGame } from "@/components/quiz/QuizGame";

export async function generateMetadata({ params }: PageProps<"/[locale]/quiz">) {
  const { locale } = await params;
  return pageMetadata(locale, "quiz", "/quiz");
}

export default async function QuizPage({ params }: PageProps<"/[locale]/quiz">) {
  await initLocale(params);
  return <QuizContent />;
}

function QuizContent() {
  const t = useTranslations("Quiz");
  return (
    <>
      <PageHeader emoji="🧠" title={t("title")} subtitle={t("subtitle")} />
      <QuizGame />
    </>
  );
}
