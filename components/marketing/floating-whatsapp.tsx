import Link from "next/link";

import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { cn } from "@/lib/utils";

/**
 * Persistent WhatsApp CTA pinned to the bottom-right. Visible site-wide as the
 * primary escape hatch — no client state, no JS. Receives a pre-built wa.me
 * URL via props so it stays out of `lib/business` and safe in any bundle.
 */

export type FloatingWhatsAppProps = {
  href: string;
  className?: string;
};

export function FloatingWhatsApp({ href, className }: FloatingWhatsAppProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      data-analytics="cta-whatsapp"
      data-analytics-page="floating"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-16 md:w-16",
        "before:absolute before:inset-0 before:-z-10 before:animate-ping before:rounded-full before:bg-whatsapp/40",
        className,
      )}
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
    </Link>
  );
}
