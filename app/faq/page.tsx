import Link from "next/link";
import { faqs } from "@/data/faqs";
import type { FaqCategory } from "@/data/types";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { aboutTabs } from "@/lib/nav";
import { PageHero } from "@/components/sections/PageHero";
import { TabBar } from "@/components/sections/TabBar";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";
import { VerifyFlag } from "@/components/ui/Flag";

export const metadata = pageMetadata({
  title: "Frequently asked questions",
  description: "When to visit Iceland, northern lights and midnight sun, weather and packing, highland roads, ice caves, entry requirements, flights and booking.",
  path: "/faq",
  image: images.snowTrees.src,
});

const order: FaqCategory[] = ["When to go", "Getting here", "On the journey", "Booking"];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };

  return (
    <>
      <PageHero image={images.snowTrees} eyebrow="Before you go" title="FAQ" titleStyle="display">
        <TabBar mode="links" current="/faq" tabs={aboutTabs} />
      </PageHero>
      <section className="relative bg-white py-[14vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <nav aria-label="FAQ categories" className="col-span-4 md:col-span-2 md:col-start-2">
            <ul className="space-y-2 md:sticky md:top-28">
              {order.map((c) => (
                <li key={c}>
                  <a href={`#${c.toLowerCase().replace(/\s+/g, "-")}`} className="t-eyebrow text-[17px] hover:text-aurora">{c}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-4 md:col-span-7 md:col-start-5">
            {order.map((c) => (
              <div key={c} id={c.toLowerCase().replace(/\s+/g, "-")} className="mb-16 scroll-mt-24">
                <h2 className="t-label mb-4">{c}</h2>
                <div className="border-t border-atlantic/10">
                  {faqs
                    .filter((f) => f.category === c)
                    .map((f) => (
                      <details key={f.q} className="group border-b border-atlantic/10">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-serif text-[clamp(1.25rem,1.7vw,1.5rem)] leading-tight">
                          {f.q}
                          <span aria-hidden className="mt-1 font-sans text-xl font-light transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <div className="t-body max-w-[40rem] space-y-3 pb-6">
                          {f.a.map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                          {f.verify ? <VerifyFlag note={f.verify} /> : null}
                        </div>
                      </details>
                    ))}
                </div>
              </div>
            ))}
            <p className="t-body text-slate">
              Still have a question? <Link href="/enquire" className="underline underline-offset-2">Ask a specialist</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBanner image={images.auroraTall} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
