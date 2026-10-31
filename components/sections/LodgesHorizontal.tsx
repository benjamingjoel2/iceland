"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img, Lodge } from "@/data/types";
import { formatCoordinates } from "@/data/lodges";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";

/**
 * "Our Lodges": an inset landscape grows to full bleed behind a huge serif title,
 * then the section pins and frosted lodge panels (with GPS coordinates) travel
 * horizontally across a textured background as you scroll down.
 */
export function LodgesHorizontal({
  lodges,
  intro,
  heroImage,
  texture,
}: {
  lodges: Lodge[];
  intro: { label: string; body: string };
  heroImage: Img;
  texture: Img;
}) {
  const reduce = useReducedMotion();

  // Part 1 — inset image grows to full bleed
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p1 } = useScroll({ target: introRef, offset: ["start end", "end end"] });
  const inset = useTransform(p1, [0.1, 0.8], ["8% 10% 8% 10%", "0% 0% 0% 0%"]);
  const clip = useTransform(inset, (v) => `inset(${v})`);
  const textOpacity = useTransform(p1, [0.55, 0.85], [0, 1]);

  // Part 2 — pinned horizontal travel
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p2 } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const x = useTransform(p2, [0, 1], ["0%", `-${(lodges.length - 1) * 100 / (lodges.length + 0.6)}%`]);
  const bgX = useTransform(p2, [0, 1], ["0%", "-8%"]);

  return (
    <section aria-labelledby="our-lodges" className="relative bg-white text-white">
      <div ref={introRef} className="relative h-[170vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <m.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
            <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-volcanic/20" />
          </m.div>
          <GridLines tone="light" />
          <div className="relative z-10 grid h-full grid-cols-4 content-center gap-5 px-5 md:grid-cols-12">
            <h2 id="our-lodges" className="t-display col-span-4 text-center md:col-span-6 md:col-start-4">
              Our Lodges
            </h2>
            <m.div className="col-span-4 md:col-span-3 md:col-start-9 md:-mt-[2em]" style={{ opacity: reduce ? 1 : textOpacity }}>
              <h3 className="t-label mb-2">{intro.label}</h3>
              <p className="t-body max-w-[19rem]">{intro.body}</p>
            </m.div>
          </div>
        </div>
      </div>

      {/* Desktop pinned track */}
      <div ref={trackRef} className="relative hidden md:block" style={{ height: `${lodges.length * 85 + 60}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <m.div className="absolute inset-y-0 left-0 w-[115%]" style={{ x: reduce ? 0 : bgX }}>
            <Image src={texture.src} alt="" fill sizes="115vw" className="object-cover" />
            <div className="absolute inset-0 bg-atlantic/25" />
          </m.div>
          <m.ul className="relative z-10 flex h-full items-center gap-[8vw] pl-[30vw]" style={{ x: reduce ? 0 : x }}>
            {lodges.map((l) => (
              <li key={l.slug} className="shrink-0">
                <LodgePanel lodge={l} />
              </li>
            ))}
          </m.ul>
        </div>
      </div>

      {/* Mobile stacked panels */}
      <div className="relative md:hidden">
        <Image src={texture.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-atlantic/25" />
        <ul className="relative z-10 space-y-6 px-3 py-16">
          {lodges.map((l) => (
            <li key={l.slug}>
              <LodgePanel lodge={l} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LodgePanel({ lodge }: { lodge: Lodge }) {
  return (
    <Link
      href={`/lodges/${lodge.slug}`}
      className="group relative flex aspect-[4/3] w-full flex-col items-center overflow-hidden rounded-[6px] bg-white/10 p-5 text-center text-white shadow-[0_30px_80px_-30px_rgba(11,13,16,.6)] backdrop-blur-xl md:w-[min(50vw,720px)]"
    >
      <h3 className="t-h3 relative z-10 mt-2">{lodge.name}</h3>
      <p className="relative z-10 mx-auto mt-3 max-w-[30rem] text-[13px] font-medium leading-snug text-white/90">{lodge.excerpt}</p>
      <div className="absolute inset-x-5 bottom-5 top-[34%] overflow-hidden rounded-[3px]">
        <Image
          src={lodge.hero.src}
          alt={lodge.hero.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
      </div>
      <p className="t-label absolute bottom-9 z-10 tracking-[0.04em]">[ {formatCoordinates(lodge.coordinates)} ]</p>
      <span className="absolute right-8 top-[calc(34%+12px)] z-10">
        <PlaceholderFlag label="Placeholder name" tone="dark" />
      </span>
    </Link>
  );
}
