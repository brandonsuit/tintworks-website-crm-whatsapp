import Link from "next/link";
import { Star, ShieldCheck, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { HeroCarStatic } from "@/components/marketing/hero-car-static";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { googleReviewsProfileUrl } from "@/lib/reviews";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-grain">
        {/* Background atmosphere — tightened ellipse + reduced opacity so the
            amber halo no longer bleeds into the text column. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_70%_55%_at_75%_30%,hsl(var(--accent)/0.12),transparent_60%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        />

        {/* Accent glow pool */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-5xl accent-glow"
        />

        {/* Faint grid texture */}
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

        {/* Car — absolute background on desktop, hidden on mobile
            (rendered below text instead on small screens) */}
        <div className="hidden md:absolute md:inset-0 md:-z-10 md:block">
          <HeroCarStatic />
        </div>

        {/* Foreground copy */}
        <div className="pointer-events-none relative z-10 flex items-center md:min-h-[80vh]">
          <div className="container pt-16 pb-8 md:pt-24 md:pb-14">
            <div className="max-w-2xl">
              <p className="pointer-events-auto flex items-center gap-2 font-display text-sm uppercase tracking-[0.35em] text-accent">
                <MapPin className="h-4 w-4" aria-hidden />
                Leeds · Holbeck LS11
              </p>

              {/* H1 — pick one. Option A is the default; Option B kept in this
                  comment for swap-out without re-deploying.

                  Option A: Window tints, fitted in [Holbeck].
                  Option B: Studio-fitted [window tints] in Leeds. */}
              <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Window tints, fitted in{" "}
                <span className="text-accent">Holbeck</span>.
              </h1>

              {/* Trust badges — sit between H1 and sub-headline so social
                  proof lands before the buyer scrolls. */}
              <ul
                role="list"
                className="pointer-events-auto mt-6 flex flex-wrap items-center gap-2"
              >
                <li>
                  <a
                    href={googleReviewsProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/15"
                  >
                    <span className="flex" aria-hidden>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-accent text-accent"
                        />
                      ))}
                    </span>
                    <span>
                      <strong>200+</strong> five-star Google reviews
                    </span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--silver)/0.4)] bg-[hsl(var(--silver)/0.08)] px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-[hsl(var(--silver))]"
                    aria-hidden
                  />
                  <span>Two-year fitting warranty</span>
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--silver)/0.4)] bg-[hsl(var(--silver)/0.08)] px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  <MapPin
                    className="h-3.5 w-3.5 text-[hsl(var(--silver))]"
                    aria-hidden
                  />
                  <span>Studio-fitted, Leeds LS11</span>
                </li>
              </ul>

              <p className="mt-6 max-w-xl text-lg text-foreground/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-xl">
                Ceramic, carbon and chameleon films, cut and bedded in by
                hand at our Holbeck workshop.
              </p>

              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <Button asChild variant="accent" size="xl" className="shadow-glow">
                  <Link href="/quote">Get a quote</Link>
                </Button>
                <WhatsAppCta pageKey={pageKey} appearance="outline" size="xl" />
              </div>

              <p className="pointer-events-auto mt-3 text-xs text-[hsl(var(--silver))] drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                Reply on WhatsApp within the hour, Monday to Saturday.
              </p>
            </div>
          </div>
        </div>

      </section>

      <BrandMarquee />
    </>
  );
}
