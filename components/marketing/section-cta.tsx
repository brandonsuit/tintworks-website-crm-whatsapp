import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Bottom-of-page CTA strip. Gives every page a strong terminal action.
 * Pass the WhatsApp pageKey so the pre-fill matches the page the user
 * was just reading.
 */

export function SectionCta({
  pageKey,
  heading = "Ready to book in?",
  lead = "Tell us about your vehicle or property and we'll come back with a quote.",
  primaryLabel = "Get a quote",
  primaryHref = "/quote",
}: {
  pageKey: WhatsAppPageKey;
  heading?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="container section-padding">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 85% 50%, hsl(var(--accent) / 0.35), transparent 55%)",
          }}
        />
        <h2 className="font-display text-3xl font-bold text-balance md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{lead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <WhatsAppCta pageKey={pageKey} appearance="outline" size="lg" />
        </div>
      </div>
    </section>
  );
}
