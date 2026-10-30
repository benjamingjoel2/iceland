import Image from "@/components/ui/Image";
import { brand } from "@/config/site";
import { images } from "@/data/images";
import { specialistQuote } from "@/data/people";
import { journeys } from "@/data/journeys";
import { pageMetadata } from "@/lib/seo";
import { aboutTabs } from "@/lib/nav";
import { PageHero } from "@/components/sections/PageHero";
import { TabBar } from "@/components/sections/TabBar";
import { FourUp, Statement } from "@/components/sections/Blocks";
import { SpecialistQuote } from "@/components/sections/SpecialistQuote";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: "About",
  description: `${brand.promise} Why Edge of North plans every journey with one dedicated specialist.`,
  path: "/about",
  image: images.waterfallFigure.src,
});

export default function AboutPage() {
  return (
    <>
      <PageHero image={images.waterfallFigure} eyebrow="About" title="Our Story" titleStyle="display">
        <TabBar mode="links" current="/about" tabs={aboutTabs} />
      </PageHero>

      <section className="relative bg-white pt-[16vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <Reveal className="col-span-4 md:col-span-3 md:col-start-2">
            <h2 className="t-h3">Where the map runs out</h2>
          </Reveal>
        </div>
        <div className="relative z-10 mt-[12vh] grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <Reveal className="col-span-4 md:col-span-3 md:col-start-5">
            <h3 className="t-label mb-3">Our promise</h3>
            <div className="t-body space-y-4">
              <p>
                {brand.name} began with a simple idea: that Iceland at its most extraordinary should be private, unhurried and planned by one person who knows it intimately.
              </p>
              <p>
                The island sits at the very edge of the North. The Arctic Circle crosses its northernmost island and the land itself is still being made, by volcanoes, glaciers and the North Atlantic. The best of it is remote, seasonal and governed by weather, which is exactly why it rewards expert planning.
              </p>
              <p>
                So every journey is designed and looked after by a single dedicated specialist, from the first call to the last night, with private guides, the finest lodges and the flexibility to follow the light. [PLACEHOLDER — founding story to be written]
              </p>
            </div>
          </Reveal>
        </div>
        <div className="relative z-10 mt-[10vh] grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <ParallaxImage image={images.snowRange} className="col-span-2 aspect-square md:col-span-4" />
          <ParallaxImage image={images.horseBrown} className="col-span-2 mt-[10vh] aspect-[4/5] md:col-span-4" />
        </div>
      </section>

      <Statement align="left" text="Iceland is never the same twice. We plan around the light, the weather and the ice, so you are in the right place at the right moment." />
      <SpecialistQuote {...specialistQuote} />

      <section className="relative flex h-[100svh] items-center justify-center overflow-hidden text-white">
        <Image src={images.aboveClouds.src} alt={images.aboveClouds.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-atlantic/35" />
        <Reveal className="relative z-10 max-w-[44rem] px-6 text-center">
          <p className="t-h3">Private by design, responsible by principle: small footprints, local guides, and places left as we found them.</p>
        </Reveal>
      </section>

      <FourUp
        title={<>More<br />about us</>}
        items={[
          { image: images.waterfallFigure, label: "FAQ", href: "/faq" },
          { image: images.iceNight, label: "Journal", href: "/journal" },
          { image: images.glacierLagoon, label: "Our lodges", href: "/lodges" },
          { image: journeys[0].card, label: "Journeys", href: "/journeys" },
        ]}
      />
      <CtaBanner image={images.glacierLagoon} />
    </>
  );
}
