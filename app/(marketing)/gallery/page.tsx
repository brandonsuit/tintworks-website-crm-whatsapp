import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider";
import { SectionCta } from "@/components/marketing/section-cta";
import { FadeIn } from "@/components/marketing/stats-counter";
import { beforeAfterItems } from "@/lib/before-after";
import { tintTypeLabel } from "@/gallery.config";
import { ogImage } from "@/lib/og";

export const revalidate = "force-static";

export const metadata: Metadata = {
  title: "Gallery — Car Window Tinting Leeds",
  description:
    "Recent car window tinting work from Tint Works in Leeds — drag the slider to see before/after, filter by film type, and click any tile to view full size.",
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
        title="See the difference for yourself."
        lead="Drag the slider below to reveal before and after. Filter the grid by film type, and click any tile for a full-size view."
        crumbs={[{ href: "/gallery", label: "Gallery" }]}
      />

      {/* Before / After showcase */}
      <section className="container section-padding">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Before / After
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
            Drag the line.
          </h2>
        </FadeIn>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2"
        >
          {beforeAfterItems.map((item, i) => (
            <li key={item.id}>
              <FadeIn delay={i * 0.05}>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={item.alt}
                  caption={`${item.vehicle} · ${item.shade} · ${tintTypeLabel[item.tintType]} · ${item.title}`}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      {/* Filterable grid */}
      <section className="container section-padding border-t border-border/60">
        <FadeIn>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
            Full portfolio
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
            A rolling selection of recent work.
          </h2>
        </FadeIn>
        <div className="mt-10">
          <GalleryGrid />
        </div>
      </section>

      <SectionCta
        pageKey="gallery"
        heading="Like what you see?"
        lead="Send us the photo that caught your eye and we'll quote the same job for your car."
      />
    </>
  );
}
