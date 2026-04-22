import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { SectionCta } from "@/components/marketing/section-cta";

export const metadata: Metadata = {
  title: "Gallery — Car Window Tinting Leeds",
  description:
    "Recent car window tinting work from Tintworks in Leeds — ceramic, carbon, limo-black, and sun strips. Fitted in-studio at our Holbeck workshop.",
  alternates: { canonical: "/gallery" },
};

/**
 * Gallery page. v1 shows every gallery item ungrouped, with the film type
 * (ceramic / carbon / limo black / sun strip) as a badge per tile. A
 * future filter UI can drop straight into components/marketing/gallery-grid.tsx
 * — `tintType` is already captured per entry in gallery.config.ts.
 */
export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Recent tints from the Holbeck studio."
        lead="A rotating selection of ceramic, carbon, limo-black, and sun-strip work."
        crumbs={[{ href: "/gallery", label: "Gallery" }]}
      />

      <section className="container pb-8">
        <GalleryGrid />
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
