# Before first public launch

Everything below needs the owner's attention before the site is shared broadly or submitted to Google. The code ships as-is; these are content / configuration gaps.

Grep the codebase for `TODO` to see every marker in context.

## Content placeholders

- [ ] **Gallery photos** — currently 9 picsum seeds via `gallery.config.ts`. Drop real images into `public/gallery/` and swap each `src` to the local path. The file has an instruction block at the top covering dimensions (1600×1200 / 4:3), compression, and `tintType` values.
- [ ] **Google Business Profile URL** — landing-page reviews block currently has an `href="#"` placeholder. Grep `app/(marketing)/page.tsx` for `TODO: Google Business Profile`.
- [ ] **Testimonials** — deferred to v1.5. When real reviews land, decide whether to re-introduce a quotes carousel or keep pointing at the Google Business Profile.

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
