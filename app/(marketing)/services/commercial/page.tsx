import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Commercial Window Tinting Leeds",
  description:
    "Commercial window tinting in Leeds — frosted privacy films, solar control for offices, branded window graphics, and shopfront solar film. Quoted per site.",
  alternates: { canonical: "/services/commercial" },
};

const benefits = [
  "Frosted privacy films for meeting rooms, partitions, and boardrooms",
  "Solar control films for offices with glare or afternoon heat issues",
  "Branded vinyl + tint combinations for shopfronts",
  "Safety and anti-shatter films for premises with public foot traffic",
  "Out-of-hours fitting available to minimise disruption",
];

const useCases = [
  {
    name: "Offices + meeting rooms",
    blurb:
      "Frosted films for visual privacy in glass meeting rooms, with optional cut-out window bands for branding.",
  },
  {
    name: "Shopfronts",
    blurb:
      "Solar control film cuts glare and heat on south-facing retail glass, paired with branded vinyl if needed.",
  },
  {
    name: "Landlords + managed buildings",
    blurb:
      "Whole-floor film specifications for commercial landlords, with a single invoice per building and coordinated fitting schedules.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commercial window tinting Leeds"
        title="Privacy, solar control, and branded glass for Leeds businesses."
        lead="Whether it's one meeting room or a whole shopfront — we quote per site and work around your trading hours where needed."
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/commercial", label: "Commercial tinting" },
        ]}
      />

      <section className="container pb-4">
        <div className="flex flex-wrap gap-3">
          <WhatsAppCta pageKey="commercial" appearance="filled" size="lg" />
        </div>
      </section>

      <section className="container section-padding grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">
            Why commercial film
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Fix glass-related headaches without replacing the glass.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Privacy, solar control, safety, and branding — all achievable with
            the right film specification, at a fraction of the cost of
            replacement glazing.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-accent">
            Typical jobs
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            What we&apos;re usually asked to do.
          </h2>
          <div className="mt-6 space-y-3">
            {useCases.map((u) => (
              <Card key={u.name} className="p-5">
                <h3 className="font-display text-lg font-semibold">{u.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.blurb}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-4">
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
          <h3 className="font-display text-lg font-semibold text-accent">
            How we scope commercial jobs
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Send us floor-plan sketches or photos and we&apos;ll come back
            with film recommendations, timings, and a fixed quote. We&apos;re
            happy to quote for phased rollouts across multiple floors or sites.
          </p>
          {/* {# TODO: confirm fitting policy for commercial — same question as residential. Decide whether copy should explicitly mention on-site fitting or stay neutral. #} */}
        </div>
      </section>

      <SectionCta
        pageKey="commercial"
        heading="Commercial project in the works?"
        lead="Tell us about the site — floor plan, glass count, timings — and we'll come back with a quote."
      />
    </>
  );
}
