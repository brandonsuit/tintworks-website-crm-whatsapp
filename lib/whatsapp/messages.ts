/**
 * Per-page WhatsApp pre-fill templates.
 *
 * Every "Chat on WhatsApp" CTA across the site pulls from here. Keep copy
 * short and question-oriented — it lands in the customer's WhatsApp compose
 * box, so think of it as "what would you tap to send?" not marketing copy.
 *
 * UK spelling throughout (colour, tyre, optimise, customise).
 */

export type WhatsAppPageKey =
  | "landing"
  | "services"
  | "gallery"
  | "contact"
  | "quote";

const BUSINESS = "Tintworks";

export const whatsappMessages: Record<WhatsAppPageKey, string> = {
  landing: `Hi ${BUSINESS}, I'm interested in car window tinting — could you send me more info?`,
  services: `Hi ${BUSINESS}, I'd like to know more about your car tinting services — could you send me more info?`,
  gallery: `Hi ${BUSINESS}, saw your gallery — could you send me a quote?`,
  contact: `Hi ${BUSINESS}, I've just got in touch via your website — could you send me more info?`,
  quote: `Hi ${BUSINESS}, I've just submitted a quote request — here are my details:`,
};

export function getWhatsAppMessage(key: WhatsAppPageKey): string {
  return whatsappMessages[key];
}
