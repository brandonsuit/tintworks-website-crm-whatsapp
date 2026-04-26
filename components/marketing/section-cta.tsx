import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Bottom-of-page CTA strip. Terminal action for every page: quote, WhatsApp,
 * or phone. Big, bold, hard to miss.
 */

export function SectionCta({
  pageKey,
  heading = "Send us your make, model and windows.",
  lead = "We'll come back the same day with pricing and a fitting slot in our Holbeck bay.",
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
      <div className="relative isolate overflow-hidden rounded-sm border border-border bg-card p-10 md:p-16 bg-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 85% 40%, hsl(var(--accent) / 0.35), transparent 55%)",
          }}
        />
        <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
          Book in
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg" className="shadow-glow">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <WhatsAppCta pageKey={pageKey} appearance="filled" size="lg" />
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href={telHref(business.phoneE164)}
              aria-label={`Call ${business.phoneDisplay}`}
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              {business.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
