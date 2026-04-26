import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionCta } from "@/components/marketing/section-cta";
import { FadeIn } from "@/components/marketing/stats-counter";
import { ogImage } from "@/lib/og";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Gallery — Car Window Tinting Leeds",
  description:
    "Recent car window tinting work from Tint Works in Leeds — filter the grid by film type, and click any tile to view full size.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Tint Works",
    images: [ogImage("Gallery — Tint Works")],
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Recent tints, fitted in Holbeck."
        lead="Every car here came through our Holbeck bay (LS11). Filter by film type, click any tile for a full-size view."
        crumbs={[{ href: "/gallery", label: "Gallery" }]}
      />

      {/* Filterable grid */}
      <section className="container section-padding">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Recent work
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
            What we've been fitting.
          </h2>
        </FadeIn>
        <div className="mt-10">
          <GalleryGrid />
        </div>
      </section>

      <SectionCta
        pageKey="gallery"
        heading="See one you'd want on your car?"
        lead="Send us the picture that caught your eye. We'll come back with pricing for the same job on yours."
      />
    </>
  );
}
