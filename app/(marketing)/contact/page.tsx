import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { GoogleMap } from "@/components/marketing/google-map";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import { ogImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact — Tintworks Car Window Tinting Leeds",
  description:
    "Visit Tintworks at Brown Place, Holbeck, Leeds LS11. In-studio car window tinting only — bring your vehicle to us. Appointment only — message us on WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Tintworks — Holbeck, Leeds",
    images: [ogImage("Contact Tintworks — Holbeck, Leeds")],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Visit the Holbeck studio, or get in touch."
        lead="Fastest route is WhatsApp — we'll usually reply within the hour during opening times."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="container pb-8">
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
          <h2 className="font-display text-lg font-semibold text-accent">
            In-studio only — bring your vehicle to us in Holbeck, Leeds
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            All car window tinting is completed at our workshop on Brown
            Place, Holbeck (LS11). We don&apos;t operate a mobile service.
            By appointment only — message us on WhatsApp to arrange a booking.
          </p>
        </div>
      </section>

      <section className="container grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="font-display text-xl font-semibold">Studio address</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd>{business.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      href={telHref(business.phoneE164)}
                      className="underline-offset-4 hover:underline"
                    >
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${business.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Opening hours</dt>
                  {/* {# TODO: confirm hours #} — synced with lib/business.ts + JSON-LD */}
                  <dd>{business.openingHours.display}</dd>
                </div>
              </div>
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-semibold">
              Best way to reach us
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              WhatsApp is fastest — a short message with your vehicle or
              property details gets us replying quickest. For formal quotes
              or longer briefs, use email.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <WhatsAppCta pageKey="contact" appearance="filled" size="default" />
              <Button asChild variant="outline" size="default">
                <Link href={`mailto:${business.email}`}>Email us</Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link href={telHref(business.phoneE164)}>
                  Call {business.phoneDisplay}
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <GoogleMap />
        </div>
      </section>
    </>
  );
}
