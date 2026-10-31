"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "@/components/ui/Image";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { gateway } from "@/data/gateway";
import { images } from "@/data/images";
import { GridLines } from "@/components/ui/GridLines";
import { VerifyFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/components/layout/UIProvider";

/*
 * Stylised North Atlantic: simplified coastlines as [lon, lat] rings, projected on a
 * plain equirectangular grid (x = (lon + 80) * 10, y = (82 − lat) * 15.2) and filled
 * with a dot pattern. Deliberately simplified — not for navigation.
 */
type Ring = [number, number][];
const RINGS: Record<string, Ring> = {
  greenland: [[-73,78],[-66,80.5],[-55,82],[-40,83.5],[-25,83],[-18,81.5],[-12,79.5],[-18,77],[-19,74.5],[-22,72],[-22,70],[-25,68.5],[-32,68],[-37,65.5],[-40,64],[-43,60.5],[-46,61],[-49,63],[-51,65],[-53,67],[-54,69.5],[-56,71.5],[-58,74],[-63,76],[-70,77]],
  iceland: [[-24,65.5],[-22.5,66.4],[-20,66.1],[-17,66.2],[-15,66.3],[-13.6,65.3],[-14.5,64.4],[-16.5,63.8],[-18.5,63.4],[-20.5,63.6],[-22.7,63.8],[-22,64.3],[-24,64.8],[-22.5,65.2]],
  faroe: [[-7.6,62.4],[-6.4,62.4],[-6.6,61.4],[-7.2,61.5]],
  britain: [[-5.7,50],[-3,50.6],[1.4,51.2],[1.7,52.7],[0.2,53.5],[-0.5,54.5],[-1.6,55.6],[-2,57.6],[-3.3,58.6],[-5,58.6],[-6.2,57.5],[-5.6,56.3],[-4.9,55],[-3,54.4],[-3.1,53.3],[-4.6,52.8],[-5.2,51.7],[-3.5,51.4]],
  ireland: [[-10,51.6],[-6.2,52.2],[-6,53.3],[-5.6,54.5],[-7.3,55.3],[-8.5,55],[-10,54.2],[-9.9,53.2]],
  scandinavia: [[5,58],[5.5,60],[5,62],[8,63.5],[11,65],[14,67.5],[17,69],[20,70.2],[20,58]],
  europe: [[-1.8,43.4],[-1.2,46],[-4.6,48.4],[-1.5,48.7],[1.5,50.2],[3,51.3],[4.5,52.5],[7,53.5],[8.5,55],[8.2,57],[10.5,57.7],[12,55.5],[14,54.2],[20,54.5],[20,36],[-9.5,36],[-9.3,39],[-8.8,42.5],[-8,43.7]],
  baffin: [[-80,73.5],[-73,72],[-68,70],[-66,67],[-61.5,66],[-63,64],[-65,62.5],[-71,62.6],[-77,63.5],[-80,64.5]],
  northAmerica: [[-80,62],[-78,62.5],[-74,62.2],[-70,61],[-65,60.3],[-64,58.5],[-61.5,56.5],[-59,55],[-57,53.5],[-55.7,52],[-57,51.3],[-60,50.2],[-66,49.2],[-64.5,48.4],[-64.8,46.5],[-61,46],[-60,45.3],[-63.5,44.5],[-66,43.8],[-67.5,44.5],[-70.2,43.6],[-70.6,42.6],[-70,41.7],[-71.5,41.4],[-73.7,40.6],[-74.1,39.8],[-75,38.8],[-76,37],[-80,35]],
  newfoundland: [[-59.3,47.6],[-56,49.7],[-55.5,51.6],[-53.5,49.5],[-52.7,47.6],[-53.6,46.6],[-56,47.6]],
};
const project = ([lon, lat]: [number, number]) => [(lon + 80) * 10, (82 - lat) * 15.2] as const;
const LAND = Object.fromEntries(
  Object.entries(RINGS).map(([k, ring]) => [
    k,
    ring.map((pt, i) => { const [x, y] = project(pt); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ") + " Z",
  ]),
);

const [kx, ky] = project([-22.6, 63.99]);
const KEF = { x: kx, y: ky };
const [jx, jy] = project([-73.78, 40.64]);
const JFK = { x: jx, y: jy };
const [lx, ly] = project([-0.45, 51.47]);
const LHR = { x: lx, y: ly };
const ROUTE_JFK = `M${JFK.x} ${JFK.y} Q 250 250 ${KEF.x} ${KEF.y}`;
const ROUTE_LHR = `M${LHR.x} ${LHR.y} Q 760 300 ${KEF.x} ${KEF.y}`;

export function FlightRoute() {
  const ref = useRef<HTMLDivElement>(null);
  const jfkRef = useRef<SVGPathElement>(null);
  const lhrRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const { openFilm } = useUI();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const draw = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const [dots, setDots] = useState({ a: JFK, b: LHR });

  useMotionValueEvent(draw, "change", (v) => {
    const a = jfkRef.current;
    const b = lhrRef.current;
    if (!a || !b) return;
    const pa = a.getPointAtLength(a.getTotalLength() * v);
    const pb = b.getPointAtLength(b.getTotalLength() * v);
    setDots({ a: { x: pa.x, y: pa.y }, b: { x: pb.x, y: pb.y } });
  });

  const pathLength = reduce ? 1 : draw;

  return (
    <section aria-labelledby="gateway-title">
      {/* Header row */}
      <div className="relative bg-white text-atlantic">
        <GridLines />
        <div className="relative z-10 border-t border-dashed border-atlantic/25 px-5 pb-14 pt-3">
          <div className="flex justify-between t-small text-slate">
            <p>
              {gateway.origins.map((o) => o.coordsLabel).join("  ·  ")}
              <br />
              London · New York
            </p>
            <p className="text-right">
              {gateway.destination.coordsLabel}
              <br />
              Keflavík
            </p>
          </div>
          <Reveal className="mx-auto -mt-4 max-w-[30rem] text-center">
            <h2 id="gateway-title" className="t-h3">
              {gateway.title}
            </h2>
            <p className="t-body mx-auto mt-5 max-w-[24rem] text-slate">{gateway.body}</p>
          </Reveal>
        </div>
      </div>

      {/* Dark map */}
      <div ref={ref} className="relative h-[220vh] bg-volcanic text-white">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <GridLines tone="light" />
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-x-0 top-[8vh] h-[60%] w-full md:inset-0 md:h-full"
            role="img"
            aria-label="Stylised map of the North Atlantic showing flight routes from London and New York to Keflavík"
          >
            <defs>
              <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e9ecec" stopOpacity="0.07" />
                <stop offset="1" stopColor="#e9ecec" stopOpacity="0.02" />
              </linearGradient>
              <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="3.5" cy="3.5" r="1.45" fill="#e9ecec" />
              </pattern>
              <radialGradient id="glow">
                <stop offset="0" stopColor="#3fd8a0" stopOpacity="0.5" />
                <stop offset="1" stopColor="#3fd8a0" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Object.entries(LAND).map(([k, d]) => (
              <g key={k}>
                <path d={d} fill="url(#land)" stroke="#e9ecec" strokeOpacity="0.18" strokeWidth="0.6" strokeLinejoin="round" />
                <path d={d} fill="url(#dots)" opacity={k === "iceland" ? 0.95 : 0.5} />
              </g>
            ))}
            <text x="380" y="470" fill="#fff" fillOpacity="0.22" fontSize="11" letterSpacing="4" fontFamily="var(--font-oswald)">
              NORTH ATLANTIC OCEAN
            </text>
            <text x="470" y="150" fill="#fff" fillOpacity="0.35" fontSize="10" letterSpacing="3" fontFamily="var(--font-oswald)">
              GREENLAND
            </text>

            {/* faint full routes */}
            <path d={ROUTE_JFK} stroke="#3fd8a0" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" fill="none" />
            <path d={ROUTE_LHR} stroke="#3fd8a0" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" fill="none" />
            {/* drawn routes */}
            <m.path ref={jfkRef} d={ROUTE_JFK} stroke="#3fd8a0" strokeWidth="1.4" fill="none" style={{ pathLength }} />
            <m.path ref={lhrRef} d={ROUTE_LHR} stroke="#3fd8a0" strokeWidth="1.4" fill="none" style={{ pathLength }} />

            {/* airports */}
            {[JFK, LHR].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" />
            ))}
            <circle cx={KEF.x} cy={KEF.y} r="26" fill="url(#glow)" />
            <circle cx={KEF.x} cy={KEF.y} r="4.5" fill="#3fd8a0" />
            <circle cx={KEF.x} cy={KEF.y} r="9" fill="none" stroke="#3fd8a0" strokeOpacity="0.6" className="origin-center [transform-box:fill-box] [animation:pulse-ring_2.4s_ease-out_infinite]" />

            {/* travelling planes */}
            {!reduce ? (
              <>
                <circle cx={dots.a.x} cy={dots.a.y} r="5" fill="#3fd8a0" />
                <circle cx={dots.b.x} cy={dots.b.y} r="5" fill="#3fd8a0" />
              </>
            ) : null}

            {/* labels */}
            <g fontFamily="var(--font-cormorant)" fontStyle="italic" fontSize="13" fill="#fff" fillOpacity="0.8">
              <text x={JFK.x + 12} y={JFK.y - 16}>Starting point</text>
              <text x={LHR.x - 92} y={LHR.y + 30}>Starting point</text>
              <text x={KEF.x + 16} y={KEF.y + 30}>Arrival</text>
            </g>
            <g fontFamily="var(--font-oswald)" fontSize="11" letterSpacing="1" fill="#fff">
              <text x={JFK.x + 12} y={JFK.y - 2}>NEW YORK · JFK</text>
              <text x={LHR.x - 92} y={LHR.y + 44}>LONDON · LHR</text>
              <text x={KEF.x + 16} y={KEF.y + 44}>KEFLAVÍK · KEF</text>
            </g>
          </svg>

          {/* Stats card */}
          <div className="absolute bottom-4 left-3 z-10 w-[min(440px,calc(100vw-24px))] rounded-[6px] bg-basalt/70 p-4 backdrop-blur-md md:bottom-auto md:left-5 md:top-[18vh] md:p-7">
            {gateway.stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "mt-3 border-t border-white/10 pt-3 md:mt-5 md:pt-5" : ""}>
                <p className="t-eyebrow text-[14px] text-white/70">{s.label}</p>
                {s.values.map((v) => (
                  <p key={v} className="mt-0.5 text-[0.85rem] font-normal uppercase leading-snug md:mt-1 md:text-[clamp(1.05rem,1.6vw,1.5rem)]">
                    {v}
                  </p>
                ))}
              </div>
            ))}
            <div className="mt-3 md:mt-5">
              <VerifyFlag note={gateway.verify} tone="dark" />
            </div>
          </div>

          {/* Film thumb */}
          <button
            type="button"
            onClick={openFilm}
            className="group absolute bottom-[12vh] right-5 z-10 hidden h-[130px] w-[210px] overflow-hidden rounded-[3px] md:block"
          >
            <Image src={images.aboveClouds.src} alt="" fill sizes="210px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center gap-3 bg-volcanic/30 text-[13px] font-medium">
              Watch film
              <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2.5 fill-white"><path d="M0 0l10 6-10 6z" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
