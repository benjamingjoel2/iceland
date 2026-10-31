"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { seasons } from "@/data/seasons";
import type { SeasonKey } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";
import { VerifyFlag } from "@/components/ui/Flag";

/**
 * "Two Seasons": small condensed label and copy floating over the top of a full-bleed
 * landscape that rises out of white. Hovering or focusing a season crossfades the image.
 */
export function SeasonsBlock() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<SeasonKey>("summer");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const current = seasons.find((s) => s.key === active) ?? seasons[0];

  return (
    <section id="seasons" ref={ref} className="relative min-h-[150vh] overflow-hidden bg-white text-atlantic md:min-h-[170vh]">
      <m.div className="absolute inset-x-0 bottom-0 top-[18vh]" style={{ y: reduce ? 0 : y }}>
        <AnimatePresence mode="sync">
          <m.div
            key={current.key}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="object-cover" />
          </m.div>
        </AnimatePresence>
      </m.div>
      {/* white fade at the top so the image rises out of the page */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-white via-white/85 to-transparent" />
      <GridLines />

      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 pt-[8vh] md:grid-cols-12">
        <div className="col-span-4 md:col-span-3 md:col-start-2">
          <h2 className="t-label mb-3">Two Seasons</h2>
          <ul className="space-y-6">
            {seasons.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(s.key)}
                  onFocus={() => setActive(s.key)}
                  onClick={() => setActive(s.key)}
                  aria-pressed={active === s.key}
                  className={`block text-left transition-opacity ${active === s.key ? "opacity-100" : "opacity-55 hover:opacity-90"}`}
                >
                  <span className="t-eyebrow block text-[17px]">
                    {s.name} <span className="font-sans text-[12px] not-italic tracking-wide">· {s.months}</span>
                  </span>
                  <span className="t-body mt-1 block max-w-[19rem]">{s.body}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <VerifyFlag note={current.verify} />
          </div>
        </div>
      </div>
    </section>
  );
}
