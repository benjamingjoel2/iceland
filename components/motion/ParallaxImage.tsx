"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img } from "@/data/types";

/** Image that drifts gently against the scroll inside its frame. */
export function ParallaxImage({
  image,
  className = "",
  sizes = "(min-width: 768px) 40vw, 100vw",
  amount = 8,
  priority = false,
}: {
  image: Img;
  className?: string;
  sizes?: string;
  amount?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <m.div className="absolute inset-[-12%_0]" style={{ y: reduce ? 0 : y }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </m.div>
    </div>
  );
}
