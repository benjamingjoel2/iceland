import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { regions, regionBySlug } from "@/data/regions";
import { journeys } from "@/data/journeys";
import { experienceBySlug } from "@/data/experiences";
import { lodges, formatCoordinates } from "@/data/lodges";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TabBar } from "@/components/sections/TabBar";
import { FourUp, LabelText, Statement, WideImage } from "@/components/sections/Blocks";
import { ImageFlick } from "@/components/sections/ImageFlick";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { VerifyFlag } from "@/components/ui/Flag";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/iceland/[region]">): Promise<Metadata> {
  const { region } = await params;
  const r = regionBySlug(region);
  if (!r) return {};
  return pageMetadata({ title: r.name, description: r.excerpt, path: `/iceland/${r.slug}`, image: r.hero.src });
}

export default async function RegionPage({ params }: PageProps<"/iceland/[region]">) {
  const { region } = await params;
  const r = regionBySlug(region);
  if (!r) notFound();
  const related = journeys.filter((j) => j.regions.includes(r.slug));
  const exps = r.experiences.map(experienceBySlug).filter((e) => !!e);
  const lodge = lodges.find((l) => l.region === r.slug);
  const [first, ...rest] = r.sections;

  return (
    <>
      <PageHero image={r.hero} eyebrow="Regions" title={r.name} titleStyle="display">
        <TabBar mode="links" current={`/iceland/${r.slug}`} tabs={regions.map((x) => ({ label: x.shortName, href: `/iceland/${x.slug}` }))} />
      </PageHero>

      <LabelText
        label={first.label}
        body={
          <>
            {first.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-slate">
              Best season: {r.bestSeason} · [ {formatCoordinates(r.coordinates)} ]
            </p>
            {r.verify ? <VerifyFlag note={r.verify} /> : null}
          </>
        }
      />

      <section className="relative bg-white pb-[10vh]">
        <GridLines />
        <div className="relative z-10">
          <ImageFlick images={r.gallery} />
        </div>
      </section>

      {rest.map((s) => (
        <LabelText
          key={s.label}
          label={s.label}
          body={s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        />
      ))}

      <WideImage image={r.wide[0]} />
      <Statement text={r.statement} />

      {/* Experiences + offset image */}
      <section className="relative bg-white pb-[14vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <ParallaxImage image={r.wide[1]} className="col-span-4 aspect-[4/5] md:col-span-4" />
          <Reveal className="col-span-4 md:col-span-4 md:col-start-7 md:mt-[22vh]">
            <h2 className="t-label mb-4">Experiences here</h2>
            <ul className="space-y-4">
              {exps.map((e) => (
                <li key={e.slug}>
                  <Link href={`/iceland#${e.slug}`} className="t-eyebrow text-[20px] hover:text-aurora">{e.name}</Link>
                  <p className="t-body text-slate">{e.summary}</p>
                </li>
              ))}
            </ul>
            {lodge ? (
              <p className="t-body mt-8">
                Stay at{" "}
                <Link href={`/lodges/${lodge.slug}`} className="underline underline-offset-2 hover:text-aurora">{lodge.name}</Link> (placeholder).
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <FourUp
        title={related.length ? <>Journeys<br />through here</> : <>More<br />journeys</>}
        items={[...related, ...journeys.filter((j) => !related.includes(j))].slice(0, 4).map((j) => ({ image: j.card, label: j.title, href: `/journeys/${j.slug}` }))}
      />
      <CtaBanner image={images.mistyPeaks} />
    </>
  );
}
