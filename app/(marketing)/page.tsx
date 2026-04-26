import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Sparkles,
  Eye,
  Sun,
  Truck,
  Palette,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { SectionCta } from "@/components/marketing/section-cta";
import { ServiceCard } from "@/components/marketing/service-card";
import {
  StatsCounter,
  FadeIn,
} from "@/components/marketing/stats-counter";
import { ReviewCarousel } from "@/components/marketing/review-carousel";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqAccordion, type FaqItem } from "@/components/marketing/faq-accordion";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/gallery.config";
import { reviews as staticReviews, reviewStats, googleReviewsProfileUrl } from "@/lib/reviews";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { ogImage } from "@/lib/og";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Car Window Tinting Leeds — Ceramic, Carbon, Chameleon",
  description:
    "Studio-fitted car window tinting in Holbeck, Leeds (LS11). Ceramic, carbon and chameleon films. 200+ five-star Google reviews, two-year fitting warranty.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Car Window Tinting Leeds — Tintworks",
    images: [ogImage("Car Window Tinting Leeds — Tintworks")],
  },
};

const services = [
  {
    href: "/services",
    icon: Sparkles,
    title: "Full car tint",
    description:
      "Every legal window. Ceramic or carbon, with the front pair held to UK-legal 70% VLT.",
    badge: "Most popular",
  },
  {
    href: "/services",
    icon: Eye,
    title: "Rear set",
    description:
      "Rear sides plus rear screen. Privacy for kids, dogs, or kit. Two to three hours in our bay.",
  },
  {
    href: "/services",
    icon: ShieldCheck,
    title: "Front windows",
    description:
      "Front pair only, kept legal at 70%+ VLT. Cuts motorway glare without dropping daytime visibility.",
  },
  {
    href: "/services",
    icon: Sun,
    title: "Windscreen sun strip",
    description:
      "Narrow gradient strip across the top of the windscreen. Kills low-sun glare in 45 minutes.",
  },
  {
    href: "/services",
    icon: Truck,
    title: "Commercial / van",
    description:
      "Transit, Sprinter, Vivaro, Transporter. Limo-dark rear glass for tools, stock, or campervan privacy.",
  },
  {
    href: "/services",
    icon: Palette,
    title: "Chameleon finish",
    description:
      "Colour-shifts between blue, purple and gold under angle and light. Show-car finish, full UV and heat rejection underneath.",
    badge: "Statement",
  },
] as const;

const faqs: FaqItem[] = [
  {
    q: "Is window tinting legal in the UK?",
    a: (
      <>
        <p>
          Yes, within the rules. UK law (Construction & Use Regulations) says:
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            Front windscreen must let through at least{" "}
            <strong className="text-foreground">75%</strong> of light (VLT —
            visible light transmission).
          </li>
          <li>
            Front side windows must let through at least{" "}
            <strong className="text-foreground">70%</strong> of light.
          </li>
          <li>
            Rear windows and rear windscreen have{" "}
            <strong className="text-foreground">no restriction</strong> — go as
            dark as you like.
          </li>
        </ul>
        <p className="mt-3">
          We&apos;ll never fit a front tint below the legal limit.
        </p>
      </>
    ),
  },
  {
    q: "How long does it take?",
    a: "Most jobs are same-day. A rear set is two to three hours; a full car around three to four. We'll give you the exact slot when you book.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the vehicle and which windows you're doing. Use the quote tool for an instant estimate, or send us a WhatsApp message with the make and model.",
  },
  {
    q: "How long does the tint itself last?",
    a: "Our ceramic and carbon films are colour-stable for the life of the car — no purple fade, no bubbling, no peeling. The film outlasts most cars.",
  },
  {
    q: "Can I wash my car after?",
    a: "Hold off washing the windows for three to five days while the film cures. Some cloudiness during cure is normal — it clears as the moisture evaporates from underneath.",
  },
  {
    q: "What does the fitting warranty cover?",
    a: "Two years on the workmanship — covers peeling, bubbling, or delamination. If anything goes wrong, bring the car back.",
  },
];

export default async function LandingPage() {
  const teaser = galleryItems.slice(0, 3);
  const liveReviews = await fetchGoogleReviews();
  const reviews = liveReviews.length > 0 ? liveReviews : staticReviews;
  const isPlaceholder = liveReviews.length === 0;

  return (
    <>
      <Hero pageKey="landing" />

      {/* Services */}
      <section
        id="services"
        className="container section-padding border-t border-border/60"
      >
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
            What we fit
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
              Daily drivers, weekend cars, working vans.
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/services" className="gap-1">
                See all services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <li key={s.title}>
              <FadeIn delay={i * 0.05}>
                <ServiceCard
                  href={s.href}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  badge={"badge" in s ? s.badge : undefined}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="relative isolate border-t border-border/60 bg-card bg-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 15% 50%, hsl(var(--accent) / 0.22), transparent 55%)",
          }}
        />
        <div className="container relative z-10 section-padding">
          <FadeIn>
            <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
              Local proof
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
              Holbeck-fitted. Two-hundred reviews. Five stars.
            </h2>
          </FadeIn>
          <div className="mt-10">
            <StatsCounter
              stats={[
                { value: 200, suffix: "+", label: "5-star Google reviews" },
                { value: 5, suffix: "★", label: "Average rating" },
                { value: 5, suffix: "+", label: "Years tinting Leeds drivers" },
                { value: 2, suffix: " yr", label: "Fitting warranty, no fade" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
                Recent work
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
                Tints we've fitted recently.
              </h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/gallery" className="gap-1">
                See full gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {teaser.map((item) => (
            <li key={item.src}>
              <figure className="group relative overflow-hidden rounded-sm border border-border bg-card hover-glow">
                <div className="relative aspect-[4/3]">
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <section className="relative border-t border-border/60 bg-grain">
        <div className="container section-padding">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
                  Reviews
                </p>
                <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
                  Two hundred Leeds drivers, in their own words.
                </h2>
              </div>
              <a
                href={googleReviewsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
              >
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
                See all {reviewStats.count}+ on Google
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </FadeIn>
          <div className="mt-10 max-w-3xl">
            <ReviewCarousel reviews={reviews} />
          </div>
          {isPlaceholder && (
            <p className="mt-4 text-xs text-muted-foreground">
              Showing a selection of recent feedback. For the live feed see our
              Google Business Profile.
            </p>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
            How it works
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            From WhatsApp to fitted, in four steps.
          </h2>
        </FadeIn>
        <div className="mt-10">
          <ProcessTimeline />
        </div>
      </section>

      {/* FAQ */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[hsl(var(--silver))]">
            FAQ
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            The questions we get asked most.
          </h2>
        </FadeIn>
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <SectionCta pageKey="landing" />
    </>
  );
}
