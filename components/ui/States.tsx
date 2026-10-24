import type { ReactNode } from "react";
import { CloudAlert, type LucideIcon } from "lucide-react";
import { ClayIcon } from "./ClayIcon";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-2xl ${className}`} aria-hidden />;
}

export function EmptyState({
  icon,
  tile = "from-brand-400 to-brand-700",
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  tile?: string;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[1.75rem] border-2 border-white bg-surface px-6 py-12 text-center shadow-soft dark:border-white/5">
      <ClayIcon icon={icon} tile={tile} size="lg" className="animate-float" />
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      {text && <p className="mt-1 max-w-md text-sm text-muted">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-3xl border border-rose-200 bg-rose-50 px-6 py-12 text-center dark:border-rose-900/60 dark:bg-rose-950/30"
    >
      <ClayIcon icon={CloudAlert} tile="from-rose-400 to-rose-600" size="lg" />
      <h2 className="mt-4 text-xl font-bold text-ink">{title}</h2>
      <p className="mt-1 max-w-md text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
