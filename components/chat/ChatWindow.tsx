"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, RotateCcw, SendHorizontal, ShieldCheck, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getChatEngine, type ChatMessage } from "@/lib/chat";
import { countChatMessage } from "@/lib/progress";
import { playSound } from "@/lib/sound";
import { ButtonLink } from "@/components/ui/Button";
import { WordBubble } from "./WordBubble";

const INITIAL_SUGGESTIONS = ["translate", "math", "fact", "bhittai", "iqbal", "sindh", "quiz"] as const;

let nextId = 0;
const makeId = () => `m${++nextId}`;

export function ChatWindow() {
  const t = useTranslations("Chat");
  const botT = useTranslations("Chat.bot");
  const nav = useTranslations("Nav");
  const locale = useLocale() as Locale;

  const welcome = (): ChatMessage => ({
    id: "welcome",
    role: "bot",
    text: botT("welcome"),
    suggestions: INITIAL_SUGGESTIONS.map((k) => botT(`suggestions.${k}`)),
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcome()]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest message in view (scroll the chat box, not the page).
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(raw: string) {
    const text = raw.trim().slice(0, 300);
    if (!text || typing) return;
    const userMsg: ChatMessage = { id: makeId(), role: "user", text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setTyping(true);
    countChatMessage();
    playSound("click");

    let reply: ChatMessage;
    try {
      const answer = await getChatEngine().reply(text, {
        locale,
        history,
        t: (key, values) => botT(key as never, values as never),
      });
      reply = { id: makeId(), role: "bot", ...answer };
    } catch {
      reply = { id: makeId(), role: "bot", text: t("error") };
    }
    // A short "typing…" pause makes the conversation feel natural.
    const delay = 450 + Math.min(reply.text.length * 6, 900);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, reply]);
      playSound("flip");
    }, delay);
  }

  function reset() {
    setMessages([welcome()]);
    setTyping(false);
    inputRef.current?.focus();
  }

  const last = messages[messages.length - 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex h-[min(72dvh,46rem)] min-h-[30rem] flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-surface dark:border-white/5 shadow-lift">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <BotAvatar large />
            <div className="leading-tight">
              <p className="font-bold">{t("botName")}</p>
              <p className="flex items-center gap-1.5 text-xs text-brand-100">
                <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                {t("online")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold transition hover:bg-white/25 active:scale-95"
          >
            <RotateCcw className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t("clear")}</span>
            <span className="sr-only sm:hidden">{t("clear")}</span>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label={t("title")}
          className="bg-dots flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
        >
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {m.role === "bot" ? <BotAvatar /> : <UserAvatar />}
                <div className={`max-w-[85%] space-y-2 ${m.role === "user" ? "items-end" : ""}`}>
                  <p className="sr-only">{m.role === "bot" ? t("botName") : t("you")}:</p>
                  <div
                    dir={m.role === "user" ? "auto" : undefined}
                    className={`whitespace-pre-line rounded-3xl px-4 py-2.5 shadow-sm ${
                      m.role === "user"
                        ? "rounded-ee-md bg-brand-600 text-white"
                        : "rounded-es-md border border-line bg-surface text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.word && <WordBubble word={m.word} />}
                  {m.links && (
                    <div className="flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <ButtonLink key={l.page} href={l.href} className="px-4 py-2 text-sm">
                          {t("openPage", { page: nav(l.page) })}
                          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
                        </ButtonLink>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
              <BotAvatar />
              <div className="flex items-center gap-1.5 rounded-3xl rounded-es-md border border-line bg-surface px-4 py-3.5" role="status">
                <span className="sr-only">{t("typing")}</span>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-2 rounded-full bg-brand-400"
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    aria-hidden
                  />
                ))}
              </div>
            </motion.div>
          )}

          {!typing && last.role === "bot" && last.suggestions && last.suggestions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="ps-10">
              <p className="mb-2 text-xs font-semibold text-muted">{t("tryAsking")}</p>
              <div className="flex flex-wrap gap-2">
                {last.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-100 active:scale-95 dark:border-brand-800 dark:bg-brand-900/40 dark:text-brand-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 border-t border-line bg-surface p-3"
        >
          <label htmlFor="chat-input" className="sr-only">
            {t("inputLabel")}
          </label>
          <input
            ref={inputRef}
            id="chat-input"
            dir="auto"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            autoComplete="off"
            maxLength={300}
            className="min-w-0 flex-1 rounded-2xl border-2 border-line bg-bg px-4 py-3 text-ink outline-none transition focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label={t("send")}
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft transition hover:bg-brand-700 active:scale-90 disabled:opacity-40"
          >
            <SendHorizontal className="size-5 rtl:-scale-x-100" aria-hidden />
          </button>
        </form>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
        <ShieldCheck className="size-4 shrink-0 text-emerald-600" aria-hidden />
        {t("privacy")}
      </p>
    </div>
  );
}

function BotAvatar({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`clay-tile grid shrink-0 place-items-center bg-gradient-to-br from-amber-300 to-orange-500 text-white ${
        large ? "size-11 rounded-2xl" : "size-8 rounded-xl"
      }`}
      aria-hidden
    >
      <Bot className={large ? "size-6" : "size-[18px]"} strokeWidth={2.25} />
    </span>
  );
}

function UserAvatar() {
  return (
    <span className="clay-tile grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 text-white" aria-hidden>
      <UserRound className="size-[18px]" strokeWidth={2.25} />
    </span>
  );
}
