import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Nav");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
    >
      {t("skipToContent")}
    </a>
  );
}
