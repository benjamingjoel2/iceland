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
`scripts/make-responsive.py` pre-builds WebP files at 480/828/1200/1920px plus blur placeholders
(`public/images/r/`, `data/blur.json`), and `lib/imageLoader.ts` points `next/image` at them. After adding or
replacing a photo in `public/images/`, run `python3 scripts/make-responsive.py` and commit the output.

### Email

The brand address is `edgeofnorth@tourground.com`, used for guest, trade and press enquiries (`config/site.ts`).

## Where things live

| Path | What |
|---|---|
| `config/site.ts` | Brand name, palette, currencies + indicative FX rates, contact details, WhatsApp number, navigation, feature toggles (`etiasLive`, `showVerifyFlags`) |
| `data/*.ts` | Typed content: journeys, lodges, regions, experiences, seasons, people, testimonials, FAQs, steps, gateway stats, legal. Every page is generated from these, ready to move to a CMS. |
| `content/journal/*.mdx` | Journal posts (each exports `metadata`) |
| `app/` | Routes: `/`, `/journeys[/slug]`, `/lodges[/slug]`, `/iceland[/region]`, `/prices`, `/enquire`, `/about`, `/about/specialists`, `/faq`, `/legal/*`, `/journal[/slug]`, `/api/enquire` |
| `components/` | `layout/` (header, flyouts, footer, How it works drawer, currency switcher, WhatsApp), `sections/` (page sections), `motion/` (mist, clouds, parallax, reveals), `ui/` |
| `public/images` | Placeholder photography (Unsplash licence) — `scripts/fetch-images.sh`; responsive WebP in `public/images/r` |
| `public/mist` | Our own procedurally generated cloud/mist overlays — `scripts/make-mist.py` |
| `public/film` | Placeholder brand film built from stills + English captions — `scripts/make-film.sh` |

## Before launch

Everything that must be checked or replaced is visibly flagged on the site ("Verify before launch" or "Placeholder"):

- **Season windows, access dates and regulations** (highland F-roads, ice caves, puffins, aurora, daylight, entry rules incl. EES/ETIAS) — verify with partners and official sources. Flip `features.etiasLive` in `config/site.ts` when ETIAS launches.
- **Flight times, distances, temperatures** in `data/gateway.ts`.
- **Placeholder names**: the three lodges, specialists, testimonials, all quotes (writer, closing, enquire, lodge press quotes).
- **Contact details**: `[COMPANY NAME]`, registered office, phone, WhatsApp `[NUMBER]`, Icelandic Tourist Board `[LICENSE NUMBER]`, schedule-a-call link, footer badges.
- **Prices** (base USD) and **FX rates** in `config/site.ts` (replace with a live feed or finance-set rates).
- **Legal pages** — outlines only; need lawyer-drafted text.
- **Imagery and film** — some stand-ins are not of the exact place/activity; replace with commissioned photography and the brand film.
- **Enquiry delivery** — `app/api/enquire/route.ts` logs the payload; wire up email/CRM at the TODO. Newsletter signup has a TODO too.
