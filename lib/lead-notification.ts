import { buildWaMeLink } from "@/lib/whatsapp/link";
import {
  windowLabels,
  darknessLabels,
  type LeadParsed,
} from "@/lib/validation/lead";
import { formatUkDisplay } from "@/lib/phone";
import { business } from "@/lib/business";
import { formatDateTime } from "@/lib/dates";

/**
 * Composes the owner notification email for a new lead.
 *
 * Subject is structured for phone lock-screen glanceability:
 *   "New lead: <Name> — <Year Make Model>"
 *
 * HTML body is deliberately plain — no template engine, no third-party
 * CSS. Works in every email client, survives text-mode readers, and the
 * "Reply on WhatsApp" button at the top is a single tap from the
 * notification preview.
 */

export type LeadForNotification = LeadParsed & {
  shortCode: string;
  createdAt: Date;
  sourcePath: string;
  userAgent?: string;
  ipAddress?: string;
};

export function buildLeadSubject(lead: LeadForNotification): string {
  const vehicle = `${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`;
  return `New lead: ${lead.name} — ${vehicle}`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildLeadEmail(lead: LeadForNotification) {
  const vehicle = `${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`;
  const phoneDisplay = formatUkDisplay(lead.phone);
  const phoneTelHref = `tel:+${lead.phone}`;
  const windowsList = lead.windows.map((w) => windowLabels[w]).join(", ");
  const darknessLabel = darknessLabels[lead.darkness];

  // Friendly opener the owner sends back to the customer.
  const waMessage = `Hi ${lead.name}, this is ${business.name} — thanks for your quote request (ref ${lead.shortCode}). Quick follow-up on your ${vehicle}.`;
  const waHref = buildWaMeLink({
    phoneE164: lead.phone,
    message: waMessage,
  });

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;border:1px solid #e5e7eb;">
          <tr><td style="padding:24px;">
            <p style="margin:0 0 4px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#3b82f6;">New quote request · ref ${esc(lead.shortCode)}</p>
            <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;color:#0f172a;">${esc(lead.name)} — ${esc(vehicle)}</h1>

            <a href="${esc(waHref)}" style="display:inline-block;padding:12px 20px;background:#25d366;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">Reply on WhatsApp →</a>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #e5e7eb;">
              ${row("Name", esc(lead.name))}
              ${row("Phone", `<a href="${esc(phoneTelHref)}" style="color:#2563eb;">${esc(phoneDisplay)}</a>`)}
              ${lead.email ? row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#2563eb;">${esc(lead.email)}</a>`) : ""}
              ${row("Vehicle", esc(vehicle))}
              ${row("Windows", esc(windowsList))}
              ${row("Tint darkness", esc(darknessLabel))}
              ${lead.message ? row("Message", esc(lead.message).replace(/\n/g, "<br>")) : ""}
              ${row("Submitted", esc(formatDateTime(lead.createdAt)))}
              ${row("Source", esc(lead.sourcePath))}
              ${row("Lead code", `<code style="background:#f1f5f9;padding:2px 6px;border-radius:3px;">${esc(lead.shortCode)}</code>`)}
            </table>

            <p style="margin:24px 0 0 0;font-size:12px;color:#64748b;">
              Sent by the ${esc(business.name)} website. Lead code ${esc(lead.shortCode)} is embedded in the customer's pre-filled WhatsApp message — useful for correlating replies if they edit the message.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const text = [
    `New lead: ${lead.name} — ${vehicle}`,
    `Ref: ${lead.shortCode}`,
    "",
    `Reply on WhatsApp: ${waHref}`,
    "",
    `Name:           ${lead.name}`,
    `Phone:          ${phoneDisplay}   (tel:+${lead.phone})`,
    ...(lead.email ? [`Email:          ${lead.email}`] : []),
    `Vehicle:        ${vehicle}`,
    `Windows:        ${windowsList}`,
    `Tint darkness:  ${darknessLabel}`,
    ...(lead.message ? [`Message:        ${lead.message}`] : []),
    `Submitted:      ${formatDateTime(lead.createdAt)}`,
    `Source:         ${lead.sourcePath}`,
    "",
    `— ${business.name} website`,
  ].join("\n");

  return { subject: buildLeadSubject(lead), html, text };
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#64748b;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#0f172a;vertical-align:top;">${value}</td>
  </tr>`;
}
