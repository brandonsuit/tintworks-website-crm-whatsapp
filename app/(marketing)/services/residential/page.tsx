import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Residential Window Tinting Leeds",
  description:
    "Privacy film, solar control, and UV reduction for homes across Leeds. Tintworks — fitted from our Holbeck studio, with a proper survey of your property up-front.",
  alternates: { canonical: "/services/residential" },
};

const benefits = [
  "Cut solar heat gain on south- and west-facing glass — rooms stay comfortable without blackout blinds",
  "Reduce UV by up to 99% — protects furniture, flooring, and artwork from fading",
  "One-way privacy film — see out, can't be seen in during daytime",
  "Frosted films for bathrooms, front-door glass, and internal partitions",
  "Low-emissivity films to keep warmth in during winter",
];

const useCases = [
  {
    name: "Lounge + living areas",
    blurb:
      "South-facing bay windows and conservatories where glare makes screens unreadable in summer.",
  },
  {
    name: "Bedrooms",
    blurb:
      "Cooler temperatures without blocking morning light — great for south-facing rooms with children or shift-workers.",
  },
  {
    name: "Front door + fanlight glass",
    blurb:
      "Frosted films for privacy without replacing the glass or fitting a blind.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Residential window tinting Leeds"
        title="Window films that quietly fix heat, glare, and privacy."
        lead="Most homes have one or two rooms that need sorting — we survey first, recommend the right film, and fit from our Holbeck studio."
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/residential", label: "Residential tinting" },
        ]}
      />

      <section className="container pb-4">
        <div className="flex flex-wrap gap-3">
          <WhatsAppCta pageKey="residential" appearance="filled" size="lg" />
        </div>
      </section>

      <section className="container section-padding grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">
            Why residential film
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            The cheapest way to fix an overheating room.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Window film is almost always cheaper than air-conditioning,
            replacement glass, or new blinds — and it keeps the natural
            light you liked about the room in the first place.
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
            Where it helps most
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Rooms people typically ask us about.
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
            How we quote residential jobs
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Send us a few photos of the window(s) and rough measurements on
            WhatsApp. We&apos;ll recommend a film and come back with a price
            and a fitting slot.
          </p>
          {/* {# TODO: confirm fitting policy for residential — studio-only conflicts with the physical nature of fitting films to installed glass. Decide: (a) state fitted at property, (b) state loose-glass / prepped panels only, or (c) drop residential entirely. #} */}
        </div>
      </section>

      <SectionCta
        pageKey="residential"
        heading="Got a room that needs sorting?"
        lead="Share a photo and the window dimensions — we'll recommend the right film and price it."
      />
    </>
  );
}
