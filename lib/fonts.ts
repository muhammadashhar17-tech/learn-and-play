import { DM_Sans, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu, Nunito } from "next/font/google";

// English: DM Sans for reading, Nunito (rounded, friendly) for headings and numbers —
// the "claymorphism / children's education" pairing from the UI/UX Pro Max skill.
export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-nunito",
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

export const fontVariables = `${dmSans.variable} ${nunito.variable} ${nastaliq.variable} ${naskh.variable}`;
