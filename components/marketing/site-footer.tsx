import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { primaryNav } from "@/components/marketing/nav-links";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Site-wide footer. Mirrors the AutomotiveBusiness JSON-LD — same address
 * and phone everywhere so Google sees consistent NAP data across structured
 * data and visible content.
 */

export function SiteFooter({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="Tintworks — home"
              className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Image
                src="/logo.svg"
                alt="Tintworks"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Professional car window tinting in Leeds. In-studio only —
              bring your vehicle to us in Holbeck.
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="text-foreground">
                    {business.address}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      href={telHref(business.phoneE164)}
                      className="text-foreground underline-offset-4 hover:underline"
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
                      className="text-foreground underline-offset-4 hover:underline"
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
                  <dd className="text-foreground">
                    {business.openingHours.display}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6">
              <WhatsAppCta pageKey={pageKey} appearance="filled" size="default" />
            </div>
          </div>

          {/* Nav column */}
          <div className="md:col-span-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Site
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/90 underline-offset-4 hover:text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-foreground/90 underline-offset-4 hover:text-accent hover:underline"
                >
                  Get a quote
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Serving Leeds and surrounding West Yorkshire — all work
              completed in-studio at our Holbeck workshop.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} {business.name}. All rights reserved.</p>
          <ul className="flex gap-4">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
