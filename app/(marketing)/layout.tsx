import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

/**
 * Public marketing shell. Every page under (marketing) gets the header +
 * footer wrap automatically.
 *
 * Individual pages can override the WhatsApp CTA's pre-fill context by
 * rendering their own <SiteHeader pageKey=".."/> inside the page — but the
 * default here is sensible for anything that doesn't bother.
 */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader pageKey="landing" />
      <main className="flex-1">{children}</main>
      <SiteFooter pageKey="landing" />
    </div>
  );
}
