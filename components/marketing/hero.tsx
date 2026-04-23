import Link from "next/link";
import { Star, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Hero3DBackground } from "@/components/marketing/hero-3d";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Landing-page hero.
 *
 * Full-width, tall (min 60vh mobile / 80vh desktop). A rotating 3D
 * rendering of a vehicle being tinted fills the entire section as the
 * background; the wordmark / h1 / lead / CTAs / trust badges overlay it
 * as real DOM, centred.
 *
 * The 3D scene is gated client-side — weak mobiles + reduced-motion
 * users get a static poster instead, with no three.js bundle fetched.
 * See `components/marketing/hero-3d/index.tsx`.
 *
 * A radial dark scrim sits between the 3D layer and the text so light
 * reflections on the car never hurt copy legibility — regardless of
 * current camera angle.
 *
 * BrandMarquee stays directly below the hero as part of the redesign.
 */

export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-grain">
        {/* Background atmosphere — sits behind the 3D layer in case the
            scene hasn't mounted yet or the perf gate falls back to poster. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.18),transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        />

        {/* 3D layer. Absolutely positioned; pointer events land on the
            canvas so users can drag-rotate the car. */}
        <div className="absolute inset-0 -z-10">
          <Hero3DBackground />
        </div>

        {/* Contrast scrim over the 3D layer, so the text stays readable
            against any camera angle the user drags to. Non-interactive
            — doesn't block drag-to-rotate. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, transparent 75%)",
          }}
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
