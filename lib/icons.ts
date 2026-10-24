import {
  Apple,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Calculator,
  Compass,
  FlaskConical,
  Flame,
  Gamepad2,
  Gem,
  Globe2,
  GraduationCap,
  Hand,
  Hash,
  Landmark,
  Languages,
  Library,
  MessagesSquare,
  Palette,
  PawPrint,
  Rocket,
  Sprout,
  Star,
  Target,
  Trophy,
  Type,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId, Difficulty } from "@/data/quiz";
import type { LessonId } from "@/data/lessons";
import type { BadgeId } from "@/lib/badges";

/**
 * One SVG icon family (Lucide) for every structural icon in the app — no emoji
 * as icons (UI/UX Pro Max rule). Each icon sits on a gradient "clay" tile.
 */
export interface IconStyle {
  icon: LucideIcon;
  /** Tailwind gradient classes for the tile behind the icon. */
  tile: string;
}

export const CATEGORY_ICONS: Record<CategoryId, IconStyle> = {
  gk: { icon: Globe2, tile: "from-sky-400 to-brand-600" },
  science: { icon: FlaskConical, tile: "from-emerald-400 to-teal-600" },
  math: { icon: Calculator, tile: "from-violet-400 to-indigo-600" },
  history: { icon: Landmark, tile: "from-amber-400 to-orange-600" },
  language: { icon: Languages, tile: "from-pink-400 to-rose-600" },
};

export const DIFFICULTY_ICONS: Record<Difficulty, IconStyle> = {
  easy: { icon: Sprout, tile: "from-emerald-400 to-green-600" },
  medium: { icon: Flame, tile: "from-amber-400 to-orange-600" },
  hard: { icon: Rocket, tile: "from-pink-400 to-violet-600" },
};

export const LESSON_ICONS: Record<LessonId, IconStyle> = {
  alphabet: { icon: Type, tile: "from-sky-400 to-brand-600" },
  numbers: { icon: Hash, tile: "from-violet-400 to-indigo-600" },
  colors: { icon: Palette, tile: "from-pink-400 to-orange-500" },
  animals: { icon: PawPrint, tile: "from-amber-400 to-orange-600" },
  family: { icon: Users, tile: "from-rose-400 to-pink-600" },
  greetings: { icon: Hand, tile: "from-cyan-400 to-sky-600" },
  fruits: { icon: Apple, tile: "from-lime-400 to-emerald-600" },
  days: { icon: CalendarDays, tile: "from-teal-400 to-emerald-600" },
};

export const BADGE_ICONS: Record<BadgeId, IconStyle> = {
  firstQuiz: { icon: Target, tile: "from-sky-400 to-brand-600" },
  quizFan: { icon: Gamepad2, tile: "from-violet-400 to-indigo-600" },
  quizChampion: { icon: Trophy, tile: "from-amber-300 to-amber-600" },
  perfect: { icon: BadgeCheck, tile: "from-emerald-400 to-teal-600" },
  superstar: { icon: Star, tile: "from-yellow-300 to-amber-500" },
  hardHero: { icon: Rocket, tile: "from-pink-400 to-violet-600" },
  explorer: { icon: Compass, tile: "from-cyan-400 to-sky-600" },
  collector: { icon: Gem, tile: "from-fuchsia-400 to-purple-600" },
  wordLearner: { icon: BookOpenCheck, tile: "from-lime-400 to-emerald-600" },
  bookworm: { icon: Library, tile: "from-orange-400 to-rose-500" },
  languageMaster: { icon: GraduationCap, tile: "from-brand-400 to-brand-700" },
  chatterbox: { icon: MessagesSquare, tile: "from-teal-400 to-cyan-600" },
};

