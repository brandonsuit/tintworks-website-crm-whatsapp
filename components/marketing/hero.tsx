import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Landing-page hero. Sets the Leeds-local tone immediately — badge, h1,
 * lead copy, dual CTAs (primary: Get a quote → /quote, secondary: WhatsApp).
 *
 * Keep this dense and scannable: most visitors decide within a few seconds
 * whether to pick up the phone or leave.
 */
export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <section className="container relative pt-16 pb-12 md:pt-24 md:pb-20">
      {/* Accent glow, subtle — sits behind the hero to warm up the dark canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[540px] max-w-5xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.55), transparent 55%)",
        }}
      />
      <div className="max-w-3xl">
        <Badge variant="accent" className="font-semibold">
          Car window tinting Leeds · In-studio, Holbeck LS11
        </Badge>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
          Professional car window tinting —{" "}
          <span className="text-accent">bring your vehicle to us</span> in
          Leeds.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance md:text-xl">
          Ceramic and carbon car tints fitted in-studio at our Holbeck
          workshop. Heat rejection, UV protection, and a factory-tidy
          finish — backed by a lifetime fitting warranty.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="xl">
            <Link href="/quote">Get a quote</Link>
          </Button>
          <WhatsAppCta pageKey={pageKey} appearance="filled" size="xl" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          By appointment only — message us on WhatsApp to arrange a booking.
        </p>
      </div>
    </section>
  );
}
