import { RuleBasedEngine } from "./rule-based";
import type { ChatEngine } from "./types";

export type * from "./types";

/**
 * The single place that decides which chatbot "brain" the app uses.
 *
 * Today: the free, offline RuleBasedEngine.
 *
 * To plug in a real AI later, write a class that implements ChatEngine, e.g.
 *
 *   class ApiEngine implements ChatEngine {
 *     async reply(message, { locale, history }) {
 *       const res = await fetch("https://your-api.example.com/chat", {
 *         method: "POST",
 *         headers: { "Content-Type": "application/json" },
 *         body: JSON.stringify({ message, locale, history }),
 *       });
 *       const data = await res.json();
 *       return { text: data.text };
 *     }
 *   }
 *
 * and return it below. Keep API keys on a server (for example a Vercel
 * serverless function in a separate project) — never put them in this
 * static site, because anyone could read them.
 */
let engine: ChatEngine | null = null;

export function getChatEngine(): ChatEngine {
  engine ??= new RuleBasedEngine();
  return engine;
}
