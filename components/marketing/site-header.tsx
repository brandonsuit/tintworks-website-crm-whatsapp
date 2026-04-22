import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/marketing/whatsapp-cta";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { primaryNav } from "@/components/marketing/nav-links";
import type { WhatsAppPageKey } from "@/lib/whatsapp/messages";

/**
 * Sticky top-of-page header. Server component; the mobile sheet is a small
 * client island passed in.
 *
 * `pageKey` lets the WhatsApp CTA pre-fill the right message for the page
 * the user is currently on.
 */

export function SiteHeader({
  pageKey = "landing",
}: {
  pageKey?: WhatsAppPageKey;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Tintworks — home"
        >
          <Image
            src="/logo.svg"
            alt="Tintworks"
            width={140}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <WhatsAppCta pageKey={pageKey} appearance="outline" size="sm" />
          <Button asChild variant="accent" size="sm">
            <Link href="/quote">Get a quote</Link>
          </Button>
        </div>

        {/* Mobile hamburger + drawer */}
        <MobileNav
          headerCta={
            <WhatsAppCta pageKey={pageKey} appearance="outline" size="default" />
          }
          drawerCta={
            <Button asChild variant="accent" size="lg" className="w-full">
              <Link href="/quote">Get a quote</Link>
            </Button>
          }
        />
      </div>
    </header>
  );
}
