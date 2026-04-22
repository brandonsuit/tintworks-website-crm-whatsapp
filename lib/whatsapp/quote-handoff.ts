import { buildWaMeLink } from "@/lib/whatsapp/link";
import {
  formatGbp,
  type QuoteBreakdown,
  type QuoteSelection,
  vehicleTypeLabels,
  windowSetLabels,
  tintShadeLabels,
  extraLabels,
} from "@/lib/pricing";

/**
 * Build the WhatsApp pre-fill message for the quote wizard. Pure function —
 * no I/O, no env reads. The format mirrors the spec in the redesign brief so
 * the owner's inbox gets a consistent structure they can skim in seconds.
 */

export type QuoteHandoffInput = {
  selection: QuoteSelection;
  breakdown: QuoteBreakdown;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: number;
  name: string;
  phoneE164: string;
  contactTime?: string;
  notes?: string;
  shortCode?: string;
};

export function buildQuoteMessage(input: QuoteHandoffInput): string {
  const { selection, breakdown } = input;

  const vehicleLine = [
    input.vehicleYear ? String(input.vehicleYear) : null,
    input.vehicleMake,
    input.vehicleModel,
    selection.vehicleType
      ? `(${vehicleTypeLabels[selection.vehicleType]})`
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const windowsLine =
    selection.windows.length > 0
      ? selection.windows.map((w) => windowSetLabels[w]).join(", ")
      : "—";

  const shadeLine = selection.shade
    ? tintShadeLabels[selection.shade]
    : "—";

  const extrasLine =
    selection.extras.length > 0
      ? selection.extras.map((e) => extraLabels[e]).join(", ")
      : "None";

  const estimate = breakdown.priced
    ? formatGbp(breakdown.total)
    : "Price on request";

  const lines = [
    `Hi Tint Works! I'd like a quote:`,
    ``,
    `🚗 Vehicle: ${vehicleLine}`,
    `🪟 Windows: ${windowsLine}`,
    `🎨 Shade: ${shadeLine}`,
    `➕ Extras: ${extrasLine}`,
    `💷 Estimated: ${estimate}`,
    `👤 Name: ${input.name}`,
    `📞 Phone: ${input.phoneE164}`,
    input.contactTime ? `⏰ Best time to contact: ${input.contactTime}` : null,
    input.notes ? `📝 Notes: ${input.notes}` : null,
    input.shortCode ? `Ref: ${input.shortCode}` : null,
  ].filter(Boolean) as string[];

  return lines.join("\n");
}

export function buildQuoteWaLink(
  input: QuoteHandoffInput & { businessPhoneE164: string },
): string {
  return buildWaMeLink({
    phoneE164: input.businessPhoneE164,
    message: buildQuoteMessage(input),
  });
}
