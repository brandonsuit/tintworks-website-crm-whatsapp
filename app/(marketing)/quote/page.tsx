import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { QuoteForm } from "@/components/forms/quote-form";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Get a Quote — Car Window Tinting Leeds",
  description:
    "Request a quote from Tintworks — tell us about your vehicle and preferred tint, and we'll reply on WhatsApp. Studio-fitted in Holbeck, Leeds.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Get a Quote — Tintworks",
    images: [ogImage("Get a Quote — Tintworks")],
  },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Get a quote"
        title="Tell us about your vehicle."
        lead="We'll come back with a quote and a fitting slot. WhatsApp is our primary channel — we'll pre-fill your details for you."
        crumbs={[{ href: "/quote", label: "Quote" }]}
      />

      <section className="container grid grid-cols-1 gap-8 pb-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <QuoteForm />
        </div>
        <aside className="space-y-4 md:col-span-1">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">
              Prefer to skip the form?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Drop us a WhatsApp message directly — send the make, model,
              and which windows you want done. We&apos;ll reply with pricing
              and a fitting slot.
            </p>
            <div className="mt-4">
              <WhatsAppCta pageKey="quote" appearance="filled" size="default" />
            </div>
          </div>
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
            <h2 className="font-display text-lg font-semibold text-accent">
              How it works
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">1.</strong> Fill in the
                form — takes about a minute.
              </li>
              <li>
                <strong className="text-foreground">2.</strong> Tap{" "}
                <em>Continue on WhatsApp</em> — your details will be
                pre-filled into the message.
              </li>
              <li>
                <strong className="text-foreground">3.</strong> We reply on
                WhatsApp with a quote and fitting slot.
              </li>
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
