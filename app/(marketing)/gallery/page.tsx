import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { SectionCta } from "@/components/marketing/section-cta";

export const metadata: Metadata = {
  title: "Our Work — Window Tinting Gallery Leeds",
  description:
    "Recent window tinting work from Tintworks in Leeds — car tints, residential film, and commercial jobs. Filter by category to see examples.",
  alternates: { canonical: "/gallery" },
};

/**
 * Gallery page. The category filter is URL-param-driven (`?category=...`),
 * so server-rendered filter links drive the state — no client JS needed
 * for navigation. Images are placeholders from picsum for v1; swap to real
 * photos via gallery.config.ts when they land.
 *
 * Next 15 makes `searchParams` a Promise — awaited below before passing
 * the category string on to the grid.
 */
export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Recent work from the Holbeck studio."
        lead="A rotating selection of car, residential, and commercial jobs. Filter by category below."
        crumbs={[{ href: "/gallery", label: "Gallery" }]}
      />

      <section className="container pb-8">
        <GalleryGrid category={category} />
        <p className="mt-6 text-xs text-muted-foreground">
          {/* {# TODO: swap placeholder images in public/gallery/ — see gallery.config.ts #} */}
          Images shown are placeholders until the real gallery lands.
        </p>
      </section>

      <SectionCta
        pageKey="gallery"
        heading="Like something you've seen?"
        lead="Send us the photo that caught your eye and we'll quote the same job for you."
      />
    </>
  );
}
