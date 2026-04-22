import { z } from "zod";

import { normaliseUkToE164 } from "@/lib/phone";

/**
 * Zod schema for the quote form. Kept v2-reusable: when the admin/CRM lands,
 * the API route + owner email both consume this same shape — all that
 * changes is an additional DB write downstream.
 *
 * Why the server normalises the phone rather than trusting the client:
 *  - Accepts messy UK input ("07735 839280", "+44 7735 839280", "0044…")
 *    and canonicalises to digits-only E.164 so the wa.me builder is safe.
 *  - Rejects obviously non-UK or too-short inputs at the edge.
 */

export const TINT_WINDOWS = [
  "front_sides",
  "rear_sides",
  "rear_screen",
  "sunroof",
  "windscreen_strip",
  "full_vehicle",
] as const;

export const TINT_DARKNESS = ["20", "35", "50", "70", "not_sure"] as const;

export type TintWindow = (typeof TINT_WINDOWS)[number];
export type TintDarkness = (typeof TINT_DARKNESS)[number];

export const windowLabels: Record<TintWindow, string> = {
  front_sides: "Front side windows",
  rear_sides: "Rear side windows",
  rear_screen: "Rear windscreen",
  sunroof: "Sunroof",
  windscreen_strip: "Windscreen sun strip",
  full_vehicle: "Full vehicle",
};

export const darknessLabels: Record<TintDarkness, string> = {
  "20": "20% (dark)",
  "35": "35% (medium)",
  "50": "50% (light)",
  "70": "70% (very light)",
  not_sure: "Not sure — advise me",
};

const currentYear = new Date().getFullYear();

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),

  // Phone comes in as free-form UK input; we normalise and then validate.
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .transform((raw, ctx) => {
      const e164 = normaliseUkToE164(raw);
      if (!e164 || e164.length < 10 || e164.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid UK phone number",
        });
        return z.NEVER;
      }
      return e164;
    }),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  vehicleMake: z.string().trim().min(1, "Vehicle make is required").max(60),
  vehicleModel: z.string().trim().min(1, "Vehicle model is required").max(60),
  vehicleYear: z.coerce
    .number()
    .int()
    .min(1950, "Please enter a realistic year")
    .max(currentYear + 1, "Year looks too far in the future"),

  windows: z
    .array(z.enum(TINT_WINDOWS))
    .min(1, "Pick at least one window")
    .max(TINT_WINDOWS.length),

  darkness: z.enum(TINT_DARKNESS, {
    errorMap: () => ({ message: "Pick a tint darkness or 'not sure'" }),
  }),

  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  // Must be explicitly true — use boolean().refine so the form's default
  // `false` is a typable input value and we still require consent at submit.
  consent: z.boolean().refine((v) => v === true, {
    message: "Please tick the consent box so we can reply",
  }),

  // Honeypot — bots happily fill a field called "company". Must be empty.
  company: z
    .string()
    .max(0, "Spam check failed")
    .optional()
    .or(z.literal("").transform(() => "")),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadParsed = z.output<typeof leadSchema>;
