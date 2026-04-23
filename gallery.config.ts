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

export type TintType = "ceramic" | "carbon" | "limo-black" | "sun-strip" | "chameleon";

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
    src: "/gallery/lamborghini-gallardo.jpg",
    alt: "Lamborghini Gallardo — 2 windows tinted at 35% by Tintworks Leeds",
    caption: "Lamborghini Gallardo — 2 Windows 35%",
    tintType: "ceramic",
  },
  {
    src: "/gallery/vw-golf.jpg",
    alt: "Volkswagen Golf — full window tint in Tintworks studio Leeds",
    caption: "Volkswagen MK8 — Rear Window Tints",
    tintType: "ceramic",
  },
  {
    src: "/gallery/bmw-1-series.jpg",
    alt: "BMW 1 Series — full window tint in Tintworks studio Leeds",
    caption: "BMW 1 Series — Full Window Tinting",
    tintType: "ceramic",
  },
  {
    src: "/gallery/bmw-x3.jpg",
    alt: "BMW X3 — rear window tint in Tintworks studio Leeds",
    caption: "BMW X3 — Rear Window Tints",
    tintType: "ceramic",
  },
  {
    src: "/gallery/seat-leon-cupra.jpg",
    alt: "SEAT Leon Cupra 290 — full window tint in Tintworks studio Leeds",
    caption: "SEAT Leon Cupra 290 — Full Window Tinting",
    tintType: "ceramic",
  },
  {
    src: "/gallery/ford-transit.jpg",
    alt: "Ford Transit Custom — pink haze chameleon windscreen tint by Tintworks Leeds",
    caption: "Transit Custom — Pink Haze Chameleon Windscreen",
    tintType: "chameleon",
  },
  {
    src: "/gallery/audi-tt.jpg",
    alt: "Audi TT Coupe — full window tint in Tintworks studio Leeds",
    caption: "Audi TT Coupe — Full Window Tints",
    tintType: "ceramic",
  },
];

export const tintTypeLabel: Record<TintType, string> = {
  ceramic: "Ceramic",
  carbon: "Carbon",
  "limo-black": "Limo black",
  "sun-strip": "Sun strip",
  chameleon: "Chameleon",
};
