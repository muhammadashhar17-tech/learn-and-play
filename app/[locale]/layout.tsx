import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isRtl, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { metadataBase } from "@/lib/seo";
import { withBase } from "@/lib/base-path";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { InstallPrompt } from "@/components/layout/InstallPrompt";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as "en", namespace: "Meta" });
  return {
    metadataBase,
    title: { default: t("appName"), template: `%s | ${t("appName")}` },
    description: t("home.description"),
    applicationName: t("appName"),
    manifest: withBase("/manifest.webmanifest"),
    icons: {
      icon: [
        { url: withBase("/favicon.ico"), sizes: "any" },
        { url: withBase("/icon.svg"), type: "image/svg+xml" },
      ],
      apple: withBase("/apple-touch-icon.png"),
    },
    appleWebApp: { capable: true, title: t("appName"), statusBarStyle: "default" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1f5fbf" },
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
  ],
};

// Runs before the first paint so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('lp-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Providers locale={locale}>
            <SkipLink />
            <Navbar />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <InstallPrompt />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
