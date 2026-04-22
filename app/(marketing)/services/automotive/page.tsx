import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Car Window Tinting Leeds",
  description:
    "Ceramic and carbon car window tinting in Leeds. Heat rejection, UV protection, and a factory-finish look — fitted in-studio at our Holbeck workshop.",
  alternates: { canonical: "/services/automotive" },
};

const benefits = [
  "Ceramic and carbon films — heat rejection up to 88%",
  "99% UV rejection — protects interior trim and skin on long drives",
  "Factory-tidy finish, no peeling or purple fade",
  "Legally compliant tints for front side windows on request",
  "Lifetime warranty on the fitting workmanship",
];

const packages = [
  {
    name: "Rear 3",
    blurb:
      "Rear windscreen plus the two rear passenger windows — the most common starting point for saloons and hatchbacks.",
  },
  {
    name: "Rear 5",
    blurb:
      "Rear windscreen plus all four passenger windows — the full rear privacy package.",
  },
  {
    name: "Full vehicle",
    blurb:
      "Every window tinted, front side glass included (at legally compliant VLT). Ideal for commercial vans and SUVs.",
  },
];

export default function AutomotivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Car window tinting Leeds"
        title="Ceramic car tints, fitted the right way in Holbeck."
        lead="Bring your vehicle to the studio and drive away with a clean, heat-rejecting tint backed by a lifetime fitting warranty."
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/automotive", label: "Car tinting" },
        ]}
      />

      <section className="container pb-4">
        <div className="flex flex-wrap gap-3">
          <WhatsAppCta pageKey="automotive" appearance="filled" size="lg" />
        </div>
      </section>

      <section className="container section-padding grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Why ceramic</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Built for Yorkshire weather — cool in summer, clear in winter.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ceramic films reject a significant portion of solar heat while
            staying signal-friendly — no interference with your phone or car
            keys. They also block 99% of UV, which protects your interior
            trim and anyone sitting in the back.
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
            Common packages
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Pick a package or ask for something bespoke.
          </h2>
          <div className="mt-6 space-y-3">
            {packages.map((p) => (
              <Card key={p.name} className="p-5">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Not sure which package fits? Send us your vehicle details on
            WhatsApp and we&apos;ll recommend.
          </p>
        </div>
      </section>

      <section className="container pb-4">
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
          <h3 className="font-display text-lg font-semibold text-accent">
            In-studio only — we don&apos;t travel to you
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            All tinting is completed at our Holbeck workshop (LS11). We&apos;ve
            set the studio up specifically for this work — controlled lighting,
            dust management, and proper space to do the job properly.
          </p>
        </div>
      </section>

      <SectionCta
        pageKey="automotive"
        heading="Ready to book your car in?"
        lead="Send us the make, model, and which windows you want done — we'll come back with a quote and a fitting slot."
      />
    </>
  );
}
