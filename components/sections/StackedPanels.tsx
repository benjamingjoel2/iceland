import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/data/types";

/**
 * Full-bleed panels that stick and stack over one another as you scroll
 * (the reference's camps index). Each carries coordinates, title and excerpt.
 */
export function StackedPanels({
  items,
}: {
  items: { href: string; image: Img; title: string; excerpt: string; coordinates?: string; flag?: React.ReactNode }[];
}) {
  return (
    <div className="relative bg-white px-2">
      {items.map((it, i) => (
        <div key={it.href} className="sticky top-2 h-[calc(100svh-16px)] pb-2" style={{ zIndex: i + 1 }}>
          <Link href={it.href} className="group relative block h-full overflow-hidden text-white">
            <Image src={it.image.src} alt={it.image.alt} fill sizes="100vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-b from-volcanic/10 via-volcanic/25 to-volcanic/45" />
            <div className="absolute inset-x-0 bottom-[16%] flex flex-col items-center px-6 text-center">
              {it.coordinates ? <p className="t-label mb-3 tracking-[0.05em]">[ {it.coordinates} ]</p> : null}
              <h2 className="t-display text-[clamp(2.4rem,4.8vw,4.5rem)]">{it.title}</h2>
              <p className="mt-4 max-w-[26rem] text-[13px] font-medium text-white/90">{it.excerpt}</p>
              {it.flag ? <div className="mt-3">{it.flag}</div> : null}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
