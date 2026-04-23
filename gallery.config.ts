/**
 * Gallery content source. Hard-coded for v1 — no CMS, no database.
 *
 * ─── How to swap in real photos ────────────────────────────────────────
 *   1. Drop files into `public/gallery/` (use a naming convention like
 *      `tint-ceramic-bmw-01.jpg`). Recommended dimensions: 1600×1200
 *      (4:3 ratio) so they sit neatly in the grid without cropping.
 *      Keep each image under ~300 KB — compress with something like
 *      Squoosh.app or `cwebp` to keep the page fast.
 *
 *   2. Swap each `src` below to a local path, e.g.
 *      `/gallery/tint-ceramic-bmw-01.jpg`.
 *
 *   3. Update `alt` (written description for screen readers + SEO),
 *      `caption` (short visible label under the image), and `tintType`
 *      (one of the TintType values below).
 *
 *   4. Remove the picsum allowlist in `next.config.js` once every item
 *      points at a local path — it's only there for placeholders.
 *
 *   5. Order matters: entries render top-to-bottom on the gallery page
 *      and the first three are teased on the landing.
 *
 * The `tintType` field is retained (even though the gallery page no
 * longer filters by it in v1) so that adding a tint-type filter later
 * is a cheap UI change, not a data migration.
 */

export type TintType = "ceramic" | "carbon" | "limo-black" | "sun-strip";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tintType: TintType;
  type?: "image" | "video";
  poster?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/glb35-front.jpg",
    alt: "Mercedes GLB35 AMG — front three-quarter view after full ceramic tint, Tintworks studio Leeds",
    caption: "Mercedes GLB35 AMG — Full Window Tints",
    tintType: "ceramic",
  },
  {
    src: "/gallery/audi-tt.jpg",
    alt: "Audi TT Coupe — full window tint in Tintworks studio Leeds",
    caption: "Audi TT Coupe — Full Window Tints",
    tintType: "ceramic",
  },
  {
    src: "/gallery/vw-golf.jpg",
    alt: "Volkswagen Golf — full window tint in Tintworks studio Leeds",
    caption: "Volkswagen Golf — Full Window Tints",
    tintType: "ceramic",
  },
  {
    src: "https://picsum.photos/seed/tintworks-05/1600/1200",
    alt: "Placeholder — carbon film on van rear windows",
    caption: "Carbon rear tint — Ford Transit Custom",
    tintType: "carbon",
  },
  {
    src: "https://picsum.photos/seed/tintworks-06/1600/1200",
    alt: "Placeholder — limo-black rear tint on SUV",
    caption: "Limo black — rear package on Range Rover",
    tintType: "limo-black",
  },
  {
    src: "https://picsum.photos/seed/tintworks-07/1600/1200",
    alt: "Placeholder — limo-black privacy tint on rear glass",
    caption: "Limo black — privacy pack on VW Transporter",
    tintType: "limo-black",
  },
  {
    src: "https://picsum.photos/seed/tintworks-08/1600/1200",
    alt: "Placeholder — windscreen sun strip",
    caption: "Sun strip — reduces low-sun glare",
    tintType: "sun-strip",
  },
  {
    src: "https://picsum.photos/seed/tintworks-09/1600/1200",
    alt: "Placeholder — close-up windscreen sun strip detail",
    caption: "Sun strip detail — precision cut edge",
    tintType: "sun-strip",
  },
];

export const tintTypeLabel: Record<TintType, string> = {
  ceramic: "Ceramic",
  carbon: "Carbon",
  "limo-black": "Limo black",
  "sun-strip": "Sun strip",
};
