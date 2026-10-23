import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lp-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1f5fbf" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#lp-logo)" />
      <path d="M14 20c6-3 12-3 18 1v25c-6-4-12-4-18-1z" fill="#fff" />
      <path d="M50 20c-6-3-12-3-18 1v25c6-4 12-4 18-1z" fill="#dbeafe" />
      <path d="M38 28l8 5-8 5z" fill="#facc15" />
    </svg>
  );
}

export function Logo() {
  const t = useTranslations("App");
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-2xl"
      aria-label={t("homeLink")}
    >
      <LogoMark className="size-10 shrink-0 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
      <span className="hidden whitespace-nowrap text-base font-extrabold tracking-tight text-ink min-[440px]:inline sm:text-lg">
        {t("name")}
      </span>
    </Link>
  );
}
