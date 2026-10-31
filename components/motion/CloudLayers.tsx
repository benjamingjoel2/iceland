"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { m, useTransform, type MotionValue } from "framer-motion";

/**
 * Three parallax cloud layers (our own generated textures in /public/mist).
 * `progress` (0→1) drives how far the clouds rise and thicken; each layer also
 * drifts slowly sideways on its own.
 */
export function CloudLayers({
  progress,
  className = "",
  load = true,
}: {
  progress: MotionValue<number>;
  className?: string;
  /** False keeps the textures unrequested (they start fully transparent anyway). */
  load?: boolean;
}) {
  const reduce = useReducedMotion();
  const y1 = useTransform(progress, [0, 1], ["35%", "-25%"]);
  const y2 = useTransform(progress, [0, 1], ["55%", "-10%"]);
  const y3 = useTransform(progress, [0, 1], ["75%", "0%"]);
  const o1 = useTransform(progress, [0, 0.02, 0.35, 1], [0, 0.35, 0.9, 1]);
  const o2 = useTransform(progress, [0, 0.02, 0.4, 1], [0, 0.2, 0.85, 1]);
  const o3 = useTransform(progress, [0, 0.5, 1], [0, 0.9, 1]);
  const layers = [
    { y: y1, o: o1, src: "/mist/cloud-1.webp", anim: "drift 38s ease-in-out infinite alternate", h: "70%" },
    { y: y2, o: o2, src: "/mist/cloud-2.webp", anim: "drift-rev 46s ease-in-out infinite alternate", h: "80%" },
    { y: y3, o: o3, src: "/mist/cloud-3.webp", anim: "drift 54s ease-in-out infinite alternate", h: "90%" },
  ];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((l, i) => (
        <m.div key={i} className="absolute inset-x-[-12%] bottom-0" style={{ y: reduce ? 0 : l.y, opacity: l.o, height: l.h }}>
          <div
            className="h-full w-full bg-[length:100%_100%] bg-no-repeat"
            style={{ backgroundImage: load ? `url(${l.src})` : undefined, animation: reduce ? "none" : l.anim }}
          />
        </m.div>
      ))}
    </div>
  );
}
