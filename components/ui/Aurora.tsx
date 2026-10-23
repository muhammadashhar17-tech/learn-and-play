/** Slowly drifting, blurred colour blobs behind a section (pure CSS, pauses for reduced motion). */
export function Aurora({ variant = "hero" }: { variant?: "hero" | "header" | "dark" }) {
  const blobs =
    variant === "dark"
      ? ["bg-sky-400/40", "bg-violet-400/30", "bg-white/20"]
      : ["bg-brand-300/45 dark:bg-brand-600/30", "bg-sky-300/40 dark:bg-sky-500/20", "bg-violet-300/35 dark:bg-violet-500/20"];
  const size = variant === "header" ? ["size-80", "size-72", "size-64"] : ["size-[30rem]", "size-[26rem]", "size-[22rem]"];
  return (
    <div className="aurora -z-10" aria-hidden>
      <span className={`${blobs[0]} ${size[0]} -top-24 end-[-6%]`} />
      <span className={`${blobs[1]} ${size[1]} -bottom-24 start-[-8%]`} />
      <span className={`${blobs[2]} ${size[2]} top-1/3 start-1/3`} />
    </div>
  );
}
