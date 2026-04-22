"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/components/marketing/nav-links";
import { cn } from "@/lib/utils";

/**
 * Hamburger + slide-in drawer for small screens. Client component so
 * SheetTrigger can manage its open state; the CTAs inside the drawer stay
 * as server-rendered children passed through via props.
 */

export function MobileNav({
  headerCta,
  drawerCta,
}: {
  /** Rendered inline in the drawer header (e.g. a WhatsApp ghost CTA). */
  headerCta?: React.ReactNode;
  /** Rendered at the bottom of the drawer as the primary action. */
  drawerCta?: React.ReactNode;
}) {
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
          <SheetTitle className="text-left font-display text-lg">
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
                "rounded-md px-3 py-2 text-base font-medium transition-colors",
                "hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          {headerCta}
          {drawerCta}
        </div>
      </SheetContent>
    </Sheet>
  );
}
