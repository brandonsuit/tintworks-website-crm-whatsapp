import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Car, Home, Building2, ShieldCheck, Clock, MapPin } from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { SectionCta } from "@/components/marketing/section-cta";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/gallery.config";

export const metadata: Metadata = {
  title: "Window Tinting Leeds — Car, Home & Commercial",
  description:
    "Tintworks — professional window tinting in Leeds. Ceramic car tints, residential privacy film, and commercial solar control. In-studio in Holbeck, LS11.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  // Show three gallery teasers on the landing, one from each category.
  const teaserItems = [
    galleryItems.find((i) => i.category === "automotive"),
    galleryItems.find((i) => i.category === "residential"),
    galleryItems.find((i) => i.category === "commercial"),
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <Hero pageKey="landing" />

      {/* Services teaser */}
      <section className="container section-padding">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              What we do
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Three tinting specialisms, one studio in Leeds.
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/services">See all services →</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ServiceCard
            href="/services/automotive"
            title="Car window tinting"
            description="Ceramic and carbon films for cars, vans, and SUVs. Heat rejection, UV protection, and a factory-finish look — fitted in-studio."
            icon={Car}
            cta="Car tinting →"
          />
          <ServiceCard
            href="/services/residential"
            title="Residential tinting"
            description="Privacy film, solar control, and UV reduction for homes across Leeds. Keep rooms cooler in summer without losing natural light."
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
            body="Most car tints completed the same day. Residential and commercial jobs quoted with a firm fitting date up-front."
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

      {/* Testimonials — placeholders until real reviews collected */}
      <section className="container section-padding border-t border-border/60">
        <p className="text-xs uppercase tracking-widest text-accent">
          What customers say
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Trusted by drivers and homeowners across Leeds.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* {# TODO: replace all three testimonials with real Google/Facebook reviews before launch #} */}
          <TestimonialCard
            isPlaceholder
            quote="Turned up in the morning, drove away a few hours later with a flawless ceramic tint. Huge difference to how the car feels in the sun."
            author="Placeholder — real review pending"
            context="BMW 3 Series — Leeds"
          />
          <TestimonialCard
            isPlaceholder
            quote="South-facing lounge was unusable in summer. The solar film made an immediate difference and you can't tell it's there from inside."
            author="Placeholder — real review pending"
            context="Residential — Leeds LS8"
          />
          <TestimonialCard
            isPlaceholder
            quote="Fast, tidy, professional. Did the whole shopfront over a Sunday so we didn't lose trading hours. Straight dealing, fair price."
            author="Placeholder — real review pending"
            context="Commercial — Leeds city centre"
          />
        </div>
      </section>

      <SectionCta
        pageKey="landing"
        heading="Thinking about tinting? Let's talk."
        lead="Tell us about your car or property and we'll come back with a quote the same day."
      />
    </>
  );
}

function FeatureBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof MapPin;
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
