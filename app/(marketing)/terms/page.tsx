import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/marketing/page-header";
import { business } from "@/lib/business";
import { formatDate } from "@/lib/dates";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Tintworks website. Not a binding service contract — those are confirmed per job via WhatsApp.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use — Tintworks",
    images: [ogImage("Terms of Use — Tintworks")],
  },
  robots: { index: true, follow: true },
};

/**
 * {# TODO: review with owner before launch — stub content.
 *    Check warranty wording against what's actually offered on fitted
 *    work, and confirm the "all tinting at the Holbeck workshop"
 *    statement remains accurate. #}
 */

const LAST_UPDATED = new Date("2026-04-22");

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lead={`Last updated: ${formatDate(LAST_UPDATED)}. These terms cover use of this website. Service terms for tinting work are confirmed per job.`}
        crumbs={[{ href: "/terms", label: "Terms" }]}
      />

      <article className="container max-w-3xl pb-16 text-sm leading-relaxed text-foreground/90 space-y-8">
        <section className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4 text-xs text-amber-200">
          {/* {# TODO: review with owner before launch #} */}
          This page is a stub. The owner must review and confirm the
          details below before the site is publicly launched.
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            About these terms
          </h2>
          <p className="mt-2">
            These terms govern your use of the {business.name} website.
            By using the site you agree to them. If you don&apos;t agree,
            please stop using the site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            What this website does
          </h2>
          <p className="mt-2">
            The site provides information about {business.name}&apos;s
            car window tinting services and lets you request a quote via
            WhatsApp or a form. The quote form is a request for
            information — it does not create a contract or a booking.
            Quotes, fitting slots, prices, and any work are agreed
            separately, in writing (WhatsApp is fine), before any work
            begins.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Where work is carried out
          </h2>
          <p className="mt-2">
            All tinting is completed at our workshop: {business.address}.
            We do not operate a mobile service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Accuracy of information
          </h2>
          <p className="mt-2">
            Gallery images, film descriptions, and guide pricing on this
            site are provided in good faith and may change. For a firm
            quote, contact us. Film performance claims (heat and UV
            rejection) are taken from manufacturer specifications; actual
            performance on a given vehicle varies with glass type,
            orientation, and conditions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Warranty on fitted work
          </h2>
          <p className="mt-2">
            {/* {# TODO: confirm warranty terms — placeholder below. #} */}
            Where we fit window film for you, we warrant the fitting
            workmanship for the lifetime of the film under normal use.
            This warranty does not cover damage caused by accidents,
            modifications, cleaning with abrasive products, or third-party
            work on the tinted glass. Film-manufacturer warranties apply
            separately and are documented at the time of fitting.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Intellectual property
          </h2>
          <p className="mt-2">
            The content, branding, and imagery on this site are owned by{" "}
            {business.name} or licensed to us. Please don&apos;t copy or
            reuse them without permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Liability
          </h2>
          <p className="mt-2">
            We take reasonable care to keep the site accurate and
            available, but we don&apos;t guarantee it. To the extent
            permitted by law, we exclude liability for indirect or
            consequential loss arising from use of the site. Nothing in
            these terms limits our liability for death, personal injury,
            or fraud.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Governing law
          </h2>
          <p className="mt-2">
            These terms are governed by the laws of England and Wales,
            and the courts of England and Wales have exclusive
            jurisdiction over any dispute arising from them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions? Reach us via the{" "}
            <Link
              href="/contact"
              className="text-accent underline-offset-4 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
