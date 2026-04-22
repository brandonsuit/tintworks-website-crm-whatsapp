/**
 * WhatsApp Click-to-Chat link builder.
 *
 * Produces wa.me URLs with pre-filled messages. Kept deliberately free of
 * side effects / I/O so it can be reused unchanged when Phase 2 (WhatsApp
 * Cloud API, two-way messaging) lands: the link itself remains a valid
 * fallback even when the two-way channel is primary, and the same input
 * shape feeds both.
 *
 * Inputs:
 *   phoneE164  — digits only, no leading "+". Matches BUSINESS_PHONE_E164.
 *   message    — plain text. Will be URL-encoded here; don't pre-encode.
 */

export type BuildWaMeLinkArgs = {
  phoneE164: string;
  message: string;
};

export function buildWaMeLink({ phoneE164, message }: BuildWaMeLinkArgs): string {
  const digits = phoneE164.replace(/\D+/g, "");
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${digits}?text=${encoded}`;
}
