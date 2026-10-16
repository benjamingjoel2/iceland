import { journeys } from "@/data/journeys";
import { lodges } from "@/data/lodges";
import { regions } from "@/data/regions";
import { experiences } from "@/data/experiences";
import type { NavGroup } from "@/config/site";

/** Flyout menu groups, generated from /data so the menu never drifts from the content. */
export const flyouts: Record<string, { home?: boolean; groups: NavGroup[] }> = {
  experience: {
    home: true,
    groups: [
      { label: "Experiences", links: experiences.map((e) => ({ label: e.name, href: `/iceland#${e.slug}` })).slice(0, 11) },
      { label: "Seasons", links: [
        { label: "Midnight-sun summer", href: "/#seasons" },
        { label: "Aurora winter", href: "/#seasons" },
      ] },
    ],
  },
  journeys: {
    groups: [
      { label: "Journeys", links: [...journeys.map((j) => ({ label: j.title, href: `/journeys/${j.slug}` })), { label: "View all", href: "/journeys" }] },
      { label: "Plan", links: [
        { label: "Dates & Prices", href: "/prices" },
        { label: "Journal", href: "/journal" },
      ] },
    ],
  },
  lodges: {
    groups: [
      { label: "Our lodges", links: [...lodges.map((l) => ({ label: l.name, href: `/lodges/${l.slug}` })), { label: "View all", href: "/lodges" }] },
    ],
  },
  iceland: {
    groups: [
      { label: "Regions", links: [...regions.map((r) => ({ label: r.name, href: `/iceland/${r.slug}` })), { label: "View all", href: "/iceland" }] },
    ],
  },
  about: {
    groups: [
      { label: "About", links: [
        { label: "Our story", href: "/about" },
        { label: "Your specialists", href: "/about/specialists" },
        { label: "Journal", href: "/journal" },
        { label: "FAQ", href: "/faq" },
      ] },
    ],
  },
};

export const aboutTabs = [
  { label: "Our story", href: "/about" },
  { label: "Specialists", href: "/about/specialists" },
  { label: "Journal", href: "/journal" },
  { label: "FAQ", href: "/faq" },
];
