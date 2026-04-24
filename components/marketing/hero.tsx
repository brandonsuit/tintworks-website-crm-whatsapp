import Link from "next/link";
import { Star, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { HeroCarStatic } from "@/components/marketing/hero-car-static";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Landing-page hero.
 *
 * Full-width, tall (min 60vh mobile / 80vh desktop). A static 3D
 * rendering of a Limo-tinted car occupies the right 60% of the
 * section on desktop (full-bleed on mobile). Text + CTAs sit in the
 * left column as real DOM, centred vertically.
 *
 * Left-column design element (the diagonal sweep below) isn't a
 * legibility scrim — the copy column is already over empty dark
 * background on desktop. It's a deliberate graphic layer: a tilted
 * dark → transparent gradient from top-left plus a warm-gold glow
 * pooled bottom-left, echoing the accent palette and giving the
 * composition directional energy that matches an automotive hero.
 *
 * BrandMarquee sits directly below as part of the redesign.
 */

export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-grain">
        {/* Background atmosphere — sits behind the 3D layer during
            the brief dynamic-import loading window. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.18),transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        />

        {/* Static 3D hero car — Limo tint, no interactivity. On
            desktop (lg+) the Canvas is sized to the right 60% of the
            section, so the left stays clear for the copy. */}
        <div className="absolute inset-0 -z-10">
          <HeroCarStatic />
        </div>

        {/* Diagonal sweep overlay (desktop only) — sits between the
            Canvas and the text (`z-0` vs Canvas at `-z-10` and text
            at `z-10`). Top-left darkens and fades diagonally down to
            transparent across the car, echoing motion. Non-interactive
            so nothing below it loses click/drag affordance. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(115deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 28%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 72%)",
          }}
        />

        {/* Warm accent glow pooled bottom-left (desktop only) — ties
            the dark sweep back to the gold palette so the left side
            reads as designed, not empty. Subtle; purely decorative. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle at 10% 100%, hsl(var(--accent) / 0.22) 0%, transparent 45%)",
          }}
        />

        {/* Thin accent hairline on the very left edge — hints at a
            vertical gutter without forcing a hard split. Desktop only;
            looks fiddly on mobile. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block"
        />

        {/* Foreground copy — real DOM, keyboard-focusable, SR-readable.
            `pointer-events-none` on the wrapper, re-enabled per-element
            below so only the CTAs + links are interactive — everything
            else passes drag events through to the 3D canvas. */}
        <div className="pointer-events-none relative z-10 flex min-h-[60vh] items-center md:min-h-[80vh]">
          <div className="container pt-16 pb-10 md:pt-24 md:pb-14">
            <div className="max-w-2xl">
              <p className="pointer-events-auto flex items-center gap-2 font-display text-sm uppercase tracking-[0.35em] text-accent">
                <MapPin className="h-4 w-4" aria-hidden />
                Leeds · Holbeck LS11
              </p>

              <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Leeds&rsquo; Premier{" "}
                <span className="text-accent">Window Tinting</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-foreground/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-xl">
                Ceramic, carbon and chameleon films fitted in-studio at our
                Holbeck workshop. Heat rejection, UV protection, and a
                factory-tidy finish.
              </p>

              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
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
                className="pointer-events-auto mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]"
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand marquee — automotive context continues below the fold. */}
      <BrandMarquee />
    </>
  );
}
