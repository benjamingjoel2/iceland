import { features } from "@/config/site";
import type { Faq } from "./types";

const etias = features.etiasLive
  ? "ETIAS is now in operation: many visa-exempt travellers need an approved ETIAS travel authorisation (€20) before travelling to Iceland. We will remind you when to apply."
  : "ETIAS (a €20 travel authorisation for visa-exempt travellers) is coming soon: its launch has been postponed to 2027 with no firm date yet. You do not need it today; we will tell you when it starts.";

export const faqs: Faq[] = [
  {
    category: "When to go",
    q: "When is the best time to visit Iceland: summer or winter?",
    a: [
      "Both, for different reasons. Summer (June–August) brings the midnight sun, open highland roads, puffins and whales. Winter (October–March) brings the northern lights, blue ice caves and a quieter, snow-covered island.",
      "Your specialist will help you choose based on what you most want to see.",
    ],
    verify: "Season windows to verify before launch.",
  },
  {
    category: "When to go",
    q: "What are our chances of seeing the northern lights?",
    a: [
      "The aurora is visible from roughly September to April on dark, clear nights. It is never guaranteed: it depends on solar activity and, above all, on cloud cover.",
      "On winter journeys we watch the forecasts daily and drive to clear skies. A stay of five nights or more gives the best chance.",
    ],
    verify: "Viewing window to verify.",
  },
  {
    category: "When to go",
    q: "What is the midnight sun?",
    a: [
      "Around the June solstice the sun sets only briefly in Reykjavík and barely at all in the far north. The light is soft and golden through the night, which is wonderful for photography and long evenings.",
      "All our lodges provide blackout blinds.",
    ],
    verify: "Daylight figures to verify.",
  },
  {
    category: "When to go",
    q: "How many hours of daylight are there by month?",
    a: [
      "Approximate daylight in Reykjavík: January ~5h, February ~8h, March ~12h, April ~15h, May ~19h, June ~21h, July ~20h, August ~16h, September ~13h, October ~9h, November ~6h, December ~4–5h.",
      "The north has longer summer days and shorter winter days.",
    ],
    verify: "Approximate figures — verify against an authoritative source before launch.",
  },
  {
    category: "On the journey",
    q: "What will the weather be like, and what should we pack?",
    a: [
      "Iceland's weather changes quickly in every season. Reykjavík averages roughly 0°C (32°F) in winter and 11°C (52°F) in summer, with wind making it feel colder.",
      "Pack layers: thermal base layers, a warm mid-layer, a waterproof and windproof shell, waterproof boots, hat and gloves, and swimwear for geothermal pools. We send a full list before departure and can arrange technical outerwear.",
    ],
    verify: "Average temperatures to verify.",
  },
  {
    category: "On the journey",
    q: "When are the highland roads open?",
    a: [
      "The highland F-roads usually open from late June and close in early September, depending on snow and conditions. They require a modified 4x4 and an experienced driver; our super-jeep guides handle river crossings.",
    ],
    verify: "Opening dates vary every year — verify with the Icelandic Road Administration and partners.",
  },
  {
    category: "On the journey",
    q: "When is ice cave season?",
    a: [
      "Natural blue ice caves are typically visited from November to March, when the glaciers are cold and stable. They are only entered with certified ice cave guides, and only when conditions are judged safe.",
    ],
    verify: "Ice cave season and certification requirements to verify with certified partners.",
  },
  {
    category: "On the journey",
    q: "What happens if the weather delays a helicopter flight?",
    a: [
      "Pilots fly only when it is safe. Your specialist builds flexible time into every itinerary that includes flights, so a delay usually means moving the flight to another day.",
      "If a flight cannot go ahead at all, we offer an alternative or a refund for that element. [PLACEHOLDER — confirm policy]",
    ],
  },
  {
    category: "Getting here",
    q: "What are the entry requirements for Iceland?",
    a: [
      "Iceland is part of the Schengen Area. Most visitors from the UK, US, Canada and Australia can visit visa-free for up to 90 days in any 180; your passport should be valid for at least three months beyond your departure date.",
      "The EU Entry/Exit System (EES) is in operation, so non-EU travellers have their biometric details registered at the border on first entry.",
      etias,
    ],
    verify: "Entry rules, EES and ETIAS timing change — verify with official sources before launch and before every trip.",
  },
  {
    category: "Getting here",
    q: "How do we fly to Iceland?",
    a: [
      "International flights arrive at Keflavík (KEF), about 45 minutes from Reykjavík. Flying time is around 3 hours from London and around 5 to 6 hours from New York.",
      "We are happy to advise on flights and arrange private aviation on request.",
    ],
    verify: "Flight times approximate — verify.",
  },
  {
    category: "Booking",
    q: "Are your journeys private or small group?",
    a: [
      "Every journey is private: your own driver-guide, your own vehicle and a plan built around you. We do not run shared group departures. Families and friends travelling together are very welcome.",
    ],
  },
  {
    category: "Booking",
    q: "Can children travel? Are there age limits?",
    a: [
      "Children are welcome on most journeys. Some activities have minimum ages set by our partners, for example glacier hiking, ice caves and snorkelling at Silfra, and some require minimum height or swimming ability.",
      "Your specialist will tailor the journey to every age in your party.",
    ],
    verify: "Minimum ages per activity to verify with operators.",
  },
  {
    category: "Booking",
    q: "How do payments and deposits work?",
    a: [
      "[PLACEHOLDER] A deposit secures your journey once you accept the proposal, with the balance due before travel. Prices are shown from, in US dollars, per person sharing; the currency switcher shows indicative conversions only.",
    ],
  },
  {
    category: "Booking",
    q: "What is your cancellation policy?",
    a: [
      "[PLACEHOLDER] Cancellation terms depend on how close to departure you cancel. Full details are in our booking terms. We strongly recommend comprehensive travel insurance.",
    ],
  },
];
