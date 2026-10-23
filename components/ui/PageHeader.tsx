import type { ReactNode } from "react";

export function PageHeader({
  emoji,
  title,
  subtitle,
  width = "max-w-7xl",
  children,
}: {
  /** Match the width of the page content below so left edges line up. */
  width?: string;
  emoji?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-bg dark:from-brand-950/50">
      <div className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className={`relative mx-auto ${width} px-4 py-10 sm:px-6 sm:py-14`}>
        {emoji && (
          <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-surface text-3xl shadow-soft" aria-hidden>
            {emoji}
          </span>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
