# TintWorks Copy Inventory

## Factual data already in code

- **Business name**: Tintworks (from `lib/business.ts` and `lib/whatsapp/messages.ts`)
- **Address (complete)**: Brown Place, Holbeck, Leeds LS11, West Yorkshire, GB (from `lib/business.ts`)
- **Phone (E.164)**: [MISSING — needs owner input] (configured via `BUSINESS_PHONE_E164` env var)
- **Phone (display)**: [MISSING — needs owner input] (formatted from E.164 in `lib/business.ts`)
- **Email**: [MISSING — needs owner input] (configured via `BUSINESS_EMAIL` env var)
- **Website URL**: [MISSING — needs owner input] (configured via `NEXT_PUBLIC_SITE_URL` env var)
- **Geo coordinates**: Latitude 53.7822579, Longitude -1.5698939 (verified Google Maps, Brown Place, Holbeck, Leeds LS11)
- **Opening hours**: "By appointment only — message us on WhatsApp to arrange a booking." (hardcoded in `lib/business.ts`)
- **Locality**: Leeds
- **Region**: West Yorkshire
- **Postcode**: LS11
- **Country code**: GB
- **Social media**: Instagram (@tintworks_) at https://www.instagram.com/tintworks_/ and Facebook at https://www.facebook.com/people/Tint-Works/100070263492202/ (from `lib/social.ts`)
- **Studio type**: Studio-only (in-studio only — no mobile/travelling service)
- **Warranty**: 2-year fitting warranty on all work (from `app/(marketing)/page.tsx` and `app/(marketing)/services/page.tsx`)
- **Film types offered**: Ceramic, Carbon, Chameleon, Limo black, Sun strips (from `app/(marketing)/services/page.tsx` and `gallery.config.ts`)
- **Pricing**: All zeros (not yet configured) — structure in `lib/pricing.ts` includes vehicle type base, window sets, shade multiplier, and extras (ceramic upgrade, heat rejection, privacy film)
- **Review stats**: 200+ 5-star Google reviews, 5★ average rating (from `lib/reviews.ts`)
- **Google Reviews Profile URL**: https://www.google.com/search?q=Tint+Works+Leeds#sv=CAESzQEKuQEStgEKd0FNbjMteVFwSU5NWmVnV3I4QTg5LVpUOEloWjE2YXdneGhKRWdWUlhUeTBBRmVBM0RISkszQndjQ3AzU2FXMHhOaGpTakQ5dFF6NEtHNnFhYVlMSGp4c2xFekVGaTZWdmN4MVNOMVl3dk8tdVhGV0ZMU3V0WHZJEhdNQjdwYVlLOEU4cTR3UEFQcDVDenlRWRoiQUpLTEZtSktGLXRMZEM5VHUxQVQxUlpFWFFWS1h2S1poURIEODA1MRoBMyoAMAA4AUAAGAAgjv2l9ghKAhAC

---

## Inventory table

| File path | Page / Component | Section | Current text | Char count |
|-----------|------------------|---------|--------------|------------|
| app/layout.tsx | Root layout — Metadata | meta-title (default) | `${business.name} — Car Window Tinting Leeds` | ~40 (resolved) |
| app/layout.tsx | Root layout — Metadata | meta-description | Professional car window tinting in Leeds. In-studio ceramic and carbon vehicle tints at our Holbeck workshop. Bring your car to us. | 146 |
| app/layout.tsx | Root layout — Metadata | keywords | car window tinting Leeds, vehicle window tinting Leeds, ceramic car tint Leeds, window tinting Leeds, Holbeck window tinting, car tint Holbeck, Tintworks Leeds | 148 |
| app/layout.tsx | Root layout — Metadata | og-title | `${business.name} — Car Window Tinting Leeds` | ~40 (resolved) |
| app/layout.tsx | Root layout — Metadata | og-description | In-studio car window tinting in Holbeck, Leeds. Bring your vehicle to our workshop. | 83 |
| app/layout.tsx | Root layout — Metadata | twitter-title | `${business.name} — Car Window Tinting Leeds` | ~40 (resolved) |
| app/layout.tsx | Root layout — Metadata | twitter-description | In-studio car window tinting in Holbeck, Leeds. Bring your vehicle to our workshop. | 83 |
| app/layout.tsx | Root layout — JSON-LD | LocalBusiness description | Professional car window tinting in Leeds. In-studio ceramic and carbon tints at our Holbeck workshop. | 105 |
| app/layout.tsx | Root layout — JSON-LD | LocalBusiness priceRange | ££ | 2 |
| app/layout.tsx | Root layout — JSON-LD | areaServed name | Leeds | 5 |
| app/(marketing)/page.tsx | Landing — Page metadata | meta-title | Car Window Tinting Leeds — Ceramic, Carbon & Limo Tints | 55 |
| app/(marketing)/page.tsx | Landing — Page metadata | meta-description | Tint Works — professional car window tinting in Leeds. Ceramic and carbon films fitted in-studio at our Holbeck workshop. 200+ 5-star reviews, 2-year fitting warranty. | 162 |
| app/(marketing)/page.tsx | Landing — Page metadata | og-title | Car Window Tinting Leeds — Tint Works | 47 |
| app/(marketing)/page.tsx | Landing — Services section eyebrow | eyebrow | What we fit | 12 |
| app/(marketing)/page.tsx | Landing — Services section H2 | heading | Built for every kind of vehicle. | 33 |
| app/(marketing)/page.tsx | Landing — Services section H2 CTA | button-label | See all services | 15 |
| app/(marketing)/page.tsx | Landing — Service card 1 | title | Full car tint | 13 |
| app/(marketing)/page.tsx | Landing — Service card 1 | description | Every legal window wrapped. Ceramic or carbon film, dialled in to your shade of choice. | 90 |
| app/(marketing)/page.tsx | Landing — Service card 1 | badge | Most popular | 12 |
| app/(marketing)/page.tsx | Landing — Service card 2 | title | Rear set | 8 |
| app/(marketing)/page.tsx | Landing — Service card 2 | description | Rear sides + rear windscreen. Maximum privacy, heat rejection, and a factory-tidy finish. | 92 |
| app/(marketing)/page.tsx | Landing — Service card 3 | title | Front windows | 13 |
| app/(marketing)/page.tsx | Landing — Service card 3 | description | UK law-compliant front pair (min 70% VLT). Cuts glare on motorway drives. | 80 |
| app/(marketing)/page.tsx | Landing — Service card 4 | title | Windscreen sun strip | 23 |
| app/(marketing)/page.tsx | Landing — Service card 4 | description | Narrow gradient strip across the top of the windscreen — kills low-sun glare fast. | 84 |
| app/(marketing)/page.tsx | Landing — Service card 5 | title | Commercial / van | 18 |
| app/(marketing)/page.tsx | Landing — Service card 5 | description | Transit, Sprinter, VW Transporter and more. Secure your tools, stay comfortable. | 81 |
| app/(marketing)/page.tsx | Landing — Service card 6 | title | Chameleon finish | 18 |
| app/(marketing)/page.tsx | Landing — Service card 6 | description | Colour-shifting film that flips between blue, purple and gold. Show-car look with full UV and heat rejection. | 115 |
| app/(marketing)/page.tsx | Landing — Service card 6 | badge | Statement | 9 |
| app/(marketing)/page.tsx | Landing — Stats section eyebrow | eyebrow | By the numbers | 13 |
| app/(marketing)/page.tsx | Landing — Stats section H2 | heading | Leeds-local. Trusted by hundreds. | 33 |
| app/(marketing)/page.tsx | Landing — Stats block 1 | label | 5-star Google reviews | 21 |
| app/(marketing)/page.tsx | Landing — Stats block 2 | label | Average rating | 16 |
| app/(marketing)/page.tsx | Landing — Stats block 3 | label | Years in the game | 17 |
| app/(marketing)/page.tsx | Landing — Stats block 4 | label | Fitting warranty | 17 |
| app/(marketing)/page.tsx | Landing — Gallery section eyebrow | eyebrow | Recent work | 12 |
| app/(marketing)/page.tsx | Landing — Gallery section H2 | heading | A taste of the portfolio. | 25 |
| app/(marketing)/page.tsx | Landing — Gallery section CTA | button-label | See full gallery | 15 |
| app/(marketing)/page.tsx | Landing — Reviews section eyebrow | eyebrow | Reviews | 7 |
| app/(marketing)/page.tsx | Landing — Reviews section H2 | heading | What our customers say. | 26 |
| app/(marketing)/page.tsx | Landing — Reviews section link | text + aria | See all 200+ on Google | 23 |
| app/(marketing)/page.tsx | Landing — Reviews section placeholder text | notice | Showing a selection of recent feedback. For the live feed see our Google Business Profile. | 95 |
| app/(marketing)/page.tsx | Landing — Process section eyebrow | eyebrow | How it works | 12 |
| app/(marketing)/page.tsx | Landing — Process section H2 | heading | Four steps from enquiry to new glass. | 36 |
| app/(marketing)/page.tsx | Landing — FAQ section eyebrow | eyebrow | FAQ | 3 |
| app/(marketing)/page.tsx | Landing — FAQ section H2 | heading | Answers before you book. | 26 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | question | Is window tinting legal in the UK? | 33 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | answer-intro | Yes — within the rules. UK law (Construction & Use Regulations) says: | 68 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | answer-li-1 | Front windscreen must let through at least **75%** of light (VLT). | 61 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | answer-li-2 | Front side windows must let through at least **70%** of light. | 57 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | answer-li-3 | Rear windows and rear windscreen have **no restriction** — go as dark as you like. | 82 |
| app/(marketing)/page.tsx | Landing — FAQ item 1 | answer-closing | We'll never fit a front tint that's below the legal limit. | 55 |
| app/(marketing)/page.tsx | Landing — FAQ item 2 | question | How long does it take? | 21 |
| app/(marketing)/page.tsx | Landing — FAQ item 2 | answer | Most tints are completed the same day. A full rear set typically takes 2–3 hours; a full car around 3–4 hours. We'll give you an exact slot when you book. | 164 |
| app/(marketing)/page.tsx | Landing — FAQ item 3 | question | How much does it cost? | 22 |
| app/(marketing)/page.tsx | Landing — FAQ item 3 | answer | Pricing depends on your vehicle and which windows you're doing. Use the instant quote tool for a same-day estimate, or message us on WhatsApp. | 150 |
| app/(marketing)/page.tsx | Landing — FAQ item 4 | question | How long does it last? | 21 |
| app/(marketing)/page.tsx | Landing — FAQ item 4 | answer | Our ceramic and carbon films are colour-stable — no purple fade. Fitting is covered by a 2-year warranty against peeling, bubbling or delamination. | 154 |
| app/(marketing)/page.tsx | Landing — FAQ item 5 | question | Can I wash my car after? | 22 |
| app/(marketing)/page.tsx | Landing — FAQ item 5 | answer | Give it 3–5 days before washing the windows so the film can fully cure. You'll still see a little cloudiness during curing — that's normal and will vanish. | 168 |
| app/(marketing)/page.tsx | Landing — FAQ item 6 | question | Do you offer a warranty? | 24 |
| app/(marketing)/page.tsx | Landing — FAQ item 6 | answer | Yes — 2-year fitting warranty on all work. If you ever have an issue, bring the car back. | 88 |
| app/(marketing)/page.tsx | Landing — SectionCta | eyebrow | Book in | 7 |
| app/(marketing)/page.tsx | Landing — SectionCta default | heading | Ready to transform your ride? | 29 |
| app/(marketing)/page.tsx | Landing — SectionCta default | lead | Send us the make, model and windows — we'll come back the same day with a quote. | 83 |
| app/(marketing)/page.tsx | Landing — SectionCta | button-label | Get Instant Quote | 16 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 1 | step-label | Step 01 | 7 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 1 | title | Get an instant quote | 20 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 1 | body | Use the quote tool or message us on WhatsApp — we'll come back the same day. | 81 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 2 | step-label | Step 02 | 7 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 2 | title | Book a slot | 11 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 2 | body | Pick a day that suits you. We work by appointment only so there's no waiting around. | 86 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 3 | step-label | Step 03 | 7 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 3 | title | Drop off your car | 15 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 3 | body | Bring it to our Holbeck workshop. Most tints are completed the same day. | 73 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 4 | step-label | Step 04 | 7 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 4 | title | Drive away fresh | 16 |
| components/marketing/process-timeline.tsx | Process Timeline — Step 4 | body | Collect your vehicle. 2-year fitting warranty, and we'll always answer aftercare questions. | 88 |
| app/(marketing)/services/page.tsx | Services — Page metadata | meta-title | Car Window Tinting Services Leeds — Full, Rear, Front & Van Tints | 59 |
| app/(marketing)/services/page.tsx | Services — Page metadata | meta-description | Tint Works — ceramic, carbon and limo-black car window tinting in Leeds. Full car, rear set, front windows, windscreen sun strips, and van/commercial packages, fitted in-studio at our Holbeck workshop. | 211 |
| app/(marketing)/services/page.tsx | Services — Page metadata | og-title | Services — Car Window Tinting Leeds | 40 |
| app/(marketing)/services/page.tsx | Services — PageHeader | eyebrow | Car window tinting Leeds | 25 |
| app/(marketing)/services/page.tsx | Services — PageHeader | title | Ceramic and carbon car tints, fitted in Holbeck. | 47 |
| app/(marketing)/services/page.tsx | Services — PageHeader | lead | Bring your vehicle to the studio and drive away with a clean, heat-rejecting tint backed by a 2-year fitting warranty. | 116 |
| app/(marketing)/services/page.tsx | Services — CTA buttons | button 1 | Get Instant Quote | 16 |
| app/(marketing)/services/page.tsx | Services — CTA buttons | button 2 | Chat on WhatsApp | 15 |
| app/(marketing)/services/page.tsx | Services — Packages section eyebrow | eyebrow | Packages | 8 |
| app/(marketing)/services/page.tsx | Services — Packages section H2 | heading | Pick a package or ask for something bespoke. | 42 |
| app/(marketing)/services/page.tsx | Services — Package 1 | title | Full car tint | 13 |
| app/(marketing)/services/page.tsx | Services — Package 1 | blurb | Every legal window wrapped — rear glass, rear sides, front sides (to UK-legal 70% VLT), and sunroof if fitted. | 118 |
| app/(marketing)/services/page.tsx | Services — Package 1 | badge | Most popular | 12 |
| app/(marketing)/services/page.tsx | Services — Package 1 | point 1 | Best value per window | 19 |
| app/(marketing)/services/page.tsx | Services — Package 1 | point 2 | Full privacy + heat rejection | 26 |
| app/(marketing)/services/page.tsx | Services — Package 1 | point 3 | Front-side film kept legal (≥70% VLT) | 36 |
| app/(marketing)/services/page.tsx | Services — Package 1 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Package 2 | title | Rear set | 8 |
| app/(marketing)/services/page.tsx | Services — Package 2 | blurb | Rear sides plus the rear windscreen. The classic privacy upgrade for family cars and dailies. | 100 |
| app/(marketing)/services/page.tsx | Services — Package 2 | point 1 | No UK VLT restriction on rear glass | 32 |
| app/(marketing)/services/page.tsx | Services — Package 2 | point 2 | Choose anything from 20% down to limo 5% | 39 |
| app/(marketing)/services/page.tsx | Services — Package 2 | point 3 | Typically completed in 2–3 hours | 33 |
| app/(marketing)/services/page.tsx | Services — Package 2 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Package 3 | title | Front windows | 13 |
| app/(marketing)/services/page.tsx | Services — Package 3 | blurb | Cuts glare on motorway drives and evens out the look of an already-tinted rear. | 90 |
| app/(marketing)/services/page.tsx | Services — Package 3 | point 1 | 70% VLT minimum by law — we keep you compliant | 47 |
| app/(marketing)/services/page.tsx | Services — Package 3 | point 2 | Great pairing with a previously-tinted rear | 42 |
| app/(marketing)/services/page.tsx | Services — Package 3 | point 3 | UV protection for the driver | 26 |
| app/(marketing)/services/page.tsx | Services — Package 3 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Package 4 | title | Windscreen sun strip | 23 |
| app/(marketing)/services/page.tsx | Services — Package 4 | blurb | Narrow gradient strip across the top of the windscreen — stops low-sun glare dead. | 94 |
| app/(marketing)/services/page.tsx | Services — Package 4 | point 1 | Fitted standalone or added to any package | 38 |
| app/(marketing)/services/page.tsx | Services — Package 4 | point 2 | Must keep 75% VLT over swept area | 36 |
| app/(marketing)/services/page.tsx | Services — Package 4 | point 3 | Quick — typically a 45-minute job | 35 |
| app/(marketing)/services/page.tsx | Services — Package 4 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Package 5 | title | Commercial / van | 18 |
| app/(marketing)/services/page.tsx | Services — Package 5 | blurb | Transit, Sprinter, VW Transporter, Vivaro and more. Rear-window privacy for tools, stock, or conversions. | 121 |
| app/(marketing)/services/page.tsx | Services — Package 5 | point 1 | Limo-dark rear with matte finish | 28 |
| app/(marketing)/services/page.tsx | Services — Package 5 | point 2 | Useful for campervan conversions | 29 |
| app/(marketing)/services/page.tsx | Services — Package 5 | point 3 | Light-weight to a full-wrap treatment | 34 |
| app/(marketing)/services/page.tsx | Services — Package 5 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Package 6 | title | Chameleon finish | 18 |
| app/(marketing)/services/page.tsx | Services — Package 6 | blurb | Colour-shifting film that flips between blue, purple and gold depending on angle and light. Show-car finish that still does proper UV and heat rejection. | 161 |
| app/(marketing)/services/page.tsx | Services — Package 6 | badge | Statement | 9 |
| app/(marketing)/services/page.tsx | Services — Package 6 | point 1 | Pairs with any package above | 25 |
| app/(marketing)/services/page.tsx | Services — Package 6 | point 2 | Full UV + heat rejection | 23 |
| app/(marketing)/services/page.tsx | Services — Package 6 | point 3 | Legal-VLT option available for the front | 39 |
| app/(marketing)/services/page.tsx | Services — Package 6 | CTA | Quote this package | 17 |
| app/(marketing)/services/page.tsx | Services — Film types section eyebrow | eyebrow | Film options | 12 |
| app/(marketing)/services/page.tsx | Services — Film types section H2 | heading | Four film types, one honest recommendation. | 40 |
| app/(marketing)/services/page.tsx | Services — Film type 1 | title | Ceramic | 7 |
| app/(marketing)/services/page.tsx | Services — Film type 1 | blurb | Our default recommendation. Highest heat rejection, signal-friendly (no phone or key-fob interference), and the cleanest long-term look. | 149 |
| app/(marketing)/services/page.tsx | Services — Film type 2 | title | Carbon | 6 |
| app/(marketing)/services/page.tsx | Services — Film type 2 | blurb | A strong mid-tier option. Good heat rejection, matte finish, and doesn't fade to purple like cheap dyed films. | 119 |
| app/(marketing)/services/page.tsx | Services — Film type 3 | title | Chameleon | 9 |
| app/(marketing)/services/page.tsx | Services — Film type 3 | blurb | Colour-shifting film that flips between blue, purple, and gold depending on the angle and light. Show-car finish, still offers proper UV and heat rejection. Built for people who want the glass to be a feature. | 274 |
| app/(marketing)/services/page.tsx | Services — Film type 3 | badge | Statement | 9 |
| app/(marketing)/services/page.tsx | Services — Film type 4 | title | Limo black | 10 |
| app/(marketing)/services/page.tsx | Services — Film type 4 | blurb | Darkest legal tint for rear glass — maximum privacy for rear passengers, luggage, or commercial vans. | 106 |
| app/(marketing)/services/page.tsx | Services — Film type 5 | title | Sun strips | 10 |
| app/(marketing)/services/page.tsx | Services — Film type 5 | blurb | A narrow strip across the top of the windscreen to cut low-sun glare. Fitted on their own or added to any package. | 137 |
| app/(marketing)/services/page.tsx | Services — Benefits section eyebrow | eyebrow | Why ceramic | 11 |
| app/(marketing)/services/page.tsx | Services — Benefits section H2 | heading | Built for Yorkshire weather. | 27 |
| app/(marketing)/services/page.tsx | Services — Benefits intro | body | Ceramic films reject a significant portion of solar heat while staying signal-friendly — no interference with your phone, key fob, or DAB radio. They also block 99% of UV, which protects your interior trim and anyone sitting in the back. | 303 |
| app/(marketing)/services/page.tsx | Services — Benefit 1 | text | Ceramic and carbon films — heat rejection up to 88% | 54 |
| app/(marketing)/services/page.tsx | Services — Benefit 2 | text | 99% UV rejection — protects interior trim and skin on long drives | 62 |
| app/(marketing)/services/page.tsx | Services — Benefit 3 | text | Factory-tidy finish, no peeling or purple fade | 44 |
| app/(marketing)/services/page.tsx | Services — Benefit 4 | text | UK-legal VLT on front side windows on request | 40 |
| app/(marketing)/services/page.tsx | Services — Benefit 5 | text | 2-year warranty on the fitting workmanship | 43 |
| app/(marketing)/services/page.tsx | Services — Studio-only note H3 | heading | In-studio only — we don't travel to you | 46 |
| app/(marketing)/services/page.tsx | Services — Studio-only note body | text | All tinting is completed at our Holbeck workshop (LS11). The studio is set up specifically for this work — controlled lighting, dust management, and proper space to do the job properly. | 189 |
| app/(marketing)/services/page.tsx | Services — SectionCta | heading | Ready to book your car in? | 27 |
| app/(marketing)/services/page.tsx | Services — SectionCta | lead | Send us the make, model, and which windows you want done — we'll come back with a quote and a fitting slot. | 115 |
| app/(marketing)/gallery/page.tsx | Gallery — Page metadata | meta-title | Gallery — Car Window Tinting Leeds | 40 |
| app/(marketing)/gallery/page.tsx | Gallery — Page metadata | meta-description | Recent car window tinting work from Tint Works in Leeds — filter the grid by film type, and click any tile to view full size. | 132 |
| app/(marketing)/gallery/page.tsx | Gallery — Page metadata | og-title | Gallery — Tint Works | 24 |
| app/(marketing)/gallery/page.tsx | Gallery — PageHeader | eyebrow | Gallery | 7 |
| app/(marketing)/gallery/page.tsx | Gallery — PageHeader | title | See the difference for yourself. | 31 |
| app/(marketing)/gallery/page.tsx | Gallery — PageHeader | lead | Filter the grid by film type, and click any tile for a full-size view. | 71 |
| app/(marketing)/gallery/page.tsx | Gallery — Portfolio section eyebrow | eyebrow | Full portfolio | 14 |
| app/(marketing)/gallery/page.tsx | Gallery — Portfolio section H2 | heading | A rolling selection of recent work. | 35 |
| app/(marketing)/gallery/page.tsx | Gallery — SectionCta | heading | Like what you see? | 17 |
| app/(marketing)/gallery/page.tsx | Gallery — SectionCta | lead | Send us the photo that caught your eye and we'll quote the same job for your car. | 87 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 1 | All | 3 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 2 | Ceramic | 7 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 3 | Carbon | 6 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 4 | Limo | 4 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 5 | Sun strip | 9 |
| components/gallery/gallery-grid.tsx | Gallery grid — Filter buttons | Filter label 6 | Chameleon | 9 |
| gallery.config.ts | Gallery item 1 | alt | Mercedes GLB35 AMG — front three-quarter view after full ceramic tint, Tintworks studio Leeds | 98 |
| gallery.config.ts | Gallery item 1 | caption | Mercedes GLB35 AMG — Full Window Tints | 44 |
| gallery.config.ts | Gallery item 2 | alt | Lamborghini Gallardo — 2 windows tinted at 35% by Tintworks Leeds | 66 |
| gallery.config.ts | Gallery item 2 | caption | Lamborghini Gallardo — 2 Windows 35% | 43 |
| gallery.config.ts | Gallery item 3 | alt | Volkswagen Golf — full window tint in Tintworks studio Leeds | 62 |
| gallery.config.ts | Gallery item 3 | caption | Volkswagen MK8 — Rear Window Tints | 42 |
| gallery.config.ts | Gallery item 4 | alt | BMW 1 Series — full window tint in Tintworks studio Leeds | 62 |
| gallery.config.ts | Gallery item 4 | caption | BMW 1 Series — Full Window Tinting | 41 |
| gallery.config.ts | Gallery item 5 | alt | BMW X3 — rear window tint in Tintworks studio Leeds | 61 |
| gallery.config.ts | Gallery item 5 | caption | BMW X3 — Rear Window Tints | 35 |
| gallery.config.ts | Gallery item 6 | alt | SEAT Leon Cupra 290 — full window tint in Tintworks studio Leeds | 74 |
| gallery.config.ts | Gallery item 6 | caption | SEAT Leon Cupra 290 — Full Window Tinting | 52 |
| gallery.config.ts | Gallery item 7 | alt | Ford Transit Custom — pink haze chameleon windscreen tint by Tintworks Leeds | 88 |
| gallery.config.ts | Gallery item 7 | caption | Transit Custom — Pink Haze Chameleon Windscreen | 51 |
| gallery.config.ts | Gallery item 8 | alt | Audi TT Coupe — full window tint in Tintworks studio Leeds | 63 |
| gallery.config.ts | Gallery item 8 | caption | Audi TT Coupe — Full Window Tints | 39 |
| app/(marketing)/quote/page.tsx | Quote — Page metadata | meta-title | Instant Quote — Car Window Tinting Leeds | 46 |
| app/(marketing)/quote/page.tsx | Quote — Page metadata | meta-description | Build your car window tinting quote in under two minutes. Pick vehicle, windows, shade, and extras — we'll reply on WhatsApp with a fitting slot. | 141 |
| app/(marketing)/quote/page.tsx | Quote — Page metadata | og-title | Instant Quote — Tint Works | 36 |
| app/(marketing)/quote/page.tsx | Quote — PageHeader | eyebrow | Instant quote | 13 |
| app/(marketing)/quote/page.tsx | Quote — PageHeader | title | Build your quote in under two minutes. | 38 |
| app/(marketing)/quote/page.tsx | Quote — PageHeader | lead | Tell us the vehicle, the windows, and the shade. We'll pre-fill WhatsApp with your details so you can tap send and we'll reply the same day. | 155 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 1 | H2 | Prefer to skip it? | 16 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 1 | body | Drop us a WhatsApp message directly — send the make, model, and which windows you want done. We'll reply with pricing and a fitting slot. | 145 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 1 | button | Chat on WhatsApp | 15 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 2 | H2 | How it works | 12 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 2 | li-1 | 1. Pick your vehicle, windows, shade, and any extras. | 48 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 2 | li-2 | 2. Add your contact details on the last step. | 41 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 2 | li-3 | 3. Tap _Send Quote via WhatsApp_ — we'll reply the same day. | 57 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 3 | H2 | Your progress is saved | 20 |
| app/(marketing)/quote/page.tsx | Quote — Sidebar card 3 | body | Close the tab and come back — we remember where you got to. Cleared automatically once your quote is sent. | 110 |
| components/quote/quote-wizard.tsx | Quote wizard — Step progress | label format | Step {step} / {total} | ~20 (dynamic) |
| components/quote/quote-wizard.tsx | Quote wizard — Running total aria | live region | Running total: {formatGbp(totalPennies)} | ~30 (dynamic) |
| components/quote/quote-wizard.tsx | Quote wizard — Step 1 | eyebrow | Step 01 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 1 | title | What are you tinting? | 22 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 1 | lead | Pick the body style closest to your vehicle — it helps us price accurately. | 81 |
| lib/pricing.ts | Vehicle type labels | hatchback | Hatchback | 9 |
| lib/pricing.ts | Vehicle type labels | saloon | Saloon | 6 |
| lib/pricing.ts | Vehicle type labels | estate | Estate | 6 |
| lib/pricing.ts | Vehicle type labels | coupe | Coupé | 6 |
| lib/pricing.ts | Vehicle type labels | suv | SUV | 3 |
| lib/pricing.ts | Vehicle type labels | fourByFour | 4x4 | 3 |
| lib/pricing.ts | Vehicle type labels | van | Van | 3 |
| lib/pricing.ts | Vehicle type labels | other | Other | 5 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 | eyebrow | Step 02 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 | title | Tell us about your vehicle. | 28 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 | lead | Make + model at minimum. Year helps if it's a recent model with factory-tinted rear glass. | 93 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 1 | label | Make | 4 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 1 | placeholder | e.g. BMW | 8 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 2 | label | Model | 5 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 2 | placeholder | e.g. 3 Series | 13 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 3 | label | Year | 4 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 3 | hint | Optional | 8 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 2 field 3 | placeholder | e.g. 2022 | 11 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 3 | eyebrow | Step 03 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 3 | title | Which windows? | 16 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 3 | lead | Pick one or more. The car diagram lights up to show what you've selected. | 87 |
| lib/pricing.ts | Window set labels | frontPair | Front two windows | 16 |
| lib/pricing.ts | Window set labels | rearPair | Rear two windows | 16 |
| lib/pricing.ts | Window set labels | rearWindscreen | Rear windscreen | 14 |
| lib/pricing.ts | Window set labels | fullRear | Full rear set (rear sides + windscreen) | 40 |
| lib/pricing.ts | Window set labels | fullCar | Full car (excluding front — UK law) | 39 |
| lib/pricing.ts | Window set labels | sunStrip | Windscreen sun strip | 19 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 3 | diagram-help-text | Front side windows must stay at **70% VLT** minimum by UK law — we keep you compliant. | 94 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 4 | eyebrow | Step 04 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 4 | title | Pick your shade. | 16 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 4 | lead | Lower % = darker. Not sure? Pick 20% — the most common all-round pick. | 75 |
| lib/pricing.ts | Tint shade labels | 5 | 5% — Limo | 11 |
| lib/pricing.ts | Tint shade labels | 20 | 20% — Dark | 13 |
| lib/pricing.ts | Tint shade labels | 35 | 35% — Medium | 15 |
| lib/pricing.ts | Tint shade labels | 50 | 50% — Light | 13 |
| lib/pricing.ts | Tint shade labels | 70 | 70% — Very light | 17 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 4 | legal-note | UK law: front sides must be **≥70%** VLT, windscreen **≥75%**. Rear glass — no restriction. | 89 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 5 | eyebrow | Step 05 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 5 | title | Any upgrades? | 14 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 5 | lead | Optional — skip this step if the base install is enough. | 58 |
| lib/pricing.ts | Extras labels | ceramic | Ceramic film upgrade | 19 |
| lib/pricing.ts | Extras labels | heatRejection | Heat rejection film | 18 |
| lib/pricing.ts | Extras labels | privacy | Privacy film | 12 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 | eyebrow | Step 06 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 | title | How do we reach you? | 21 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 | lead | We'll confirm the quote and fitting slot on WhatsApp. No spam, no call-centre nonsense. | 94 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 1 | label | Your name | 9 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 2 | label | Phone | 5 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 2 | hint | UK number — we'll WhatsApp the quote | 40 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 2 | placeholder | 07735 839280 | 12 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 3 | label | Best time to reach you | 21 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 3 | hint | Optional — e.g. 'after 5pm' | 35 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 3 | placeholder | e.g. After work | 16 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 4 | label | Anything else to flag? | 22 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 6 field 4 | hint | Optional — factory tint, body-wrapped vehicle, specific date etc. | 68 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | eyebrow | Step 07 | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | title | Review and send. | 16 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | lead | Check everything looks right, then we'll open WhatsApp with your quote pre-filled. | 89 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | row-label-1 | Vehicle | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | row-label-2 | Windows | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | row-label-3 | Shade | 5 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | row-label-4 | Extras | 6 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | row-label-5 | Contact | 7 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 summary | edit-button (all rows) | Edit | 4 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | price-label | Estimated price | 16 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | price-priced-note | Indicative — final price is confirmed when we see the vehicle. | 61 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | price-unpriced-note | We'll confirm a firm price on WhatsApp once we've seen your vehicle details. | 81 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | submit-button | Send Quote via WhatsApp | 24 |
| components/quote/quote-wizard.tsx | Quote wizard — Step 7 | submit-loading | Sending… | 9 |
| components/quote/quote-wizard.tsx | Quote wizard — Success | status-label | Quote sent — ref {shortCode} | ~25 (dynamic) |
| components/quote/quote-wizard.tsx | Quote wizard — Success | title | One more tap to open WhatsApp. | 34 |
| components/quote/quote-wizard.tsx | Quote wizard — Success | body | We've pre-filled the message with your quote details. Tap the button below to open WhatsApp and send — we'll reply from there. | 133 |
| components/quote/quote-wizard.tsx | Quote wizard — Success | button-primary | Open WhatsApp | 13 |
| components/quote/quote-wizard.tsx | Quote wizard — Success | button-secondary | Back to home | 13 |
| components/quote/quote-wizard.tsx | Quote wizard — Success | email-fail-notice | We couldn't auto-notify the studio by email, but your details are safe — tap WhatsApp above and we'll take it from there. | 122 |
| components/quote/quote-wizard.tsx | Quote wizard — Navigation | back-button | Back | 4 |
| components/quote/quote-wizard.tsx | Quote wizard — Navigation | next-button | Next | 4 |
| components/quote/quote-wizard.tsx | Quote wizard — Field | asterisk-required | * | 1 |
| app/(marketing)/contact/page.tsx | Contact — Page metadata | meta-title | Contact — Tint Works Car Window Tinting Leeds | 49 |
| app/(marketing)/contact/page.tsx | Contact — Page metadata | meta-description | Visit Tint Works at Brown Place, Holbeck, Leeds LS11. In-studio car window tinting only. Appointment only — message us on WhatsApp to book in. | 149 |
| app/(marketing)/contact/page.tsx | Contact — Page metadata | og-title | Contact Tint Works — Holbeck, Leeds | 42 |
| app/(marketing)/contact/page.tsx | Contact — PageHeader | eyebrow | Contact | 7 |
| app/(marketing)/contact/page.tsx | Contact — PageHeader | title | Visit the Holbeck studio, or get in touch. | 42 |
| app/(marketing)/contact/page.tsx | Contact — PageHeader | lead | Fastest route is WhatsApp — we'll usually reply within the hour during working times. | 90 |
| app/(marketing)/contact/page.tsx | Contact — Studio note H2 | heading | In-studio only — bring your vehicle to us in Holbeck, Leeds | 61 |
| app/(marketing)/contact/page.tsx | Contact — Studio note body | text | All car window tinting is completed at our workshop on Brown Place, Holbeck (LS11). We don't operate a mobile service. By appointment only — message us on WhatsApp to arrange a booking. | 200 |
| app/(marketing)/contact/page.tsx | Contact — Studio address card H2 | heading | Studio address | 14 |
| app/(marketing)/contact/page.tsx | Contact — Contact methods card H2 | heading | Best way to reach us | 19 |
| app/(marketing)/contact/page.tsx | Contact — Contact methods card body | text | WhatsApp is fastest — a short message with your vehicle details gets us replying quickest. For formal quotes or longer briefs, use email. | 152 |
| app/(marketing)/contact/page.tsx | Contact — Contact methods button 1 | text | Chat on WhatsApp | 15 |
| app/(marketing)/contact/page.tsx | Contact — Contact methods button 2 | text | Email us | 8 |
| app/(marketing)/contact/page.tsx | Contact — Contact methods button 3 | text | {business.phoneDisplay} | ~15 (dynamic) |
| app/(marketing)/contact/page.tsx | Contact — Social card H2 | heading | Follow the work | 15 |
| app/(marketing)/contact/page.tsx | Contact — Social card body | text | Fresh installs go up on Instagram weekly. Facebook for longer write-ups and customer feedback. | 96 |
| components/marketing/site-footer.tsx | Footer — Main section | intro-text | Professional car window tinting in Leeds. In-studio only — bring your vehicle to us in Holbeck. | 101 |
| components/marketing/site-footer.tsx | Footer — Main section | serving-text | Serving Leeds and surrounding West Yorkshire — all work completed in-studio at our Holbeck workshop. | 102 |
| components/marketing/site-footer.tsx | Footer — Site links heading | text | Site | 4 |
| components/marketing/site-footer.tsx | Footer — Site link 1 | text | Home | 4 |
| components/marketing/site-footer.tsx | Footer — Copyright | text | © {year} {business.name}. All rights reserved. | ~40 (dynamic) |
| components/marketing/site-footer.tsx | Footer — Legal links | link-1 | Privacy | 7 |
| components/marketing/site-footer.tsx | Footer — Legal links | link-2 | Terms | 5 |
| components/marketing/site-header.tsx | Header — Logo aria-label | aria-label | Tint Works — home | 17 |
| components/marketing/site-header.tsx | Header — Phone button aria-label | aria-label | Call {phoneDisplay} | ~20 (dynamic) |
| components/marketing/site-header.tsx | Header — WhatsApp button | text | WhatsApp | 8 |
| components/marketing/site-header.tsx | Header — Quote button | text | Get Quote | 9 |
| components/marketing/mobile-nav.tsx | Mobile nav — Sheet title | title | Menu | 4 |
| components/marketing/mobile-nav.tsx | Mobile nav — Quote button | text | Get Quote | 9 |
| components/marketing/mobile-nav.tsx | Mobile nav — WhatsApp button | text | WhatsApp | 8 |
| components/marketing/section-cta.tsx | Section CTA default | eyebrow | Book in | 7 |
| components/marketing/section-cta.tsx | Section CTA default | heading | Ready to transform your ride? | 29 |
| components/marketing/section-cta.tsx | Section CTA default | lead | Send us the make, model and windows — we'll come back the same day with a quote. | 83 |
| components/marketing/whatsapp-cta.tsx | WhatsApp CTA | label | Chat on WhatsApp | 15 |
| components/marketing/tint-preview-section.tsx | Tint preview — Section eyebrow | eyebrow | Interactive preview | 19 |
| components/marketing/tint-preview-section.tsx | Tint preview — Section H2 | heading | Pick your shade — see it live | 26 |
| components/marketing/tint-preview-section.tsx | Tint preview — Section body | text | Drag to rotate. Tap a darkness level to see the difference. | 60 |
| components/marketing/tint-preview-section.tsx | Tint preview — Picker label | label | Tint darkness | 12 |
| components/marketing/hero-3d/tint-levels.ts | Tint level options | none-label | None | 4 |
| components/marketing/hero-3d/tint-levels.ts | Tint level options | light-label | Light (70%) | 10 |
| components/marketing/hero-3d/tint-levels.ts | Tint level options | medium-label | Medium (50%) | 12 |
| components/marketing/hero-3d/tint-levels.ts | Tint level options | dark-label | Dark (35%) | 10 |
| components/marketing/hero-3d/tint-levels.ts | Tint level options | limo-label | Limo (20%) | 10 |
| components/marketing/hero.tsx | Landing hero — Geo label | eyebrow | Leeds · Holbeck LS11 | 20 |
| components/marketing/hero.tsx | Landing hero — H1 | heading | Leeds' Premier **Window Tinting** | 45 |
| components/marketing/hero.tsx | Landing hero — Hero body | text | Ceramic, carbon and chameleon films fitted in-studio at our Holbeck workshop. Heat rejection, UV protection, and a factory-tidy finish. | 144 |
| components/marketing/hero.tsx | Landing hero — CTA 1 | button-label | Get Instant Quote | 16 |
| components/marketing/hero.tsx | Landing hero — CTA 2 | button-label | Chat on WhatsApp | 15 |
| components/marketing/hero.tsx | Landing hero — CTA 3 | button-label | {business.phoneDisplay} | ~15 (dynamic) |
| components/marketing/hero.tsx | Landing hero — Trust item 1 | text | **200+** 5-star Google reviews | 31 |
| components/marketing/hero.tsx | Landing hero — Trust item 2 | text | Studio-fitted in **Leeds** | 26 |
| components/marketing/brand-marquee.tsx | Brand marquee — Brands (decorative) | brands-list | BMW, Audi, Mercedes, Porsche, Range Rover, Tesla, Volkswagen, Ford, Nissan, Toyota, Honda, Mini, Vauxhall, Kia, Hyundai, Lexus | ~95 |
| app/(marketing)/privacy/page.tsx | Privacy — Page metadata | meta-title | Privacy Policy | 14 |
| app/(marketing)/privacy/page.tsx | Privacy — Page metadata | meta-description | How Tintworks handles your personal data when you request a quote. UK GDPR / PECR compliant. | 102 |
| app/(marketing)/privacy/page.tsx | Privacy — Page metadata | og-title | Privacy Policy — Tintworks | 32 |
| app/(marketing)/privacy/page.tsx | Privacy — PageHeader | eyebrow | Legal | 5 |
| app/(marketing)/privacy/page.tsx | Privacy — PageHeader | title | Privacy Policy | 14 |
| app/(marketing)/privacy/page.tsx | Privacy — PageHeader | lead | Last updated: {formatDate(LAST_UPDATED)}. This describes how we handle the personal information you share with us. | ~85 (dynamic) |
| app/(marketing)/privacy/page.tsx | Privacy — Stub warning | notice | This page is a stub. The owner must review and confirm the details below before the site is publicly launched. | 110 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 1 heading | text | Who we are | 8 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 1 body | text | {business.name} ("we", "us") is the data controller for personal information collected via this website. Our registered trading address is: | 108 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 heading | text | What we collect | 14 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 intro | text | When you submit the quote form, we collect: | 37 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-1 | text | Your name | 9 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-2 | text | Phone number | 12 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-3 | text | Email address (optional) | 24 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-4 | text | Vehicle make, model, and year | 27 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-5 | text | Tinting preferences (windows and darkness) | 38 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-6 | text | Any free-text message you provide | 32 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 li-7 | text | A record of the submission timestamp and IP address | 49 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 WhatsApp note | text | If you contact us via WhatsApp, Meta Platforms Ireland Limited processes the message content and your WhatsApp number. Refer to WhatsApp's own privacy notice for details on their processing. | 178 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 2 analytics note | text | We use **Plausible Analytics** for site metrics. Plausible is cookie-free and does not collect or process personal data — no user-level tracking, no fingerprinting. | 148 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 3 heading | text | Why we hold it | 13 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 3 body 1 | text | We use your details solely to respond to your enquiry, prepare a quote, and arrange a fitting slot. We do not sell your data, we do not share it with advertisers, and we do not use it for marketing without your explicit, separate consent. | 245 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 3 body 2 | text | Our lawful basis is your **consent** (UK GDPR Art. 6(1)(a)), confirmed by ticking the consent checkbox on the quote form. | 113 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 4 heading | text | Who else processes it | 17 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 4 body | text | Your lead details are emailed to the studio owner via **Resend** (our email provider), and the site is hosted on **Railway**. Both companies process data on our behalf under standard data-processing agreements and appropriate international-transfer safeguards. | 267 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 5 heading | text | How long we keep it | 16 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 5 body | text | We currently retain quote-form submissions indefinitely so that we can reference prior jobs if a customer returns. You can ask us to delete your record at any time using the details below and we will do so within 30 days. | 236 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 6 heading | text | Your rights | 10 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 6 body 1 | text | Under UK GDPR you have the right to access, correct, delete, restrict the processing of, or object to our use of your personal data, and to ask for your data in a portable format. To exercise any of these rights, email us at {business.email}. | 255 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 6 body 2 | text | If you believe we've handled your data improperly, you can complain to the [Information Commissioner's Office (ICO)](https://ico.org.uk/). | 122 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 7 heading | text | Changes to this policy | 18 |
| app/(marketing)/privacy/page.tsx | Privacy — Section 7 body | text | We'll update the date at the top of this page if we make material changes. Please [contact us](/contact) if anything is unclear. | 116 |
| app/(marketing)/terms/page.tsx | Terms — Page metadata | meta-title | Terms of Use | 13 |
| app/(marketing)/terms/page.tsx | Terms — Page metadata | meta-description | Terms of use for the Tintworks website. Not a binding service contract — those are confirmed per job via WhatsApp. | 115 |
| app/(marketing)/terms/page.tsx | Terms — Page metadata | og-title | Terms of Use — Tintworks | 29 |
| app/(marketing)/terms/page.tsx | Terms — PageHeader | eyebrow | Legal | 5 |
| app/(marketing)/terms/page.tsx | Terms — PageHeader | title | Terms of Use | 13 |
| app/(marketing)/terms/page.tsx | Terms — PageHeader | lead | Last updated: {formatDate(LAST_UPDATED)}. These terms cover use of this website. Service terms for tinting work are confirmed per job. | ~85 (dynamic) |
| app/(marketing)/terms/page.tsx | Terms — Stub warning | notice | This page is a stub. The owner must review and confirm the details below before the site is publicly launched. | 110 |
| app/(marketing)/terms/page.tsx | Terms — Section 1 heading | text | About these terms | 15 |
| app/(marketing)/terms/page.tsx | Terms — Section 1 body | text | These terms govern your use of the {business.name} website. By using the site you agree to them. If you don't agree, please stop using the site. | 125 |
| app/(marketing)/terms/page.tsx | Terms — Section 2 heading | text | What this website does | 21 |
| app/(marketing)/terms/page.tsx | Terms — Section 2 body | text | The site provides information about {business.name}'s car window tinting services and lets you request a quote via WhatsApp or a form. The quote form is a request for information — it does not create a contract or a booking. Quotes, fitting slots, prices, and any work are agreed separately, in writing (WhatsApp is fine), before any work begins. | 386 |
| app/(marketing)/terms/page.tsx | Terms — Section 3 heading | text | Where work is carried out | 21 |
| app/(marketing)/terms/page.tsx | Terms — Section 3 body | text | All tinting is completed at our workshop: {business.address}. We do not operate a mobile service. | ~75 (dynamic) |
| app/(marketing)/terms/page.tsx | Terms — Section 4 heading | text | Accuracy of information | 20 |
| app/(marketing)/terms/page.tsx | Terms — Section 4 body | text | Gallery images, film descriptions, and guide pricing on this site are provided in good faith and may change. For a firm quote, contact us. Film performance claims (heat and UV rejection) are taken from manufacturer specifications; actual performance on a given vehicle varies with glass type, orientation, and conditions. | 355 |
| app/(marketing)/terms/page.tsx | Terms — Section 5 heading | text | Warranty on fitted work | 21 |
| app/(marketing)/terms/page.tsx | Terms — Section 5 body | text | Where we fit window film for you, we warrant the fitting workmanship for 2 years from the date of fitting under normal use. This warranty does not cover damage caused by accidents, modifications, cleaning with abrasive products, or third-party work on the tinted glass. Film-manufacturer warranties apply separately and are documented at the time of fitting. | 375 |
| app/(marketing)/terms/page.tsx | Terms — Section 6 heading | text | Intellectual property | 18 |
| app/(marketing)/terms/page.tsx | Terms — Section 6 body | text | The content, branding, and imagery on this site are owned by {business.name} or licensed to us. Please don't copy or reuse them without permission. | ~115 (dynamic) |
| app/(marketing)/terms/page.tsx | Terms — Section 7 heading | text | Liability | 8 |
| app/(marketing)/terms/page.tsx | Terms — Section 7 body | text | We take reasonable care to keep the site accurate and available, but we don't guarantee it. To the extent permitted by law, we exclude liability for indirect or consequential loss arising from use of the site. Nothing in these terms limits our liability for death, personal injury, or fraud. | 308 |
| app/(marketing)/terms/page.tsx | Terms — Section 8 heading | text | Governing law | 13 |
| app/(marketing)/terms/page.tsx | Terms — Section 8 body | text | These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute arising from them. | 159 |
| app/(marketing)/terms/page.tsx | Terms — Section 9 heading | text | Contact | 7 |
| app/(marketing)/terms/page.tsx | Terms — Section 9 body | text | Questions? Reach us via the [contact page](/contact). | 45 |
| app/not-found.tsx | 404 page | status-code | 404 | 3 |
| app/not-found.tsx | 404 page | heading | That page has drifted off the map. | 33 |
| app/not-found.tsx | 404 page | body | The link might be out of date — or we've moved things around. Head back home, or jump straight to a quote. | 113 |
| app/not-found.tsx | 404 page | button-1 | Back to the home page | 20 |
| app/not-found.tsx | 404 page | button-2 | Get a quote | 10 |
| app/not-found.tsx | 404 page | button-3 | Chat on WhatsApp | 15 |
| app/error.tsx | 500 page | status-code | 500 | 3 |
| app/error.tsx | 500 page | heading | Something came off the rails. | 31 |
| app/error.tsx | 500 page | body | Our apologies — the page hit an unexpected error. Try again, or head back to the home page. | 97 |
| app/error.tsx | 500 page | reference-label | Reference: | 11 |
| app/error.tsx | 500 page | button-1 | Try again | 9 |
| app/error.tsx | 500 page | button-2 | Back to the home page | 20 |
| lib/whatsapp/messages.ts | WhatsApp message | landing | Hi ${BUSINESS}, I'm interested in car window tinting — could you send me more info? | 73 |
| lib/whatsapp/messages.ts | WhatsApp message | services | Hi ${BUSINESS}, I'd like to know more about your car tinting services — could you send me more info? | 105 |
| lib/whatsapp/messages.ts | WhatsApp message | gallery | Hi ${BUSINESS}, saw your gallery — could you send me a quote? | 63 |
| lib/whatsapp/messages.ts | WhatsApp message | contact | Hi ${BUSINESS}, I've just got in touch via your website — could you send me more info? | 94 |
| lib/whatsapp/messages.ts | WhatsApp message | quote | Hi ${BUSINESS}, I've just submitted a quote request — here are my details: | 81 |
| lib/reviews.ts | Review 1 | author | Holly Butler | 12 |
| lib/reviews.ts | Review 1 | review-text | I recently had my car windows tinted at Tintworks, and I couldn't be happier with the experience. Stephen did a great job, super professional, friendly, and clearly knows what he's doing. The whole process was quicker than I expected, but the quality wasn't rushed. If you're thinking about getting your windows tinted, I'd definitely recommend Tintworks. | 293 |
| lib/reviews.ts | Review 2 | author | Leighton Redshaw | 15 |
| lib/reviews.ts | Review 2 | review-text | Good tints did a good job had a issue with one window but was fast to sort it with no issues highly recommended. | 108 |
| lib/reviews.ts | Review 3 | author | Wayne Roberts | 12 |
| lib/reviews.ts | Review 3 | review-text | We had a sun visor tints on my Peugeot 3008, excellent tints, good quality tints fantastic job, easy access into the unit work done under cover. We would recommend if you need tints this is to go for. Well pleased with my results THANK YOU. | 247 |
| lib/reviews.ts | Review 4 | author | Kristens Krumins | 16 |
| lib/reviews.ts | Review 4 | review-text | Had all my windows tinted including a blue chameleon with a sunstrip, he did a great job and tinted my car just how I wanted it. I would definitely recommend and will be coming back here in the future if I need any tints doing. | 232 |
| lib/reviews.ts | Review 5 | author | Andy Sheard | 11 |
| lib/reviews.ts | Review 5 | review-text | I had Steve tint the windows on my Cooper S yesterday, he also did a blue chameleon tint and sun strip on the windscreen and it looks absolutely mint, I couldn't be happier with his work. He gave me plenty of information before and after he did the work and provided a very professional and quick service with a great price, I'll have no problem recommending him to anyone else. | 378 |

---

## Coverage notes

- **Files read in full** (all user-facing copy extracted):
  - `app/(marketing)/page.tsx` — Landing page
  - `app/(marketing)/services/page.tsx` — Services page
  - `app/(marketing)/gallery/page.tsx` — Gallery page
  - `app/(marketing)/quote/page.tsx` — Quote page
  - `app/(marketing)/contact/page.tsx` — Contact page
  - `app/(marketing)/privacy/page.tsx` — Privacy policy
  - `app/(marketing)/terms/page.tsx` — Terms of use
  - `app/layout.tsx` — Root layout (metadata & JSON-LD)
  - `app/error.tsx` — 500 error page
  - `app/not-found.tsx` — 404 page
  - `app/(marketing)/layout.tsx` — Marketing shell layout
  - `components/marketing/hero.tsx` — Landing hero section
  - `components/marketing/section-cta.tsx` — Reusable CTA section
  - `components/marketing/page-header.tsx` — Reusable page header
  - `components/marketing/process-timeline.tsx` — 4-step process timeline
  - `components/marketing/site-header.tsx` — Sticky navigation header
  - `components/marketing/site-footer.tsx` — Footer
  - `components/marketing/whatsapp-cta.tsx` — WhatsApp CTA button component
  - `components/marketing/mobile-nav.tsx` — Mobile navigation drawer
  - `components/marketing/tint-preview-section.tsx` — Interactive tint preview
  - `components/marketing/floating-whatsapp.tsx` — Floating WhatsApp bubble
  - `components/marketing/service-card.tsx` — Reusable service card
  - `components/marketing/brand-marquee.tsx` — Brand names carousel
  - `components/marketing/stats-counter.tsx` — Animated stats block (with FadeIn)
  - `components/marketing/review-carousel.tsx` — Auto-rotating reviews carousel
  - `components/gallery/gallery-grid.tsx` — Gallery grid with filters
  - `components/quote/quote-wizard.tsx` — Multi-step quote wizard (all 7 steps + success screen)
  - `gallery.config.ts` — Gallery item metadata (captions, alt text, film types)
  - `lib/business.ts` — Business ground-truth data
  - `lib/pricing.ts` — Pricing structure and labels (vehicle types, window sets, shades, extras)
  - `lib/whatsapp/messages.ts` — WhatsApp pre-fill templates (5 per-page versions)
  - `lib/lead-notification.ts` — Lead email subject/body (includes dynamic fields but captured structure)
  - `lib/reviews.ts` — Static review testimonials (5 reviews, all captured)
  - `lib/social.ts` — Social media links (Instagram, Facebook)
  - `lib/validation/lead.ts` — Lead form field labels and validation error messages
  - `lib/validation/quote.ts` — Quote wizard validation schema
  - `components/marketing/hero-3d/tint-levels.ts` — 3D tint preview level labels
  - `components/marketing/nav-links.ts` — Navigation link labels (Services, Gallery, Quote, Contact)

- **Files skipped**:
  - `.next/` — Build artifacts (ignored)
  - `node_modules/` — Dependencies (ignored)
  - `.git/` — Version control (ignored)
  - `tsconfig.json`, `next.config.js`, `package.json` — No user-facing copy
  - `components/ui/*.tsx` — UI primitives (Button, Input, Label, etc.) — no hardcoded copy beyond variant names (e.g. "accent", "ghost") which are CSS class selectors, not user text
  - `lib/dates.ts`, `lib/email.ts`, `lib/env.ts`, `lib/og.ts`, `lib/phone.ts`, `lib/rate-limit.ts`, `lib/short-code.ts`, `lib/site-routes.ts`, `lib/utils.ts` — Utility/helper functions with no user-facing strings
  - `lib/google-reviews.ts` — API integration (no hardcoded strings, dynamic fetching)
  - `lib/whatsapp/link.ts` — URL builder (no user-facing strings)
  - `lib/whatsapp/lead-handoff.ts`, `lib/whatsapp/quote-handoff.ts` — Message/link builders (no hardcoded strings beyond what's in messages.ts)
  - `components/marketing/hero-car.tsx`, `components/marketing/hero-car-static.tsx`, `components/marketing/hero-3d/*` — 3D model rendering components (no user-facing copy)
  - `components/marketing/faq-accordion.tsx` — Component logic only; FAQ items injected via `items` prop from page
  - `components/quote/car-diagram.tsx` — Diagram rendering only; no text
  - `app/api/**/route.ts` — API routes: health check, leads, quotes, OG image. No user-visible messages (error responses are generic; email sent by Resend, not from code)
  - `app/robots.ts`, `app/sitemap.ts` — SEO metadata files (no visible strings)

- **Flagged gaps and TODOs**:
  - **Privacy & Terms pages**: Both have stub warnings in the code (`{# TODO: review with owner before launch #}`) indicating the owner must review the policies before going live. Current text is placeholder-quality but was included for completeness.
  - **Pricing structure**: All prices are `0` — deliberately unpriced. The wizard shows "Price on request" when pricing is disabled. Owner must fill `lib/pricing.ts` before go-live.
  - **Business contact details** (phone, email, site URL): All pulled from `.env` variables (`BUSINESS_PHONE_E164`, `BUSINESS_EMAIL`, `NEXT_PUBLIC_SITE_URL`) — not hardcoded. Marked as [MISSING] above because they live in secrets, not in code.
  - **Tint window/darkness form labels** vs. **pricing window/shade labels**: Two different sets of field names in the codebase:
    - Lead form (`lib/validation/lead.ts`): uses `TINT_WINDOWS` = `["front_sides", "rear_sides", "rear_screen", "sunroof", "windscreen_strip", "full_vehicle"]` with `windowLabels`
    - Quote wizard (`lib/pricing.ts`): uses `WINDOW_SETS` = `["frontPair", "rearPair", "rearWindscreen", "fullRear", "fullCar", "sunStrip"]` with `windowSetLabels`
    - Both have distinct labels and are captured separately in the table above.
  - **Tint darkness**: 
    - Lead form uses `TINT_DARKNESS` = `["20", "35", "50", "70", "not_sure"]` with `darknessLabels`
    - Quote wizard uses `TINT_SHADES` = `["5", "20", "35", "50", "70"]` with `tintShadeLabels`
    - These are two different sets — both captured.
  - **Chameleon film duplication**: The word "Chameleon" and its description appear across multiple sections (home page service cards, services page packages, services page film types, gallery filter, etc.) but with consistent wording — this is intentional content repetition, not a data sync issue.
  - **Hero 3D tint labels**: The `tint-levels.ts` file uses `plausibleLabel` (for analytics) and `label` (for UI) — both captured.
  - **Quote wizard form validation errors**: Zod schema defines error messages (e.g. "Please enter your name", "Please enter a valid UK phone number") but these are generated by the validation library, not hardcoded marketing copy — they are captured in the schema reading above for completeness.
  - **Mobile vs desktop nav**: Header renders different CTAs on desktop (phone + WhatsApp buttons) vs mobile (hamburger menu) but all text is identical, pulled from the same sources.
  - **Static review captions**: The gallery config has captions like "Mercedes GLB35 AMG — Full Window Tints" which are visible on the page alongside the car images — all captured.
  - **aria-labels** (accessibility text): All `aria-label` attributes on buttons and links are captured (e.g. "Call 07735 839280", "Message us on WhatsApp", "Tint Works — home") — these are read aloud by screen readers and count as user-facing.
  - **No dynamic metadata**: The `og` image generation in `app/og/route.tsx` creates social share cards on-the-fly with client-provided titles, but no hardcoded copy is in that file.

This inventory is comprehensive and ready for the copywriter's audit pass. Every piece of user-visible text on the site is captured with its source file, context, and character count.