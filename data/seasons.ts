import { images } from "./images";
import type { Season, SeasonKey } from "./types";

export const seasons: Season[] = [
  {
    key: "summer",
    name: "Midnight-sun summer",
    short: "Summer",
    months: "June – August",
    daylight: "Up to ~21 hours in Reykjavík around the solstice; the sun barely sets in the far north",
    body:
      "From June the highland roads open, the light never quite leaves and the interior becomes reachable by super-jeep. Long, golden evenings for the Westfjords, the north and the rhyolite mountains of Landmannalaugar.",
    highlights: ["Highland interior", "Midnight sun", "Puffins & whales", "Westfjords"],
    image: images.calmReflection,
    verify:
      "Season months, daylight hours and highland road opening dates vary each year — verify with local partners before launch.",
  },
  {
    key: "winter",
    name: "Aurora winter",
    short: "Winter",
    months: "October – March",
    daylight: "Around 4–5 hours of daylight in Reykjavík at the December solstice",
    body:
      "Long nights for the northern lights, blue ice caves beneath the glaciers and a quieter island under snow. Short days are spent in low, honeyed light; nights are for the sky.",
    highlights: ["Northern lights", "Blue ice caves", "Snow-covered south coast", "Geothermal pools"],
    image: images.auroraIce,
    verify:
      "Aurora activity, ice cave access (typically Nov–Mar, conditions dependent) and daylight hours must be verified with certified local partners before launch.",
  },
];

export const seasonLabel: Record<SeasonKey, string> = {
  summer: "Summer",
  winter: "Winter",
  "all-year": "All year",
};

export const seasonIntro =
  "Iceland has two great seasons and they could be two different countries. In summer the sun barely sets and the interior opens; in winter the nights belong to the aurora and the glaciers reveal their blue caves. We plan around both, privately, with one specialist from first call to final night.";
