import type { PostMeta } from "./types";
import { metadata as summerWinter } from "@/content/journal/summer-or-winter-in-iceland.mdx";
import { metadata as northernLights } from "@/content/journal/how-to-see-the-northern-lights.mdx";
import { metadata as iceCaves } from "@/content/journal/inside-icelands-blue-ice-caves.mdx";
import { metadata as highlands } from "@/content/journal/why-the-highlands-are-icelands-best-kept-secret.mdx";

/** Journal index, newest first. Post bodies live in /content/journal/*.mdx. */
export const posts: PostMeta[] = ([summerWinter, northernLights, iceCaves, highlands] as PostMeta[]).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
