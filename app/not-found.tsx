import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import { buildWaMeLink } from "@/lib/whatsapp/link";
import { getWhatsAppMessage } from "@/lib/whatsapp/messages";

/**
 * Site-wide 404. Renders the marketing header + footer shell so strangers
 * hitting wrong URLs see a branded page with live CTAs, not a bare Next
 * default. Root-level (not inside `(marketing)`) so it catches misses
 * across every route segment.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const whatsAppHref = buildWaMeLink({
    phoneE164: business.phoneE164,
    message: getWhatsAppMessage("landing"),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        phoneDisplay={business.phoneDisplay}
        phoneTelHref={telHref(business.phoneE164)}
        whatsAppHref={whatsAppHref}
      />
      <main className="flex-1">
        <section className="container py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-accent">404</p>
          <h1 className="mt-3 font-display text-5xl uppercase tracking-tight text-balance md:text-6xl">
            That page took the long way home.
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            The link's either out of date or we've moved things around. Head
            back to the home page, or jump straight to a quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/">Back to the home page</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/quote">Get a quote</Link>
            </Button>
            <WhatsAppCta pageKey="landing" appearance="outline" size="lg" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
