import { z } from "zod";

import { normaliseUkToE164 } from "@/lib/phone";
import {
  VEHICLE_TYPES,
  WINDOW_SETS,
  TINT_SHADES,
  EXTRAS,
} from "@/lib/pricing";

/**
 * Zod schema for the multi-step quote wizard payload.
 *
 * The shape mirrors the wizard's own state so we can reuse the same type on
 * both client and server. `contactTime` is a free-form string because what
 * matters is capturing the customer's preference, not forcing a fixed format.
 */

const currentYear = new Date().getFullYear();

export const quoteSchema = z.object({
  vehicleType: z.enum(VEHICLE_TYPES, {
    errorMap: () => ({ message: "Pick a vehicle type" }),
  }),
  vehicleMake: z.string().trim().min(1, "Vehicle make is required").max(60),
  vehicleModel: z.string().trim().min(1, "Vehicle model is required").max(60),
  vehicleYear: z.coerce
    .number()
    .int()
    .min(1950, "Please enter a realistic year")
    .max(currentYear + 1, "Year looks too far in the future")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  windows: z
    .array(z.enum(WINDOW_SETS))
    .min(1, "Pick at least one window set"),

  shade: z.enum(TINT_SHADES, {
    errorMap: () => ({ message: "Pick a tint shade" }),
  }),

  extras: z.array(z.enum(EXTRAS)).default([]),

  name: z.string().trim().min(2, "Please enter your name").max(100),
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
  contactTime: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes are too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  // Honeypot — bots happily fill this. Must be empty.
  company: z
    .string()
    .max(0, "Spam check failed")
    .optional()
    .or(z.literal("").transform(() => "")),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteParsed = z.output<typeof quoteSchema>;
