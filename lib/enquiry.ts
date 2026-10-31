import { z } from "zod";

export const seasonsOptions = ["Summer", "Winter", "Not sure"] as const;
export const contactMethods = ["Email", "Telephone"] as const;
export const budgetOptions = [
  "Under US$10,000 per person",
  "US$10,000–20,000 per person",
  "US$20,000–35,000 per person",
  "Over US$35,000 per person",
  "Prefer to discuss",
] as const;
export const heardOptions = [
  "Recommendation",
  "Search engine",
  "Press or magazine",
  "Instagram",
  "Travel advisor",
  "Other",
] as const;
export const interestOptions = [
  "Northern lights",
  "Ice caves",
  "Glaciers",
  "Helicopter flights",
  "Highlands",
  "Midnight sun",
  "Wildlife & whales",
  "Geothermal & wellness",
  "Food & wine",
  "Horse riding",
  "Photography",
] as const;

export const dialCodes = [
  { code: "+1", label: "United States / Canada (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+354", label: "Iceland (+354)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+46", label: "Sweden (+46)" },
  { code: "+47", label: "Norway (+47)" },
  { code: "+45", label: "Denmark (+45)" },
  { code: "+353", label: "Ireland (+353)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+971", label: "United Arab Emirates (+971)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+852", label: "Hong Kong (+852)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+52", label: "Mexico (+52)" },
] as const;

/** Shared by the form (client-side) and the API route (server-side). */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(120),
  email: z.email("Please enter a valid email address"),
  dialCode: z.string().regex(/^\+\d{1,4}$/, "Choose a country code"),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[\d\s().-]{6,}$/.test(v), "Please enter a valid phone number"),
  season: z.enum(seasonsOptions, { error: "Please choose a season" }),
  dates: z.string().trim().max(120).optional().default(""),
  travellers: z.coerce.number({ error: "How many travellers?" }).int().min(1, "At least one traveller").max(40),
  journey: z.string().trim().max(120).optional().default(""),
  interests: z.array(z.enum(interestOptions)).max(interestOptions.length).default([]),
  budget: z.enum(budgetOptions, { error: "Please choose a budget range" }),
  heard: z.enum(heardOptions).or(z.literal("")).default(""),
  notes: z.string().trim().max(3000).optional().default(""),
  contactMethod: z.enum(contactMethods, { error: "How should we contact you?" }),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().default(""),
}).superRefine((v, ctx) => {
  if (v.contactMethod === "Telephone" && v.phone.trim() === "") {
    ctx.addIssue({ code: "custom", path: ["phone"], message: `Please add a phone number so we can reach you by ${v.contactMethod}` });
  }
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
