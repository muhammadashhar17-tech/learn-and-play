import type { LucideIcon } from "lucide-react";

const SIZES = {
  xs: { box: "size-8 rounded-lg", icon: "size-4" },
  sm: { box: "size-10 rounded-xl", icon: "size-5" },
  md: { box: "size-14 rounded-2xl", icon: "size-7" },
  lg: { box: "size-20 rounded-3xl", icon: "size-10" },
} as const;

/** A Lucide icon on a glossy gradient "clay" tile. Decorative — hidden from screen readers. */
export function ClayIcon({
  icon: Icon,
  tile,
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  /** Tailwind gradient stops, e.g. "from-sky-400 to-brand-600". */
  tile: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={`clay-tile grid shrink-0 place-items-center bg-gradient-to-br text-white ${tile} ${s.box} ${className}`} aria-hidden>
      <Icon className={`${s.icon} drop-shadow-sm`} strokeWidth={2.25} />
    </span>
  );
}
