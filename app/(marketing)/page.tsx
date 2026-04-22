import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Eye,
  Sun,
  Car,
} from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { SectionCta } from "@/components/marketing/section-cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { galleryItems } from "@/gallery.config";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Car Window Tinting Leeds — Ceramic, Carbon & Limo Tints",
  description:
    "Tintworks — professional car window tinting in Leeds. Ceramic and carbon films fitted in-studio at our Holbeck workshop. Lifetime fitting warranty.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Car Window Tinting Leeds — Tintworks",
    images: [ogImage("Car Window Tinting Leeds — Tintworks")],
  },
};

const filmTypes = [
  {
    name: "Ceramic",
    icon: Sparkles,
    blurb:
      "Highest heat rejection, signal-friendly, no phone or key-fob interference.",
  },
  {
    name: "Carbon",
    icon: ShieldCheck,
    blurb:
      "Strong mid-tier option. Matte finish, doesn't fade to purple over time.",
  },
  {
    name: "Limo black",
    icon: Eye,
    blurb:
      "Darkest legal tint for rear glass — maximum privacy for passengers and luggage.",
  },
  {
    name: "Sun strips",
    icon: Sun,
    blurb:
      "A narrow strip across the windscreen to cut low-sun glare on motorway drives.",
  },
];

export default function LandingPage() {
  // Show three gallery teasers — pull the first three from the config.
  const teaserItems = galleryItems.slice(0, 3);

  return (
    <>
      <Hero pageKey="landing" />

      {/* What we do — film types */}
      <section className="container section-padding">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              What we fit
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Four film options covering every sensible use case.
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/services">See full service page →</Link>
          </Button>
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {filmTypes.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.name}>
                <Card className="h-full p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.blurb}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Why Tintworks */}
      <section className="container section-padding border-t border-border/60">
        <p className="text-xs uppercase tracking-widest text-accent">
          Why Tintworks
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Leeds-local, studio-fitted, precision-focused.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureBlock
            icon={MapPin}
            title="Holbeck, LS11"
            body="Bring your vehicle to our dedicated workshop — controlled, dust-free, and set up for a proper finish."
          />
          <FeatureBlock
            icon={ShieldCheck}
            title="Premium films only"
            body="Ceramic and carbon films from trusted manufacturers, backed by a lifetime warranty on fitting."
          />
          <FeatureBlock
            icon={Clock}
            title="Honest timelines"
            body="Most tints are completed the same day. You'll know the fitting slot up-front — no vague windows."
          />
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="container section-padding border-t border-border/60">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              Recent work
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              A taste of what we&apos;ve been fitting.
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/gallery">See full gallery →</Link>
          </Button>
        </div>
        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {teaserItems.map((item) => (
            <li key={item.src}>
              <figure className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews block — deliberately empty until real reviews collected */}
      <section className="container section-padding border-t border-border/60">
        <div className="rounded-lg border border-border bg-card p-8 md:p-10">
          <p className="text-xs uppercase tracking-widest text-accent">
            Reviews
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Reviews coming soon — find us on Google.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            We&apos;re collecting reviews from recent customers. In the
            meantime, search for Tintworks on Google Maps to see the latest.
          </p>
          {/* {# TODO: swap href for real Google Business Profile review URL before launch #} */}
          <div className="mt-5">
            <Button asChild variant="outline" size="sm">
              <Link href="#" aria-disabled>
                Google Business Profile (pending)
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionCta
        pageKey="landing"
        heading="Thinking about tinting your car? Let's talk."
        lead="Tell us the make, model, and windows you'd like done — we'll come back with a quote the same day."
      />
    </>
  );
}

function FeatureBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Car;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
