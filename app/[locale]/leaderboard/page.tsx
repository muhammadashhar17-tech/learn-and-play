import { useTranslations } from "next-intl";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { LeaderboardView } from "@/components/progress/LeaderboardView";

export async function generateMetadata({ params }: PageProps<"/[locale]/leaderboard">) {
  const { locale } = await params;
  return pageMetadata(locale, "leaderboard", "/leaderboard");
}

export default async function LeaderboardPage({ params }: PageProps<"/[locale]/leaderboard">) {
  await initLocale(params);
  return <LeaderboardContent />;
}

function LeaderboardContent() {
  const t = useTranslations("Leaderboard");
  return (
    <>
      <PageHeader width="max-w-4xl" emoji="🏆" title={t("title")} subtitle={t("subtitle")} />
      <LeaderboardView />
    </>
  );
}
