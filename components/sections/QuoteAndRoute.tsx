"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img } from "@/data/types";
import { CloudLayers } from "@/components/motion/CloudLayers";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";

/**
 * A pinned full-bleed image carrying, in turn: a writer's quote, then a giant route code
 * ("LHR · JFK – KEF") that fades up, then a mist bank that turns the screen white.
 */
export function QuoteAndRoute({
  image,
  quote,
  route,
}: {
  image: Img;
  quote: { text: string; author: string; placeholder?: boolean };
  route: { from: string; to: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const codeOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.85]);
  const codeY = useTransform(scrollYProgress, [0.3, 0.9], ["30%", "-30%"]);
  const clouds = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const white = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-atlantic/35" />
        </motion.div>
        <GridLines tone="light" />

        <motion.figure className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white" style={{ opacity: quoteOpacity }}>
          <div className="max-w-[34rem]">
            <span aria-hidden className="t-eyebrow block text-[22px]">“</span>
            <blockquote className="t-quote mt-3 text-[clamp(1.4rem,1.9vw,1.75rem)]">{quote.text}</blockquote>
            <figcaption className="mt-5 font-display text-[11px] uppercase tracking-[0.25em]">
              <span aria-hidden className="block">-</span>
              {quote.author}
              {quote.placeholder ? (
                <span className="mt-3 block">
                  <PlaceholderFlag label="Placeholder — choose a real, attributed quote" tone="dark" />
                </span>
              ) : null}
            </figcaption>
          </div>
        </motion.figure>

        <motion.h2
          className="t-route absolute inset-x-0 top-[30%] z-10 whitespace-nowrap text-center text-white"
          style={{ opacity: codeOpacity, y: reduce ? 0 : codeY }}
          aria-label={`${route.from} to ${route.to}`}
        >
          <span className="block text-[0.42em] md:inline md:text-[0.5em]">{route.from}</span>
          <span className="md:mx-[0.12em]"> – </span>
          {route.to}
        </motion.h2>

        <CloudLayers progress={clouds} className="z-20" />
        <motion.div aria-hidden className="absolute inset-0 z-30 bg-white" style={{ opacity: white }} />
      </div>
    </section>
  );
}
