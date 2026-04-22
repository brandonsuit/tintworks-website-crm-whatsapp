import { Resend } from "resend";

import { serverEnv } from "@/lib/env";

/**
 * Resend client, lazily constructed. If `RESEND_API_KEY` isn't set at
 * runtime the client is never built — callers check `isEmailConfigured`
 * before attempting a send. Email is non-critical to the lead-capture
 * flow (WhatsApp handoff is primary) so missing config must not throw.
 */

let client: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(
    serverEnv.RESEND_API_KEY && serverEnv.EMAIL_FROM && serverEnv.OWNER_NOTIFY_EMAIL,
  );
}

function getClient(): Resend {
  if (!client) {
    if (!serverEnv.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not set");
    }
    client = new Resend(serverEnv.RESEND_API_KEY);
  }
  return client;
}

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!isEmailConfigured()) {
    return { ok: false, error: "Email not configured" };
  }

  try {
    const resend = getClient();
    const result = await resend.emails.send({
      from: serverEnv.EMAIL_FROM!,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
      replyTo: args.replyTo,
    });
    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true, id: result.data?.id ?? "unknown" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
