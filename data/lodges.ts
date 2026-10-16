import { images as i } from "./images";
import type { Lodge } from "./types";

/**
 * PLACEHOLDER lodges. Names are generic descriptors, not real properties.
 * Replace with partner properties once agreements are signed.
 */
export const lodges: Lodge[] = [
  {
    slug: "the-glacier-house",
    name: "The Glacier House",
    placeholder: true,
    kind: "Glacier-view lodge",
    region: "vatnajokull",
    coordinates: { lat: 64.0164, lng: -16.9667 },
    excerpt: "Suites that look straight up the ice. The south's glaciers, from bed.",
    intro:
      "A low, turf-roofed lodge on the plain beneath Vatnajökull's outlet glaciers, where every suite faces the ice.",
    story: [
      "The Glacier House sits alone on the old outwash plain between the mountains and the sea, positioned so that each suite looks directly up an outlet glacier of Europe's largest ice cap.",
      "Inside, it is all warm timber, wool and stone. Floor-to-ceiling glass frames the ice by day and, on clear winter nights, the aurora above it.",
      "It is our base for ice caves in winter and glacier hikes in summer, with the glacier lagoon a short drive east.",
    ],
    amenitiesTitle: "Suite amenities",
    amenities: [
      "Floor-to-ceiling glacier-view windows",
      "Underfloor geothermal heating",
      "Rain shower and deep soaking tub",
      "Aurora wake-up call on request",
      "Outdoor hot tub on a private deck",
      "Library of maps, field guides and photography books",
    ],
    hero: i.snowRange,
    interior: i.roomTimber,
    feature: i.glacierLagoon,
    gallery: [i.roomTimber, i.diningRoom, i.glacierLagoon, i.auroraIce],
    highlights: [i.iceNight, i.dinner, i.snowRange, i.auroraIce],
    activities: ["ice-caves", "glacier-hiking", "helicopter-flights", "aurora-hunting"],
    quote: {
      text: "[PLACEHOLDER — press or guest quote about the lodge, to be sourced and attributed]",
      author: "[Attribution]",
      placeholder: true,
    },
  },
  {
    slug: "the-lava-house",
    name: "The Lava House",
    placeholder: true,
    kind: "Design hotel among lava fields",
    region: "south-coast",
    coordinates: { lat: 63.9921, lng: -19.6552 },
    excerpt: "Dark concrete and glass, set low into a moss-covered lava field.",
    intro:
      "A design hotel set into an old lava field in the south, built from dark concrete, glass and local stone.",
    story: [
      "The Lava House is designed to almost disappear: long, low volumes of board-marked concrete laid into the moss-covered lava, with the volcanoes of the south on the horizon.",
      "Its spa draws on geothermal water, its kitchen on the farms and fishing boats of the south coast.",
      "It sits within easy reach of the waterfalls and black beaches of the south, and at the edge of the highland roads that open in summer.",
    ],
    amenitiesTitle: "Suite amenities",
    amenities: [
      "Lava-field views from every suite",
      "Geothermal spa with steam room and cold plunge",
      "Tasting menu from south-coast producers",
      "Private terrace for aurora watching",
      "Electric vehicle charging for transfer fleet",
    ],
    hero: i.darkMountain,
    interior: i.roomDark,
    feature: i.fog,
    gallery: [i.roomDark, i.dinner, i.fog, i.seljalandsfoss],
    highlights: [i.dinner, i.fog, i.horseWhite, i.blackBeach],
    activities: ["geothermal-baths", "super-jeep", "horse-riding", "private-chef"],
    quote: {
      text: "[PLACEHOLDER — press or guest quote about the lodge, to be sourced and attributed]",
      author: "[Attribution]",
      placeholder: true,
    },
  },
  {
    slug: "the-fjord-house",
    name: "The Fjord House",
    placeholder: true,
    kind: "Remote fjord retreat",
    region: "westfjords",
    coordinates: { lat: 66.0412, lng: -22.723 },
    excerpt: "A handful of rooms at the end of a road, at the end of a fjord.",
    intro:
      "A remote retreat at the head of a Westfjords fjord, reached by a long coast road or by helicopter.",
    story: [
      "The Fjord House is a restored farmstead with only a handful of rooms, at the end of a road at the end of a fjord. In summer the light lasts almost all night; in winter the snow closes in and the place belongs to whoever is there.",
      "Days are spent on the water, on the bird cliffs or in the hot pool above the shore.",
    ],
    amenitiesTitle: "Room amenities",
    amenities: [
      "Fjord-facing rooms with blackout blinds for the midnight sun",
      "Natural hot pool above the shore",
      "Boat and helicopter access",
      "Private chef and wine cellar",
      "Sauna and cold-water fjord swim",
    ],
    hero: i.snowCabin,
    interior: i.roomLight,
    feature: i.calmReflection,
    gallery: [i.roomLight, i.roomClassic, i.calmReflection, i.mistyPeaks],
    highlights: [i.coastTwilight, i.whale, i.aerialShore, i.dinner],
    activities: ["whale-watching", "puffin-watching", "helicopter-flights", "private-chef"],
    quote: {
      text: "[PLACEHOLDER — press or guest quote about the lodge, to be sourced and attributed]",
      author: "[Attribution]",
      placeholder: true,
    },
  },
];

export const lodgeBySlug = (slug: string) => lodges.find((l) => l.slug === slug);

/** Formats coordinates the way the reference panels show them: [ 64° 00′ 59″ N, 16° 58′ 00″ W ]. */
export function formatCoordinates({ lat, lng }: { lat: number; lng: number }) {
  const dms = (v: number) => {
    const a = Math.abs(v);
    const d = Math.floor(a);
    const mFloat = (a - d) * 60;
    const m = Math.floor(mFloat);
    const s = Math.round((mFloat - m) * 60);
    return `${d}° ${String(m).padStart(2, "0")}′ ${String(s).padStart(2, "0")}″`;
  };
  return `${dms(lat)} ${lat >= 0 ? "N" : "S"}, ${dms(lng)} ${lng >= 0 ? "E" : "W"}`;
}
