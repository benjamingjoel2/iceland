import type { Metadata } from "next";
import { brand } from "@/config/site";

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
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${brand.name}`,
      description,
      url,
      siteName: brand.name,
      type: "website",
      images: image ? [{ url: image, width: 2200, height: 1467 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} · ${brand.name}`, description },
  };
}
