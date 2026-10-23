"use client";

import { settingsStore } from "./progress";

/**
 * Small sound effects made with the Web Audio API — no audio files to
 * download, so they work offline and cost nothing.
 */
type Note = { freq: number; start: number; dur: number; type?: OscillatorType; gain?: number };

const SOUNDS: Record<"correct" | "wrong" | "tick" | "click" | "win" | "flip", Note[]> = {
  correct: [
    { freq: 660, start: 0, dur: 0.12, type: "triangle" },
    { freq: 880, start: 0.1, dur: 0.18, type: "triangle" },
  ],
  wrong: [
    { freq: 220, start: 0, dur: 0.18, type: "sawtooth", gain: 0.08 },
    { freq: 160, start: 0.15, dur: 0.25, type: "sawtooth", gain: 0.08 },
  ],
  tick: [{ freq: 1200, start: 0, dur: 0.04, type: "square", gain: 0.04 }],
  click: [{ freq: 520, start: 0, dur: 0.05, type: "sine", gain: 0.1 }],
  flip: [{ freq: 420, start: 0, dur: 0.08, type: "sine", gain: 0.08 }],
  win: [
    { freq: 523, start: 0, dur: 0.15, type: "triangle" },
    { freq: 659, start: 0.13, dur: 0.15, type: "triangle" },
    { freq: 784, start: 0.26, dur: 0.15, type: "triangle" },
    { freq: 1047, start: 0.39, dur: 0.35, type: "triangle" },
  ],
};

let ctx: AudioContext | null = null;

export function playSound(name: keyof typeof SOUNDS) {
  if (typeof window === "undefined" || settingsStore.get().muted) return;
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    for (const n of SOUNDS[name]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = n.type ?? "sine";
      osc.frequency.value = n.freq;
      const peak = n.gain ?? 0.15;
      gain.gain.setValueAtTime(0.0001, now + n.start);
      gain.gain.exponentialRampToValueAtTime(peak, now + n.start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur + 0.02);
    }
  } catch {
    /* audio not available — stay silent */
  }
}

export function toggleMute() {
  settingsStore.set((s) => ({ ...s, muted: !s.muted }));
}
