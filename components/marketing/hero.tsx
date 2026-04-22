import Link from "next/link";
import { Star, MapPin, ShieldCheck, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Landing-page hero. Full-viewport, cinematic — massive uppercase headline,
 * three CTAs (Quote / WhatsApp / Call), three trust indicators.
 *
 * Background: placeholder for an eventual /public/hero.jpg or .mp4. Until
 * that asset exists we render a layered gradient + subtle grain so the
 * section still has depth and identity.
 */

export function Hero({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-grain">
      {/* Background layer — replace with <video> or <Image> when real asset lands */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.22),transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl accent-glow"
      />
      {/* Subtle grid — industrial feel, low opacity so it doesn't fight the headline */}
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

      <div className="container relative z-10 py-20 md:py-28">
        <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.35em] text-accent">
          <MapPin className="h-4 w-4" aria-hidden />
          Leeds · Holbeck LS11
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[7.5rem]">
          Leeds&rsquo; Premier{" "}
          <span className="text-accent">Window Tinting</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Ceramic and carbon car tints fitted in-studio at our Holbeck
          workshop. Heat rejection, UV protection, and a factory-tidy
          finish — backed by a lifetime fitting warranty.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
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
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
            <span>
              <strong className="text-foreground">200+</strong> 5-star Google
              reviews
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" aria-hidden />
            <span>
              Studio-fitted in <strong className="text-foreground">Leeds</strong>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
            <span>
              <strong className="text-foreground">Lifetime</strong> fitting
              warranty
            </span>
          </li>
        </ul>
      </div>

      {/* Bottom slant — angular divider into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-background"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 60%)" }}
      />
    </section>
  );
}
