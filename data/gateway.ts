/**
 * "Your gateway north" flight-route section. Every figure is approximate
 * and flagged for verification before launch.
 */
export const gateway = {
  code: { from: "LHR · JFK", to: "KEF" },
  title: "Your gateway north",
  body:
    "Iceland sits between Europe and North America, a short flight from both. Land at Keflavík, and a private driver is waiting.",
  origins: [
    { code: "LHR", city: "London", coordsLabel: "51° 28′ N, 0° 27′ W" },
    { code: "JFK", city: "New York", coordsLabel: "40° 38′ N, 73° 47′ W" },
  ],
  destination: { code: "KEF", city: "Keflavík, Iceland", coordsLabel: "63° 59′ N, 22° 36′ W" },
  stats: [
    { label: "Flying time", values: ["~3h from London", "~5h40 from New York"] },
    { label: "Distance", values: ["LHR–KEF ~1,900 km / 1,180 mi", "JFK–KEF ~4,200 km / 2,600 mi"] },
    { label: "Average temperature, Reykjavík", values: ["Summer ~11°C / 52°F", "Winter ~0°C / 32°F"] },
  ],
  verify: "Flying times, distances and temperatures are approximate — verify before launch.",
};
