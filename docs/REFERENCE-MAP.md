# Edge of North — Reference map & build plan

Blueprint: the reference luxury polar-travel site (studied 16 Oct 2026 at 1440×900 and 390×844 via headless Chromium:
home, dates & rates, enquire, an itinerary, a camp, a region, itineraries index, camps index, founders).
Nothing from the reference (HTML, CSS, JS, images, video, overlays, icons, fonts, words) is copied. Everything here is
rebuilt from scratch; only structure, proportions and behaviour are mirrored.

---

## 0. Global system (measured on the reference → our equivalent)

| Token | Reference (measured) | Edge of North |
|---|---|---|
| Display sans (giant words) | Condensed grotesque, 256px hero / 320px route code, weight 400, uppercase, line-height 1 | **Oswald** (Google Fonts), same sizes in `vw` (17.8vw hero, 22vw route) |
| Serif titles | High-contrast Garamond-style, 42–90px, weight 400–500, uppercase for section titles, italic for card / eyebrow titles | **Cormorant Garamond** 400/500 + italic |
| Body | Tight grotesque, 14px/21px weight 500 (body), 12px small, 16px UI | **Inter Tight** 14/21 500, 12/14.4, 16 |
| Small caps label | Condensed, 14px uppercase (e.g. "OUR SEASON") | Oswald 14px uppercase, tracking 0.02em |
| Primary text colour | Deep navy | **North Atlantic blue** `#14263A` |
| Dark sections | Near-black navy `#0E1117` | **Volcanic black** `#0B0D10` |
| Dark cards | Slate `#2A2F38` | **Basalt grey** `#2B3036` |
| Footer / light panels | Warm stone `#E8E5DF` / `#F3F1EC` buttons | **Glacier white** `#E9ECEC` / `#F4F6F6` buttons |
| Accent (sparing) | Signal orange: nav hover/active, "How it works" tab, "Start planning" buttons, mobile Enquire | **Aurora green** `#1C8C68` (fill) / `#3FD8A0` (glow, dots, flight path) |
| Grid overlay | 1px vertical hairlines over every section (12 col, 20px gutters), ~6% opacity | Same, `GridLines` component, `currentColor` 6% |
| Containers | `container` 20px side padding; large 1416px; small 1320px | Same values in Tailwind tokens |
| Radius | 2px buttons, 6px cards | Same |

**Header (all pages):** fixed, transparent, 20px inset. Left: three frosted‑glass pill buttons (Experience / Operation / About,
~80×36, 13px). Centre: logo mark + wordmark. Right: Rates / Enquire glass buttons. Hover and active = accent fill.
Clicking a left button opens a **white flyout panel** (≈330px wide, full height minus 12px inset) anchored left, listing
italic serif group labels ("Itineraries", "Camps") with sans links and a full-width "Enquire now" block at its foot; page
behind dims and blurs. Mobile: "Menu" left, logo centre, accent "Enquire" right → full-screen accordion menu.
→ **Ours:** Experience / Journeys / Lodges / Iceland / About (left), logo "EDGE OF NORTH" (text placeholder) centre,
currency switcher + Dates & Prices + Enquire now (right). Flyouts list journeys, lodges, regions, experiences, about links.

**"How it works" side tab:** fixed vertical accent tab on the right edge (≈30×100, rotated label + "+") appears after the hero.
Opens a right‑hand drawer (≈50% width on desktop, full on mobile) with an H3 serif title and six stacked grey cards
("1. Consultation" italic serif + body). Tab becomes "Close ×". → **Ours:** six Iceland steps (see §1.11).

**Mist transition:** sections are joined by a soft white cloud bank that rises over the outgoing image as you scroll
(gradient + cloud PNG layers translating up, opacity tied to scroll progress). → `MistTransition` with our own generated
cloud textures (`/public/mist/*.webp`, made procedurally by `scripts/make-mist.py`).

**Footer (all pages):** stone panel. Row 1: logo mark | contact column (italic serif headings "Guest enquiries", "Trade
enquiries", "Other enquiries" + grey 14px links) | Itineraries + Camps column | Region + About + Social column | right block:
"Watch film" image button, two half buttons (Dates & Rates, Enquire now), full "Newsletter signup" button. Row 2: giant
brand wordmark spanning full width in display sans (~200px, navy). Row 3: badges row (6 small logos) · centred italic
quote · legal links + credits.
→ **Ours:** same grid; wordmark "EDGE OF NORTH"; badges = 6 labelled placeholders (Icelandic Tourist Board licence
[LICENSE NUMBER], Vakinn quality label [TBC], awards ×4 [TBC]); closing quote = placeholder flagged `PLACEHOLDER`.

**Motion rules:** Framer Motion `useScroll` drives parallax and mist; reveals are 0.8–1.2s ease-out fades/rises;
`prefers-reduced-motion` disables parallax, drifting clouds, card flicks and autoplay (static posters instead).

---

## 1. Homepage (`/`) — section by section

| # | Reference section | Layout & behaviour | Edge of North content |
|---|---|---|---|
| 1.1 | Hero: full-bleed muted looping video, 100vh. Italic serif tagline left (≈18px, 2 lines, at 33% height); glass "Watch film ▶" button right; **giant word** (256px condensed, white) bottom-centred | Video slowly scales; on scroll the word blurs/fades and **drifting cloud layers** slide across and over it (3 parallax layers, different speeds), turning the screen white | Video: our generated Iceland film (aurora/glacier/coast, poster fallback). Eyebrow/tagline: *"The Edge of the North"* / *"Where the map runs out."* Giant word **ICELAND**. Watch film → modal with captions (VTT) |
| 1.2 | Mist → white. Intro: italic eyebrow ("The Last Continent") at col 3, H3 42px serif uppercase with first-line indent of 4 columns, cols 3–9 | Text reveals as mist clears | Eyebrow *"The Edge of the North"*; text: "Where the Arctic Circle touches the land and the island is still being made — fire beneath, ice above, and the North Atlantic all around." |
| 1.3 | "OUR SEASON" block: small condensed label + 14px body (cols 2–3) floating over the top of a full-bleed landscape image that fades up from white | Image parallax upward | **TWO SEASONS**: midnight‑sun summer (Jun–Aug) and aurora winter (Oct–Mar) — flagged *verify*; full-bleed Vestrahorn image |
| 1.4 | "OUR TRIPS" title (60px serif, centred) + hand‑drawn scribble underline SVG | Scribble draws on scroll | **OUR JOURNEYS**, our own scribble path |
| 1.5 | **Card flick**: 1416×~540 row; one expanded card (≈50%) with italic serif title top-left (42px), price + season tag + excerpt bottom-left; the other cards are narrow blurred strips | Hover/click a strip → it expands (flex-grow), others blur; auto-advances; mobile = swipe carousel | 6 journeys: price "from US$…" (currency-aware) | season tag (Summer / Winter / All year) |
| 1.6 | Founder quote: centred column (cols 4–8), italic serif 22px with drop opening quote, signature SVG, name + title | Fade up | Quote from **"Your specialist"** — placeholder name *Sigrún [Surname]*, Head Specialist; flagged placeholder |
| 1.7 | **Our Camps**: 1:2 inset image grows to full bleed (clip-path) behind huge serif title "OUR CAMPS" (90px) + intro text; then **pinned horizontal scroll** over a textured background: 720×540 frosted cards (title, 1-line excerpt, image, **[ GPS coordinates ]** in condensed 14px) | Pin + translateX tied to vertical scroll; cards have glass blur | **OUR LODGES**: 3 placeholder lodges with coordinates (south/Vatnajökull, lava-field design hotel, Westfjords/north fjord retreat) |
| 1.8 | Magazine quote over full-bleed image: masthead logo, italic serif quote centred, author caps | Fade | **Placeholder quote, flagged** ("[PLACEHOLDER — choose a real, attributed quote]") — no masthead |
| 1.9 | **Route code**: giant "CPT – WFR" (320px) fades in over image, mist wipes to white | Mist transition | **LHR · JFK – KEF** |
| 1.10 | "To the end of the Earth" header row: coordinates left/right (12px), serif title centred, 14px body. Then **dark sticky map**: grey relief of the two continents, cyan dashed arc with animated dot travelling along it as you scroll; left sticky stats card (flying time, distance, avg temp) with italic labels and 32px sans values; "Watch film" thumbnail | Path draws with scroll (`pathLength`); stats card sticky | **"Your gateway north"**: stylised North Atlantic SVG (Greenland, Iceland, British Isles, Labrador/NE USA coast) with two arcs LHR→KEF and JFK→KEF. Stats: ~3h from London, ~5h40 from New York (to verify); distance LHR–KEF ~1,900 km / 1,180 mi, JFK–KEF ~4,200 km / 2,600 mi; avg temp summer ~11°C/52°F, winter ~0°C/32°F (Reykjavík, to verify) |
| 1.11 | "How it works" drawer (global, see §0) | | 1 Consultation · 2 Confirmation · 3 Planning flights & extra nights · 4 Pre‑departure & packing · 5 Arrival & welcome briefing in Reykjavík · 6 Your journey begins |
| 1.12 | CTA: full-bleed image 100vh, serif 42px "START PLANNING YOUR ADVENTURE", ghost button | | "BEGIN YOUR JOURNEY NORTH" / "Speak to a specialist" |
| 1.13 | Footer (see §0) | | |

## 2. Itinerary page → `/journeys/[slug]`

1. Hero 100vh image/video, centred italic serif title 64px, meta row "price | dates", 14px intro; bottom-centre **sticky tab bar** (Overview · Itinerary · Lodges · More info) that follows the reader and highlights the current section.
2. Overview: dark section, inset image left, body text right with inline accent link; "A GLOBAL PERSPECTIVE"-style full-width serif title with hairline rules over a textured image; image left + long copy right with condensed sub-heads.
3. Quote over image (italic serif, right-aligned column).
4. "SAMPLE ITINERARY" on volcanic black: left sticky column (title in two weights + italic note), middle column of basalt day cards (italic numerals "01", italic day title, 14px grey body), right column sticky image that swaps per day.
5. "MORE INFO": three portrait images that expand into a full-bleed one, title fades through mist; included / not included lists.
6. 4-up image strip, CTA, footer.
→ Ours: day-by-day from `/data/journeys.ts`, lodge each night (links to lodge), experiences chips, included / not included, season + access-window note (*verify*), "from" price with currency switcher, Enquire CTA (prefills journey).

## 3. Camp page → `/lodges/[slug]`

Hero 100vh image with centred serif title 64px, 14px subtitle, coordinates at bottom, "Watch film" thumb; full-bleed interior image; offset image left + condensed label + body right; amenities card (italic title left, bullet list with hairlines right); press quote; "A Closer Look" gallery with thumbnails; **dark "HIGHLIGHTS"** masonry; "Daily activities" image + big serif list; "Our trips" card flick on dark; CTA; footer.
→ Ours: placeholder lodge story, amenities, gallery, highlights, activities = experiences available nearby, journeys that stay here.

## 4. Region page → `/iceland/[region]`

Hero image, italic eyebrow "Regions", giant serif title 90px, **bottom tab bar listing all regions** (current filled navy); white section with condensed label + 14px body at cols 5–8; card‑flick image gallery; long copy; full-bleed images; big serif indented statement; offset images; "MORE ABOUT US" 4-up; CTA; footer.
→ 8 regions, each with highlights, best season (*verify*), coordinates, experiences, related journeys.

## 5. Index pages
- **Itineraries** → `/journeys`: hero with spaced caps eyebrow ("OUR CORE JOURNEYS"), giant serif title, mist transition; scribble + label + intro; then a list of large 1236px-wide cards, each with a **sticky left column of season tags** (italic serif) and a parallax image card with title, price | season, excerpt.
- **Camps** → `/lodges`: same hero/mist/intro; then full-bleed stacked lodge panels (coordinates, serif title, excerpt) that overlap as you scroll (sticky stacking); "Our trips" flick.
- **Antarctica** → `/iceland`: hero + region tab bar + sections per region (we render an overview with 8 region panels).

## 6. Dates & rates → `/prices`
Hero image with title "DATES & RATES" (64px serif) + 14px note; overlapping light panel (#F0F0F0) with "Select your season" toggle (navy active pill); list of white cards: image (with prev/next mini arrows) left, tag chips (navy), italic serif title, excerpt, price top-right (28px serif), three buttons: Trip dates (grey) · More info (grey) · **Start planning** (accent). Then dark **"HOW IT WORKS"** with sticky day-card layout (same as itinerary). Footer.
→ Season toggle = Summer / Winter / All year; prices in USD converted by the currency switcher; "Trip dates" expands the season window note.

## 7. Enquire → `/enquire`
Full-bleed dark image fixed behind; centred title "START PLANNING" + 14px note; form column (cols 4–8) with section headings (18px sans) and **large white tile choices** (≈170×50) for season/month/interests; inputs as white 50px boxes, hairline dashed dividers; big white submit tile; quote below.
→ Our fields: name, email, phone (+ country code select), preferred season tiles, travel dates/month, travellers, journey of interest, interests (multi tiles), budget range, how you heard, notes, preferred contact (Email / WhatsApp / Telephone tiles), "Schedule a call" link placeholder. Zod validation client + server; `POST /api/enquire` logs + TODO CRM; calm confirmation panel.

## 8. Founders → `/about` and `/about/specialists`
Hero with italic "About" eyebrow + giant serif title + tab bar (Founders / Foundation / Sustainability / Partner); "HOW IT ALL STARTED" title; story column with two offset images; big serif statement; italic quote; dark "OUR FOUNDERS" with two portraits side by side + bios; full-bleed image with serif statement; "MORE ABOUT US" 4-up; CTA; footer.
→ `/about` = our story/promise (tabs: About · Specialists · Responsible travel); `/about/specialists` = 3 placeholder specialists on dark.

---

## Folder structure

```
app/                     routes (App Router)
  layout.tsx             fonts, header, footer, providers, How-it-works, WhatsApp
  page.tsx               homepage
  journeys/ lodges/ iceland/ prices/ enquire/ about/ faq/ legal/ journal/
  api/enquire/route.ts   POST handler (logs, TODO CRM)
  sitemap.ts robots.ts not-found.tsx
components/
  layout/   Header, Flyout, MobileMenu, Footer, HowItWorks, WhatsAppButton, CurrencySwitcher
  motion/   MistTransition, CloudLayers, Reveal, ScribbleTitle, ParallaxImage
  sections/ GiantHero, IntroStatement, SeasonsBlock, CardFlick, QuoteBlock, LodgesHorizontal,
            RouteCode, FlightRoute, CtaBanner, PageHero, TabBar, DayByDay, PriceCard, RegionTabs ...
  ui/       GridLines, Button, Price, Placeholder flag, VerifyNote, FilmModal
config/site.ts           brand, palette, currencies + rates, contact, nav, feature toggles (ETIAS)
data/                    journeys, lodges, regions, experiences, seasons, people, testimonials, faqs, posts, steps
content/journal/*.mdx    4 starter posts
lib/                     currency context, formatting, seo helpers, enquiry schema
public/images, public/mist, public/film
scripts/                 make-mist.py, make-film.sh (asset generation)
```

## Data types (`/data/types.ts`)

`Journey { slug, title, tagline, season: SeasonKey, seasonNote, priceFromUSD, nights, excerpt, hero, gallery, regions[], experiences[], days: Day[], included[], excluded[], verify[] }`
`Day { day, title, body, lodge?: slug, image }`
`Lodge { slug, name, placeholder: true, region, coordinates: {lat, lng, label}, excerpt, story[], amenities[], hero, gallery[], highlights[] }`
`Region { slug, name, eyebrow, statement, intro, sections[], bestSeason, verify, coordinates, hero, gallery[], experiences[] }`
`Experience { slug, name, season, note, image }` · `Season { key, name, months, daylight, body, verify }`
`Person { slug, name, role, bio, quote, image, placeholder }` · `Testimonial { quote, author, trip, placeholder }`
`Faq { q, a, category, verify? }` · `Post { slug, title, excerpt, date, hero }` · `Step { n, title, body }`

All prices are base USD; `config/site.ts` holds indicative FX rates (flagged to replace with a live feed).
Every season window, access date and regulation carries a `verify` note rendered as a small "Verify before launch" flag.
