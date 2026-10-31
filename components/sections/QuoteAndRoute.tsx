"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img } from "@/data/types";
import { CloudLayers } from "@/components/motion/CloudLayers";
import { GridLines } from "@/components/ui/GridLines";

/**
 * A pinned full-bleed image carrying a giant route code ("LHR · JFK – KEF") that fades up,
 * then a mist bank that turns the screen white.
 */
export function QuoteAndRoute({
  image,
  route,
}: {
  image: Img;
  route: { from: string; to: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const codeOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 0.85]);
  const codeY = useTransform(scrollYProgress, [0.08, 0.9], ["30%", "-30%"]);
  const clouds = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const white = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section ref={ref} className="relative h-[240vh] bg-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <m.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-atlantic/35" />
        </m.div>
        <GridLines tone="light" />

        <m.h2
          className="t-route absolute inset-x-0 top-[30%] z-10 whitespace-nowrap text-center text-white"
          style={{ opacity: codeOpacity, y: reduce ? 0 : codeY }}
          aria-label={`${route.from} to ${route.to}`}
        >
          <span className="block text-[0.42em] md:inline md:text-[0.5em]">{route.from}</span>
          <span className="md:mx-[0.12em]"> – </span>
          {route.to}
        </m.h2>

        <CloudLayers progress={clouds} className="z-20" />
        <m.div aria-hidden className="absolute inset-0 z-30 bg-white" style={{ opacity: white }} />
      </div>
    </section>
  );
}
