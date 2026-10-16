import { images } from "./images";
import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    slug: "glacier-hiking",
    name: "Glacier hiking",
    season: "all-year",
    seasonNote: "All year, with certified glacier guides",
    summary:
      "Crampons on, rope between you and your guide, out across the crevassed tongues of Vatnajökull's outlet glaciers.",
    image: images.snowRange,
  },
  {
    slug: "ice-caves",
    name: "Blue ice caves",
    season: "winter",
    seasonNote: "Winter only, roughly November to March — certified guides only",
    summary:
      "Inside the glacier itself: caves of compressed, ancient ice that glow an impossible blue. Visited only with certified ice cave guides, only when conditions are safe.",
    image: images.iceNight,
    verify: "Ice cave season and safety certification requirements to verify with local partners.",
  },
  {
    slug: "helicopter-flights",
    name: "Helicopter flights",
    season: "all-year",
    seasonNote: "All year, weather permitting",
    summary:
      "Over steaming fissures, glacier ice-fields and remote ridgelines, with private landings where the land allows.",
    image: images.aboveClouds,
    verify: "Landing sites and operating minimums to confirm with the chosen operator.",
  },
  {
    slug: "super-jeep",
    name: "Super-jeep expeditions",
    season: "all-year",
    seasonNote: "All year; highland routes summer only",
    summary:
      "Modified four-by-fours with giant tyres and a driver-guide who knows every ford — the way to reach the interior.",
    image: images.jeepStars,
  },
  {
    slug: "whale-watching",
    name: "Whale watching",
    season: "summer",
    seasonNote: "Best April to October in the north",
    summary:
      "Private boat charters out of the northern fjords for humpbacks, minkes and, on rare days, blue whales.",
    image: images.whale,
    verify: "Seasonal sighting windows to verify.",
  },
  {
    slug: "silfra-snorkeling",
    name: "Snorkelling Silfra",
    season: "all-year",
    seasonNote: "All year, minimum age and fitness requirements apply",
    summary:
      "Float in glacial meltwater of almost unreal clarity, in a fissure between the North American and Eurasian plates.",
    image: images.aerialShore,
    verify: "Age, swimming and medical requirements to verify with the licensed dive operator.",
  },
  {
    slug: "geothermal-baths",
    name: "Geothermal baths",
    season: "all-year",
    seasonNote: "All year",
    summary:
      "Hot springs and private geothermal pools, from designed lagoons to remote natural pools steaming in the snow.",
    image: images.fog,
  },
  {
    slug: "horse-riding",
    name: "Icelandic horse riding",
    season: "all-year",
    seasonNote: "All year, all levels",
    summary:
      "A small, sure-footed breed with a gait of its own, the tölt. Private rides across lava fields and river plains.",
    image: images.horseWhite,
  },
  {
    slug: "aurora-hunting",
    name: "Aurora hunting",
    season: "winter",
    seasonNote: "Dark months, roughly September to April",
    summary:
      "We watch the forecasts and the cloud cover and drive to wherever the sky is clearest — with blankets, hot chocolate and a photographer if you wish.",
    image: images.auroraGreen,
    verify: "The aurora is never guaranteed; viewing window to verify.",
  },
  {
    slug: "puffin-watching",
    name: "Puffin watching",
    season: "summer",
    seasonNote: "Seasonal, roughly May to August",
    summary:
      "Sea cliffs alive with puffins in the brief nesting season, reached by private boat or a quiet clifftop walk.",
    image: images.coastTwilight,
    verify: "Nesting season dates to verify.",
  },
  {
    slug: "private-chef",
    name: "Private chef dinners",
    season: "all-year",
    seasonNote: "All year",
    summary:
      "Langoustine, lamb, Arctic char and skyr, cooked for you at the lodge or in a remote hut by a private chef.",
    image: images.dinner,
  },
];

export const experienceBySlug = (slug: string) => experiences.find((e) => e.slug === slug);
