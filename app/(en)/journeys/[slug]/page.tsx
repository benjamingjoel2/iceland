import Image from "@/components/ui/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { journeys, journeyBySlug } from "@/data/journeys";
import { lodgeBySlug, formatCoordinates } from "@/data/lodges";
import { regionBySlug } from "@/data/regions";
import { experienceBySlug } from "@/data/experiences";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TabBar } from "@/components/sections/TabBar";
import { DayByDay, StayLink } from "@/components/sections/DayByDay";
import { FourUp, OffsetImageText } from "@/components/sections/Blocks";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { GridLines } from "@/components/ui/GridLines";
import { Price } from "@/components/ui/Price";
import { PlaceholderFlag, VerifyFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { buttonClass } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journeys/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) return {};
  return pageMetadata({ title: j.title, description: j.excerpt, path: `/journeys/${j.slug}`, image: j.hero.src });
}

export default async function JourneyPage({ params }: PageProps<"/journeys/[slug]">) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) notFound();

  const lodges = j.lodges.map(lodgeBySlug).filter((l) => !!l);
  const regions = j.regions.map(regionBySlug).filter((r) => !!r);
  const exps = j.experiences.map(experienceBySlug).filter((e) => !!e);
  const others = journeys.filter((o) => o.slug !== j.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: j.title,
    description: j.excerpt,
    touristType: "Luxury private travel",
    itinerary: regions.map((r) => ({ "@type": "Place", name: r.name })),
    offers: { "@type": "Offer", price: j.priceFromUSD, priceCurrency: "USD", description: `From, ${j.priceBasis}` },
  };

  return (
    <>
      <PageHero
        image={j.hero}
        title={j.title}
        titleStyle="italic"
        film
        meta={
          <>
            <Price usd={j.priceFromUSD} />
            <span className="h-3.5 w-px bg-white/60" />
            <span>{j.seasonLabel}</span>
            <span className="h-3.5 w-px bg-white/60" />
            <span>{j.nights} nights</span>
          </>
        }
        intro={j.intro}
      />
      <TabBar
        tabs={[
          { label: "Overview", href: "#overview" },
          { label: "Itinerary", href: "#itinerary" },
          { label: "Lodges", href: "#lodges" },
          { label: "More info", href: "#more-info" },
        ]}
      />

      {/* Overview — dark, inset image left, copy right */}
      <section id="overview" className="relative scroll-mt-0 bg-volcanic py-[14vh] text-white">
        <GridLines tone="light" />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <ParallaxImage image={j.gallery[0]} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <Reveal className="col-span-4 md:col-span-4 md:col-start-8 md:self-center">
            <h2 className="t-label mb-3">Overview</h2>
            <div className="t-body space-y-4 text-white/75">
              {j.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <span className="text-white">Season:</span> {j.seasonNote}.{" "}
                See <Link href="/prices" className="text-aurora-glow underline underline-offset-2">dates &amp; prices</Link>.
              </p>
              <p>
                <span className="text-white">Regions:</span>{" "}
                {regions.map((r, i) => (
                  <span key={r.slug}>
                    <Link href={`/iceland/${r.slug}`} className="underline decoration-white/30 underline-offset-2 hover:text-white">{r.name}</Link>
                    {i < regions.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-5">
              <VerifyFlag note={j.verify.join("; ")} tone="dark" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statement over textured image with hairlines */}
      <section className="relative flex h-[70vh] items-center overflow-hidden text-white">
        <Image src={j.gallery[1].src} alt={j.gallery[1].alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-atlantic/40" />
        <GridLines tone="light" />
        <div className="relative z-10 w-full border-y border-white/40 px-5 py-3">
          <Reveal>
            <h2 className="t-h2 md:ml-[calc(100%/12*2)]">{j.statement}</h2>
          </Reveal>
        </div>
      </section>

      <OffsetImageText
        image={j.gallery[2]}
        label="Experiences on this journey"
        body={
          <ul className="space-y-3">
            {exps.map((e) => (
              <li key={e.slug}>
                <Link href={`/iceland#${e.slug}`} className="font-semibold hover:text-aurora">{e.name}</Link>
                <span className="block text-slate">{e.seasonNote}</span>
              </li>
            ))}
          </ul>
        }
      />

      <section className="relative bg-volcanic pt-[16vh] text-white">
        <GridLines tone="light" />
        <SectionTitle tone="light">Sample itinerary</SectionTitle>
      </section>
      <DayByDay
        id="itinerary"
        titleA={j.title}
        titleB="Day by day"
        noteTitle="Season & access"
        note={
          <>
            <p>{j.seasonNote}.</p>
            <p className="mt-3">Every itinerary is private and can be adapted to your dates, pace and interests.</p>
            <div className="mt-4">
              <VerifyFlag tone="dark" note={j.verify.join("; ")} />
            </div>
          </>
        }
        items={j.days.map((d) => {
          const lodge = d.lodge ? lodgeBySlug(d.lodge) : undefined;
          return {
            n: d.day,
            title: d.title,
            body: d.body,
            image: d.image,
            meta:
              d.stay === "—" ? null : (
                <>
                  <span className="text-white/75">Night: </span>
                  <StayLink href={lodge ? `/lodges/${lodge.slug}` : undefined} label={d.stay} />
                </>
              ),
          };
        })}
      />

      {/* Lodges on this journey */}
      <section id="lodges" className="relative bg-white py-[16vh] text-atlantic">
        <GridLines />
        <div className="relative z-10">
          <SectionTitle>Where you stay</SectionTitle>
          <ul className="mt-[12vh] grid grid-cols-1 gap-2 px-5 md:grid-cols-2">
            {lodges.map((l) => (
              <li key={l.slug}>
                <Link href={`/lodges/${l.slug}`} className="group relative block aspect-[16/10] overflow-hidden text-white">
                  <Image src={l.hero.src} alt={l.hero.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic/60 to-volcanic/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                    <p className="t-label mb-2">[ {formatCoordinates(l.coordinates)} ]</p>
                    <h3 className="t-h3">{l.name}</h3>
                    <p className="mt-2 max-w-[24rem] text-[13px] text-white/85">{l.excerpt}</p>
                    <span className="mt-3"><PlaceholderFlag label="Placeholder name" tone="dark" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="t-body mx-auto mt-6 max-w-[34rem] px-5 text-center text-slate">
            Other nights are spent in the finest available hotels and country houses along the route, chosen by your specialist.
          </p>
        </div>
      </section>

      {/* More info */}
      <section id="more-info" className="relative bg-glacier py-[14vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <div className="col-span-4 md:col-span-3 md:col-start-2">
            <h2 className="t-h3">More info</h2>
            <p className="mt-8 font-serif text-[clamp(1.6rem,2.2vw,2rem)]">
              <Price usd={j.priceFromUSD} />
            </p>
            <p className="t-small mt-1 text-slate">{j.priceBasis}. Indicative; shown in your chosen currency.</p>
            <Link href={`/enquire?journey=${j.slug}`} className={`${buttonClass("accent", "md")} mt-6 w-full`}>
              Enquire about this journey
            </Link>
          </div>
          <div className="col-span-4 mt-8 md:col-span-3 md:col-start-6 md:mt-0">
            <h3 className="t-label mb-3">Included</h3>
            <ul className="t-body space-y-2">
              {j.included.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden className="mt-[0.6em] h-px w-2 shrink-0 bg-atlantic/60" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 mt-8 md:col-span-3 md:mt-0">
            <h3 className="t-label mb-3">Not included</h3>
            <ul className="t-body space-y-2">
              {j.excluded.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden className="mt-[0.6em] h-px w-2 shrink-0 bg-atlantic/60" />{x}</li>
              ))}
            </ul>
            <h3 className="t-label mb-3 mt-8">To verify before launch</h3>
            <ul className="t-body space-y-1 text-slate">
              {j.verify.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FourUp
        title="More journeys"
        items={others.map((o) => ({ image: o.card, label: o.title, href: `/journeys/${o.slug}` }))}
      />
      <CtaBanner image={j.hero} title="Make this journey yours" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
