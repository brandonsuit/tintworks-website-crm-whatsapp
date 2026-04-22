"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Button } from "@/components/ui/button";

/**
 * Site-wide 500. Must be a client component so React can attach the
 * `reset` boundary. Renders the marketing shell so users aren't dropped
 * into a bare error page. The WhatsApp CTA is the key escape hatch —
 * if the site is in trouble, give them a working path to reach us.
 *
 * Intentionally avoids showing the error message to the user (privacy,
 * surface area) — logged to the browser console for debugging.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Console only for v1. When Sentry lands in v2, swap this for
    // Sentry.captureException(error).
    console.error("[tintworks] runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-accent">
            500
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-balance md:text-5xl">
            Something came off the rails.
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Our apologies — the page hit an unexpected error. Try again,
            or jump straight onto WhatsApp and we&apos;ll sort it out.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reference: <code className="rounded bg-muted px-1.5 py-0.5">{error.digest}</code>
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="accent" size="lg" onClick={reset}>
              Try again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to the home page</Link>
            </Button>
            <WhatsAppCta pageKey="landing" appearance="outline" size="lg" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
