import Link from "next/link";
import Image from "@/components/ui/Image";
import { brand, contact, legalNav } from "@/config/site";
import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { regions } from "@/data/regions";
import { images } from "@/data/images";
import { LanguageSwitcher } from "./LanguageSwitcher";

const linkCls = "t-body text-slate transition-colors hover:text-atlantic";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="t-eyebrow mb-2 text-atlantic">{title}</h2>
      <ul className="space-y-0.5">{children}</ul>
    </nav>
  );
}

/**
 * Footer: a short photo band with one "plan a journey" line and button, then compact
 * columns (brand, line, email and address once; four link columns) and one base line.
 */
export function Footer() {
  return (
    <footer className="bg-ice text-atlantic">
      <section aria-labelledby="footer-cta" className="relative flex h-[42vh] min-h-[280px] max-h-[420px] items-end overflow-hidden text-white">
        <Image src={images.aboveClouds.src} alt={images.aboveClouds.alt} fill sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-atlantic/70 via-atlantic/25 to-transparent" />
        <div className="relative z-10 flex w-full flex-col items-start gap-5 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
          <h2 id="footer-cta" className="t-h3 max-w-[18ch]">Plan your journey north</h2>
          <Link
            href="/enquire"
            className="flex h-11 items-center rounded-[2px] bg-aurora px-6 text-[13px] font-medium text-white transition-colors hover:bg-atlantic"
          >
            Enquire now
          </Link>
        </div>
      </section>

      <div className="px-5 pt-14 md:px-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="font-display text-[15px] font-medium uppercase tracking-[0.28em]">{brand.name}</p>
            <p className="t-body mt-3 max-w-[22rem] text-slate">{brand.tagline}</p>
            <p className="mt-4">
              <a className="t-body transition-colors hover:text-aurora" href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <address className="t-small mt-2 not-italic text-slate">Gróska, Bjargargata 1, 102 Reykjavík, Iceland</address>
          </div>

          <div className="md:col-span-2">
            <Col title="Journeys">
              {journeys.map((j) => (
                <li key={j.slug}><Link className={linkCls} href={`/journeys/${j.slug}`}>{j.title}</Link></li>
              ))}
            </Col>
          </div>
          <div className="md:col-span-2">
            <Col title="Iceland">
              {regions.map((r) => (
                <li key={r.slug}><Link className={linkCls} href={`/iceland/${r.slug}`}>{r.name}</Link></li>
              ))}
            </Col>
          </div>
          <div className="md:col-span-2">
            <Col title="Lodges">
              {lodges.map((l) => (
                <li key={l.slug}><Link className={linkCls} href={`/lodges/${l.slug}`}>{l.name}</Link></li>
              ))}
            </Col>
          </div>
          <div className="md:col-span-2">
            <Col title="About">
              <li><Link className={linkCls} href="/about">Our story</Link></li>
              <li><Link className={linkCls} href="/prices">Dates &amp; Prices</Link></li>
              <li><Link className={linkCls} href="/journal">Journal</Link></li>
              <li><Link className={linkCls} href="/faq">FAQ</Link></li>
              <li><Link className={linkCls} href="/enquire">Enquire now</Link></li>
            </Col>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-atlantic/10 py-5 md:flex-row md:items-center md:justify-between">
          <p className="t-small text-slate">© 2026 {brand.legalName}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="t-small text-slate hover:text-atlantic">{l.label}</Link></li>
            ))}
          </ul>
          <LanguageSwitcher variant="plain" />
        </div>
      </div>
    </footer>
  );
}
