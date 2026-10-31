import type { Metadata } from "next";
import { brand } from "@/config/site";
import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { images } from "@/data/images";
import { quotes } from "@/data/people";
import { gateway } from "@/data/gateway";
import { GiantHero } from "@/components/sections/GiantHero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { SeasonsBlock } from "@/components/sections/SeasonsBlock";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { CardFlick } from "@/components/sections/CardFlick";
import { LodgesHorizontal } from "@/components/sections/LodgesHorizontal";
import { QuoteAndRoute } from "@/components/sections/QuoteAndRoute";
import { FlightRoute } from "@/components/sections/FlightRoute";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";

export const metadata: Metadata = {
  title: { absolute: `${brand.name} — Private luxury journeys in Iceland` },
  description: `${brand.tagline} ${brand.promise}`,
  alternates: { canonical: brand.url },
};

export default function Home() {
  return (
    <>
      <GiantHero word="Iceland" />
      <IntroStatement
        eyebrow={brand.eyebrow}
        text="Where the Arctic Circle touches the land and the island is still being made: fire beneath, ice above and the North Atlantic all around."
      />
      <SeasonsBlock />

      <section aria-labelledby="journeys-title" className="relative bg-white pb-[16vh] pt-[18vh]">
        <GridLines />
        <div className="relative z-10">
          <SectionTitle>
            <span id="journeys-title">Our Journeys</span>
          </SectionTitle>
          <div className="mt-[14vh]">
            <CardFlick items={journeys} />
          </div>
        </div>
      </section>

      <LodgesHorizontal
        lodges={lodges}
        heroImage={images.glacierLagoon}
        texture={images.aerialCoast}
        intro={{
          label: "Northern comfort",
          body: "Three signature stays, each chosen for where it stands: beneath the ice cap, among the lava fields and at the end of a Westfjords road. Warm timber, geothermal water and windows that frame the light.",
        }}
      />

      <QuoteAndRoute image={images.snowRange} quote={quotes.writer} route={gateway.code} />
      <FlightRoute />
      <CtaBanner image={images.waterfallFigure} />
    </>
  );
}
