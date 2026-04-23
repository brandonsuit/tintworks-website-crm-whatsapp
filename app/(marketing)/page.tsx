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

export const metadata: Metadata = {
  title: "Car Window Tinting Leeds — Ceramic, Carbon & Limo Tints",
  description:
    "Tint Works — professional car window tinting in Leeds. Ceramic and carbon films fitted in-studio at our Holbeck workshop. 200+ 5-star reviews, 2-year fitting warranty.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Car Window Tinting Leeds — Tint Works",
    images: [ogImage("Car Window Tinting Leeds — Tint Works")],
  },
};

const services = [
  {
    href: "/services#full-car",
    icon: Sparkles,
    title: "Full car tint",
    description:
      "Every legal window wrapped. Ceramic or carbon film, dialled in to your shade of choice.",
    badge: "Most popular",
  },
  {
    href: "/services#rear-only",
    icon: Eye,
    title: "Rear set",
    description:
      "Rear sides + rear windscreen. Maximum privacy, heat rejection, and a factory-tidy finish.",
  },
  {
    href: "/services#front-only",
    icon: ShieldCheck,
    title: "Front windows",
    description:
      "UK law-compliant front pair (min 70% VLT). Cuts glare on motorway drives.",
  },
  {
    href: "/services#sun-strip",
    icon: Sun,
    title: "Windscreen sun strip",
    description:
      "Narrow gradient strip across the top of the windscreen — kills low-sun glare fast.",
  },
  {
    href: "/services#commercial",
    icon: Truck,
    title: "Commercial / van",
    description:
      "Transit, Sprinter, VW Transporter and more. Secure your tools, stay comfortable.",
  },
  {
    href: "/services#chameleon",
    icon: Palette,
    title: "Chameleon finish",
    description:
      "Colour-shifting film that flips between blue, purple and gold. Show-car look with full UV and heat rejection.",
    badge: "Statement",
  },
] as const;

const faqs: FaqItem[] = [
  {
    q: "Is window tinting legal in the UK?",
    a: (
      <>
        <p>
          Yes — within the rules. UK law (Construction & Use Regulations) says:
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            Front windscreen must let through at least{" "}
            <strong className="text-foreground">75%</strong> of light (VLT).
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
          We&apos;ll never fit a front tint that&apos;s below the legal limit.
        </p>
      </>
    ),
  },
  {
    q: "How long does it take?",
    a: "Most tints are completed the same day. A full rear set typically takes 2–3 hours; a full car around 3–4 hours. We'll give you an exact slot when you book.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on your vehicle and which windows you're doing. Use the instant quote tool for a same-day estimate, or message us on WhatsApp.",
  },
  {
    q: "How long does it last?",
    a: "Our ceramic and carbon films are colour-stable — no purple fade. Fitting is covered by a 2-year warranty against peeling, bubbling or delamination.",
  },
  {
    q: "Can I wash my car after?",
    a: "Give it 3–5 days before washing the windows so the film can fully cure. You'll still see a little cloudiness during curing — that's normal and will vanish.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — 2-year fitting warranty on all work. If you ever have an issue, bring the car back.",
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
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            What we fit
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
              Built for every kind of vehicle.
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
            <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
              By the numbers
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
              Leeds-local. Trusted by hundreds.
            </h2>
          </FadeIn>
          <div className="mt-10">
            <StatsCounter
              stats={[
                { value: 200, suffix: "+", label: "5-star Google reviews" },
                { value: 5, suffix: "★", label: "Average rating" },
                { value: 5, suffix: "+", label: "Years in the game" },
                { value: 2, suffix: " yr", label: "Fitting warranty" },
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
              <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
                Recent work
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
                A taste of the portfolio.
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
                <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
                  Reviews
                </p>
                <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
                  What our customers say.
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
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            How it works
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Four steps from enquiry to new glass.
          </h2>
        </FadeIn>
        <div className="mt-10">
          <ProcessTimeline />
        </div>
      </section>

      {/* FAQ */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            FAQ
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
            Answers before you book.
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
