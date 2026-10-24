import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  // Claymorphism buttons: glossy gradient with a pressable lip (see .btn-clay in globals.css).
  primary: "btn-shine btn-clay bg-gradient-to-b from-brand-500 to-brand-700 text-white hover:from-brand-400 hover:to-brand-700",
  secondary:
    "border-2 border-white bg-surface text-ink shadow-soft hover:text-brand-700 dark:border-white/5 dark:hover:text-brand-200",
  ghost: "text-brand-700 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40",
  danger: "btn-clay bg-gradient-to-b from-rose-500 to-rose-700 text-white hover:from-rose-400",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${BASE} ${VARIANTS[variant]} ${extra}`;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
