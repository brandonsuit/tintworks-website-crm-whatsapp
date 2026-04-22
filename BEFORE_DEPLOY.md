# Before first public launch

Everything below needs the owner's attention before the site is shared broadly or submitted to Google. The code ships as-is; these are content / configuration gaps.

Grep the codebase for `TODO` to see every marker in context.

## Content placeholders

- [ ] **Quote wizard pricing** — `lib/pricing.ts` ships with every price at `£0`. While it's zeros the wizard shows *Price on request* instead of `£0`, so nothing breaks — but you'll want real numbers before launch. Fill in:
  - `pricingData.vehicleType` — base fee per body type (hatchback, saloon, etc).
  - `pricingData.windows` — per-window-set fee (front pair, rear pair, full car, etc).
  - `pricingData.shadeMultiplier` — 1.0 for flat pricing, or raise for darker shades.
  - `pricingData.extras` — flat add-ons (ceramic upgrade, heat rejection, privacy, mobile).
- [ ] **Gallery photos** — currently picsum placeholders. Swap in real images:
  - `gallery.config.ts` — grid items (9 seed entries).
  - `lib/before-after.ts` — 3 before/after pairs for the slider at the top of `/gallery`. Drop pairs into `public/gallery/before-after/`.
- [ ] **Real reviews** — `lib/reviews.ts` contains seed testimonials (marked `isPlaceholder: true`). When the Google Reviews API is wired up, replace the seed array and flip the flag.
- [ ] **Google Business Profile URL** — `lib/reviews.ts` → `googleReviewsProfileUrl` is a plain search fallback. Swap for the canonical GBP URL once it exists.

## Legal pages (must be reviewed)

- [ ] **Privacy Policy** (`app/(marketing)/privacy/page.tsx`) — stub content. Grep for `TODO: review with owner before launch`. Confirm data retention, controller details, processors (Resend, Railway).
- [ ] **Terms of Use** (`app/(marketing)/terms/page.tsx`) — stub content. Confirm warranty wording against what's actually offered.

Both pages render a visible amber alert at the top until the owner reviews them.

## Configuration

- [ ] **`NEXT_PUBLIC_SITE_URL`** — swap from the Railway-default domain to the real custom domain once DNS cuts over. One env-var change, cascades to canonical URLs, sitemap, OG images, JSON-LD.
- [ ] **Resend sender domain verification** — DNS records on the sending domain, see README "Resend setup".
- [ ] **Plausible domain** — create site in Plausible dashboard, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to match.
- [ ] **WhatsApp number** — `BUSINESS_PHONE_E164` is the real business line (`447735839280`) and already in `.env.example`. Confirm it's also set in Railway Variables.

## Before inviting public traffic

- [ ] Manually submit the final domain to **Google Search Console** once DNS is stable.
- [ ] Verify the `AutomotiveBusiness` JSON-LD in **Google Rich Results Test** (`https://search.google.com/test/rich-results`).
- [ ] Quick check in **Mobile-Friendly Test**.
- [ ] Submit `sitemap.xml` via Search Console.
- [ ] Create the Google Business Profile for the Holbeck address if it doesn't exist yet, and link it from the landing reviews block.

---

## What's not built — recommended v1.5 / v2 roadmap

v1 deliberately stops at a static marketing site + lead-capture form. When the business is ready to grow, here's the build order that keeps everything aligned with the codebase shape already in place:

### v1.5 (small increments on the live site)

1. **Google Business Profile link** — 5 min.
2. **Real gallery photos** — swap `gallery.config.ts` `src` paths. 30 min including compression.
3. **Real testimonials** — re-introduce a compact quotes strip on the landing once 3–5 reviews are in hand.
4. **Monitoring** — Sentry for `app/error.tsx` and the Resend-fail path in `/api/leads`. Current code logs to `console.error`; the slot is pre-flagged.
5. **Upstash Redis** for `lib/rate-limit.ts` if bot traffic becomes an issue (unlikely for a single-location UK shop, but cheap insurance).

### v2 (the original Plan — admin dashboard, DB, full CRM)

6. **Prisma + Postgres** — Railway-hosted DB service. The schema in the original plan stands; automotive-only means `ServiceType.category` is a no-op (drop the enum).
7. **NextAuth (credentials)** — owner-only for v1, staff roles added later. First-run `/setup?token=…` flow instead of seeded creds.
8. **Admin CRM** — `/admin/leads`, `/admin/customers`, `/admin/jobs`, `/admin/quotes`, `/admin/invoices`, `/admin/payments`, `/admin/expenses`, `/admin/reports/pnl`. Staff role blocked from financials.
9. **Persist leads on `/api/leads`** — the route already returns `{shortCode, whatsappUrl, emailSent}`; persistence drops in between short-code generation and response build with zero client-contract changes.
10. **Cloudflare R2** for job photos + expense receipts. S3-compatible presigned PUT URLs; env vars already namespaced (`S3_*`).
11. **WhatsApp Cloud API** — two-way inbox inside `/admin/inbox`. `lib/whatsapp/provider.ts` already defines the `MessagingProvider` interface; Cloud API drops in alongside `ClickToChatProvider`.
12. **Invoicing** — race-safe numbering via `DocumentCounter` table with advisory lock. PDFs via `@react-pdf/renderer`. Resend delivery.
13. **Expenses + P&L** — owner-only, simple period filters.
14. **Branded Google Business Profile link** becomes a two-way reviews widget.

### Deliberately excluded from v1 *and* v2

- **Online payments.** Card/cash/bank-transfer recorded offline. Stripe is easy to bolt on later if it becomes worth the fees + compliance surface.
- **Public online booking.** Owner-driven scheduling via WhatsApp is faster and higher-signal for a single-fitter studio.
- **Multi-location.** NAP data and JSON-LD assume one workshop. If this ever expands, there's a known refactor (schema `Location` model + per-location routes).
