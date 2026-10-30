import { useTranslations } from "next-intl";
import { Gamepad2 } from "lucide-react";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { GameList } from "@/components/games/GameList";

export async function generateMetadata({ params }: PageProps<"/[locale]/games">) {
  const { locale } = await params;
  return pageMetadata(locale, "games", "/games");
}

export default async function GamesPage({ params }: PageProps<"/[locale]/games">) {
  await initLocale(params);
  return <GamesContent />;
}

function GamesContent() {
  const t = useTranslations("Games");
  return (
    <>
      <PageHeader icon={Gamepad2} tile="from-pink-400 to-violet-600" title={t("title")} subtitle={t("subtitle")} />
      <GameList />
    </>
  );
}
