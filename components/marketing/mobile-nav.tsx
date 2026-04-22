"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { primaryNav } from "@/components/marketing/nav-links";
import { cn } from "@/lib/utils";

/**
 * Hamburger + slide-in drawer for small screens. Client component — business
 * contact props are passed in so we stay out of `lib/business` on the client.
 */

export type MobileNavProps = {
  phoneDisplay: string;
  phoneTelHref: string;
  whatsAppHref: string;
};

export function MobileNav({
  phoneDisplay,
  phoneTelHref,
  whatsAppHref,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 max-w-[85vw]">
        <SheetHeader>
          <SheetTitle className="text-left font-display text-2xl uppercase tracking-wider">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-1">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-sm px-3 py-3 font-display text-xl uppercase tracking-wider transition-colors",
                "hover:bg-muted hover:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          <Button asChild variant="accent" size="lg" className="w-full">
            <Link href="/quote" onClick={() => setOpen(false)}>
              Get Quote
            </Link>
          </Button>
          <Button asChild variant="whatsapp" size="lg" className="w-full">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta-whatsapp"
              data-analytics-page="mobile-nav"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full gap-2">
            <a href={phoneTelHref} aria-label={`Call ${phoneDisplay}`}>
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              {phoneDisplay}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
