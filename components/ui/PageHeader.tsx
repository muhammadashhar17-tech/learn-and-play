import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Aurora } from "./Aurora";
import { ClayIcon } from "./ClayIcon";

export function PageHeader({
  icon,
  tile = "from-brand-400 to-brand-700",
  title,
  subtitle,
  width = "max-w-7xl",
  children,
}: {
  /** Match the width of the page content below so left edges line up. */
  width?: string;
  icon?: LucideIcon;
  /** Gradient for the icon tile. */
  tile?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-bg dark:from-brand-950/50">
      <Aurora variant="header" />
      <div className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className={`relative mx-auto ${width} px-4 py-10 sm:px-6 sm:py-14`}>
        {icon && <ClayIcon icon={icon} tile={tile} className="animate-float mb-5" />}
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
