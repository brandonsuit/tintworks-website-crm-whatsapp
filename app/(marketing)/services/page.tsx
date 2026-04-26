import type { Metadata } from "next";

export const revalidate = false;
import Link from "next/link";
import {
  CheckCircle2,
  Sun,
  ShieldCheck,
  Eye,
  Sparkles,
  Truck,
  Car,
  ArrowRight,
  Palette,
  Droplets,
} from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { TintPreviewSection } from "@/components/marketing/tint-preview-section";
import { FadeIn } from "@/components/marketing/stats-counter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Window Tinting Services Leeds — Full Car, Rear, Van",
  description:
    "Ceramic, carbon and chameleon car window tinting in Holbeck, Leeds. Full car, rear set, front pair, sun strips, and commercial van packages.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Tintworks Holbeck, Leeds",
    images: [ogImage("Services — Tintworks Holbeck, Leeds")],
  },
};

const benefits = [
  "Ceramic and carbon films, up to 88% solar heat rejection",
  "99% UV rejection — protects interior trim and skin on long drives",
  "Factory-tidy finish: no peeling, bubbling, or purple fade",
  "UK-legal VLT (70%+) on front side windows when requested",
  "Two-year warranty on the fitting workmanship",
];

const filmTypes = [
  {
    name: "Ceramic",
    icon: Sparkles,
    blurb:
      "Our default recommendation. Highest heat rejection, signal-friendly (no phone or key-fob interference), cleanest long-term look.",
  },
  {
    name: "Carbon",
    icon: ShieldCheck,
    blurb:
      "Strong mid-tier option. Good heat rejection, matte finish, and doesn't fade to purple like cheap dyed films.",
  },
  {
    name: "Chameleon",
    icon: Palette,
    blurb:
      "Colour-shifts between blue, purple and gold under angle and light. Show-car finish, full UV and heat rejection underneath. For when the glass should be a feature.",
    badge: "Statement",
  },
  {
    name: "Limo black",
    icon: Eye,
    blurb:
      "Darkest legal option for rear glass. Maximum privacy on the back seats, in the boot, or in a commercial van.",
  },
  {
    name: "Sun strips",
    icon: Sun,
    blurb:
      "Narrow strip across the top of the windscreen. Cuts low-sun glare. Fitted standalone or added to any package.",
  },
];

const servicePackages = [
  {
    id: "full-car",
    icon: Car,
    title: "Full car tint",
    blurb:
      "Every legal window: rear glass, rear sides, front pair (held to UK-legal 70% VLT), and the sunroof if fitted.",
    points: [
      "Best per-window value",
      "Front pair held to 70%+ VLT — UK law",
      "Two-year fitting warranty included",
    ],
    badge: "Most popular",
  },
  {
    id: "rear-only",
    icon: Eye,
    title: "Rear set",
    blurb:
      "Rear sides plus the rear screen. The classic privacy upgrade for family cars and dailies.",
    points: [
      "No UK VLT restriction on rear glass — 5%, 20%, 35%, your call",
      "Two to three hours, same day",
      "Pairs with a sun strip if motorway glare's the bigger problem",
    ],
  },
  {
    id: "front-only",
    icon: ShieldCheck,
    title: "Front windows",
    blurb:
      "Front pair only. Cuts motorway glare and evens out the look of an already-tinted rear.",
    points: [
      "Held to 70% VLT minimum — UK law",
      "Cuts daytime glare without dropping visibility",
      "Often paired with a previously-tinted rear",
    ],
  },
  {
    id: "sun-strip",
    icon: Sun,
    title: "Windscreen sun strip",
    blurb:
      "Narrow gradient across the top of the windscreen. Cuts low-sun glare on the swept area.",
    points: [
      "75% VLT minimum over the swept area — kept legal",
      "45-minute fit",
      "Fitted standalone or added to any package",
    ],
  },
  {
    id: "commercial",
    icon: Truck,
    title: "Commercial / van",
    blurb:
      "Transit, Sprinter, Vivaro, Transporter and the rest. Rear-window privacy for tools, stock, or conversions.",
    points: [
      "Limo-dark rear glass for tool security",
      "Useful for campervan conversions",
      "Fleet bookings welcomed — ask for multi-van pricing",
    ],
  },
  {
    id: "chameleon",
    icon: Palette,
    title: "Chameleon finish",
    blurb:
      "Colour-shifts between blue, purple and gold under angle and light. Show-car finish, with proper UV and heat rejection underneath.",
    points: [
      "Pairs with any package above",
      "Full UV and heat rejection",
      "Legal-VLT option available for the front pair",
    ],
    badge: "Statement",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Car window tinting Leeds"
        title="Ceramic, carbon and chameleon — fitted in Holbeck."
        lead="Bring the car to our Holbeck bay (LS11). 200+ five-star Google reviews. Two-year fitting warranty."
        crumbs={[{ href: "/services", label: "Services" }]}
      />

      <section className="container pb-4">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg" className="shadow-glow">
            <Link href="/quote">Get a quote</Link>
          </Button>
          <WhatsAppCta pageKey="services" appearance="filled" size="lg" />
        </div>
      </section>

      {/* Packages */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Packages
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Pick a package or ask for something bespoke.
          </h2>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {servicePackages.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.id} delay={i * 0.04}>
                <article
                  id={p.id}
                  className="relative h-full scroll-mt-24 overflow-hidden rounded-sm border border-border bg-card p-6 hover-glow"
                >
                  {p.badge && (
                    <span className="absolute right-4 top-4 rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                      {p.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-accent/40 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {p.blurb}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/quote"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      Get a quote for this package
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Interactive tint preview */}
      <TintPreviewSection />

      {/* Film types */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Film options
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Five films. One honest recommendation.
          </h2>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filmTypes.map((f, i) => {
            const Icon = f.icon;
            const badge = "badge" in f ? f.badge : undefined;
            return (
              <FadeIn key={f.name} delay={i * 0.05}>
                <Card className="relative h-full p-6 hover-glow">
                  {badge && (
                    <span className="absolute right-4 top-4 rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                      {badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-accent/40 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-tight">
                      {f.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {f.blurb}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="container section-padding border-t border-border/60 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Why ceramic
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
            Built for Yorkshire weather.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ceramic films reject up to 88% of solar heat while staying
            signal-friendly — no interference with your phone, key fob, or
            DAB radio. They also block 99% of UV, which spares your interior
            trim and anyone in the back seat.
          </p>
        </FadeIn>
        <ul className="space-y-3">
          {benefits.map((b, i) => (
            <FadeIn key={b} delay={i * 0.04}>
              <li className="flex items-start gap-3 text-sm">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* In-studio only */}
      <section className="container pb-4">
        <div className="rounded-sm border border-accent/30 bg-accent/5 p-6 md:p-8">
          <h3 className="font-display text-xl uppercase tracking-tight text-accent">
            In-studio only. No mobile service.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            All work happens at our Holbeck workshop (LS11). Controlled
            lighting, dust management, and proper space — built for tint, not
            crammed into the corner of a body shop.
          </p>
        </div>
      </section>

      <SectionCta
        pageKey="services"
        heading="Book the car in."
        lead="Send the make, model, and which windows you want done. We'll come back the same day with pricing and a fitting slot."
      />
    </>
  );
}
