import type { Metadata } from "next";
import { brand } from "@/config/site";

const LOCALE_PREFIX = /^\/(fr|de|es)(?=\/|$)/;

/**
 * Canonical and hreflang alternates for a page. `path` may carry a locale prefix
 * ("/fr/journeys"): the French, German and Spanish builds pass their own prefixed paths.
 */
export function pageAlternates({ path }: { path: string }): NonNullable<Metadata["alternates"]> {
  const base = path.replace(LOCALE_PREFIX, "") || "/";
  const abs = (p: string) => new URL(p, brand.url).toString();
  const at = (l: string) => abs(base === "/" ? `/${l}` : `/${l}${base}`);
  return {
    canonical: abs(path),
    languages: { en: abs(base), fr: at("fr"), de: at("de"), es: at("es"), "x-default": abs(base) },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = new URL(path, brand.url).toString();
  return {
    title,
    description,
    alternates: pageAlternates({ path }),
    openGraph: {
      title: `${title} · ${brand.name}`,
      description,
      url,
      siteName: brand.name,
      locale: "en_GB",
      type: "website",
      images: image ? [{ url: image, width: 2200, height: 1467 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} · ${brand.name}`, description },
  };
}
