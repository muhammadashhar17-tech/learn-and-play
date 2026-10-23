"use client";

import confetti from "canvas-confetti";

/** A short celebratory burst from both sides. Skipped when the user prefers reduced motion. */
export function celebrate() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#1f5fbf", "#60a5fa", "#facc15", "#34d399", "#f472b6"];
  const end = Date.now() + 900;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.55 }, colors, scalar: 1.1 });
}
