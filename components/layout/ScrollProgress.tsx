"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar under the navbar that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-brand-500 via-sky-400 to-violet-500 rtl:origin-right"
    />
  );
}
