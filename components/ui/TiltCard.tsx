"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Card that tilts gently in 3D towards the mouse, with a soft light spotlight
 * following the cursor. Does nothing on touch screens or with reduced motion.
 */
export function TiltCard({
  children,
  className = "",
  max = 7,
  glow = "rgb(255 255 255 / 0.55)",
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Spotlight colour. */
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const mx = useTransform(px, (v) => `${v * 100}%`);
  const my = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx} ${my}, ${glow}, transparent 45%)`;
  const opacity = useMotionValue(0);
  const spotOpacity = useSpring(opacity, { stiffness: 200, damping: 25 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    opacity.set(1);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
    opacity.set(0);
  }

  return (
    <div className="h-full [perspective:900px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: spotlight, opacity: spotOpacity }}
        />
      </motion.div>
    </div>
  );
}
