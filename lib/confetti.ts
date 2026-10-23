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

/** A small sparkle burst coming out of an element (e.g. the correct answer). */
export function burstFrom(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = el.getBoundingClientRect();
  confetti({
    particleCount: 36,
    spread: 70,
    startVelocity: 26,
    ticks: 90,
    scalar: 0.8,
    gravity: 0.9,
    origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
    colors: ["#34d399", "#10b981", "#facc15", "#60a5fa"],
    disableForReducedMotion: true,
  });
}
