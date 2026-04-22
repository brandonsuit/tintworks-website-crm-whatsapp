import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/marketing/page-header";
import { business } from "@/lib/business";
import { formatDate } from "@/lib/dates";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tintworks handles your personal data when you request a quote. UK GDPR / PECR compliant.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Tintworks",
    images: [ogImage("Privacy Policy — Tintworks")],
  },
  robots: { index: true, follow: true },
};

/**
 * {# TODO: review with owner before launch — stub content.
 *    Verify the data controller details, retention period, and any
 *    specific processing (e.g. Resend → owner mailbox) are accurate
 *    for how Tintworks is actually operating. #}
 */

const LAST_UPDATED = new Date("2026-04-22");

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`Last updated: ${formatDate(LAST_UPDATED)}. This describes how we handle the personal information you share with us.`}
        crumbs={[{ href: "/privacy", label: "Privacy" }]}
      />

      <article className="container max-w-3xl pb-16 text-sm leading-relaxed text-foreground/90 space-y-8">
        <section className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4 text-xs text-amber-200">
          {/* {# TODO: review with owner before launch #} */}
          This page is a stub. The owner must review and confirm the
          details below before the site is publicly launched.
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Who we are
          </h2>
          <p className="mt-2">
            {business.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the
            data controller for personal information collected via this
            website. Our registered trading address is:
          </p>
          <p className="mt-2">
            {business.address}
            <br />
            Email:{" "}
            <a
              href={`mailto:${business.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {business.email}
            </a>
            <br />
            Phone: {business.phoneDisplay}
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            What we collect
          </h2>
          <p className="mt-2">
            When you submit the quote form, we collect:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Your name</li>
            <li>Phone number</li>
            <li>Email address (optional)</li>
            <li>Vehicle make, model, and year</li>
            <li>Tinting preferences (windows and darkness)</li>
            <li>Any free-text message you provide</li>
            <li>A record of the submission timestamp and IP address</li>
          </ul>
          <p className="mt-3">
            If you contact us via WhatsApp, Meta Platforms Ireland Limited
            processes the message content and your WhatsApp number.
            Refer to WhatsApp&apos;s own privacy notice for details on
            their processing.
          </p>
          <p className="mt-3">
            We use <strong>Plausible Analytics</strong> for site metrics.
            Plausible is cookie-free and does not collect or process
            personal data — no user-level tracking, no fingerprinting.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Why we hold it
          </h2>
          <p className="mt-2">
            We use your details solely to respond to your enquiry, prepare
            a quote, and arrange a fitting slot. We do not sell your data,
            we do not share it with advertisers, and we do not use it for
            marketing without your explicit, separate consent.
          </p>
          <p className="mt-2">
            Our lawful basis is your <strong>consent</strong> (UK GDPR
            Art. 6(1)(a)), confirmed by ticking the consent checkbox on
            the quote form.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Who else processes it
          </h2>
          <p className="mt-2">
            Your lead details are emailed to the studio owner via{" "}
            <strong>Resend</strong> (our email provider), and the site is
            hosted on <strong>Railway</strong>. Both companies process
            data on our behalf under standard data-processing agreements
            and appropriate international-transfer safeguards.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            How long we keep it
          </h2>
          <p className="mt-2">
            {/* {# TODO: confirm retention period with owner — default below. #} */}
            We currently retain quote-form submissions indefinitely so
            that we can reference prior jobs if a customer returns. You
            can ask us to delete your record at any time using the
            details below and we will do so within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Your rights
          </h2>
          <p className="mt-2">
            Under UK GDPR you have the right to access, correct, delete,
            restrict the processing of, or object to our use of your
            personal data, and to ask for your data in a portable format.
            To exercise any of these rights, email us at{" "}
            <a
              href={`mailto:${business.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {business.email}
            </a>
            .
          </p>
          <p className="mt-2">
            If you believe we&apos;ve handled your data improperly, you
            can complain to the{" "}
            <a
              href="https://ico.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              Information Commissioner&apos;s Office (ICO)
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Changes to this policy
          </h2>
          <p className="mt-2">
            We&apos;ll update the date at the top of this page if we make
            material changes. Please{" "}
            <Link
              href="/contact"
              className="text-accent underline-offset-4 hover:underline"
            >
              contact us
            </Link>{" "}
            if anything is unclear.
          </p>
        </section>
      </article>
    </>
  );
}
