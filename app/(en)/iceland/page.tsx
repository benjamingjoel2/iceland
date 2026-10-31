import Image from "@/components/ui/Image";
import Link from "next/link";
import { regions } from "@/data/regions";
import { experiences } from "@/data/experiences";
import { seasons, seasonIntro, seasonLabel } from "@/data/seasons";
import { formatCoordinates } from "@/data/lodges";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { LabelText } from "@/components/sections/Blocks";
import { StackedPanels } from "@/components/sections/StackedPanels";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { VerifyFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: "Iceland",
  description: "The regions, seasons and experiences of Iceland: from Reykjavík and the south coast to the highlands, the Westfjords and the north.",
  path: "/iceland",
  image: images.vestrahorn.src,
});

export default function IcelandIndex() {
  return (
    <>
      <PageHero image={images.vestrahorn} eyebrow="The edge of the North" title="Iceland" titleStyle="display" mist />
      <LabelText
        scribble
        label="An island still being made"
        body={
          <p>
            The Arctic Circle crosses Iceland&rsquo;s northernmost island, Grímsey. The rest of the country sits just below it, between the North American and Eurasian plates, where volcanoes, glaciers and the North Atlantic are still shaping the land. {seasonIntro}
          </p>
        }
      />

      {/* Seasons */}
      <section className="relative bg-white pb-[14vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-1 gap-2 px-5 md:grid-cols-2">
          {seasons.map((s) => (
            <article key={s.key} className="relative aspect-[4/5] overflow-hidden text-white md:aspect-[5/4]">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/70 via-volcanic/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                <p className="t-eyebrow text-[17px]">{s.months}</p>
                <h2 className="t-h3 mt-1">{s.name}</h2>
                <p className="t-body mt-3 max-w-[28rem] text-white/85">{s.body}</p>
                <p className="t-small mt-3 text-white/70">Daylight: {s.daylight}</p>
                <div className="mt-3"><VerifyFlag note={s.verify} tone="dark" /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative bg-white pb-[12vh] pt-[6vh]">
        <GridLines />
        <SectionTitle>Regions</SectionTitle>
      </section>
      <StackedPanels
        items={regions.map((r) => ({
          href: `/iceland/${r.slug}`,
          image: r.hero,
          title: r.name,
          excerpt: r.excerpt,
          coordinates: formatCoordinates(r.coordinates),
        }))}
      />

      {/* Experiences */}
      <section id="experiences" className="relative scroll-mt-20 bg-volcanic py-[16vh] text-white">
        <GridLines tone="light" />
        <div className="relative z-10">
          <SectionTitle tone="light">Experiences</SectionTitle>
          <ul className="mt-[12vh] grid grid-cols-1 gap-x-5 gap-y-12 px-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e) => (
              <li key={e.slug} id={e.slug} className="scroll-mt-24">
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <p className="t-eyebrow mt-4 text-[14px] text-white/60">{seasonLabel[e.season]} · {e.seasonNote}</p>
                  <h3 className="t-h3 mt-1 text-[1.75rem]">{e.name}</h3>
                  <p className="t-body mt-2 text-white/75">{e.summary}</p>
                  {e.verify ? <div className="mt-3"><VerifyFlag note={e.verify} tone="dark" /></div> : null}
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="t-small mt-12 px-5 text-white/50">
            Imagery is placeholder; some photographs stand in for activities until commissioned photography is available.{" "}
            <Link href="/enquire" className="underline">Ask a specialist</Link> about any experience.
          </p>
        </div>
      </section>
      <CtaBanner image={images.auroraSnow} />
    </>
  );
}
