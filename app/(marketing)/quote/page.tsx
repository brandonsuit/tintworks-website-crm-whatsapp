import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Instant Quote — Car Window Tinting Leeds | Tintworks",
  description:
    "Build a car window tinting quote in under two minutes. Pick vehicle, windows, shade. We'll reply on WhatsApp with pricing and a fitting slot.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Instant Quote — Tintworks Holbeck, Leeds",
    images: [ogImage("Instant Quote — Tintworks Holbeck, Leeds")],
  },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Instant quote"
        title="Build your quote in under two minutes."
        lead="Pick the vehicle, the windows, and the shade. We'll pre-fill WhatsApp with your details — tap send, we'll reply the same day with pricing and a fitting slot."
        crumbs={[{ href: "/quote", label: "Quote" }]}
      />

      <section className="container grid grid-cols-1 gap-8 pb-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <QuoteWizard />
        </div>
        <aside className="space-y-4 md:col-span-1">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-lg uppercase tracking-tight">
              Prefer to skip the wizard?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send a WhatsApp message instead. Make, model, and which windows
              you want done is enough to start a quote — photos help.
            </p>
            <div className="mt-4">
              <WhatsAppCta pageKey="quote" appearance="filled" size="default" />
            </div>
          </div>
          <div className="rounded-sm border border-accent/30 bg-accent/5 p-6">
            <h2 className="font-display text-lg uppercase tracking-tight text-accent">
              How it works
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">1.</strong> Pick your
                vehicle, windows, shade, and any extras.
              </li>
              <li>
                <strong className="text-foreground">2.</strong> Add your
                contact details on the last step.
              </li>
              <li>
                <strong className="text-foreground">3.</strong> Tap{" "}
                <em>Send Quote via WhatsApp</em> — we&apos;ll reply the same
                day.
              </li>
            </ol>
          </div>
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-lg uppercase tracking-tight">
              Progress is saved
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Close the tab and come back — we remember where you got to.
              Cleared automatically once the quote is sent.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
