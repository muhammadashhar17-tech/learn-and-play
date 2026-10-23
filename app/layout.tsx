// The real root layout (with <html>) lives in app/[locale]/layout.tsx so that
// `lang` and `dir` can follow the language. This one only passes children
// through; it is required because app/not-found.tsx and app/page.tsx sit at the root.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
