import { images as i } from "./images";
import type { Step } from "./types";

/** "How it works" — six steps, used by the drawer and the dark section on /prices. */
export const steps: Step[] = [
  {
    n: 1,
    title: "Consultation",
    body:
      "Send an enquiry or book a call at a time that suits you, with no obligation. Your specialist will listen: what draws you to Iceland, the season, the pace, who is travelling. Then we check availability with the lodges and guides.",
    image: i.calmReflection,
  },
  {
    n: 2,
    title: "Confirmation",
    body:
      "Once you are happy with the proposal, a deposit secures your dates, lodges and guides. We send your confirmation and booking terms, and ask for travel insurance details.",
    image: i.glacierLagoon,
  },
  {
    n: 3,
    title: "Planning flights & extra nights",
    body:
      "We advise on flights into Keflavík from London, New York and beyond, and can add nights in Reykjavík before or after, or a stopover elsewhere. Everything is woven into one itinerary.",
    image: i.aboveClouds,
  },
  {
    n: 4,
    title: "Pre-departure & packing",
    body:
      "A few weeks before you travel you receive your final itinerary, a packing list for the season and the weather to expect. We can arrange technical outerwear to be waiting for you.",
    image: i.snowTrees,
  },
  {
    n: 5,
    title: "Arrival & welcome briefing in Reykjavík",
    body:
      "A private driver meets you at Keflavík. In Reykjavík your guide walks you through the days ahead, the safety plan and the forecast, and answers every question.",
    image: i.reykjavik,
  },
  {
    n: 6,
    title: "Your journey begins",
    body:
      "From here the island is yours: privately guided, planned around the weather and the light, with your specialist a message away the whole time.",
    image: i.auroraGreen,
  },
];
