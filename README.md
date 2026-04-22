# Tintworks — Car Window Tinting Leeds

Public marketing site for **Tintworks**, a car window tinting studio based at Brown Place, Holbeck, Leeds LS11. In-studio only — no mobile service.

Built as a front-end-first v1:
- Lands leads via a quote form + WhatsApp handoff.
- Zero database. Zero auth. Every lead submission emails the owner via Resend and returns a pre-filled `wa.me` URL.
- The folder structure is deliberately ready for a v2 that adds Prisma + Postgres + an admin/CRM without churning the marketing code.

---

## Stack

| Layer | Tech |
| --- | --- |
| Framework | **Next.js 15.5.15** (App Router, Node runtime) |
| Language | TypeScript 5.7, strict |
| UI | Tailwind CSS 3.4 + shadcn-style primitives, dark automotive theme |
| Forms | react-hook-form + zod |
| Email | Resend |
| Analytics | Plausible (cookie-free, GDPR-friendly) |
| Hosting | Railway |
| Currency | GBP, UK locale, Europe/London timezone |

---

## Running locally

```bash
# 1. Copy env template and fill in any keys you want active
cp .env.example .env.local

# 2. Install
npm install

# 3. Dev
npm run dev                 # http://localhost:3000
```

The server-side env parser is eager — it throws at boot if any **required** variable is missing. This is deliberate: you find out at startup, not on the first request.

Useful checks:

```bash
npm run typecheck           # tsc --noEmit
npm run lint                # next lint
```

---

## Environment variables

All env access goes through [`lib/env.ts`](lib/env.ts), which validates with zod. `NEXT_PUBLIC_*` values are inlined into the client bundle at build time — they are not secrets.

### Required

| Name | Example | Purpose |
| --- | --- | --- |
| `BUSINESS_PHONE_E164` | `447735839280` | E.164 digits only, no leading `+`. Used in every `wa.me` and `tel:` link. |
| `BUSINESS_NAME` | `Tintworks` | Rendered in header, footer, metadata, emails. |
| `BUSINESS_EMAIL` | `hello@tintworks.co.uk` | Site-visible contact email. |
| `BUSINESS_ADDRESS` | `"Brown Place, Holbeck, Leeds, LS11, England"` | Quoted string. Published in footer, contact page, JSON-LD. |
| `NEXT_PUBLIC_SITE_URL` | `https://tintworks.co.uk` | Drives canonical URLs, OG image URLs, sitemap, robots host. Swap this when DNS cuts over. |

### Optional but needed for the owner email notification

If any one of the three is missing, the quote form still works end-to-end — the customer still gets the WhatsApp handoff — but the owner notification email is skipped and a warning is logged.

| Name | Example | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | From https://resend.com/api-keys |
| `EMAIL_FROM` | `"Tintworks <leads@tintworks.co.uk>"` | Must be on a verified sender domain in Resend. See **Resend setup** below. |
| `OWNER_NOTIFY_EMAIL` | `owner@tintworks.co.uk` | Address the new-lead notification is sent to. |

### Optional

| Name | Example | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `tintworks.co.uk` | Domain you've added in Plausible. Leave empty to skip loading the script locally. |

---

## Railway deployment

The site runs on a single Railway service. No database yet.

### First deploy

1. Push `main` to GitHub (this repo).
2. In Railway → **New Project → Deploy from GitHub repo** → select this repo.
3. Railway auto-detects Next.js via Nixpacks. No Dockerfile needed.
4. Set the env vars above in **Variables**. The required ones must all be set before first deploy or build boot will fail fast (by design — see [lib/env.ts](lib/env.ts)).
5. Set **Settings → Healthcheck Path** to `/api/health`. The endpoint returns `{ok:true, ts:...}` and fails only if the app process is down.
6. Save and deploy.

### Redeploying

Every push to `main` triggers a deploy. No manual action.

### Custom domain

1. Railway → **Settings → Domains → Add custom domain** → enter your domain.
2. Follow Railway's DNS instructions (`CNAME` to the Railway URL).
3. Once DNS propagates and the cert issues, update `NEXT_PUBLIC_SITE_URL` to the new domain. That one env var cascades to canonical URLs, sitemap entries, OG image URLs, and JSON-LD automatically.

### Build / start commands

Railway Nixpacks does the right thing by default, but for reference:

```
Build command:  npm ci && npm run build
Start command:  npm start        # next start -p $PORT
Healthcheck:    /api/health
Node:           >=18.18 (Railway uses 22 LTS by default — fine)
```

---

## Resend setup (owner email notifications)

Sender verification needs DNS on the domain you're sending `from:`.

1. Create a Resend account → **Domains → Add Domain** → enter e.g. `tintworks.co.uk`.
2. Resend lists a handful of DNS records (typically three). Add them on your DNS provider:
   - **MX** record — points your root (or a subdomain like `send`) at Resend's receiving server for return-path bounces. Typical value: `feedback-smtp.<region>.amazonses.com` with priority `10`.
   - **TXT (SPF)** — authorises Resend to send on behalf of your domain: `"v=spf1 include:amazonses.com ~all"`.
   - **TXT (DKIM)** — a `resend._domainkey` (or similar) record signing outbound mail. Resend generates the key; paste the value it shows you.
   - *(Optional but recommended)* **DMARC** — `"v=DMARC1; p=none; rua=mailto:postmaster@tintworks.co.uk"`.
3. Wait for Resend to mark the domain **Verified** (usually a few minutes).
4. Set `EMAIL_FROM` in Railway to a name + address on that domain, e.g. `"Tintworks <leads@tintworks.co.uk>"`.

Until the domain is verified, keep `EMAIL_FROM` unset — the app gracefully skips email and the WhatsApp handoff still works.

---

## Plausible setup (analytics)

1. Plausible → **+ Add a site** → enter the domain you'll go live on (e.g. `tintworks.co.uk`).
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Railway to that exact domain (no `https://`, no path).
3. Redeploy. The script is loaded via `next/script` `afterInteractive` from `app/layout.tsx` — zero third-party cookies.

Locally, leave `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset so you don't pollute production metrics with dev traffic.

---

## Architecture notes

- **Route groups.** `app/(marketing)/…` wraps every public page with the header + footer shell from `components/marketing/`. Root-level files (`not-found.tsx`, `error.tsx`, `sitemap.ts`, `robots.ts`, `api/`) sit outside the group and do their own thing.
- **Env validation.** `lib/env.ts` parses on module load. `serverEnv` is server-only (gated by `typeof window`). `publicEnv` is safe everywhere.
- **Lead pipeline.** `components/forms/quote-form.tsx` → `POST /api/leads` → validate (zod) → rate-limit (3/10min/IP) → generate short code → build `wa.me` URL → attempt Resend notification (non-blocking) → return `{whatsappUrl, shortCode, emailSent}` to the client, which swaps to a "Continue on WhatsApp" card.
- **WhatsApp reusability.** `lib/whatsapp/link.ts` + `lib/whatsapp/messages.ts` + `lib/whatsapp/lead-handoff.ts` are pure — no I/O, no env reads beyond the business phone number. When v2 adds the WhatsApp Cloud API, the existing click-to-chat provider stays as a fallback.
- **Rate limiter.** In-memory token bucket in `lib/rate-limit.ts`. Single instance on Railway for v1. When horizontal scaling matters, swap for Upstash Redis — the `rateLimit(key, opts)` shape doesn't change.
- **Short codes.** Crockford-ish alphabet (no 0/O, 1/I) generated with `node:crypto`. Embedded in the customer's pre-filled WhatsApp message and the owner's notification email so replies can be correlated even if the customer edits the pre-fill.
- **Dynamic OG image.** `app/og/route.tsx` renders a 1200×630 PNG per-page via `next/og`. Every page's `metadata.openGraph.images` points to `/og?title=<page title>` via `lib/og.ts`.
- **JSON-LD.** Root layout emits `AutomotiveBusiness` structured data with address, phone, email, geo, `areaServed: Leeds`. No `openingHours` — appointment-only business.

---

## Troubleshooting

### "Invalid server env — see logs" at boot

`lib/env.ts` rejected one or more required vars. Check the Railway log for the `Invalid server env:` line that lists the failing fields. Required: `BUSINESS_PHONE_E164`, `BUSINESS_NAME`, `BUSINESS_EMAIL`, `BUSINESS_ADDRESS`, `NEXT_PUBLIC_SITE_URL`.

### Leads submit but no email lands

1. Check `RESEND_API_KEY`, `EMAIL_FROM`, `OWNER_NOTIFY_EMAIL` are all set.
2. Look at Railway logs for `[leads] Resend notification failed` or `[leads] Email not configured`.
3. Confirm the sender domain is Verified in Resend.
4. Check the Resend dashboard → Logs for the specific send attempt.

Remember: email failure is non-fatal. The customer still completes the WhatsApp handoff.

### 429 on `/api/leads`

Rate limit. 3 requests per 10 minutes per IP. Wait, or submit from a different IP. Expected behaviour when testing — production abuse is rare on a v1 site.

### Image `/og?title=…` returns 500

Usually a missing font file or a bad prop in the JSX passed to `ImageResponse`. Check the Railway log, and confirm `runtime = "nodejs"` is still declared at the top of `app/og/route.tsx`.

### Build fails with `routes-manifest.json not found`

`.next/` was deleted under a running dev server. Stop the dev process, run `rm -rf .next`, and restart. Only affects local dev — Railway builds clean each deploy.

### Plausible script 404 in production

`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` must match the domain you registered in Plausible exactly — no `https://`, no trailing slash.

---

## Before first public launch

See [BEFORE_DEPLOY.md](BEFORE_DEPLOY.md) for the checklist of placeholders to swap (gallery images, Google Business Profile link, domain, etc.) before inviting traffic.

## Repository

GitHub: https://github.com/brandonsuit/tintworks-website-crm-whatsapp

## Future (not built yet, v1.5 / v2)

See the bottom of [BEFORE_DEPLOY.md](BEFORE_DEPLOY.md) for the recommended v1.5 / v2 roadmap — Prisma + admin/CRM, WhatsApp Cloud API two-way messaging, R2 photo uploads, etc.
