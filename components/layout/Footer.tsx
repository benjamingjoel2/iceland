import Link from "next/link";
import { brand, contact, legalNav } from "@/config/site";
import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { regions } from "@/data/regions";
import { quotes } from "@/data/people";
import { images } from "@/data/images";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";
import { FooterFilmButton } from "./FooterFilmButton";
import { NewsletterButton } from "./NewsletterButton";

const linkCls = "t-body text-slate transition-colors hover:text-atlantic";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="t-eyebrow mb-1.5 text-atlantic">{title}</h3>
      {children}
    </div>
  );
}

/** Placeholder badges — replace with the real licence and award marks. */
const badges = ["Tourist Board licence", "Quality label", "Award", "Award", "Award", "Award"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ice text-atlantic">
      <GridLines />
      <div className="relative z-10 px-5 pt-4">
        <div className="grid grid-cols-2 gap-x-5 md:grid-cols-12">
          {/* Mark */}
          <div className="col-span-2 py-4 md:col-span-1">
            <svg aria-label={brand.name} viewBox="0 0 64 24" className="h-7 w-16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M0 22h20l9-13 6 6 5-5 9 12h15" />
              <path d="M32 2v6M29 5h6" />
            </svg>
          </div>

          {/* Contacts */}
          <div className="col-span-2 py-2.5 sm:col-span-1 md:col-span-2 md:col-start-2">
            <Col title="Guest enquiries">
              <ul>
                <li><a className={linkCls} href={`mailto:${contact.emails.guests}`}>{contact.emails.guests}</a></li>
                <li><a className={linkCls} href={contact.phoneHref}>{contact.phone}</a></li>
                <li><a className={linkCls} href={contact.scheduleCallUrl}>Schedule a call</a></li>
              </ul>
            </Col>
            <Col title="Trade enquiries">
              <ul><li><a className={linkCls} href={`mailto:${contact.emails.trade}`}>{contact.emails.trade}</a></li></ul>
            </Col>
            <Col title="Press">
              <ul><li><a className={linkCls} href={`mailto:${contact.emails.press}`}>{contact.emails.press}</a></li></ul>
            </Col>
            <Col title="Registered office">
              <p className="t-body text-slate">{brand.legalName}<br />{contact.office}</p>
            </Col>
          </div>

          {/* Journeys + lodges */}
          <div className="col-span-1 py-2.5 md:col-span-2">
            <Col title="Journeys">
              <ul>
                {journeys.map((j) => (
                  <li key={j.slug}><Link className={linkCls} href={`/journeys/${j.slug}`}>{j.title}</Link></li>
                ))}
                <li><Link className={linkCls} href="/journeys">View all</Link></li>
              </ul>
            </Col>
            <Col title="Lodges">
              <ul>
                {lodges.map((l) => (
                  <li key={l.slug}><Link className={linkCls} href={`/lodges/${l.slug}`}>{l.name}</Link></li>
                ))}
                <li><Link className={linkCls} href="/lodges">View all</Link></li>
              </ul>
            </Col>
          </div>

          {/* Iceland + about */}
          <div className="col-span-1 py-2.5 md:col-span-2">
            <Col title="Iceland">
              <ul>
                {regions.map((r) => (
                  <li key={r.slug}><Link className={linkCls} href={`/iceland/${r.slug}`}>{r.name}</Link></li>
                ))}
              </ul>
            </Col>
            <Col title="About">
              <ul>
                <li><Link className={linkCls} href="/about">Our story</Link></li>
                <li><Link className={linkCls} href="/about/specialists">Specialists</Link></li>
                <li><Link className={linkCls} href="/journal">Journal</Link></li>
                <li><Link className={linkCls} href="/faq">FAQ</Link></li>
              </ul>
            </Col>
            <Col title="Social">
              <ul>
                {contact.social.map((s) => (
                  <li key={s.label}><a className={linkCls} href={s.href}>{s.label}</a></li>
                ))}
              </ul>
            </Col>
          </div>

          {/* Action tiles */}
          <div className="col-span-2 grid grid-cols-2 gap-1.5 self-start py-2.5 md:col-span-5 md:col-start-8">
            <FooterFilmButton image={images.aboveClouds.src} />
            <Link href="/prices" className="flex h-[88px] items-center justify-center rounded-[2px] bg-glacier text-sm font-medium transition-colors hover:bg-aurora hover:text-white">
              Dates &amp; Prices
            </Link>
            <Link href="/enquire" className="flex h-[88px] items-center justify-center rounded-[2px] bg-glacier text-sm font-medium transition-colors hover:bg-aurora hover:text-white">
              Enquire now
            </Link>
            <NewsletterButton />
          </div>
        </div>

        {/* Giant wordmark, fitted edge to edge */}
        <svg aria-hidden viewBox="0 0 1000 150" className="mt-10 block w-full select-none text-atlantic">
          <text x="0" y="140" textLength="1000" lengthAdjust="spacing" fill="currentColor" style={{ fontFamily: "var(--font-oswald)", fontSize: 178, textTransform: "uppercase" }}>
            EDGE OF NORTH
          </text>
        </svg>

        {/* Bottom bar */}
        <div className="mt-6 grid grid-cols-1 items-center gap-6 border-t border-atlantic/10 py-6 md:grid-cols-3">
          <ul className="flex flex-wrap items-center gap-2" aria-label="Licences and awards (placeholders)">
            {badges.map((b, i) => (
              <li key={i} title={`${b} — placeholder`} className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-atlantic/30 text-center text-[7px] font-semibold uppercase leading-tight text-atlantic/60">
                {b}
              </li>
            ))}
          </ul>
          <figure className="text-center">
            <blockquote className="t-eyebrow text-[17px]">“{quotes.closing.text}”</blockquote>
            <figcaption className="mt-1 flex items-center justify-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-slate">
              — {quotes.closing.author} <PlaceholderFlag />
            </figcaption>
          </figure>
          <div className="md:text-right">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
              {legalNav.map((l) => (
                <li key={l.href}><Link href={l.href} className="t-small text-slate hover:text-atlantic">{l.label}</Link></li>
              ))}
            </ul>
            <p className="t-small mt-2 text-slate">{contact.license}</p>
            <p className="t-small mt-1 text-slate">© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
