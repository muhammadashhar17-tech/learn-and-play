import type { Metadata } from "next";
import en from "@/messages/en.json";
import { fontVariables } from "@/lib/fonts";
import { GlobalNotFound } from "@/components/layout/GlobalNotFound";
import "./globals.css";

export const metadata: Metadata = {
  title: `${en.NotFound.code} | ${en.Meta.appName}`,
  robots: { index: false },
};

// Static hosts serve this as 404.html for every unknown URL. The language is
// picked on the client from the URL (/ur/..., /sd/...) or the saved choice.
export default function NotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('lp-theme')==='dark'||(!localStorage.getItem('lp-theme')&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <GlobalNotFound />
      </body>
    </html>
  );
}
