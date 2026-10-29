import Image from "@/components/ui/Image";
import Link from "next/link";
import { journeys } from "@/data/journeys";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { LabelText } from "@/components/sections/Blocks";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { Price } from "@/components/ui/Price";
import { VerifyFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: "Journeys",
  description: "Six private journeys across Iceland: the Ring Road, the highlands, the Westfjords, aurora and ice caves, helicopters and a three-day escape.",
  path: "/journeys",
  image: images.iceNight.src,
});

export default function JourneysIndex() {
  return (
    <>
      <PageHero image={images.iceNight} eyebrow="Our signature journeys" title="Our Journeys" titleStyle="display" mist />
      <LabelText
        scribble
        label="Choose your journey"
        body={
          <p>
            Six ways to see Iceland at its most extraordinary, each one private, each planned by a single specialist. Drive the full circle of the island, cross the empty highlands by super-jeep, follow the midnight sun to the Westfjords, hunt the aurora above the glaciers, fly to places with no road, or slip away for three days from Reykjavík. Every itinerary can be shaped around you.
          </p>
        }
      />

      <section className="relative bg-white pb-[16vh] text-atlantic">
        <GridLines />
        <ol className="relative z-10 space-y-[12vh]">
          {journeys.map((j) => (
            <li key={j.slug} className="grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
              <div className="col-span-4 md:col-span-2">
                <div className="md:sticky md:top-[30vh]">
                  <p className="t-eyebrow text-[15px]">{j.seasonLabel}</p>
                  <p className="t-eyebrow text-[15px] text-slate">{j.nights} nights</p>
                  <div className="mt-3 hidden md:block">
                    <VerifyFlag note={j.seasonNote} />
                  </div>
                </div>
              </div>
              <Reveal className="col-span-4 md:col-span-10">
                <Link href={`/journeys/${j.slug}`} className="group relative block aspect-[4/5] overflow-hidden text-white md:aspect-[16/8]">
                  <Image src={j.card.src} alt={j.card.alt} fill sizes="(min-width: 768px) 85vw, 100vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic/55 via-transparent to-volcanic/30" />
                  <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-10">
                    <h2 className="t-italic-title">
                      {j.cardTitle[0]}
                      {j.cardTitle[1] ? (
                        <>
                          <br />
                          {j.cardTitle[1]}
                        </>
                      ) : null}
                    </h2>
                    <div className="max-w-[24rem]">
                      <p className="mb-3 flex items-center gap-3 text-[13px] font-semibold">
                        <Price usd={j.priceFromUSD} />
                        <span className="h-3.5 w-px bg-white/60" />
                        <span>{j.seasonLabel}</span>
                      </p>
                      <p className="text-[14px] font-medium leading-[1.45] text-white/90">{j.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <CtaBanner image={images.auroraReflection} />
    </>
  );
}
