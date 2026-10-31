# Edge of North

Marketing site for **Edge of North**, private luxury journeys across Iceland. *Where the map runs out.*

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. The layout mirrors a
reference luxury polar-travel site section by section, rebuilt from scratch with our own content, palette,
fonts, imagery and mist overlays. See [`docs/REFERENCE-MAP.md`](docs/REFERENCE-MAP.md) for the full
section-by-section map.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Live at **https://edgeofnorth.tourground.com** (Vercel project `edge-of-north`; `tourground.com` DNS is on Vercel
nameservers, so the subdomain is managed in Vercel, not GoDaddy). `NEXT_PUBLIC_SITE_URL` defaults to that URL.

### Images

Photos are **not** run through Vercel's image optimiser (its quota is shared across every tourground site).
`scripts/make-responsive.py` pre-builds AVIF files at 480/828/1200/1920px plus blur placeholders
(`public/images/r/`, `data/blur.json`), and `lib/imageLoader.ts` points `next/image` at them. After adding or
replacing a photo in `public/images/`, run `python3 scripts/make-responsive.py` and commit the output.

### Email

The one address for guests, trade and press is `edgeofnorth@tourground.com` (`config/site.ts`). It only receives mail
once the mail provider's MX (and SPF/DKIM) records for `tourground.com` are in place in Vercel DNS.
The business address is Gróska, Bjargargata 1, 102 Reykjavík (coworking and innovation centre), used in the footer,
legal pages and JSON-LD. The site shows no phone number, WhatsApp, social links, licence numbers, team page or testimonials (owner's request).

## Languages

English is the default and keeps the current URLs; French, German and Spanish live under `/fr`, `/de` and `/es`
with the same paths (e.g. `/de/journeys/aurora-and-ice-caves`). The EN · FR · DE · ES selector in the header and the
mobile menu links to the same page in each language; there is no redirect by browser language.

Every locale is pre-rendered from the English source, with no translation library in the browser:
`scripts/i18n-build.mjs` runs before `dev` and `build`, copies `app/(en)` to `app/<locale>` and the shared code to
`.i18n/<locale>/`, and replaces every user-visible string with its translation from `i18n/<locale>.json` (keys are the
English text; `path::text` keys override a string in one file only). Internal links get the locale prefix, `<html lang>`,
`og:locale` and date formats follow the locale, and `lib/seo.ts` adds canonical plus hreflang alternates (en, fr, de, es,
x-default). The sitemap lists every page in every language. The generated folders are git-ignored.

- `npm run i18n:extract` writes `i18n/strings.json` (every candidate string with its location).
- `npm run i18n:missing -- --list` lists strings with no translation. Brand names, emails and Icelandic place names
  stay as they are on purpose. Icelandic place names keep their Icelandic spelling (Reykjavík, Þingvellir, Mývatn…).
- When you add copy, add its translation to all three files in the same change. Enquiry options submit stable ids
  (`lib/enquiry.ts`), so the API accepts enquiries from every language.

## Where things live

| Path | What |
|---|---|
| `config/site.ts` | Brand name, palette, currencies + indicative FX rates, contact email and address, navigation, feature toggles (`etiasLive`, `showVerifyFlags`) |
| `data/*.ts` | Typed content: journeys, lodges, regions, experiences, seasons, FAQs, steps, gateway stats, legal. Every page is generated from these, ready to move to a CMS. |
| `content/journal/*.mdx` | Journal posts (each exports `metadata`) |
| `app/(en)/` | English routes (the source), served at the root: `/`, `/journeys[/slug]`, `/lodges[/slug]`, `/iceland[/region]`, `/prices`, `/enquire`, `/about`, `/faq`, `/legal/*`, `/journal[/slug]`. `/api/enquire`, `sitemap.ts`, `robots.ts` and `global-not-found.tsx` sit in `app/` |
| `i18n/` | French, German and Spanish strings (`fr.json`, `de.json`, `es.json`, keyed by the English text) and translated journal posts (`i18n/content/<locale>/journal`). See Languages below. |
| `components/` | `layout/` (header, flyouts, footer, How it works drawer, currency switcher), `sections/` (page sections), `motion/` (mist, clouds, parallax, reveals), `ui/` |
| `public/images` | Placeholder photography (Unsplash licence) — `scripts/fetch-images.sh`; responsive WebP in `public/images/r` |
| `public/mist` | Our own procedurally generated cloud/mist overlays — `scripts/make-mist.py` |
| `public/film` | Placeholder brand film built from stills + English captions — `scripts/make-film.sh` |

## Before launch

Everything that must be checked or replaced is visibly flagged on the site ("Verify before launch" or "Placeholder"):

- **Season windows, access dates and regulations** (highland F-roads, ice caves, puffins, aurora, daylight, entry rules incl. EES/ETIAS) — verify with partners and official sources. Flip `features.etiasLive` in `config/site.ts` when ETIAS launches.
- **Flight times, distances, temperatures** in `data/gateway.ts`.
- **Placeholder names**: the three lodges.
- **Translations** (FR, DE, ES): written in-house for launch; have a native speaker review `i18n/*.json` and `i18n/content/`. The placeholder film's captions are English only.
- **Contact details**: MX records for `edgeofnorth@tourground.com`; confirm the Gróska address arrangement.
- **Prices** (base USD) and **FX rates** in `config/site.ts` (replace with a live feed or finance-set rates).
- **Legal pages** (Privacy Policy, Booking Terms, Cookie Policy in `data/legal.ts`) are complete but should be reviewed by a lawyer.
- **Imagery and film** — some stand-ins are not of the exact place/activity; replace with commissioned photography and the brand film.
- **Enquiry delivery** — `app/api/enquire/route.ts` logs the payload; wire up email/CRM at the TODO. Newsletter signup has a TODO too.
