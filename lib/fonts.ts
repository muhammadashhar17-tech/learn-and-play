import { Noto_Naskh_Arabic, Noto_Nastaliq_Urdu, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// The Arabic-script fonts are used on every page (flashcards show all three
// languages), but they are large, so we let the browser fetch them on demand.
// Only the regular weight: the bold Nastaliq file breaks some joins (e.g. "سندھی"
// renders as "سند  ھی"), so the browser makes bold text from the regular one.
export const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-nastaliq",
  display: "swap",
  preload: false,
});

export const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
  preload: false,
});

export const fontVariables = `${poppins.variable} ${nastaliq.variable} ${naskh.variable}`;
