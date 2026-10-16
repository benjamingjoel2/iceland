"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/config/site";
import { film, images } from "@/data/images";
import { CloudLayers } from "@/components/motion/CloudLayers";
import { GridLines } from "@/components/ui/GridLines";
import { WatchFilmButton } from "@/components/ui/FilmModal";
import { useUI } from "@/components/layout/UIProvider";

/**
 * Homepage hero: muted looping film, tagline left, "Watch film" right and a giant
 * condensed headline at the bottom. Scrolling pulls drifting cloud layers up over
 * the word until the screen turns white, flowing straight into the intro.
 */
export function GiantHero({ word = "Iceland" }: { word?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { openFilm } = useUI();
  // Mount the background film only after the page has loaded, so it never competes
  // with the poster, fonts and scripts on the critical path.
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const start = () => (t = setTimeout(() => setVideoReady(true), 400));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      clearTimeout(t);
    };
  }, [reduce]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const wordY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-55%"]);
  const wordBlur = useTransform(scrollYProgress, [0.05, 0.55], ["blur(0px)", "blur(10px)"]);
  const wordOpacity = useTransform(scrollYProgress, [0.25, 0.7], [1, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const white = useTransform(scrollYProgress, [0.5, 0.88], [0, 1]);

  return (
    <section ref={ref} className="relative h-[185vh] bg-white" aria-label={`${word} — ${brand.eyebrow}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#9aa3a8]">
        <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : mediaScale }}>
          <Image src={film.poster} alt={images.auroraGreen.alt} fill priority sizes="100vw" className="object-cover" />
          {videoReady ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={film.poster}
              aria-hidden
            >
              <source src={film.srcSmall} type="video/mp4" media="(max-width: 767px)" />
              <source src={film.src} type="video/mp4" />
            </video>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-volcanic/30 via-transparent to-volcanic/25" />
        </motion.div>

        <GridLines tone="light" />

        <motion.div className="absolute inset-x-0 top-[30%] z-10 px-5 md:top-[32%]" style={{ opacity: uiOpacity }}>
          <div className="flex items-start justify-between gap-6">
            <p className="t-eyebrow max-w-[16rem] text-white md:ml-[calc((100vw-40px)/12*1+20px)]">
              {brand.tagline}
              <br />
              Private journeys at the top of the world.
            </p>
            <div className="hidden md:block md:mr-[calc((100vw-40px)/12*1)]">
              <WatchFilmButton onClick={openFilm} />
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-[3vh] z-10 text-center text-white md:bottom-[2vh]">
          <motion.div style={{ y: reduce ? 0 : wordY, opacity: wordOpacity, filter: reduce ? undefined : wordBlur }}>
            <p className="t-spaced mb-3 text-white/90 md:mb-1">{brand.eyebrow}</p>
            <h1 className="t-giant">{word}</h1>
          </motion.div>
          <div className="mt-6 md:hidden">
            <WatchFilmButton onClick={openFilm} />
          </div>
        </div>

        <CloudLayers progress={scrollYProgress} className="z-20" />
        <motion.div aria-hidden className="absolute inset-0 z-30 bg-white" style={{ opacity: white }} />
      </div>
    </section>
  );
}
