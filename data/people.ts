import { images as i } from "./images";
import type { Person, Testimonial } from "./types";

/** PLACEHOLDER specialists — names, bios and portraits to be replaced. */
export const people: Person[] = [
  {
    slug: "sigrun",
    name: "Sigrún [Surname]",
    role: "Head Specialist",
    placeholder: true,
    bio: [
      "[PLACEHOLDER] Born in the north, Sigrún spent a decade guiding in the highlands before she began designing private journeys.",
      "She plans every trip as if it were her own: one point of contact, from the first call to the last night.",
    ],
    quote:
      "Iceland is never the same twice. The light, the weather, the ice: it all keeps moving. My job is to put you in the right place at the moment it is most extraordinary, and to make everything else disappear.",
    specialisms: ["Highlands", "Ice caves", "North Iceland"],
    languages: ["Icelandic", "English", "German"],
    image: i.portrait2,
  },
  {
    slug: "einar",
    name: "Einar [Surname]",
    role: "Specialist, Winter Journeys",
    placeholder: true,
    bio: [
      "[PLACEHOLDER] A former glacier guide, Einar knows the south's ice caps intimately and plans our winter and ice cave journeys.",
    ],
    quote: "In winter, Iceland rewards patience. We build the plan around the sky.",
    specialisms: ["Aurora", "Glaciers", "Helicopter journeys"],
    languages: ["Icelandic", "English"],
    image: i.portrait1,
  },
  {
    slug: "kari",
    name: "Kári [Surname]",
    role: "Specialist, Summer & Westfjords",
    placeholder: true,
    bio: [
      "[PLACEHOLDER] Raised in the Westfjords, Kári plans our summer journeys: midnight sun, boats, bird cliffs and the remote northwest.",
    ],
    quote: "The best places in Iceland are at the end of the road. That's where we take you.",
    specialisms: ["Westfjords", "Midnight sun", "Wildlife"],
    languages: ["Icelandic", "English", "French"],
    image: i.portrait3,
  },
];

/** The homepage "your specialist" quote (replaces the reference's founder quote). PLACEHOLDER. */
export const specialistQuote = {
  text: people[0].quote,
  name: people[0].name,
  role: `Your specialist · ${people[0].role}`,
  placeholder: true,
};

/** PLACEHOLDER testimonials — illustrative only, never present as real reviews. */
export const testimonials: Testimonial[] = [
  { quote: "[PLACEHOLDER] We stood inside the glacier and the ice was the colour of the sky.", author: "[Guest], [City]", journey: "Aurora & Ice Caves", placeholder: true },
  { quote: "[PLACEHOLDER] One person planned everything and we never once had to think.", author: "[Guest], [City]", journey: "The Ring Road, Privately", placeholder: true },
  { quote: "[PLACEHOLDER] The highlands felt like another planet, and we had it to ourselves.", author: "[Guest], [City]", journey: "Highlands by Super-Jeep", placeholder: true },
  { quote: "[PLACEHOLDER] Midnight in the Westfjords and the sun still on the water.", author: "[Guest], [City]", journey: "Midnight Sun & Westfjords", placeholder: true },
  { quote: "[PLACEHOLDER] The weather moved the helicopter day twice and it simply didn't matter.", author: "[Guest], [City]", journey: "Fire & Ice by Helicopter", placeholder: true },
  { quote: "[PLACEHOLDER] Three days, and we are already planning to come back for a fortnight.", author: "[Guest], [City]", journey: "Iceland in Three Days", placeholder: true },
];

/** Editorial quotes. PLACEHOLDERS until a real, properly attributed quote is chosen. */
export const quotes = {
  writer: {
    text: "[PLACEHOLDER QUOTE] A short, evocative line about Iceland from a writer or publication, to be chosen, licensed and properly attributed.",
    author: "[Writer, Publication]",
    placeholder: true,
  },
  closing: {
    text: "[PLACEHOLDER] A closing line for the footer",
    author: "[Attribution]",
    placeholder: true,
  },
  enquire: {
    text: "[PLACEHOLDER] A line about the stillness of the North, to be chosen and attributed.",
    author: "[Attribution]",
    placeholder: true,
  },
};
