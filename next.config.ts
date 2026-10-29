import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Responsive WebP files are pre-built (scripts/make-responsive.py) and served as static
    // assets by the CDN — no runtime optimisation, no per-request cost, no quota.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [256],
  },
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/images/:path*", headers: immutable },
      { source: "/mist/:path*", headers: immutable },
      { source: "/film/:path*", headers: immutable },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
