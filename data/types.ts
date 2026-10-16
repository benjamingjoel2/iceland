/**
 * Content types. Every page is generated from these shapes so the data can
 * later move to a CMS without touching components.
 */

export type SeasonKey = "summer" | "winter" | "all-year";

export type Img = {
  src: string;
  alt: string;
  /** Placeholder photography credit until commissioned imagery is in place. */
  credit?: string;
};

export type Coordinates = { lat: number; lng: number };

export type Season = {
  key: SeasonKey;
  name: string;
  short: string;
  months: string;
  daylight: string;
  body: string;
  highlights: string[];
  image: Img;
  verify: string;
};

export type Experience = {
  slug: string;
  name: string;
  season: SeasonKey;
  seasonNote: string;
  summary: string;
  image: Img;
  verify?: string;
};

export type Lodge = {
  slug: string;
  name: string;
  /** Placeholder names until real agreements exist. */
  placeholder: true;
  kind: string;
  region: string; // region slug
  coordinates: Coordinates;
  excerpt: string;
  intro: string;
  story: string[];
  amenitiesTitle: string;
  amenities: string[];
  hero: Img;
  interior: Img;
  feature: Img;
  gallery: Img[];
  highlights: Img[];
  activities: string[]; // experience slugs
  quote: { text: string; author: string; placeholder: true };
};

export type ItineraryDay = {
  day: string; // "01" or "01–02"
  title: string;
  body: string;
  lodge?: string; // lodge slug, or undefined when staying in Reykjavík
  stay: string; // human label for the night
  image: Img;
};

export type Journey = {
  slug: string;
  title: string;
  /** Title split for the italic two-line card treatment. */
  cardTitle: [string, string?];
  season: SeasonKey;
  seasonLabel: string;
  seasonNote: string;
  priceFromUSD: number;
  priceBasis: string;
  nights: number;
  excerpt: string;
  intro: string;
  overview: string[];
  statement: string;
  hero: Img;
  card: Img;
  gallery: Img[];
  regions: string[]; // region slugs
  experiences: string[]; // experience slugs
  lodges: string[]; // lodge slugs
  days: ItineraryDay[];
  included: string[];
  excluded: string[];
  quote: { text: string; author: string; placeholder: true };
  verify: string[];
};

export type RegionSection = { label: string; body: string[] };

export type Region = {
  slug: string;
  name: string;
  shortName: string;
  coordinates: Coordinates;
  excerpt: string;
  statement: string;
  sections: RegionSection[];
  bestSeason: string;
  verify?: string;
  hero: Img;
  gallery: Img[];
  wide: Img[];
  experiences: string[];
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  placeholder: true;
  bio: string[];
  quote: string;
  specialisms: string[];
  languages: string[];
  image: Img;
};

export type Testimonial = {
  quote: string;
  author: string;
  journey: string;
  placeholder: true;
};

export type FaqCategory =
  | "When to go"
  | "Getting here"
  | "On the journey"
  | "Booking";

export type Faq = {
  q: string;
  a: string[];
  category: FaqCategory;
  verify?: string;
};

export type Step = { n: number; title: string; body: string; image: Img };

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  hero: Img;
};
