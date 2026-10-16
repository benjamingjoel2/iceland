import { images } from "@/data/images";
import { people } from "@/data/people";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TabBar } from "@/components/sections/TabBar";
import { LabelText } from "@/components/sections/Blocks";
import { PeopleDark } from "@/components/sections/People";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { aboutTabs } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Your specialists",
  description: "Meet the Edge of North specialists who plan and look after every journey, from the first call to the final night.",
  path: "/about/specialists",
  image: images.calmReflection.src,
});

export default function SpecialistsPage() {
  return (
    <>
      <PageHero image={images.calmReflection} eyebrow="About" title="Specialists" titleStyle="display">
        <TabBar mode="links" current="/about/specialists" tabs={aboutTabs} />
      </PageHero>
      <LabelText
        scribble
        label="One person, start to finish"
        body={
          <p>
            Your specialist is your single point of contact. They design the journey with you, book every guide, lodge and flight, brief you in Reykjavík and stay a message away while you travel. They are Icelanders who have guided on the ice and in the highlands, and they plan as if the trip were their own.
          </p>
        }
      />
      <PeopleDark title="Meet the team" people={people} detailed />
      <CtaBanner image={images.mistyPeaks} title="Speak to a specialist" cta="Start planning" />
    </>
  );
}
