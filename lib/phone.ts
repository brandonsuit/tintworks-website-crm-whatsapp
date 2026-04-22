/**
 * Phone helpers. We store E.164 without the leading "+" (e.g. "447735839280")
 * because wa.me links want exactly that format. For display we render the UK
 * international format ("+44 7735 839280"); for tel: links we use "+" + E.164.
 */

export const UK_DIALLING_CODE = "44";

/** Strip everything but digits. */
export function digitsOnly(input: string): string {
  return input.replace(/\D+/g, "");
}

/**
 * Normalise user input to E.164 digits (no leading "+").
 * Accepts: "07735 839280", "7735839280", "+44 7735 839280", "0044 7735 839280".
 * Returns null if we can't produce something plausible.
 */
export function normaliseUkToE164(input: string): string | null {
  const digits = digitsOnly(input);
  if (!digits) return null;

  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith(UK_DIALLING_CODE)) return digits;
  if (digits.startsWith("0")) return UK_DIALLING_CODE + digits.slice(1);

  // Bare national number without leading 0 — assume UK.
  if (digits.length === 10) return UK_DIALLING_CODE + digits;

  // Already looks international but not UK — return as-is.
  return digits;
}

/**
 * Render an E.164 (no "+") as UK international format for humans.
 * "447735839280" → "+44 7735 839280". Non-UK numbers render as "+<digits>".
 */
export function formatUkDisplay(e164: string): string {
  const digits = digitsOnly(e164);
  if (!digits.startsWith(UK_DIALLING_CODE)) return `+${digits}`;

  const subscriber = digits.slice(UK_DIALLING_CODE.length);
  // Mobile (10 digits after 44, starting 7): "+44 7xxx xxxxxx"
  if (subscriber.length === 10 && subscriber.startsWith("7")) {
    return `+${UK_DIALLING_CODE} ${subscriber.slice(0, 4)} ${subscriber.slice(4)}`;
  }
  // Geographic fallback: "+44 xxx xxx xxxx"
  if (subscriber.length === 10) {
    return `+${UK_DIALLING_CODE} ${subscriber.slice(0, 3)} ${subscriber.slice(3, 6)} ${subscriber.slice(6)}`;
  }
  return `+${digits}`;
}

/** tel: href, always with leading "+". */
export function telHref(e164: string): string {
  return `tel:+${digitsOnly(e164)}`;
}
