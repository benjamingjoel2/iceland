"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Journey, SeasonKey } from "@/data/types";
import { Price } from "@/components/ui/Price";
import { VerifyFlag } from "@/components/ui/Flag";
import { CurrencySwitcher } from "@/components/layout/CurrencySwitcher";

type Filter = "all" | SeasonKey;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All journeys" },
  { key: "summer", label: "Summer" },
  { key: "winter", label: "Winter" },
  { key: "all-year", label: "All year" },
];

/** Dates & prices list: season toggle, currency switcher and one card per journey. */
export function PriceList({ journeys, lodgeNames }: { journeys: Journey[]; lodgeNames: Record<string, string> }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = journeys.filter((j) => filter === "all" || j.season === filter);

  return (
    <div className="relative z-10 mx-2 -mt-[18vh] rounded-[6px] bg-[#eef1f1] p-3 pb-6 md:mx-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4 px-2 pb-6 pt-6 md:px-4">
        <div>
          <p className="t-eyebrow mb-3 text-[15px]">Select your season:</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter journeys by season">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`h-9 rounded-[2px] px-4 text-[12px] font-semibold transition-colors ${
                  filter === f.key ? "bg-atlantic text-white" : "bg-white text-atlantic hover:bg-glacier"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="t-small text-slate">Show prices in</span>
          <CurrencySwitcher variant="light" />
        </div>
      </div>

      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {shown.map((j) => (
            <motion.li
              key={j.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PriceCard j={j} lodgeNames={lodgeNames} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="t-small mt-6 px-4 text-slate">
        Prices are indicative, from, per person sharing, set in US dollars. Other currencies are approximate conversions for guidance only; your
        proposal is quoted in your chosen currency.
      </p>
    </div>
  );
}

function PriceCard({ j, lodgeNames }: { j: Journey; lodgeNames: Record<string, string> }) {
  const [img, setImg] = useState(0);
  const [datesOpen, setDatesOpen] = useState(false);
  const gallery = j.gallery;
  return (
    <article className="grid grid-cols-1 gap-5 rounded-[4px] bg-white p-3 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:p-3">
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[300px]">
        <AnimatePresence mode="sync">
          <motion.div key={img} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Image src={gallery[img].src} alt={gallery[img].alt} fill sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          <button type="button" aria-label="Previous image" onClick={() => setImg((i) => (i - 1 + gallery.length) % gallery.length)} className="glass h-7 w-10 rounded-[2px] text-[13px] text-white hover:bg-aurora">←</button>
          <button type="button" aria-label="Next image" onClick={() => setImg((i) => (i + 1) % gallery.length)} className="glass h-7 w-10 rounded-[2px] text-[13px] text-white hover:bg-aurora">→</button>
        </div>
      </div>

      <div className="flex flex-col p-2 md:p-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <ul className="flex flex-wrap gap-1">
            {j.lodges.map((l) => (
              <li key={l} className="rounded-[2px] bg-atlantic px-2 py-1 text-[10.5px] font-semibold text-white">{lodgeNames[l]}</li>
            ))}
            <li className="rounded-[2px] bg-glacier px-2 py-1 text-[10.5px] font-semibold text-atlantic">{j.seasonLabel}</li>
          </ul>
          <p className="font-serif text-[clamp(1.4rem,2vw,1.85rem)] leading-none">
            <Price usd={j.priceFromUSD} />
          </p>
        </div>
        <h2 className="mt-4 font-serif text-[clamp(1.8rem,2.6vw,2.4rem)] italic leading-tight">{j.title}</h2>
        <p className="t-body mt-4 max-w-[30rem]">{j.excerpt}</p>
        <p className="t-small mt-2 text-slate">{j.nights} nights · {j.priceBasis}</p>

        <AnimatePresence initial={false}>
          {datesOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-[2px] bg-glacier p-4 text-[13px]">
                <p className="font-semibold">Season & dates</p>
                <p className="mt-1">{j.seasonNote}. Private departures on dates of your choosing within the season.</p>
                <div className="mt-2"><VerifyFlag note={j.verify.join("; ")} /></div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-auto grid grid-cols-3 gap-1.5 pt-6">
          <button
            type="button"
            aria-expanded={datesOpen}
            onClick={() => setDatesOpen((o) => !o)}
            className="flex h-12 items-center justify-center rounded-[2px] bg-glacier text-[12px] font-medium transition-colors hover:bg-atlantic hover:text-white"
          >
            Trip dates
          </button>
          <Link href={`/journeys/${j.slug}`} className="flex h-12 items-center justify-center rounded-[2px] bg-glacier text-[12px] font-medium transition-colors hover:bg-atlantic hover:text-white">
            More info<span className="sr-only"> about {j.title}</span>
          </Link>
          <Link href={`/enquire?journey=${j.slug}`} className="flex h-12 items-center justify-center rounded-[2px] bg-aurora text-[12px] font-medium text-white transition-colors hover:bg-atlantic">
            Start planning<span className="sr-only">: {j.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
