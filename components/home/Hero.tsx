"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, BookOpen, Brain, CheckCircle2, MessageCircle, Palette, Pencil, Ruler, Sparkles, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { FRUITS } from "@/data/lessons/words";

const MANGO = FRUITS[0];
const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const t = useTranslations("Home.hero");
  const reduce = useReducedMotion();

  // Pointer position over the hero, -1…1, smoothed — drives the parallax cards.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <section
      className="relative isolate overflow-hidden"
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-brand-100/80 via-bg to-bg dark:from-brand-950/80" aria-hidden />
      <Aurora />
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <FloatingDoodles x={sx} y={sy} />
      {/* Fade the colourful background into the page instead of ending in a hard line. */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-bg" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-16 lg:grid-cols-2 lg:pb-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="relative inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-200 backdrop-blur dark:text-brand-200 dark:ring-brand-800"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("badge")}
            <Sparkles className="size-4 text-amber-500" aria-hidden />
          </motion.p>
          <motion.h1 variants={item} className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t("titleStart")} <RotatingWords words={t.raw("rotating") as string[]} />
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
            {t("subtitle")}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quiz" className="group px-6 py-3.5 text-lg">
              <Brain className="size-5 transition-transform group-hover:-rotate-12 group-hover:scale-110" aria-hidden />
              {t("ctaQuiz")}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/learn" variant="secondary" className="group px-6 py-3.5 text-lg backdrop-blur">
              <BookOpen className="size-5 transition-transform group-hover:-rotate-6 group-hover:scale-110" aria-hidden />
              {t("ctaLearn")}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <HeroIllustration x={sx} y={sy} />
      </div>
    </section>
  );
}

/** Cycles through a few cheerful endings for the headline. */
function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className="relative block">
      {/* Invisible longest phrase reserves the height/width so the layout never jumps. */}
      <span className="invisible block" aria-hidden>
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-gradient-animated absolute inset-x-0 top-0 block pb-2"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** A layer that follows the pointer by `depth` px and bobs gently up and down. */
function Parallax({
  x,
  y,
  depth,
  float = 10,
  duration = 6,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  float?: number;
  duration?: number;
  className: string;
  children: ReactNode;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      <motion.div
        animate={{ y: [0, -float, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function FloatingDoodles({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const doodles = [
    { icon: Pencil, c: "start-[3%] bottom-[6%] hidden sm:block", tile: "from-amber-300 to-orange-400", d: -30, dur: 7 },
    { icon: Star, c: "start-[44%] top-[8%]", tile: "from-yellow-300 to-amber-400", d: 22, dur: 5 },
    { icon: Ruler, c: "start-[40%] bottom-[10%] hidden lg:block", tile: "from-sky-300 to-brand-500", d: -18, dur: 8 },
    { icon: Palette, c: "end-[4%] bottom-[8%] hidden md:block", tile: "from-pink-300 to-rose-500", d: 26, dur: 6.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {doodles.map((d, i) => (
        <Parallax key={i} x={x} y={y} depth={d.d} float={14} duration={d.dur} className={`absolute opacity-80 ${d.c}`}>
          <span className={`clay-tile grid size-11 rotate-[-8deg] place-items-center rounded-2xl bg-gradient-to-br text-white ${d.tile}`}>
            <d.icon className="size-5" strokeWidth={2.5} />
          </span>
        </Parallax>
      ))}
    </div>
  );
}

function HeroIllustration({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const t = useTranslations("Home.hero");
  return (
    <div role="img" aria-label={t("illustration")} className="relative mx-auto h-[29rem] w-full max-w-md sm:h-[27rem]">
      {/* Glow behind the cards */}
      <div className="absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-brand-400/40 via-sky-300/30 to-violet-400/30 blur-3xl" aria-hidden />

      {/* Quiz card */}
      <Parallax x={x} y={y} depth={-14} float={8} duration={7} className="absolute start-0 top-4 w-[78%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
          className="rounded-[1.75rem] border-2 border-white bg-surface/95 p-5 shadow-lift backdrop-blur-md dark:border-white/10"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-200">
              <Brain className="size-3.5" aria-hidden />
              {t("cardQuizLabel")}
            </span>
            <span className="font-latin text-sm font-bold text-muted">3/10</span>
          </div>
          <p className="mt-3 font-bold text-ink">{t("cardQuestion")}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 rtl:bg-gradient-to-l"
              initial={{ width: "0%" }}
              animate={{ width: "30%" }}
              transition={{ delay: 0.9, duration: 1.2, ease: EASE }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 15 }}
            className="ring-pulse mt-3 flex items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
          >
            <CheckCircle2 className="size-5 shrink-0" aria-hidden />
            {t("cardAnswer")}
          </motion.div>
        </motion.div>
      </Parallax>

      {/* Flashcard */}
      <Parallax x={x} y={y} depth={24} float={14} duration={6} className="absolute bottom-12 end-0 w-[52%] sm:bottom-6 sm:w-[56%]">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateY: 90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 110, damping: 14 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 p-5 text-center text-white shadow-lift"
        >
          <div className="absolute -end-8 -top-8 size-24 rounded-full bg-white/15" aria-hidden />
          <span className="relative text-xs font-bold uppercase tracking-wider text-brand-100">{t("cardFlash")}</span>
          <div className="relative mt-1 text-5xl drop-shadow" aria-hidden>{MANGO.emoji}</div>
          <p className="font-sindhi relative mt-1 text-2xl font-bold" lang="sd">{MANGO.sd}</p>
          <p className="font-latin relative text-sm text-brand-100">
            {MANGO.en} · <span className="font-urdu" lang="ur">{MANGO.ur}</span>
          </p>
        </motion.div>
      </Parallax>

      {/* Chat bubble */}
      <Parallax x={x} y={y} depth={-8} float={6} duration={5} className="absolute bottom-0 start-2 max-w-[60%] sm:bottom-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 120, damping: 14 }}
          className="flex items-end gap-2"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-soft">
            <MessageCircle className="size-5" aria-hidden />
          </span>
          <span className="rounded-2xl rounded-es-sm border border-white/60 bg-surface/90 px-4 py-2.5 text-sm font-semibold text-ink shadow-soft backdrop-blur-md dark:border-white/10">
            {t("cardChat")}
          </span>
        </motion.div>
      </Parallax>

      {/* Points pop */}
      <Parallax x={x} y={y} depth={32} float={10} duration={4.5} className="absolute end-6 top-0">
        <motion.span
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 12 }}
          className="block rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-3 py-1.5 text-sm font-extrabold text-amber-950 shadow-lift"
        >
          <Star className="me-1 inline size-4 fill-current align-[-2px]" aria-hidden />
          {t("cardPoints")}
        </motion.span>
      </Parallax>
    </div>
  );
}
