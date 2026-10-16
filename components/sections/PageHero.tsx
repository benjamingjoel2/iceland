"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";
import { useUI } from "@/components/layout/UIProvider";

/**
 * Inner-page hero: full-bleed image with slow push-in, optional italic eyebrow,
 * large serif title, meta line and intro, optional coordinates and film thumbnail.
 * Optional `mist` lets the image dissolve into a cloud bank on scroll (index pages).
 */
export function PageHero({
  image,
  eyebrow,
  title,
  titleStyle = "h1",
  meta,
  intro,
  coordinates,
  film = false,
  mist = false,
  children,
}: {
  image: Img;
  eyebrow?: string;
  title: React.ReactNode;
  titleStyle?: "h1" | "display" | "italic";
  meta?: React.ReactNode;
  intro?: React.ReactNode;
  coordinates?: string;
  film?: boolean;
  mist?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { openFilm } = useUI();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mistY = useTransform(scrollYProgress, [0, 1], ["45%", "-5%"]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  const titleCls =
    titleStyle === "display" ? "t-display" : titleStyle === "italic" ? "font-serif italic text-[clamp(2.6rem,4.45vw,4rem)] leading-none" : "t-h1";

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-volcanic text-white">
      <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : y }}>
        <div className="absolute inset-0 animate-[slow-zoom_2.4s_cubic-bezier(.22,1,.36,1)_both]">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-volcanic/35 via-volcanic/10 to-volcanic/35" />
      </motion.div>
      <GridLines tone="light" />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: reduce ? 0 : textY, opacity: textOpacity }}
      >
        {eyebrow ? <p className={titleStyle === "display" ? "t-spaced mb-6" : "t-eyebrow mb-3 text-[20px]"}>{eyebrow}</p> : null}
        <h1 className={`${titleCls} max-w-[16ch]`}>{title}</h1>
        {meta ? <div className="mt-6 flex items-center gap-3 text-[13px] font-semibold">{meta}</div> : null}
        {intro ? <div className="t-body mt-3 max-w-[25rem] text-white/90">{intro}</div> : null}
      </motion.div>

      {coordinates ? (
        <p className="t-label absolute inset-x-0 bottom-[11vh] z-10 text-center tracking-[0.05em]">[ {coordinates} ]</p>
      ) : null}

      {film ? (
        <button
          type="button"
          onClick={openFilm}
          className="glass absolute bottom-5 right-5 z-10 hidden h-14 items-center gap-4 rounded-[3px] py-1.5 pl-1.5 pr-5 text-[13px] font-medium md:flex"
        >
          <span className="relative h-full w-20 overflow-hidden rounded-[2px]">
            <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
          </span>
          Watch film
        </button>
      ) : null}

      {mist ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-10%] bottom-0 z-20 h-[110%] bg-[length:100%_100%] bg-no-repeat"
          style={{ y: reduce ? 0 : mistY, opacity: mistOpacity, backgroundImage: "url(/mist/bank.webp)" }}
        />
      ) : null}

      {children}
    </section>
  );
}
