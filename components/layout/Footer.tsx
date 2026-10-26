import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { InstallButton } from "./InstallButton";
import { LogoMark } from "./Logo";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const app = useTranslations("App");
  const year = new Date().getFullYear();

  const explore = NAV_ITEMS.filter((i) => ["quiz", "learn", "chat", "progress"].includes(i.key));
  const more = NAV_ITEMS.filter((i) => ["leaderboard", "about", "contact"].includes(i.key));

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-10" />
            <span className="text-lg font-extrabold text-ink">{app("name")}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">{t("blurb")}</p>
          <InstallButton />
        </div>

        <FooterColumn title={t("explore")}>
          {explore.map((i) => (
            <FooterLink key={i.key} href={i.href}>
              {nav(i.key)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t("more")}>
          {more.map((i) => (
            <FooterLink key={i.key} href={i.href}>
              {nav(i.key)}
            </FooterLink>
          ))}
          <FooterLink href="/contact#faq">{t("faq")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted sm:flex-row sm:px-6">
          <p>{t("rights", { year })}</p>
          <p className="flex items-center gap-1.5">
            {t("madeWith")}
            <Heart className="size-4 fill-rose-500 text-rose-500" aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-ink">{title}</h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition hover:text-brand-600 dark:hover:text-brand-300"
      >
        {children}
      </Link>
    </li>
  );
}
