import { buildWaMeLink } from "@/lib/whatsapp/link";
import {
  windowLabels,
  darknessLabels,
  type LeadParsed,
} from "@/lib/validation/lead";
import { business } from "@/lib/business";

/**
 * Builds the customer's wa.me handoff URL after a successful quote submit.
 *
 * The pre-filled message is the opener the customer sends *to us* when
 * they tap through. Keep it concise — customers can and do edit it — but
 * always include the short code so owner-side correlation survives edits.
 */
export function buildLeadWaHandoff(args: {
  lead: LeadParsed;
  shortCode: string;
}): { url: string; message: string } {
  const { lead, shortCode } = args;
  const vehicle = `${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`;
  const windows = lead.windows.map((w) => windowLabels[w]).join(", ");
  const darkness = darknessLabels[lead.darkness];

  const lines = [
    `Hi ${business.name}, I'd like a quote.`,
    `Name: ${lead.name}`,
    `Vehicle: ${vehicle}`,
    `Windows: ${windows}`,
    `Tint: ${darkness}`,
    `Ref: ${shortCode}`,
  ];
  if (lead.message) {
    lines.push(`Notes: ${lead.message}`);
  }

  const message = lines.join("\n");
  const url = buildWaMeLink({
    phoneE164: business.phoneE164,
    message,
  });

  return { url, message };
}
