/**
 * Gallery content source. Hard-coded for v1 — no CMS, no database.
 *
 * When the real photos land:
 *   1. Drop the files into public/gallery/ (sizes 1600×1200 or similar 4:3).
 *   2. Swap each `src` below to a local path like "/gallery/automotive-01.jpg".
 *   3. Update `alt` + `caption`; keep `category` one of
 *      "automotive" | "residential" | "commercial".
 *
 * Placeholder images via picsum.photos (seeded so each entry renders the
 * same image on reload). next.config.js already allowlists picsum.photos
 * and fastly.picsum.photos for <Image> remotePatterns.
 */

export type GalleryCategory = "automotive" | "residential" | "commercial";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
};

export const galleryCategories: { key: GalleryCategory; label: string }[] = [
  { key: "automotive", label: "Car tinting" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
];

export const galleryItems: GalleryItem[] = [
  {
    src: "https://picsum.photos/seed/tintworks-auto-1/1600/1200",
    alt: "Placeholder — car window tint, driver side",
    caption: "Ceramic 20% — BMW 3 Series",
    category: "automotive",
  },
  {
    src: "https://picsum.photos/seed/tintworks-auto-2/1600/1200",
    alt: "Placeholder — rear glass tint finish",
    caption: "Rear glass ceramic tint — Mercedes GLC",
    category: "automotive",
  },
  {
    src: "https://picsum.photos/seed/tintworks-auto-3/1600/1200",
    alt: "Placeholder — full-vehicle tint completed",
    caption: "Full tint, 5-window package",
    category: "automotive",
  },
  {
    src: "https://picsum.photos/seed/tintworks-res-1/1600/1200",
    alt: "Placeholder — residential lounge window film",
    caption: "Privacy film, lounge windows — Leeds LS8",
    category: "residential",
  },
  {
    src: "https://picsum.photos/seed/tintworks-res-2/1600/1200",
    alt: "Placeholder — bedroom solar film",
    caption: "Solar control film, south-facing bedroom",
    category: "residential",
  },
  {
    src: "https://picsum.photos/seed/tintworks-res-3/1600/1200",
    alt: "Placeholder — conservatory UV film",
    caption: "UV-reduction film for conservatory",
    category: "residential",
  },
  {
    src: "https://picsum.photos/seed/tintworks-com-1/1600/1200",
    alt: "Placeholder — office privacy tint on meeting-room glass",
    caption: "Frosted privacy film — office meeting room",
    category: "commercial",
  },
  {
    src: "https://picsum.photos/seed/tintworks-com-2/1600/1200",
    alt: "Placeholder — shopfront solar film",
    caption: "Solar film for shopfront, reduced glare",
    category: "commercial",
  },
  {
    src: "https://picsum.photos/seed/tintworks-com-3/1600/1200",
    alt: "Placeholder — branded window graphic with tint",
    caption: "Tint + branded vinyl, Leeds city-centre premises",
    category: "commercial",
  },
];
