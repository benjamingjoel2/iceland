"use client";

import type { ImageLoaderProps } from "next/image";

/** Widths pre-built by scripts/make-responsive.py. Keep in sync with next.config.ts deviceSizes. */
const WIDTHS = [480, 828, 1200, 1920];

/**
 * Serves pre-generated AVIF files straight from the CDN instead of the runtime image
 * optimiser: /images/name.jpg at width w → /images/r/name-<nearest width ≥ w>.avif.
 * Anything else (film poster, external URLs) is returned untouched.
 */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const m = src.match(/^\/images\/([^/]+)\.jpg$/);
  if (!m) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/images/r/${m[1]}-${w}.avif`;
}
