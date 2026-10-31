"use client";

import { usePathname } from "next/navigation";

const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "es", label: "ES", name: "Español" },
] as const;

/** Splits "/fr/journeys/x" into ["fr", "/journeys/x"]; English has no prefix. */
function split(pathname: string): [string, string] {
  const m = pathname.match(/^\/(fr|de|es)(?=\/|$)(.*)$/);
  return m ? [m[1], m[2] || "/"] : ["en", pathname || "/"];
}

/**
 * EN · FR · DE · ES: each links to the same page in that language (plain links, no redirects
 * by browser language). Styled like the header's frosted buttons.
 */
export function LanguageSwitcher({ variant = "glass" }: { variant?: "glass" | "glass-light" | "light" }) {
  const [current, rest] = split(usePathname() || "/");
  const shell =
    variant === "glass" ? "glass text-white" : variant === "glass-light" ? "glass-light text-atlantic" : "bg-glacier text-atlantic";
  return (
    <nav aria-label="Language">
      <ul className={`flex h-9 items-center rounded-[2px] px-1.5 text-[12px] font-medium tracking-[0.04em] ${shell}`}>
        {LOCALES.map((l, i) => {
          const href = l.code === "en" ? rest : `/${l.code}${rest === "/" ? "" : rest}`;
          const active = l.code === current;
          return (
            <li key={l.code} className="flex items-center">
              {i > 0 ? <span aria-hidden className="opacity-50">·</span> : null}
              <a
                href={href}
                hrefLang={l.code}
                lang={l.code}
                title={l.name}
                aria-current={active ? "page" : undefined}
                className={`rounded-[2px] px-1.5 py-1 transition-opacity hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-aurora ${
                  active ? "underline decoration-1 underline-offset-4" : "opacity-80 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
