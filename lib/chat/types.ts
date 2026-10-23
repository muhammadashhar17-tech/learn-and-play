import type { Locale } from "@/i18n/routing";
import type { Word } from "@/data/lessons";

/**
 * The chatbot is coded against this small interface so the offline,
 * rule-based engine can later be swapped for a real AI model
 * (see lib/chat/index.ts) without touching the chat UI.
 */

export type ChatRole = "user" | "bot";

export interface ChatLink {
  href: string;
  /** Translation key under "Nav", e.g. "quiz". */
  page: "quiz" | "learn" | "chat" | "progress" | "leaderboard" | "about" | "contact";
}

export interface BotReply {
  text: string;
  /** Optional word to show as a mini flashcard (translations + Listen buttons). */
  word?: Word;
  /** Optional buttons that open app pages. */
  links?: ChatLink[];
  /** Optional follow-up questions shown as chips. */
  suggestions?: string[];
}

export interface ChatMessage extends Partial<BotReply> {
  id: string;
  role: ChatRole;
  text: string;
}

/** Translates a key from the "Chat.bot" namespace into the current language. */
export type BotTranslator = (key: string, values?: Record<string, string | number>) => string;

export interface ChatContext {
  /** Language the reply must be written in. */
  locale: Locale;
  /** Bot phrases from the translation files, already in `locale`. */
  t: BotTranslator;
  /** Earlier messages, oldest first (useful for AI engines). */
  history: ChatMessage[];
}

export interface ChatEngine {
  reply(message: string, context: ChatContext): Promise<BotReply>;
}
