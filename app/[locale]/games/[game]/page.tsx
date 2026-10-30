import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { GAME_IDS, getGame, type Game } from "@/data/games";
import { pick } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { GAME_ICONS, GAME_SUBJECT_ICONS } from "@/lib/icons";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { GamePlayer } from "@/components/games/GamePlayer";

export const dynamicParams = false;

export function generateStaticParams() {
  return GAME_IDS.map((game) => ({ game }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/games/[game]">) {
  const { locale, game: id } = await params;
  const game = getGame(id);
  if (!game) return {};
  const t = await getTranslations({ locale: locale as "en", namespace: "Games" });
  return pageMetadata(locale, "games", `/games/${id}`, {
    title: `${pick(game.title, locale)} · ${t("title")}`,
    description: pick(game.intro, locale),
  });
}

export default async function GamePage({ params }: PageProps<"/[locale]/games/[game]">) {
  await initLocale(params);
  const { game: id } = await params;
  const game = getGame(id);
  if (!game) notFound();
  return <GameContent game={game} />;
}

function GameContent({ game }: { game: Game }) {
  const t = useTranslations("Games");
  const level = useTranslations("Quiz.difficulty.classes");
  const locale = useLocale();
  return (
    <>
      <PageHeader
        width="max-w-3xl"
        icon={GAME_ICONS[game.id]}
        tile={GAME_SUBJECT_ICONS[game.subject].tile}
        title={pick(game.title, locale)}
        subtitle={`${t(`subjects.${game.subject}`)} · ${level(game.level)}`}
      >
        <Link
          href="/games"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-100 dark:text-brand-200 dark:hover:bg-brand-900/50"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          {t("allGames")}
        </Link>
      </PageHeader>
      <div className="px-4 py-8 sm:px-6">
        <GamePlayer gameId={game.id} />
      </div>
    </>
  );
}
