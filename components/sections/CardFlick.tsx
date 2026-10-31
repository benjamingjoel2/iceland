"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import type { Journey } from "@/data/types";
import { seasonLabel } from "@/data/seasons";
import { Price } from "@/components/ui/Price";

/**
 * Journey "card flick": one expanded card with italic title, price, season tag and
 * excerpt; the rest collapse to blurred image strips. Hover or focus a strip to open it.
 * Auto-advances slowly (paused on hover and under reduced motion). Mobile: swipe row.
 */
export function CardFlick({ items, tone = "light" }: { items: Journey[]; tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [reduce, paused, items.length]);

  return (
    <div className={tone === "dark" ? "text-white" : ""}>
      {/* Desktop */}
      <div
        className="hidden h-[min(72vh,600px)] gap-0 px-2 md:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((j, i) => {
          const open = i === active;
          return (
            <div
              key={j.slug}
              className="relative h-full min-w-0 overflow-hidden"
              style={{ flexGrow: open ? 7 : 1, flexBasis: 0, transition: "flex-grow 900ms cubic-bezier(.65,0,.35,1)" }}
              onMouseEnter={() => setActive(i)}
            >
              <Link
                href={`/journeys/${j.slug}`}
                onFocus={() => setActive(i)}
                className="group absolute inset-0 block text-white"
                aria-label={`${j.title} — ${seasonLabel[j.season]}`}
              >
                <Image
                  src={j.card.src}
                  alt={j.card.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className={`object-cover transition-[filter,transform] duration-[1200ms] ${open ? "scale-100 blur-0" : "scale-110 blur-[10px]"}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-volcanic/55 via-volcanic/5 to-volcanic/25 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-40"}`} />
                <m.div
                  className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10"
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={{ duration: open ? 0.8 : 0.25, delay: open ? 0.35 : 0 }}
                  aria-hidden={!open}
                >
                  <h3 className="t-italic-title w-[18ch] font-normal">
                    {j.cardTitle[0]}
                    {j.cardTitle[1] ? (
                      <>
                        <br />
                        {j.cardTitle[1]}
                      </>
                    ) : null}
                  </h3>
                  <div className="max-w-[23rem]">
                    <p className="mb-3 flex items-center gap-3 text-[13px] font-semibold">
                      <Price usd={j.priceFromUSD} />
                      <span className="h-3.5 w-px bg-white/60" />
                      <span>{j.seasonLabel}</span>
                    </p>
                    <p className="text-[14px] font-medium leading-[1.45] text-white/90">{j.excerpt}</p>
                  </div>
                </m.div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] md:hidden">
        {items.map((j) => (
          <Link key={j.slug} href={`/journeys/${j.slug}`} className="relative aspect-[3/4] w-[84vw] shrink-0 snap-center overflow-hidden text-white">
            <Image src={j.card.src} alt={j.card.alt} fill sizes="84vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-volcanic/65 via-transparent to-volcanic/30" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <h3 className="t-italic-title text-[2rem]">
                {j.cardTitle[0]}
                {j.cardTitle[1] ? (
                  <>
                    <br />
                    {j.cardTitle[1]}
                  </>
                ) : null}
              </h3>
              <div>
                <p className="mb-2 flex items-center gap-3 text-[13px] font-semibold">
                  <Price usd={j.priceFromUSD} />
                  <span className="h-3.5 w-px bg-white/60" />
                  <span>{j.seasonLabel}</span>
                </p>
                <p className="text-[14px] leading-[1.45] text-white/90">{j.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
