import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { GoogleMap } from "@/components/marketing/google-map";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { FadeIn } from "@/components/marketing/stats-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import { ogImage } from "@/lib/og";
import { socials, type SocialPlatform } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contact — Tint Works Car Window Tinting Leeds",
  description:
    "Visit Tint Works at Brown Place, Holbeck, Leeds LS11. In-studio car window tinting only. Appointment only — message us on WhatsApp to book in.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Tint Works — Holbeck, Leeds",
    images: [ogImage("Contact Tint Works — Holbeck, Leeds")],
  },
};

const socialIconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  google: () => null,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Visit the Holbeck studio, or get in touch."
        lead="WhatsApp is the fastest route. We aim to reply within the hour, Monday to Saturday."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="container pb-8">
        <div className="rounded-sm border border-accent/30 bg-accent/5 p-6 md:p-8">
          <h2 className="font-display text-xl uppercase tracking-tight text-accent">
            In-studio only. Bring the car to Holbeck.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            All work is completed at our workshop on Brown Place, Holbeck
            (LS11). No mobile or travelling service. Appointment-only —
            drop us a WhatsApp message to arrange a slot.
          </p>
        </div>
      </section>

      <section className="container grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <div className="space-y-4">
          <FadeIn>
            <Card className="p-6 hover-glow">
              <h2 className="font-display text-2xl uppercase tracking-tight">
                Studio address
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd>{business.address}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Phone</dt>
                    <dd>
                      <a
                        href={telHref(business.phoneE164)}
                        className="underline-offset-4 hover:text-accent hover:underline"
                      >
                        {business.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${business.email}`}
                        className="underline-offset-4 hover:text-accent hover:underline"
                      >
                        {business.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Opening hours</dt>
                    <dd>{business.openingHours.display}</dd>
                  </div>
                </div>
              </dl>
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card className="p-6 hover-glow">
              <h2 className="font-display text-2xl uppercase tracking-tight">
                Quickest way to reach us
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                WhatsApp first. A short message with the make, model and which
                windows you want done is enough to start a quote — photos
                speed it up. Use email if you need it in writing.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppCta
                  pageKey="contact"
                  appearance="filled"
                  size="default"
                />
                <Button asChild variant="outline" size="default">
                  <Link href={`mailto:${business.email}`}>Email us</Link>
                </Button>
                <Button asChild variant="outline" size="default" className="gap-2">
                  <a href={telHref(business.phoneE164)}>
                    <Phone className="h-4 w-4 text-accent" aria-hidden />
                    {business.phoneDisplay}
                  </a>
                </Button>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="p-6 hover-glow">
              <h2 className="font-display text-2xl uppercase tracking-tight">
                What to expect when you arrive
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Where:</strong> Brown
                  Place, Holbeck (LS11). Park kerbside on the road outside the
                  bay — we'll bring the car in for fitting.
                </li>
                <li>
                  <strong className="text-foreground">How long:</strong> Rear
                  set: two to three hours. Full car: three to four. Sun strip:
                  forty-five minutes.
                </li>
                <li>
                  <strong className="text-foreground">Wait or come back:</strong>{" "}
                  Whichever suits — we're easy. Just let us know on the day so
                  we don't lock up while you're around the corner.
                </li>
                <li>
                  <strong className="text-foreground">After:</strong> Don't
                  wash the windows for three to five days while the film
                  cures. Some cloudiness is normal — it clears on its own.
                </li>
              </ul>
            </Card>
          </FadeIn>

          {socials.length > 0 && (
            <FadeIn delay={0.14}>
              <Card className="p-6 hover-glow">
                <h2 className="font-display text-2xl uppercase tracking-tight">
                  Follow the work
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fresh installs go up on Instagram weekly. Facebook for the
                  longer write-ups and customer feedback.
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-3"
                  aria-label="Social media"
                >
                  {socials.map((s) => {
                    const Icon = socialIconMap[s.platform];
                    return (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                        >
                          {Icon && <Icon className="h-4 w-4" aria-hidden />}
                          <span>{s.handle ?? s.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </FadeIn>
          )}
        </div>

        <FadeIn delay={0.08}>
          <GoogleMap />
        </FadeIn>
      </section>
    </>
  );
}
