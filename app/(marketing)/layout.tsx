import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { FloatingWhatsApp } from "@/components/marketing/floating-whatsapp";
import { business } from "@/lib/business";
import { telHref } from "@/lib/phone";
import { buildWaMeLink } from "@/lib/whatsapp/link";
import { getWhatsAppMessage } from "@/lib/whatsapp/messages";

/**
 * Public marketing shell. Header + footer wrap every page under (marketing).
 * Server-only: we read `business` here once and pass plain strings to the
 * client-side header/floating CTA — keeps `lib/business` and `serverEnv` out
 * of the client bundle.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsAppHref = buildWaMeLink({
    phoneE164: business.phoneE164,
    message: getWhatsAppMessage("landing"),
  });
  const phoneTelHref = telHref(business.phoneE164);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        phoneDisplay={business.phoneDisplay}
        phoneTelHref={phoneTelHref}
        whatsAppHref={whatsAppHref}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter pageKey="landing" />
      <FloatingWhatsApp href={whatsAppHref} />
    </div>
  );
}
