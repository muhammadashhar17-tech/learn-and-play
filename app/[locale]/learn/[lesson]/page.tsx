import { notFound } from "next/navigation";
import { LESSON_ICONS } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getLesson, LESSON_IDS, type LessonId } from "@/data/lessons";
import { Link } from "@/i18n/navigation";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { LessonView } from "@/components/learn/LessonView";

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSON_IDS.map((lesson) => ({ lesson }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/learn/[lesson]">) {
  const { locale, lesson } = await params;
  const t = await getTranslations({ locale: locale as "en", namespace: "Learn" });
  if (!getLesson(lesson)) return {};
  return pageMetadata(locale, "learn", `/learn/${lesson}`, {
    title: `${t(`lessons.${lesson as LessonId}.title`)} · ${t("title")}`,
    description: t(`lessons.${lesson as LessonId}.text`),
  });
}

export default async function LessonPage({ params }: PageProps<"/[locale]/learn/[lesson]">) {
  await initLocale(params);
  const { lesson } = await params;
  const data = getLesson(lesson);
  if (!data) notFound();
  return <LessonContent id={data.id} />;
}

function LessonContent({ id }: { id: LessonId }) {
  const t = useTranslations("Learn");
  return (
    <>
      <PageHeader width="max-w-3xl" icon={LESSON_ICONS[id].icon} tile={LESSON_ICONS[id].tile} title={t(`lessons.${id}.title`)} subtitle={t(`lessons.${id}.text`)}>
        <Link
          href="/learn"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-100 dark:text-brand-200 dark:hover:bg-brand-900/50"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          {t("allLessons")}
        </Link>
      </PageHeader>
      <LessonView lessonId={id} />
    </>
  );
}
