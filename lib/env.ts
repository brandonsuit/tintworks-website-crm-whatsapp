import { z } from "zod";

/**
 * Centralised, type-safe env access. Anything the app reads at runtime goes
 * through here so missing / malformed values fail loudly at boot rather than
 * surfacing as undefined deep inside a request.
 *
 * NEXT_PUBLIC_* vars must be referenced by their full literal name in client
 * components for Next to inline them at build time — don't destructure this
 * object in client code; import individual helpers instead.
 */

const serverSchema = z.object({
  BUSINESS_PHONE_E164: z
    .string()
    .regex(/^\d{8,15}$/, "BUSINESS_PHONE_E164 must be digits only, no +"),
  BUSINESS_NAME: z.string().min(1),
  BUSINESS_EMAIL: z.string().email(),
  BUSINESS_ADDRESS: z.string().min(1),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  OWNER_NOTIFY_EMAIL: z.string().email().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional().default(""),
});

function parseServer() {
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid server env:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server env — see logs");
  }
  return parsed.data;
}

function parsePublic() {
  const parsed = publicSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  });
  if (!parsed.success) {
    console.error("Invalid public env:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid public env — see logs");
  }
  return parsed.data;
}

// Parse eagerly on the server so a misconfigured deploy dies at boot.
export const serverEnv =
  typeof window === "undefined"
    ? parseServer()
    : (undefined as unknown as ReturnType<typeof parseServer>);

export const publicEnv = parsePublic();
