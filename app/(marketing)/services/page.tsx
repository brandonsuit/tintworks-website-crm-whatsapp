import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Sun,
  ShieldCheck,
  Eye,
  Sparkles,
  Truck,
  Car,
  AlertTriangle,
  ArrowRight,
  Palette,
} from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { ShadeSwatches } from "@/components/marketing/shade-swatches";
import { FadeIn } from "@/components/marketing/stats-counter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Car Window Tinting Services Leeds — Full, Rear, Front & Van Tints",
  description:
    "Tint Works — ceramic, carbon and limo-black car window tinting in Leeds. Full car, rear set, front windows, windscreen sun strips, and van/commercial packages, fitted in-studio at our Holbeck workshop.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Car Window Tinting Leeds",
    images: [ogImage("Services — Car Window Tinting Leeds")],
  },
};

const benefits = [
  "Ceramic and carbon films — heat rejection up to 88%",
  "99% UV rejection — protects interior trim and skin on long drives",
  "Factory-tidy finish, no peeling or purple fade",
  "UK-legal VLT on front side windows on request",
  "Lifetime warranty on the fitting workmanship",
];

const filmTypes = [
  {
    name: "Ceramic",
    icon: Sparkles,
    blurb:
      "Our default recommendation. Highest heat rejection, signal-friendly (no phone or key-fob interference), and the cleanest long-term look.",
  },
  {
    name: "Carbon",
    icon: ShieldCheck,
    blurb:
      "A strong mid-tier option. Good heat rejection, matte finish, and doesn't fade to purple like cheap dyed films.",
  },
  {
    name: "Chameleon",
    icon: Palette,
    blurb:
      "Colour-shifting film that flips between blue, purple, and gold depending on the angle and light. Show-car finish, still offers proper UV and heat rejection. Built for people who want the glass to be a feature.",
    badge: "Statement",
  },
  {
    name: "Limo black",
    icon: Eye,
    blurb:
      "Darkest legal tint for rear glass — maximum privacy for rear passengers, luggage, or commercial vans.",
  },
  {
    name: "Sun strips",
    icon: Sun,
    blurb:
      "A narrow strip across the top of the windscreen to cut low-sun glare. Fitted on their own or added to any package.",
  },
];

const servicePackages = [
  {
    id: "full-car",
    icon: Car,
    title: "Full car tint",
    blurb:
      "Every legal window wrapped — rear glass, rear sides, front sides (to UK-legal 70% VLT), and sunroof if fitted.",
    points: [
      "Best value per window",
      "Full privacy + heat rejection",
      "Front-side film kept legal (≥70% VLT)",
    ],
    badge: "Most popular",
  },
  {
    id: "rear-only",
    icon: Eye,
    title: "Rear set",
    blurb:
      "Rear sides plus the rear windscreen. The classic privacy upgrade for family cars and dailies.",
    points: [
      "No UK VLT restriction on rear glass",
      "Choose anything from 20% down to limo 5%",
      "Typically completed in 2–3 hours",
    ],
  },
  {
    id: "front-only",
    icon: ShieldCheck,
    title: "Front windows",
    blurb:
      "Cuts glare on motorway drives and evens out the look of an already-tinted rear.",
    points: [
      "70% VLT minimum by law — we keep you compliant",
      "Great pairing with a previously-tinted rear",
      "UV protection for the driver",
    ],
  },
  {
    id: "sun-strip",
    icon: Sun,
    title: "Windscreen sun strip",
    blurb:
      "Narrow gradient strip across the top of the windscreen — stops low-sun glare dead.",
    points: [
      "Fitted standalone or added to any package",
      "Must keep 75% VLT over swept area",
      "Quick — typically a 45-minute job",
    ],
  },
  {
    id: "commercial",
    icon: Truck,
    title: "Commercial / van",
    blurb:
      "Transit, Sprinter, VW Transporter, Vivaro and more. Rear-window privacy for tools, stock, or conversions.",
    points: [
      "Limo-dark rear with matte finish",
      "Useful for campervan conversions",
      "Light-weight to a full-wrap treatment",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Car window tinting Leeds"
        title="Ceramic and carbon car tints, fitted in Holbeck."
        lead="Bring your vehicle to the studio and drive away with a clean, heat-rejecting tint backed by a lifetime fitting warranty."
        crumbs={[{ href: "/services", label: "Services" }]}
      />

      <section className="container pb-4">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg" className="shadow-glow">
            <Link href="/quote">Get Instant Quote</Link>
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
                      Quote this package
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Shade reference */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Shade guide
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Pick your shade. We&rsquo;ll keep you legal.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The % shown is VLT — Visible Light Transmission. Lower % = darker
            tint. Rear glass has no UK restriction; front sides must stay at
            70% VLT or higher, and the windscreen at 75%+.
          </p>
        </FadeIn>
        <div className="mt-10">
          <ShadeSwatches />
        </div>
        <div className="mt-10 flex items-start gap-4 rounded-sm border border-accent/40 bg-accent/5 p-6">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-accent"
            aria-hidden
          />
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight text-accent">
              UK law, in plain English
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Windscreen:</strong> 75% VLT
                minimum. Only a sun strip is practical.
              </li>
              <li>
                <strong className="text-foreground">Front sides:</strong> 70%
                VLT minimum. We&apos;ll never fit below this.
              </li>
              <li>
                <strong className="text-foreground">Rear sides + rear
                windscreen:</strong> no restriction — pick anything from 5% to
                70%.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Film types */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Film options
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Four film types, one honest recommendation.
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
            Ceramic films reject a significant portion of solar heat while
            staying signal-friendly — no interference with your phone, key
            fob, or DAB radio. They also block 99% of UV, which protects your
            interior trim and anyone sitting in the back.
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
            In-studio only — we don&rsquo;t travel to you
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            All tinting is completed at our Holbeck workshop (LS11). The studio
            is set up specifically for this work — controlled lighting, dust
            management, and proper space to do the job properly.
          </p>
        </div>
      </section>

      <SectionCta
        pageKey="services"
        heading="Ready to book your car in?"
        lead="Send us the make, model, and which windows you want done — we'll come back with a quote and a fitting slot."
      />
    </>
  );
}
