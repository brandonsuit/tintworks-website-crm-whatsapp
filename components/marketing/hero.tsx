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
 * Background layers (restored verbatim from Jay's original redesign
 * — e86e705 / 717b37b — after they were accidentally dropped during
 * the 3D hero restructure):
 *   1. Radial accent glow at top + linear dark fade (atmosphere)
 *   2. `accent-glow` pool div, centred, behind the headline
 *   3. Faint 60×60px grid with radial mask (industrial texture)
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
        {/* Background atmosphere — restored from Jay's e86e705.
            (Note: the alpha on the radial is 0.22 in the original,
            not the 0.18 we'd drifted to.) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.22),transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        />
        {/* Accent glow pool (centred, behind the headline). Uses the
            `accent-glow` CSS utility from globals.css. Verbatim
            restoration from e86e705 / 717b37b. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-5xl accent-glow"
        />
        {/* Faint grid — industrial feel, low opacity so it doesn't
            fight the headline. Grid pattern verbatim from Jay's
            e86e705; the mask is widened/offset-left so the grid
            covers the full section width with a soft fade that
            extends into the car zone, rather than the sharp cutoff
            a centered mask would produce at the Canvas boundary.
            Both `mask-image` and `-webkit-mask-image` for Safari. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 90% 100% at 25% 50%, black 25%, rgba(0,0,0,0.4) 60%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 100% at 25% 50%, black 25%, rgba(0,0,0,0.4) 60%, transparent 88%)",
          }}
        />

        {/* Static 3D hero car — Limo tint, no interactivity. On
            desktop (lg+) the Canvas is sized to the right 60% of the
            section, so the left stays clear for the copy. */}
        <div className="absolute inset-0 -z-10">
          <HeroCarStatic />
        </div>

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
