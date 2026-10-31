import type { MetadataRoute } from "next";
import { brand } from "@/config/site";
import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { regions } from "@/data/regions";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, brand.url).toString();
  const statics = ["/", "/journeys", "/lodges", "/iceland", "/prices", "/enquire", "/about", "/faq", "/journal"];
  return [
    ...statics.map((p) => ({ url: u(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...journeys.map((j) => ({ url: u(`/journeys/${j.slug}`), priority: 0.9 })),
    ...lodges.map((l) => ({ url: u(`/lodges/${l.slug}`), priority: 0.7 })),
    ...regions.map((r) => ({ url: u(`/iceland/${r.slug}`), priority: 0.7 })),
    ...posts.map((p) => ({ url: u(`/journal/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
