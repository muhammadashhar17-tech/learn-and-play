"use client";

import { useSyncExternalStore } from "react";
import clips from "@/data/audio-manifest.json";
import { withBase } from "./base-path";

/**
 * Reading words aloud. First choice is a recorded clip packed with the app
 * (public/audio, made by scripts/tts) — these work on every phone and laptop,
 * offline, even when the device has no Urdu or Sindhi voice. Text without a
 * clip falls back to the device's own voice (Web Speech API), if it has one.
 */
export type SpeechLang = "en" | "ur" | "sd";

// Preferred BCP-47 tags per language. We never fall back to a different
// language's voice: reading Sindhi with an Urdu voice would teach wrong sounds.
const TAGS: Record<SpeechLang, string[]> = {
  en: ["en-GB", "en-US", "en-IN", "en"],
  ur: ["ur-PK", "ur-IN", "ur"],
  sd: ["sd-PK", "sd-IN", "sd"],
};

const CLIPS: Record<SpeechLang, Set<string>> = {
  en: new Set(clips.en),
  ur: new Set(clips.ur),
  sd: new Set(clips.sd),
};

/** Same text → same key here and in scripts/tts/generate.py (FNV-1a over UTF-8). */
export function speechText(text: string) {
  return text.replace(/[⁦-⁩]/g, "").replace(/\s+/g, " ").trim();
}

export function speechKey(text: string) {
  let h = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(speechText(text))) {
    h ^= byte;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

function clipUrl(text: string, lang: SpeechLang) {
  const key = speechKey(text);
  return CLIPS[lang].has(key) ? withBase(`/audio/${lang}/${key}.mp3`) : null;
}

// ---------- Device voices ----------

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

const EMPTY: SpeechSynthesisVoice[] = [];

function findVoice(voices: SpeechSynthesisVoice[], lang: SpeechLang) {
  for (const tag of TAGS[lang]) {
    const exact = voices.find((v) => v.lang.toLowerCase().replace("_", "-") === tag.toLowerCase());
    if (exact) return exact;
  }
  return voices.find((v) => v.lang.toLowerCase().startsWith(lang));
}

function useDeviceVoice(lang: SpeechLang) {
  const voices = useSyncExternalStore(subscribe, () => cachedVoices, () => EMPTY);
  return findVoice(voices, lang);
}

/** True when this text can be read aloud in this language (recorded clip or device voice). */
export function useCanSay(text: string, lang: SpeechLang) {
  const voice = useDeviceVoice(lang);
  return !!voice || CLIPS[lang].has(speechKey(text));
}

// ---------- Playing ----------

let current: HTMLAudioElement | null = null;

function stop() {
  current?.pause();
  current = null;
  if (supported()) window.speechSynthesis.cancel();
}

function speakWithDevice(text: string, lang: SpeechLang) {
  if (!supported()) return;
  const voice = findVoice(window.speechSynthesis.getVoices(), lang);
  if (!voice) return;
  const u = new SpeechSynthesisUtterance(speechText(text));
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

/** Reads the text aloud: recorded clip first, then the device voice. */
export function say(text: string, lang: SpeechLang) {
  if (typeof window === "undefined") return;
  stop();
  const url = clipUrl(text, lang);
  if (!url) return speakWithDevice(text, lang);
  const audio = new Audio(url);
  current = audio;
  audio.play().catch(() => speakWithDevice(text, lang));
}
