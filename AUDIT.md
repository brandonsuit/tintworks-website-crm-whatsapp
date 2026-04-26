# Tintworks Copy Audit + Approved Voice

Frozen reference for the Step-4 rewrite pass. The full inventory lives in
[INVENTORY.md](INVENTORY.md); this document captures the audit findings and
the voice rules that were approved before file edits began.

## Cross-cutting issues (fix once, propagates)

- Brand fork: `lib/business.ts` reads "Tint Works", logo + socials + WhatsApp
  templates use "Tintworks". Canonical: **Tintworks** (single word).
- Banned default copy: section-cta default heading was
  "Ready to transform your ride?" — violates the no-`transform` rule.
- AI/templated headlines on landing: "Built for every kind of vehicle.",
  "What our customers say.", "A taste of the portfolio.", "Drive away fresh".
- VLT abbreviation never expanded on first use across pages.
- Generic eyebrows: "What we fit", "By the numbers", "Recent work", "Reviews",
  "How it works", "FAQ", "Book in".
- CTA microcopy drift: "Get Instant Quote" / "Get Quote" / "Quote this package".
- 200+ Google reviews trust signal sized like a footnote in hero.
- Appointment-only model only mentioned at FAQ / contact — should land earlier.
- "Same-day" used inconsistently for both quote response and finished work.
- Postcode/town SEO weight missing — only Holbeck/LS11 used; surrounding
  postcodes never named.

## Approved voice

Four adjectives:

1. **Plain-spoken** — short sentences, specific over generic, no jargon
   without a translation.
2. **Quietly authoritative** — fact-led; the work speaks. Numbers, materials,
   times, named films. Adjectives never carry the load.
3. **Yorkshire-direct, never blunt** — straight, no fluff, warm enough to
   sound human. Dry humour permitted in fixed places (FAQ, process), never
   in the H1.
4. **Studio-grade** — references the craft (dust control, gasket seals, edge
   cuts, cure time). Signals to enthusiasts without locking out the daily
   driver.

We sound like:

- Singer Vehicle Design (premium-but-restrained)
- Detailing World trade tone (peer-to-peer with car people, plain enough for
  a normie)
- A good independent garage's website — facts, no patter
- The existing "Why ceramic / Built for Yorkshire weather" section copy

We don't sound like:

- "Transform / elevate / unleash / next level / game-changing"
- Big-chain detailing (every adjective bigger than the last)
- A SaaS landing page
- An influencer caption
- A call-centre script
- Auto-blog SEO filler

## Concrete rules applied in Step 4

1. One claim per sentence.
2. Every adjective earns its keep — no filler "premium" / "professional".
3. Numbers > adjectives ("200+ five-star" beats "highly rated").
4. Every page anchors to Holbeck / Leeds / LS11 in the first 200 words.
5. Headlines vehicle-led where possible.
6. Trade vocabulary welcomed, never shown off — VLT defined on first use.
7. No exclamation marks. No emoji. No em-dash breath beats.
8. British English (tyre, colour, kerb, optimise, neighbour).
9. Canonical CTAs: **"Get a quote"** (primary), **"WhatsApp us"** (secondary).
   Phone is a tertiary, header-only.
10. Trust signals (200+ Google reviews, two-year fitting warranty, Holbeck
    studio) appear within one scroll of every primary CTA.
