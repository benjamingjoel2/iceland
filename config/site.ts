/**
 * Single source of truth for brand, palette, currencies, contact details,
 * navigation and feature toggles. Everything marked [PLACEHOLDER] must be
 * replaced before launch.
 */

export const brand = {
  name: "Edge of North",
  legalName: "[COMPANY NAME]",
  tagline: "Where the map runs out.",
  eyebrow: "The Edge of the North",
  promise:
    "Iceland at its most extraordinary, privately guided and planned by one dedicated specialist.",
  description:
    "Private, luxury journeys across Iceland: super-jeeps into the highlands, helicopters over glaciers, ice caves in winter, midnight sun in summer, and the finest lodges on the island.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edge-of-north.vercel.app",
} as const;

/** Design tokens mirrored in app/globals.css (@theme). Keep the two in sync. */
export const palette = {
  glacier: "#F4F6F6", // glacier white – panels, buttons
  ice: "#E9ECEC", // footer stone
  atlantic: "#14263A", // deep North Atlantic blue – primary text
  volcanic: "#0B0D10", // volcanic black – dark sections
  basalt: "#2B3036", // basalt grey – dark cards
  slate: "#5A6068", // muted text
  aurora: "#177A5A", // aurora green – sparing accent fill (AA with white text)
  auroraGlow: "#3FD8A0", // aurora glow – lines, dots on dark
} as const;

export type CurrencyCode = "USD" | "EUR" | "GBP" | "ISK" | "CAD" | "AUD";

/**
 * Indicative rates against USD. [PLACEHOLDER] Replace with a live FX feed
 * (or rates set by finance) before launch. All site prices are stored in USD.
 */
export const currencies: Record<
  CurrencyCode,
  { label: string; symbol: string; rate: number; locale: string; round: number }
> = {
  USD: { label: "US Dollar", symbol: "US$", rate: 1, locale: "en-US", round: 50 },
  EUR: { label: "Euro", symbol: "€", rate: 0.92, locale: "en-IE", round: 50 },
  GBP: { label: "Pound sterling", symbol: "£", rate: 0.79, locale: "en-GB", round: 50 },
  ISK: { label: "Icelandic króna", symbol: "ISK", rate: 138, locale: "is-IS", round: 5000 },
  CAD: { label: "Canadian dollar", symbol: "CA$", rate: 1.37, locale: "en-CA", round: 50 },
  AUD: { label: "Australian dollar", symbol: "AU$", rate: 1.52, locale: "en-AU", round: 50 },
};

export const defaultCurrency: CurrencyCode = "USD";

export const contact = {
  phone: "+354 000 0000", // [PLACEHOLDER]
  phoneHref: "tel:+3540000000",
  whatsappNumber: "[NUMBER]", // digits only, international format, e.g. 3545550000
  emails: {
    guests: "travel@edgeofnorth.example", // [PLACEHOLDER]
    trade: "trade@edgeofnorth.example", // [PLACEHOLDER]
    press: "press@edgeofnorth.example", // [PLACEHOLDER]
  },
  office: "[Registered office address], Reykjavík, Iceland",
  license: "Icelandic Tourist Board travel licence no. [LICENSE NUMBER]",
  scheduleCallUrl: "#schedule-a-call", // [PLACEHOLDER] booking link (e.g. calendar tool)
  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}`;

/** Feature toggles. */
export const features = {
  /**
   * ETIAS: €20 fee, launch postponed to 2027 with no firm date (verify).
   * When false the FAQ shows ETIAS as "coming soon". Flip to true once live.
   */
  etiasLive: false,
  /** Show "Verify before launch" flags on season windows, access dates and regulations. */
  showVerifyFlags: true,
} as const;

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavItem = { label: string; href: string; groups: NavGroup[] };

/** Left-hand menu buttons; each opens a flyout. Groups are filled from /data in lib/nav.ts. */
export const primaryNav = [
  { label: "Experience", href: "/iceland#experiences", key: "experience" },
  { label: "Journeys", href: "/journeys", key: "journeys" },
  { label: "Lodges", href: "/lodges", key: "lodges" },
  { label: "Iceland", href: "/iceland", key: "iceland" },
  { label: "About", href: "/about", key: "about" },
] as const;

export const secondaryNav = [
  { label: "Dates & Prices", href: "/prices" },
  { label: "Enquire now", href: "/enquire" },
] as const;

export const legalNav: NavLink[] = [
  { label: "Website terms", href: "/legal/terms" },
  { label: "Booking terms", href: "/legal/booking-terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
];
