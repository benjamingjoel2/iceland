import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { steps } from "@/data/steps";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { PriceList } from "@/components/sections/PriceList";
import { DayByDay } from "@/components/sections/DayByDay";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { GridLines } from "@/components/ui/GridLines";

export const metadata = pageMetadata({
  title: "Dates & Prices",
  description: "Seasons and prices from for every Edge of North journey, shown in US dollars with conversions to EUR, GBP, ISK, CAD and AUD.",
  path: "/prices",
  image: images.darkMountain.src,
});

export default function PricesPage() {
  const lodgeNames = Object.fromEntries(lodges.map((l) => [l.slug, l.name]));
  return (
    <>
      <PageHero
        image={images.darkMountain}
        title="Dates & Prices"
        intro="Every journey is private, on dates of your choosing within its season. Prices are from, per person sharing; families, friends and solo travellers are all welcome."
      />
      <section className="relative bg-white pb-[12vh]">
        <GridLines />
        <PriceList journeys={journeys} lodgeNames={lodgeNames} />
      </section>
      <section className="relative bg-volcanic pt-[16vh] text-white">
        <GridLines tone="light" />
        <SectionTitle tone="light">How it works</SectionTitle>
      </section>
      <DayByDay
        titleA="From first call"
        titleB="to first light"
        noteTitle="One specialist"
        note={<p>The same specialist plans every detail of your journey and stays a message away while you travel.</p>}
        items={steps.map((s) => ({ n: String(s.n).padStart(2, "0"), title: s.title, body: s.body, image: s.image }))}
      />
    </>
  );
}
