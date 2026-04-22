import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { buildWaMeLink } from "@/lib/whatsapp/link";
import {
  getWhatsAppMessage,
  type WhatsAppPageKey,
} from "@/lib/whatsapp/messages";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

/**
 * "Chat on WhatsApp" CTA. Server-rendered — no interactivity beyond the link.
 *
 * Place one in the header, one in the footer, and one inline on every service
 * page. The `pageKey` selects the pre-filled message so the customer's compose
 * box is context-aware when WhatsApp opens.
 *
 * Visual variant (`appearance`):
 *   - "filled"  — WhatsApp-green solid button. Use for the primary CTA.
 *   - "outline" — subtle, for secondary placement (e.g. header on desktop).
 *   - "ghost"   — text-only, for footers or inside dense sections.
 */

type Appearance = "filled" | "outline" | "ghost";

export type WhatsAppCtaProps = {
  pageKey: WhatsAppPageKey;
  appearance?: Appearance;
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
};

export function WhatsAppCta({
  pageKey,
  appearance = "filled",
  size = "default",
  className,
  label = "Chat on WhatsApp",
}: WhatsAppCtaProps) {
  const href = buildWaMeLink({
    phoneE164: business.phoneE164,
    message: getWhatsAppMessage(pageKey),
  });

  const variant: ButtonProps["variant"] =
    appearance === "filled"
      ? "whatsapp"
      : appearance === "outline"
        ? "outline"
        : "ghost";

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(
        appearance === "outline" &&
          "border-whatsapp/40 text-whatsapp hover:bg-whatsapp/10 hover:text-whatsapp",
        className,
      )}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // Plausible outbound-link event, ignored if Plausible not loaded.
        data-analytics="cta-whatsapp"
        data-analytics-page={pageKey}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
