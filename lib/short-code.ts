import { randomBytes } from "node:crypto";

/**
 * 6-character lead reference code, e.g. "K4W9PX".
 *
 * Uses a Crockford-ish alphabet without confusables (0/O, 1/I, etc.) so
 * the code survives being read aloud or re-typed from a WhatsApp message.
 *
 * Stored on the lead in the owner's notification email and embedded in
 * the customer's pre-filled WhatsApp message. If v2 adds DB persistence,
 * incoming WhatsApp messages can be matched back to the form submission
 * via this code even after the customer has edited the pre-filled text.
 */

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateShortCode(length = 6): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}
