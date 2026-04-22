# Before first deploy

This file is duplicated into the README during Group 6. Keep both in sync if edited.

## ⚠ Deploy-blockers

- [ ] **Swap placeholder gallery images** in `public/gallery/` with real photos. See `gallery.config.ts` for the expected shape (file path, recommended dimensions, `tintType` values).

- [ ] **Replace the Google Business Profile link** on the landing-page reviews block (`app/(marketing)/page.tsx` — grep for `TODO: Google Business Profile`).

- [ ] **Verify Resend sender domain** (see README for DNS records).

- [ ] **Swap `NEXT_PUBLIC_SITE_URL`** to the custom domain when DNS cuts over.
