import type { Img } from "./types";

/**
 * Placeholder photography (Unsplash License), downloaded by scripts/fetch-images.sh.
 * Several stand-ins are not of the exact place or activity described;
 * replace with commissioned Edge of North imagery before launch.
 */
const credit = "Placeholder · Unsplash";

const img = (file: string, alt: string): Img => ({ src: `/images/${file}.jpg`, alt, credit });

export const images = {
  auroraGreen: img("aurora-green", "Green aurora ribbons over a dark tree line"),
  auroraReflection: img("aurora-reflection", "Aurora reflected in still water beneath snowy mountains"),
  auroraSnow: img("aurora-snow", "Violet and green aurora above a snowfield at night"),
  auroraTall: img("aurora-tall", "A tall column of aurora over a silhouetted ridge"),
  auroraIce: img("aurora-ice", "Aurora over ice floes on a glacial lagoon"),
  glacierLagoon: img("glacier-lagoon", "Blue icebergs drifting in a glacier lagoon"),
  blackBeach: img("black-beach", "Black sand beach and sea stacks under a low sky"),
  vestrahorn: img("vestrahorn", "Jagged mountain above black dunes and a tidal shore"),
  seljalandsfoss: img("seljalandsfoss", "A waterfall pouring from green cliffs at sunset"),
  canyon: img("canyon", "A moss-green canyon carved by a winding river"),
  canyonWide: img("canyon-wide", "Looking down a deep, moss-covered river canyon"),
  reykjavik: img("reykjavik", "A concrete church spire rising over Reykjavík under blue sky"),
  mistyPeaks: img("misty-peaks", "Snow-dusted peaks emerging from cloud"),
  aboveClouds: img("above-clouds", "Mountain summits above a sea of cloud, seen from the air"),
  iceNight: img("ice-night", "A figure lit by blue light beneath walls of ice at night"),
  darkMountain: img("dark-mountain", "A dark mountain silhouette above a still lake"),
  hazyHills: img("hazy-hills", "Layered hills fading into haze"),
  starryMountain: img("starry-mountain", "A snow peak under a starry sky"),
  greenHills: img("green-hills", "Green highland valley under cloud"),
  snowRange: img("snow-range", "A glacier flowing between snowy mountains"),
  jeepStars: img("jeep-stars", "A four-by-four silhouetted under the Milky Way"),
  fog: img("fog", "Low fog drifting through a valley"),
  aerialCoast: img("aerial-coast", "Aerial view of surf meeting a dark shoreline"),
  aerialShore: img("aerial-shore", "Aerial view of turquoise water against a green coast"),
  snowCabin: img("snow-cabin", "A lone timber house in deep snow"),
  waterfallFigure: img("waterfall-figure", "A traveller standing before a powerful waterfall"),
  starryPeaks: img("starry-peaks", "Snowy peaks beneath a night sky full of stars"),
  horseWhite: img("horse-white", "A pale horse galloping across a field"),
  horseBrown: img("horse-brown", "Portrait of a chestnut horse with a white blaze"),
  whale: img("whale", "A humpback whale breaching"),
  roomTimber: img("room-timber", "A timber suite with a wide bed and tall windows"),
  roomClassic: img("room-classic", "A calm suite with a sofa and soft lamplight"),
  roomLight: img("room-light", "A bright, minimal suite with pale linen"),
  roomDark: img("room-dark", "A suite in dark tones with warm lighting"),
  dinner: img("dinner", "A plated dinner and wine glasses on a candlelit table"),
  diningRoom: img("dining-room", "An intimate dining room in warm light"),
  portrait1: img("portrait-1", "Portrait of a specialist (placeholder)"),
  portrait2: img("portrait-2", "Portrait of a specialist (placeholder)"),
  portrait3: img("portrait-3", "Portrait of a specialist (placeholder)"),
  calmReflection: img("calm-reflection", "Mountains reflected in a perfectly calm lake at dusk"),
  coastTwilight: img("coast-twilight", "A rocky coast under a violet twilight sky"),
  snowTrees: img("snow-trees", "Snow-laden trees in a winter valley"),
  clouds: img("clouds", "A sea of cloud seen from above"),
} satisfies Record<string, Img>;

export const film = {
  src: "/film/edge-of-north.mp4",
  srcSmall: "/film/edge-of-north-sm.mp4",
  poster: "/film/poster.jpg",
  captions: "/film/edge-of-north.en.vtt",
  title: "Edge of North — a film in six places (placeholder)",
};
