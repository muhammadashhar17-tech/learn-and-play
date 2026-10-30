import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { TOTAL_QUESTIONS } from "@/data/quiz";
import { GAMES } from "@/data/games";
import { LESSONS, TOTAL_WORDS } from "@/data/lessons";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Levels } from "@/components/home/Levels";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await initLocale(params);
  return (
    <>
      <Hero />
      <Features />
      <Levels />
      <Stats
        values={{
          questions: TOTAL_QUESTIONS,
          lessons: LESSONS.length,
          games: GAMES.length,
          words: TOTAL_WORDS,
        }}
      />
      <Testimonials />
      <CallToAction />
    </>
  );
}
