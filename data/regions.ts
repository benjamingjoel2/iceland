import { images as i } from "./images";
import type { Region } from "./types";

export const regions: Region[] = [
  {
    slug: "reykjavik",
    name: "Reykjavík",
    shortName: "Reykjavík",
    coordinates: { lat: 64.1466, lng: -21.9426 },
    excerpt: "The world's northernmost capital: small, creative and the start of every journey.",
    statement:
      "A small city of coloured roofs and concrete spires, where the journey begins and the North Atlantic is never more than a street away.",
    sections: [
      {
        label: "The capital at the edge",
        body: [
          "Reykjavík is where your specialist meets you, where the welcome briefing happens and where the city's restaurants, galleries and geothermal pools give a first taste of the island.",
          "Beyond the harbour, Mount Esja changes colour with the weather, and on clear winter nights the aurora can be seen over the bay.",
        ],
      },
      {
        label: "Arrival and the first night",
        body: [
          "Keflavík airport is around 45 minutes away by private transfer. Most journeys begin with a night in the city to rest, meet your guide and adjust to the light.",
        ],
      },
    ],
    bestSeason: "All year",
    hero: i.reykjavik,
    gallery: [i.reykjavik, i.coastTwilight, i.dinner, i.fog, i.calmReflection],
    wide: [i.coastTwilight, i.diningRoom],
    experiences: ["private-chef", "geothermal-baths", "whale-watching"],
  },
  {
    slug: "south-coast",
    name: "The South Coast",
    shortName: "South Coast",
    coordinates: { lat: 63.4186, lng: -19.006 },
    excerpt: "Waterfalls, black sand and sea stacks along the island's most dramatic shoreline.",
    statement:
      "Waterfalls falling from old sea cliffs, black beaches and basalt stacks standing in a restless ocean.",
    sections: [
      {
        label: "Water and black sand",
        body: [
          "The ring road runs beneath a line of former sea cliffs where waterfalls drop straight onto the plain. Further east the beaches turn black and the Atlantic arrives with real force.",
          "Our guides time each stop around the crowds, so the famous places are visited early, late, or not at all in favour of quieter ones nearby.",
        ],
      },
      {
        label: "A shoreline to respect",
        body: [
          "Sneaker waves on the black beaches are genuinely dangerous; your guide will choose where to stand and when.",
        ],
      },
    ],
    bestSeason: "All year; snow-covered and quiet in winter",
    hero: i.blackBeach,
    gallery: [i.blackBeach, i.seljalandsfoss, i.canyon, i.waterfallFigure, i.aerialCoast],
    wide: [i.seljalandsfoss, i.canyonWide],
    experiences: ["glacier-hiking", "super-jeep", "horse-riding"],
  },
  {
    slug: "vatnajokull",
    name: "Vatnajökull & the Glacier Lagoon",
    shortName: "Vatnajökull",
    coordinates: { lat: 64.0784, lng: -16.2306 },
    excerpt: "Europe's largest ice cap, its outlet glaciers and a lagoon full of drifting icebergs.",
    statement:
      "An ice cap the size of a small country, feeding glaciers that end in a lagoon of drifting blue icebergs.",
    sections: [
      {
        label: "The great ice",
        body: [
          "Vatnajökull covers around eight percent of Iceland. Its outlet glaciers spill down towards the coast, and beneath them, in winter, form the blue ice caves.",
          "At the glacier lagoon, icebergs calve, turn and drift towards the sea, some washing up on the black beach nearby like pieces of glass.",
        ],
      },
      {
        label: "Ice caves",
        body: [
          "Ice caves change every year and are only entered with certified guides when they are judged safe. We do not compromise on this.",
        ],
      },
    ],
    bestSeason: "Ice caves in winter; glacier hikes all year",
    verify: "Ice cave season and access to verify each year with certified partners.",
    hero: i.glacierLagoon,
    gallery: [i.glacierLagoon, i.iceNight, i.snowRange, i.auroraIce, i.aboveClouds],
    wide: [i.auroraIce, i.snowRange],
    experiences: ["ice-caves", "glacier-hiking", "helicopter-flights"],
  },
  {
    slug: "highlands",
    name: "The Highlands",
    shortName: "Highlands",
    coordinates: { lat: 63.9917, lng: -19.0602 },
    excerpt: "The empty interior: rhyolite mountains, lava deserts and rivers only a super-jeep can cross.",
    statement:
      "An interior without towns or trees, reached on mountain roads that open for only a few summer weeks.",
    sections: [
      {
        label: "Iceland's best-kept secret",
        body: [
          "The highlands are uninhabited: black sand deserts, steaming valleys and rhyolite mountains streaked in ochre, rose and green around Landmannalaugar.",
          "The roads are unpaved, the rivers unbridged, and the whole interior is only accessible in summer by modified super-jeep.",
        ],
      },
      {
        label: "When the roads open",
        body: [
          "Highland roads (the F-roads) typically open from late June and close in early September, depending on snow and conditions.",
        ],
      },
    ],
    bestSeason: "Summer only, when the highland roads open",
    verify: "F-road opening and closing dates vary every year — verify with the Icelandic Road Administration and partners.",
    hero: i.greenHills,
    gallery: [i.greenHills, i.hazyHills, i.jeepStars, i.mistyPeaks, i.canyonWide],
    wide: [i.hazyHills, i.jeepStars],
    experiences: ["super-jeep", "helicopter-flights", "horse-riding"],
  },
  {
    slug: "snaefellsnes",
    name: "Snæfellsnes Peninsula",
    shortName: "Snæfellsnes",
    coordinates: { lat: 64.8667, lng: -23.7833 },
    excerpt: "Iceland in miniature, at the foot of a glacier-capped volcano.",
    statement:
      "A peninsula of lava fields, fishing villages and sea cliffs, watched over by a glacier-capped volcano.",
    sections: [
      {
        label: "Iceland in miniature",
        body: [
          "Snæfellsnes holds almost everything the island has in one long arm: lava fields, golden and black beaches, basalt cliffs, small harbours and the Snæfellsjökull glacier at its tip.",
        ],
      },
    ],
    bestSeason: "All year",
    hero: i.darkMountain,
    gallery: [i.darkMountain, i.coastTwilight, i.horseBrown, i.starryMountain, i.aerialCoast],
    wide: [i.coastTwilight, i.starryMountain],
    experiences: ["horse-riding", "private-chef", "aurora-hunting"],
  },
  {
    slug: "westfjords",
    name: "The Westfjords",
    shortName: "Westfjords",
    coordinates: { lat: 66.075, lng: -23.124 },
    excerpt: "The remote northwest: deep fjords, high bird cliffs and long summer light.",
    statement:
      "The remote northwest, where fjords cut deep into the land and the summer light hardly fades.",
    sections: [
      {
        label: "The remote northwest",
        body: [
          "Few visitors make it to the Westfjords. Roads wind around fjord after fjord, villages are tiny and the bird cliffs are among the largest in Europe.",
          "In June and July the light lasts almost through the night, which is when the region is at its most beautiful.",
        ],
      },
    ],
    bestSeason: "Summer",
    verify: "Some mountain passes close in winter; access windows to verify.",
    hero: i.calmReflection,
    gallery: [i.calmReflection, i.aerialShore, i.coastTwilight, i.snowCabin, i.mistyPeaks],
    wide: [i.mistyPeaks, i.aerialShore],
    experiences: ["puffin-watching", "whale-watching", "helicopter-flights"],
  },
  {
    slug: "north-myvatn",
    name: "North Iceland & Lake Mývatn",
    shortName: "Mývatn",
    coordinates: { lat: 65.6039, lng: -16.9961 },
    excerpt: "Craters, lava formations and steaming earth around a lake in the north.",
    statement:
      "A volcanic lake ringed by craters and lava castles, with whales in the fjords just to the north.",
    sections: [
      {
        label: "Fire country",
        body: [
          "Around Lake Mývatn the earth is visibly alive: pseudocraters, lava formations, boiling mud pots and steam vents, with a geothermal bath to end the day.",
          "To the north, the bays near Húsavík are among the best places in Iceland for whale watching.",
        ],
      },
    ],
    bestSeason: "All year; aurora in winter, whales in summer",
    hero: i.auroraSnow,
    gallery: [i.auroraSnow, i.fog, i.whale, i.snowTrees, i.starryPeaks],
    wide: [i.fog, i.whale],
    experiences: ["whale-watching", "geothermal-baths", "aurora-hunting"],
  },
  {
    slug: "east-fjords",
    name: "The East Fjords",
    shortName: "East Fjords",
    coordinates: { lat: 65.26, lng: -14.01 },
    excerpt: "Quiet fishing villages, reindeer country and mountains that fall into the sea.",
    statement:
      "Steep mountains, small harbours and the quietest roads in Iceland.",
    sections: [
      {
        label: "The quiet side",
        body: [
          "The East Fjords are the island's least visited coast: fjords lined with small villages, wild reindeer in the hills and dramatic peaks such as the black dunes beneath the horn-shaped mountains of the southeast.",
        ],
      },
    ],
    bestSeason: "Summer; winter for solitude",
    hero: i.vestrahorn,
    gallery: [i.vestrahorn, i.starryMountain, i.coastTwilight, i.snowRange, i.calmReflection],
    wide: [i.starryPeaks, i.vestrahorn],
    experiences: ["super-jeep", "helicopter-flights", "private-chef"],
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);
