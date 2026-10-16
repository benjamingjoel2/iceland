import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: "Journal",
  description: "Notes from the edge of the North: seasons, the northern lights, ice caves and the highlands.",
  path: "/journal",
  image: images.auroraSnow.src,
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function JournalIndex() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero image={images.auroraSnow} eyebrow="Notes from the North" title="Journal" titleStyle="display" mist />
      <section className="relative bg-white pb-[16vh] pt-[6vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 px-5">
          <Reveal>
            <Link href={`/journal/${lead.slug}`} className="group grid grid-cols-1 gap-5 md:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-8">
                <Image src={lead.hero.src} alt={lead.hero.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" />
              </div>
              <div className="md:col-span-3 md:col-start-10 md:self-end">
                <p className="t-eyebrow text-[15px] text-slate">{fmt(lead.date)} · {lead.readingTime}</p>
                <h2 className="t-h3 mt-2 group-hover:text-aurora">{lead.title}</h2>
                <p className="t-body mt-3">{lead.excerpt}</p>
              </div>
            </Link>
          </Reveal>
          <ul className="mt-[12vh] grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-3">
            {rest.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.1}>
                  <Link href={`/journal/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={p.hero.src} alt={p.hero.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" />
                    </div>
                    <p className="t-eyebrow mt-4 text-[15px] text-slate">{fmt(p.date)} · {p.readingTime}</p>
                    <h2 className="mt-1 font-serif text-[1.75rem] uppercase leading-none group-hover:text-aurora">{p.title}</h2>
                    <p className="t-body mt-3">{p.excerpt}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBanner image={images.glacierLagoon} />
    </>
  );
}
