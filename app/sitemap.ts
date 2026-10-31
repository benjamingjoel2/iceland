import type { MetadataRoute } from "next";
import { brand } from "@/config/site";
import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { regions } from "@/data/regions";
import { posts } from "@/data/posts";

const LOCALES = ["fr", "de", "es"] as const;

/** Every page in English (unprefixed) and in French, German and Spanish, each with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, brand.url).toString();
  const at = (l: string, p: string) => u(p === "/" ? `/${l}` : `/${l}${p}`);
  const statics = ["/", "/journeys", "/lodges", "/iceland", "/prices", "/enquire", "/about", "/faq", "/journal"];
  const pages: (Omit<MetadataRoute.Sitemap[number], "url"> & { path: string })[] = [
    ...statics.map((p) => ({ path: p, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...journeys.map((j) => ({ path: `/journeys/${j.slug}`, priority: 0.9 })),
    ...lodges.map((l) => ({ path: `/lodges/${l.slug}`, priority: 0.7 })),
    ...regions.map((r) => ({ path: `/iceland/${r.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ path: `/journal/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
  return pages.flatMap(({ path, ...entry }) => {
    const languages = { en: u(path), fr: at("fr", path), de: at("de", path), es: at("es", path), "x-default": u(path) };
    return [u(path), ...LOCALES.map((l) => at(l, path))].map((url) => ({ ...entry, url, alternates: { languages } }));
  });
}
