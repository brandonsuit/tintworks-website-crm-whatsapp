import type { Metadata } from "next";
import { Car, Home, Building2 } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { ServiceCard } from "@/components/marketing/service-card";
import { SectionCta } from "@/components/marketing/section-cta";

export const metadata: Metadata = {
  title: "Window Tinting Services Leeds",
  description:
    "Tintworks offers car window tinting, residential privacy film, and commercial solar control in Leeds. In-studio fitting at our Holbeck workshop.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Window tinting, three ways."
        lead="Every job is fitted in our Holbeck studio. Pick the service that fits — or get in touch and we'll talk it through."
        crumbs={[{ href: "/services", label: "Services" }]}
      />

      <section className="container pb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ServiceCard
            href="/services/automotive"
            title="Car window tinting"
            description="Ceramic and carbon films for cars, vans, and SUVs. Heat rejection, UV protection, and a clean, factory-finish look."
            icon={Car}
            cta="Car tinting →"
          />
          <ServiceCard
            href="/services/residential"
            title="Residential tinting"
            description="Privacy film, solar control, and UV reduction for homes across Leeds. Cooler rooms in summer, warmer in winter."
            icon={Home}
            cta="Residential →"
          />
          <ServiceCard
            href="/services/commercial"
            title="Commercial tinting"
            description="Offices, shopfronts, meeting rooms. Frosted privacy films, solar control, and branded graphics — quoted per site."
            icon={Building2}
            cta="Commercial →"
          />
        </div>
      </section>

      <section className="container section-padding">
        <p className="text-xs uppercase tracking-widest text-accent">
          How it works
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Simple, studio-based, in-and-out.
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Step
            n={1}
            title="Tell us what you want"
            body="Send a quick message on WhatsApp or fill in the quote form. Photos help us scope it faster."
          />
          <Step
            n={2}
            title="Get a firm quote"
            body="We'll come back with pricing and a fitting slot. No vague estimates — you'll know what you're paying."
          />
          <Step
            n={3}
            title="Bring it to Holbeck"
            body="Turn up at the studio on your fitting day. Most car tints are done the same day; residential and commercial are booked in as per site."
          />
        </ol>
      </section>

      <SectionCta pageKey="services" />
    </>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-lg border border-border bg-card p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 bg-accent/10 font-display text-sm font-bold text-accent">
        {n}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </li>
  );
}
