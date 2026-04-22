# Before first deploy

This file is duplicated into the README during Group 6. Keep both in sync if edited.

## ⚠ Deploy-blockers

- [ ] **Confirm real opening hours** in [`lib/business.ts`](lib/business.ts). The current values (`Mon–Fri 9–6, Sat 10–4, Sun closed`) are placeholder and will be published in:
  - The site footer
  - `LocalBusiness` / `AutomotiveBusiness` JSON-LD (Google uses this for the Maps panel + local pack)
  - Any future Google Business Profile auto-sync
  Wrong hours here mean wrong hours on Google search results.

- [ ] **Swap placeholder gallery images** in `public/gallery/` with real photos. See `gallery.config.ts` for the expected shape.

- [ ] **Verify Resend sender domain** (see README for DNS records).

- [ ] **Swap `NEXT_PUBLIC_SITE_URL`** to the custom domain when DNS cuts over.
