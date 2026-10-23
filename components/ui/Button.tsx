import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-lift",
  secondary:
    "border border-line bg-surface text-ink hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-200",
  ghost: "text-brand-700 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
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
