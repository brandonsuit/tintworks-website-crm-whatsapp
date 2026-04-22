import { NextResponse, type NextRequest } from "next/server";

import { leadSchema } from "@/lib/validation/lead";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { generateShortCode } from "@/lib/short-code";
import { buildLeadWaHandoff } from "@/lib/whatsapp/lead-handoff";
import { buildLeadEmail } from "@/lib/lead-notification";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { serverEnv } from "@/lib/env";

/**
 * POST /api/leads
 *
 * Flow:
 *  1. Rate-limit by IP (3 / 10min).
 *  2. Parse + validate via zod. Honeypot rejected here (zod `.max(0)`).
 *  3. Generate a short code.
 *  4. Build the customer's wa.me URL (always returned to client).
 *  5. Attempt to notify the owner via Resend — failures are logged but
 *     do NOT fail the request. The WhatsApp handoff is primary; email
 *     is a convenience.
 *  6. Return `{ whatsappUrl, shortCode, emailSent }`.
 *
 * Designed so v2's DB persistence drops in between step 3 and step 4
 * without changing the client contract.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  const rl = rateLimit(`leads:${ip}`, {
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

  const parsed = leadSchema.safeParse(rawBody);
  if (!parsed.success) {
    // Honeypot hit surfaces as a plain validation error — we don't want
    // to tell the bot which field tripped it, so return a generic 400.
    const honeypot = parsed.error.flatten().fieldErrors.company;
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
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

  const lead = parsed.data;
  const shortCode = generateShortCode();
  const createdAt = new Date();
  const sourcePath =
    request.headers.get("referer") ||
    request.nextUrl.origin + "/quote";

  // Build the WhatsApp handoff URL first — we always return this even if
  // email sending goes sideways.
  const { url: whatsappUrl } = buildLeadWaHandoff({ lead, shortCode });

  // Fire-and-log owner notification. Do NOT await in a way that fails
  // the request: the user-visible handoff must complete regardless.
  let emailSent = false;
  if (isEmailConfigured()) {
    const { subject, html, text } = buildLeadEmail({
      ...lead,
      shortCode,
      createdAt,
      sourcePath,
      userAgent: request.headers.get("user-agent") ?? undefined,
      ipAddress: ip,
    });
    const result = await sendEmail({
      to: serverEnv.OWNER_NOTIFY_EMAIL!,
      subject,
      html,
      text,
      // Reply-To the customer's email so the owner can just hit Reply
      // in their mail client if they prefer that channel.
      replyTo: lead.email,
    });
    if (result.ok) {
      emailSent = true;
    } else {
      console.error(
        "[leads] Resend notification failed — lead still captured:",
        { shortCode, error: result.error },
      );
    }
  } else {
    console.warn(
      "[leads] Email not configured — skipping owner notification.",
      { shortCode },
    );
  }

  return NextResponse.json({
    ok: true,
    shortCode,
    whatsappUrl,
    emailSent,
  });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
