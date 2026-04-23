import Link from "next/link";
import { Star, MapPin, ShieldCheck, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { HeroCar } from "@/components/marketing/hero-car";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Landing-page hero. The first thing visitors see is the vehicle itself —
 * a side-profile GT coupe with electric-blue tinted windows — paired with
 * the headline and CTAs. A continuously-scrolling marquee of car makes
 * below the hero reinforces the automotive context before the viewer
 * scrolls.
 */

export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-grain">
        {/* Background atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.22),transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-5xl accent-glow"
        />
        {/* Faint grid */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="container relative z-10 grid items-center gap-10 pt-16 pb-8 md:min-h-[86vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8 md:pt-24 md:pb-12">
          {/* Copy column */}
          <div className="relative z-10">
            <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.35em] text-accent">
              <MapPin className="h-4 w-4" aria-hidden />
              Leeds · Holbeck LS11
            </p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              Leeds&rsquo; Premier{" "}
              <span className="text-accent">Window Tinting</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Ceramic, carbon and chameleon films fitted in-studio at our
              Holbeck workshop. Heat rejection, UV protection, and a
              factory-tidy finish — backed by a 2-year fitting warranty.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="xl" className="shadow-glow">
                <Link href="/quote">Get Instant Quote</Link>
              </Button>
              <WhatsAppCta pageKey={pageKey} appearance="filled" size="xl" />
              <Button asChild variant="outline" size="xl" className="gap-2">
                <a
                  href={telHref(business.phoneE164)}
                  aria-label={`Call ${business.phoneDisplay}`}
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden />
                  {business.phoneDisplay}
                </a>
              </Button>
            </div>

            <ul
              role="list"
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
                <span>
                  <strong className="text-foreground">200+</strong> 5-star
                  Google reviews
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden />
                <span>
                  Studio-fitted in{" "}
                  <strong className="text-foreground">Leeds</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
                <span>
                  <strong className="text-foreground">2-year</strong> fitting
                  warranty
                </span>
              </li>
            </ul>
          </div>

          {/* Car column */}
          <div className="relative z-0">
            {/* Big blue halo behind the car */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 55% 45%, hsl(var(--accent) / 0.28), transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            {/* Horizon line — thin accent sweep behind the car */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            />
            <HeroCar className="relative mx-auto max-w-[760px]" />

            {/* Corner meta — adds dashboard/spec-sheet feel */}
            <p className="mt-4 text-center font-display text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Ceramic · Carbon · Chameleon · Limo Black
            </p>
          </div>
        </div>
      </section>

      {/* Brand marquee — automotive context continues below the fold */}
      <BrandMarquee />
    </>
  );
}
