"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";

export type DayItem = {
  n: string;
  title: string;
  body: React.ReactNode;
  image: Img;
  meta?: React.ReactNode;
};

/**
 * Dark three-column layout: sticky title column on the left, basalt day cards in the
 * middle, and a sticky image on the right that swaps as each card reaches the centre.
 */
export function DayByDay({
  id,
  titleA,
  titleB,
  noteTitle,
  note,
  items,
}: {
  id?: string;
  titleA: string;
  titleB?: string;
  noteTitle?: string;
  note?: React.ReactNode;
  items: DayItem[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section id={id} className="relative bg-volcanic py-[12vh] text-white">
      <GridLines tone="light" />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <div className="col-span-4 md:col-span-3">
          <div className="md:sticky md:top-[12vh] md:flex md:h-[76vh] md:flex-col md:justify-between">
            <h2 className="t-h3">
              {titleA}
              {titleB ? (
                <>
                  <br />
                  <span className="text-white/45">{titleB}</span>
                </>
              ) : null}
            </h2>
            {note ? (
              <div className="mt-8 max-w-[18rem] md:mt-0">
                {noteTitle ? <p className="t-eyebrow mb-3 text-[15px]">{noteTitle}</p> : null}
                <div className="t-body text-white/70">{note}</div>
              </div>
            ) : null}
          </div>
        </div>

        <ol className="col-span-4 mt-10 md:col-span-4 md:mt-0">
          {items.map((d, i) => (
            <li
              key={d.n + d.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={`flex min-h-[46vh] flex-col justify-between border-b border-white/10 bg-basalt p-6 transition-opacity duration-500 md:min-h-[52vh] md:p-8 ${
                active === i ? "opacity-100" : "md:opacity-80"
              }`}
            >
              <p className="font-serif text-[clamp(2rem,2.6vw,2.4rem)] italic leading-none">{d.n}</p>
              <div className="mt-10">
                <h3 className="t-eyebrow mb-3 text-[17px]">{d.title}</h3>
                <div className="t-body text-white/80">{d.body}</div>
                {d.meta ? <div className="mt-4 text-[12px] text-white/80">{d.meta}</div> : null}
              </div>
              {/* Mobile image */}
              <div className="relative mt-6 aspect-[4/3] md:hidden">
                <Image src={d.image.src} alt={d.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-[12vh] h-[76vh] overflow-hidden">
            <AnimatePresence mode="sync">
              <m.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={items[active].image.src} alt={items[active].image.alt} fill sizes="40vw" className="object-cover" />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StayLink({ href, label }: { href?: string; label: string }) {
  return href ? (
    <Link href={href} className="underline decoration-aurora-glow underline-offset-4 hover:text-aurora-glow">
      {label}
    </Link>
  ) : (
    <span>{label}</span>
  );
}
