import { brand, contact } from "@/config/site";

/**
 * PLACEHOLDER legal copy. These outlines are structure only and must be replaced
 * with text drafted by a qualified lawyer (Icelandic and destination-market law).
 */
export type LegalDoc = { slug: string; title: string; updated: string; sections: { h: string; p: string[] }[] };

const who = `${brand.legalName}, trading as ${brand.name}, ${contact.office}. ${contact.license}.`;

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Website terms",
    updated: "[DATE]",
    sections: [
      { h: "About us", p: [who] },
      { h: "Using this website", p: ["[PLACEHOLDER] Terms governing access to and use of this website, intellectual property in content and imagery, and acceptable use."] },
      { h: "Prices and information", p: ["Prices shown are indicative, from, per person sharing, in US dollars. Currency conversions are approximate and for guidance only. Seasons, access dates and regulations are subject to change.", "[PLACEHOLDER] Accuracy and liability wording."] },
      { h: "Governing law", p: ["[PLACEHOLDER] Governing law and jurisdiction."] },
    ],
  },
  {
    slug: "booking-terms",
    title: "Booking terms",
    updated: "[DATE]",
    sections: [
      { h: "Your contract", p: [who, "[PLACEHOLDER] When a contract is formed, package travel regulations and the protection of your payments."] },
      { h: "Deposits and payment", p: ["[PLACEHOLDER] Deposit amount, balance due date and accepted payment methods."] },
      { h: "Cancellation by you", p: ["[PLACEHOLDER] Cancellation charges by notice period."] },
      { h: "Changes and cancellation by us", p: ["[PLACEHOLDER] Weather, safety, volcanic activity, road closures and helicopter or ice cave cancellations; alternatives and refunds."] },
      { h: "Insurance", p: ["Comprehensive travel insurance is required for every traveller. [PLACEHOLDER] Minimum cover."] },
      { h: "Complaints", p: ["[PLACEHOLDER] Complaints procedure and alternative dispute resolution."] },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    updated: "[DATE]",
    sections: [
      { h: "Who we are", p: [who, `Contact for privacy matters: ${contact.emails.guests} [PLACEHOLDER — data protection contact].`] },
      { h: "What we collect", p: ["Details you give us in enquiries and bookings (name, contact details, travel preferences, notes), and limited technical data about website use."] },
      { h: "How we use it", p: ["To answer your enquiry, plan and operate your journey, and meet legal obligations. [PLACEHOLDER] Lawful bases under the GDPR (Iceland is in the EEA)."] },
      { h: "Sharing", p: ["[PLACEHOLDER] Guides, lodges and suppliers needed to deliver your journey; email and CRM processors."] },
      { h: "Your rights", p: ["[PLACEHOLDER] Access, rectification, erasure, objection, portability, and the right to complain to Persónuvernd (the Icelandic Data Protection Authority)."] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    updated: "[DATE]",
    sections: [
      { h: "What we use", p: ["This site stores your chosen display currency in your browser's local storage. It sets no advertising cookies.", "[PLACEHOLDER] List analytics or other cookies if added, with a consent banner."] },
      { h: "Managing cookies", p: ["You can clear local storage and cookies in your browser settings at any time."] },
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug);
