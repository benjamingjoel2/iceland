import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { lodges, lodgeBySlug, formatCoordinates } from "@/data/lodges";
import { journeys } from "@/data/journeys";
import { regionBySlug } from "@/data/regions";
import { experienceBySlug } from "@/data/experiences";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ListCard, OffsetImageText, WideImage } from "@/components/sections/Blocks";
import { ImageFlick } from "@/components/sections/ImageFlick";
import { CardFlick } from "@/components/sections/CardFlick";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return lodges.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lodges/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = lodgeBySlug(slug);
  if (!l) return {};
  return pageMetadata({ title: l.name, description: `${l.kind}. ${l.excerpt}`, path: `/lodges/${l.slug}`, image: l.hero.src });
}

export default async function LodgePage({ params }: PageProps<"/lodges/[slug]">) {
  const { slug } = await params;
  const l = lodgeBySlug(slug);
  if (!l) notFound();
  const region = regionBySlug(l.region);
  const staying = journeys.filter((j) => j.lodges.includes(l.slug));
  const activities = l.activities.map(experienceBySlug).filter((e) => !!e);

  return (
    <>
      <PageHero
        image={l.hero}
        title={l.name}
        intro={
          <>
            {l.intro}
            <span className="mt-3 block">
              <PlaceholderFlag label="Placeholder name — no partner agreement yet" tone="dark" />
            </span>
          </>
        }
        coordinates={formatCoordinates(l.coordinates)}
        film
      />

      <WideImage image={l.interior} height="h-[100svh]" />

      <OffsetImageText
        image={l.feature}
        label={l.kind}
        body={
          <>
            {l.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {region ? (
              <p>
                Region:{" "}
                <Link href={`/iceland/${region.slug}`} className="underline underline-offset-2 hover:text-aurora">
                  {region.name}
                </Link>
              </p>
            ) : null}
          </>
        }
      />

      <ListCard title={l.amenitiesTitle} items={l.amenities} />

      <section className="relative bg-white pb-[14vh] text-atlantic">
        <GridLines />
        <p className="t-eyebrow relative z-10 mb-4 px-5 text-[20px]">A closer look</p>
        <div className="relative z-10">
          <ImageFlick images={l.gallery} />
        </div>
      </section>

      {/* Highlights — dark staggered grid */}
      <section className="relative bg-volcanic py-[16vh] text-white">
        <GridLines tone="light" />
        <div className="relative z-10">
          <SectionTitle tone="light">Highlights</SectionTitle>
          <div className="mt-[12vh] grid grid-cols-2 gap-2 px-5 md:grid-cols-12 md:gap-5">
            <ParallaxImage image={l.highlights[0]} className="col-span-1 aspect-[3/4] md:col-span-3 md:col-start-2" />
            <ParallaxImage image={l.highlights[1]} className="col-span-1 aspect-[3/4] md:col-span-3 md:mt-[10vh]" />
            <ParallaxImage image={l.highlights[2]} className="col-span-1 aspect-[3/4] md:col-span-3 md:col-start-10 md:-mt-[4vh]" />
            <ParallaxImage image={l.highlights[3]} className="col-span-1 aspect-[3/4] md:col-span-4 md:col-start-5 md:mt-[6vh]" />
          </div>
        </div>
      </section>

      {/* Daily activities */}
      <section className="relative bg-volcanic pb-[16vh] text-white">
        <GridLines tone="light" />
        <div className="relative z-10 grid grid-cols-4 items-end gap-5 px-5 md:grid-cols-12">
          <ParallaxImage image={l.highlights[0]} className="col-span-4 aspect-[3/2] md:col-span-4" />
          <Reveal className="col-span-4 md:col-span-6 md:col-start-6">
            <p className="t-eyebrow mb-5 text-[18px]">Daily activities</p>
            <ul>
              {activities.map((a) => (
                <li key={a.slug}>
                  <Link href={`/iceland#${a.slug}`} className="t-h3 block py-1 transition-colors hover:text-aurora-glow">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {staying.length ? (
        <section className="relative bg-volcanic pb-[16vh] pt-[6vh] text-white">
          <GridLines tone="light" />
          <div className="relative z-10">
            <SectionTitle tone="light">Journeys that stay here</SectionTitle>
            <div className="mt-[12vh]">
              <CardFlick items={staying} tone="dark" />
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner image={l.feature} />
    </>
  );
}
