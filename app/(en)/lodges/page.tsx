import { lodges, formatCoordinates } from "@/data/lodges";
import { journeys } from "@/data/journeys";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { LabelText } from "@/components/sections/Blocks";
import { StackedPanels } from "@/components/sections/StackedPanels";
import { CardFlick } from "@/components/sections/CardFlick";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";

export const metadata = pageMetadata({
  title: "Our Lodges",
  description: "Three signature stays: a glacier-view lodge in the south, a design hotel among lava fields and a remote fjord retreat.",
  path: "/lodges",
  image: images.glacierLagoon.src,
});

export default function LodgesIndex() {
  return (
    <>
      <PageHero image={images.glacierLagoon} eyebrow="Three signature stays" title="Our Lodges" titleStyle="display" mist />
      <LabelText
        scribble
        label="Northern comfort"
        body={
          <>
            <p>
              Iceland&rsquo;s finest places to stay are small, remote and built around the view. We choose ours for where they stand: beneath the ice cap, among the lava fields and at the end of a Westfjords road. Each has warm timber, geothermal water and windows that frame the light, and each is a base for the experiences around it.
            </p>
            <PlaceholderFlag label="Lodge names are placeholders until partner agreements are signed" />
          </>
        }
      />
      <StackedPanels
        items={lodges.map((l) => ({
          href: `/lodges/${l.slug}`,
          image: l.hero,
          title: l.name,
          excerpt: l.excerpt,
          coordinates: formatCoordinates(l.coordinates),
        }))}
      />
      <section className="relative bg-white py-[16vh]">
        <GridLines />
        <div className="relative z-10">
          <SectionTitle>Our Journeys</SectionTitle>
          <div className="mt-[12vh]">
            <CardFlick items={journeys} />
          </div>
        </div>
      </section>
      <CtaBanner image={images.snowCabin} />
    </>
  );
}
