"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { primaryNav } from "@/components/marketing/nav-links";
import { cn } from "@/lib/utils";

/**
 * Sticky top-of-page header. Client component so it can react to scroll —
 * more opaque + compact once the user is past the hero.
 *
 * Business-data dependent children (phone number, WhatsApp URL) are passed in
 * via props from the server-rendered marketing layout so this component stays
 * out of `lib/business` and safe in the client bundle.
 */

export type SiteHeaderProps = {
  phoneDisplay: string;
  phoneTelHref: string;
  whatsAppHref: string;
};

export function SiteHeader({
  phoneDisplay,
  phoneTelHref,
  whatsAppHref,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Tint Works — home"
        >
          <Image
            src="/logo.svg"
            alt="Tint Works"
            width={200}
            height={41}
            priority
            fetchPriority="high"
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 font-display text-base uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <a href={phoneTelHref} aria-label={`Call ${phoneDisplay}`}>
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              <span className="font-medium tracking-tight">
                {phoneDisplay}
              </span>
            </a>
          </Button>
          <Button asChild variant="whatsapp" size="sm">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta-whatsapp"
              data-analytics-page="header"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href="/quote">Get Quote</Link>
          </Button>
        </div>

        <MobileNav
          phoneDisplay={phoneDisplay}
          phoneTelHref={phoneTelHref}
          whatsAppHref={whatsAppHref}
        />
      </div>
    </header>
  );
}
