import type { Metadata } from "next";
import en from "@/messages/en.json";
import ur from "@/messages/ur.json";
import sd from "@/messages/sd.json";
import { LOCALE_STORAGE_KEY, routing } from "@/i18n/routing";
import { withBase } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
  title: en.Meta.appName,
  robots: { index: false },
};

// "/" has no language of its own: send the visitor to the language they used
// last time (saved in localStorage), else their browser language, else English.
const redirectScript = `(function(){var L=${JSON.stringify(routing.locales)},d='${routing.defaultLocale}',l=null;try{l=localStorage.getItem('${LOCALE_STORAGE_KEY}')}catch(e){}if(L.indexOf(l)<0){var n=(navigator.language||'').slice(0,2).toLowerCase();l=L.indexOf(n)>=0?n:d}location.replace('${withBase("/")}'+l+'/')})();`;

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0;url=${withBase(`/${routing.defaultLocale}/`)}`} />
        </noscript>
      </head>
      <body className="grid min-h-dvh place-items-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className="size-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"
            role="status"
            aria-label={en.App.redirecting}
          />
          <a href={withBase(`/${routing.defaultLocale}/`)} className="font-semibold text-brand-600">
            {en.App.name} · <span lang="ur">{ur.App.name}</span> ·{" "}
            <span lang="sd">{sd.App.name}</span>
          </a>
        </div>
      </body>
    </html>
  );
}
