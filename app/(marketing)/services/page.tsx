import type { Metadata } from "next";
import { CheckCircle2, Sun, ShieldCheck, Eye, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { SectionCta } from "@/components/marketing/section-cta";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Card } from "@/components/ui/card";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Car Window Tinting Leeds — Services & Tint Options",
  description:
    "Tintworks — ceramic, carbon, and limo-black car window tinting in Leeds. Rear-3, rear-5, and full-vehicle packages fitted in-studio at our Holbeck workshop.",
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
  "Legally compliant VLT on front side windows on request",
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
  {
    name: "Sun strip only",
    blurb:
      "Quick fix for low-sun glare on long motorway drives. Can be added to any of the packages above.",
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
          <WhatsAppCta pageKey="services" appearance="filled" size="lg" />
        </div>
      </section>

      {/* Why ceramic / benefits */}
      <section className="container section-padding grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Why ceramic</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Built for Yorkshire weather — cool in summer, clear in winter.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ceramic films reject a significant portion of solar heat while
            staying signal-friendly — no interference with your phone, key
            fob, or DAB radio. They also block 99% of UV, which protects your
            interior trim and anyone sitting in the back.
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
            Film options
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Four film types covering every sensible use case.
          </h2>
          <div className="mt-6 space-y-3">
            {filmTypes.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.name} className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {f.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {f.blurb}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container section-padding border-t border-border/60">
        <p className="text-xs uppercase tracking-widest text-accent">
          Common packages
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Pick a package or ask for something bespoke.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {packages.map((p) => (
            <Card key={p.name} className="p-6">
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Not sure which package fits? Send us your vehicle details on
          WhatsApp and we&apos;ll recommend.
        </p>
      </section>

      {/* How it works */}
      <section className="container section-padding border-t border-border/60">
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
            body="Turn up at the studio on your fitting day. Most tints are completed the same day."
          />
        </ol>
      </section>

      {/* In-studio only notice */}
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
        pageKey="services"
        heading="Ready to book your car in?"
        lead="Send us the make, model, and which windows you want done — we'll come back with a quote and a fitting slot."
      />
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
