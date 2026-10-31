import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./(en)/globals.css";

// Unmatched URLs outside every locale (there is no single root layout, see app/(en) and the
// generated app/fr, app/de, app/es). Matched routes use each locale's own not-found page.
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });

export const metadata: Metadata = {
  title: "Page not found · Edge of North",
  robots: { index: false },
};

const homes = [
  { href: "/", lang: "en", label: "Return home" },
  { href: "/fr", lang: "fr", label: "Retour à l’accueil" },
  { href: "/de", lang: "de", label: "Zur Startseite" },
  { href: "/es", lang: "es", label: "Volver al inicio" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="bg-volcanic text-white">
        <main className="flex min-h-[100svh] items-center justify-center px-6 text-center">
          <div>
            <p className="t-eyebrow text-[20px]">Where the map runs out</p>
            <h1 className="t-display mt-2">Page not found</h1>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {homes.map((h) => (
                <li key={h.lang}>
                  <a href={h.href} lang={h.lang} hrefLang={h.lang} className="inline-flex h-11 items-center border-y border-white/40 px-6 text-[13px] font-medium hover:bg-white hover:text-atlantic">
                    {h.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
