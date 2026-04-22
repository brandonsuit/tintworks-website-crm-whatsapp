import { NextResponse, type NextRequest } from "next/server";

import { quoteSchema } from "@/lib/validation/quote";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { generateShortCode } from "@/lib/short-code";
import { buildQuoteWaLink } from "@/lib/whatsapp/quote-handoff";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { serverEnv } from "@/lib/env";
import { business } from "@/lib/business";
import { calculateQuote, formatGbp } from "@/lib/pricing";

/**
 * POST /api/quote
 *
 * Handles the multi-step quote wizard payload. Mirrors /api/leads in spirit:
 *  1. Rate-limit by IP.
 *  2. Validate via zod (honeypot tripwire included).
 *  3. Generate short code.
 *  4. Calculate the breakdown + build WhatsApp URL (always returned).
 *  5. Best-effort owner notification email (non-fatal if Resend isn't
 *     configured or sending fails).
 *  6. Return `{ shortCode, whatsAppUrl, emailSent }`.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  const rl = rateLimit(`quote:${ip}`, {
    windowMs: RATE_WINDOW_MS,
    max: RATE_MAX,
  });
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests. Please try again in a few minutes, or message us directly on WhatsApp.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSeconds) },
      },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(rawBody);
  if (!parsed.success) {
    const honeypot = parsed.error.flatten().fieldErrors.company;
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form — some fields need attention.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const q = parsed.data;
  const shortCode = generateShortCode();

  const breakdown = calculateQuote({
    vehicleType: q.vehicleType,
    windows: q.windows,
    shade: q.shade,
    extras: q.extras,
  });

  const whatsAppUrl = buildQuoteWaLink({
    businessPhoneE164: business.phoneE164,
    selection: {
      vehicleType: q.vehicleType,
      windows: q.windows,
      shade: q.shade,
      extras: q.extras,
    },
    breakdown,
    vehicleMake: q.vehicleMake,
    vehicleModel: q.vehicleModel,
    vehicleYear: q.vehicleYear,
    name: q.name,
    phoneE164: q.phone,
    contactTime: q.contactTime,
    notes: q.notes,
    shortCode,
  });

  let emailSent = false;
  if (isEmailConfigured()) {
    const subject = `New quote: ${q.name} — ${q.vehicleMake} ${q.vehicleModel}`;
    const estimate = breakdown.priced
      ? formatGbp(breakdown.total)
      : "Price on request";
    const lines = [
      `New quote submitted via the wizard.`,
      ``,
      `Ref: ${shortCode}`,
      `Name: ${q.name}`,
      `Phone: ${q.phone}`,
      q.contactTime ? `Best time: ${q.contactTime}` : null,
      ``,
      `Vehicle: ${[q.vehicleYear, q.vehicleMake, q.vehicleModel]
        .filter(Boolean)
        .join(" ")} (${q.vehicleType})`,
      `Windows: ${q.windows.join(", ")}`,
      `Shade: ${q.shade}% VLT`,
      `Extras: ${q.extras.length > 0 ? q.extras.join(", ") : "none"}`,
      `Estimated: ${estimate}`,
      q.notes ? `Notes: ${q.notes}` : null,
      ``,
      `IP: ${ip}`,
    ].filter(Boolean) as string[];
    const text = lines.join("\n");
    const html = `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap;">${escapeHtml(
      text,
    )}</pre>`;
    const result = await sendEmail({
      to: serverEnv.OWNER_NOTIFY_EMAIL!,
      subject,
      html,
      text,
    });
    if (result.ok) {
      emailSent = true;
    } else {
      console.error("[quote] Resend notification failed — lead still captured:", {
        shortCode,
        error: result.error,
      });
    }
  } else {
    console.warn("[quote] Email not configured — skipping owner notification.", {
      shortCode,
    });
  }

  return NextResponse.json({
    ok: true,
    shortCode,
    whatsAppUrl,
    emailSent,
  });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405 },
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
