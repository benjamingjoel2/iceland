"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * A rising bank of mist that dissolves the section above into the (white) section below.
 * Place it at the bottom of an image section; it overlaps the next section by `overlap`.
 */
export function MistTransition({
  to = "#ffffff",
  height = "70vh",
  className = "",
}: {
  to?: string;
  height?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["50%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none relative z-20 ${className}`} style={{ height, marginTop: `calc(-1 * ${height})` }}>
      <m.div
        className="absolute inset-x-[-10%] bottom-0 h-[130%] bg-[length:100%_100%] bg-no-repeat"
        style={{ y, opacity, backgroundImage: "url(/mist/bank.webp)" }}
      />
      <m.div
        className="absolute inset-x-[-10%] bottom-0 h-full bg-[length:100%_100%] bg-no-repeat"
        style={{ y: y2, backgroundImage: "url(/mist/cloud-2.webp)", animation: "drift 50s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: `linear-gradient(to bottom, transparent, ${to})` }} />
    </div>
  );
}
