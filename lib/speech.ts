"use client";

import { useSyncExternalStore } from "react";

/**
 * Text-to-speech with the browser's built-in Web Speech API (free, offline on
 * most devices). Many devices have no Urdu or Sindhi voice, so callers should
 * only show a "Listen" button when `useVoice(lang)` returns a voice.
 */
export type SpeechLang = "en" | "ur" | "sd";

// Preferred BCP-47 tags per language. We never fall back to a different
// language's voice: reading Sindhi with an Urdu voice would teach wrong sounds.
const TAGS: Record<SpeechLang, string[]> = {
  en: ["en-GB", "en-US", "en-IN", "en"],
  ur: ["ur-PK", "ur-IN", "ur"],
  sd: ["sd-PK", "sd-IN", "sd"],
};

const supported = () => typeof window !== "undefined" && "speechSynthesis" in window;

let cachedVoices: SpeechSynthesisVoice[] = [];

function subscribe(cb: () => void) {
  if (!supported()) return () => {};
  const update = () => {
    cachedVoices = window.speechSynthesis.getVoices();
    cb();
  };
  window.speechSynthesis.addEventListener("voiceschanged", update);
  update();
  return () => window.speechSynthesis.removeEventListener("voiceschanged", update);
}

function getSnapshot() {
  return cachedVoices;
}

const EMPTY: SpeechSynthesisVoice[] = [];

function findVoice(voices: SpeechSynthesisVoice[], lang: SpeechLang) {
  for (const tag of TAGS[lang]) {
    const exact = voices.find((v) => v.lang.toLowerCase().replace("_", "-") === tag.toLowerCase());
    if (exact) return exact;
  }
  return voices.find((v) => v.lang.toLowerCase().startsWith(lang));
}

export function useVoice(lang: SpeechLang): SpeechSynthesisVoice | undefined {
  const voices = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return findVoice(voices, lang);
}

export function speak(text: string, voice: SpeechSynthesisVoice) {
  if (!supported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 0.85;
  synth.speak(u);
}
