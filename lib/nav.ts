import {
  BarChart3,
  BookOpen,
  Brain,
  Gamepad2,
  Home,
  Info,
  Mail,
  MessageCircle,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type NavKey =
  | "home"
  | "quiz"
  | "games"
  | "learn"
  | "chat"
  | "progress"
  | "leaderboard"
  | "about"
  | "contact";

export interface NavItem {
  key: NavKey;
  href: string;
  icon: LucideIcon;
  /** Shown in the desktop navbar (everything is shown in the mobile menu). */
  primary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "quiz", href: "/quiz", icon: Brain, primary: true },
  { key: "games", href: "/games", icon: Gamepad2, primary: true },
  { key: "learn", href: "/learn", icon: BookOpen, primary: true },
  { key: "chat", href: "/chat", icon: MessageCircle, primary: true },
  { key: "progress", href: "/progress", icon: BarChart3, primary: true },
  { key: "leaderboard", href: "/leaderboard", icon: Trophy },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Mail },
];

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
