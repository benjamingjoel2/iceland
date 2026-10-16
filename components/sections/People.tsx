import Image from "next/image";
import type { Person, Testimonial } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "./SectionTitle";

/** Dark section of side-by-side portraits with bios (the reference's founders block). */
export function PeopleDark({ title, people, detailed = false }: { title: React.ReactNode; people: Person[]; detailed?: boolean }) {
  return (
    <section className="relative bg-volcanic py-[16vh] text-white">
      <GridLines tone="light" />
      <div className="relative z-10">
        <SectionTitle tone="light">{title}</SectionTitle>
        <ul className={`mt-[12vh] grid grid-cols-1 gap-2 px-5 ${people.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {people.map((p) => (
            <li key={p.slug}>
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale-[30%]" />
                </div>
                <div className="pt-6 md:pr-10">
                  <h3 className="t-h3 text-[1.9rem]">{p.name}</h3>
                  <p className="t-eyebrow mt-1 text-[16px] text-white/70">{p.role}</p>
                  {p.placeholder ? <span className="mt-2 inline-block"><PlaceholderFlag label="Placeholder person" tone="dark" /></span> : null}
                  <div className="t-body mt-4 space-y-3 text-white/70">
                    {p.bio.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                  </div>
                  {detailed ? (
                    <>
                      <blockquote className="t-quote mt-6 text-white/90">“{p.quote}”</blockquote>
                      <dl className="mt-6 grid grid-cols-2 gap-4 text-[12px]">
                        <div>
                          <dt className="t-label text-white/50">Specialisms</dt>
                          <dd className="mt-1">{p.specialisms.join(", ")}</dd>
                        </div>
                        <div>
                          <dt className="t-label text-white/50">Languages</dt>
                          <dd className="mt-1">{p.languages.join(", ")}</dd>
                        </div>
                      </dl>
                    </>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="relative bg-white py-[16vh] text-atlantic">
      <GridLines />
      <div className="relative z-10">
        <SectionTitle>In their words</SectionTitle>
        <p className="mt-14 text-center">
          <PlaceholderFlag label="Placeholder testimonials — not real reviews" />
        </p>
        <ul className="mt-[8vh] grid grid-cols-1 gap-x-5 gap-y-12 px-5 md:grid-cols-3">
          {items.map((t, i) => (
            <li key={i}>
              <Reveal delay={(i % 3) * 0.1}>
                <figure>
                  <blockquote className="t-quote">“{t.quote.replace("[PLACEHOLDER] ", "")}”</blockquote>
                  <figcaption className="mt-4 text-[12px]">
                    <span className="font-semibold">{t.author}</span>
                    <span className="block text-slate">{t.journey}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
