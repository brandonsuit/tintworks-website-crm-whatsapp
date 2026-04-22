import Image from "next/image";

import { galleryItems, tintTypeLabel } from "@/gallery.config";

/**
 * Server-rendered gallery grid. v1 shows every item ungrouped; the
 * `tintType` badge per tile hints at the film used. A future filter UI
 * can read `galleryItems[*].tintType` without needing a data migration.
 */
export function GalleryGrid() {
  if (galleryItems.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No images yet.</p>
    );
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {galleryItems.map((item) => (
        <li key={item.src}>
          <figure className="group overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 p-4 text-sm">
              <span className="text-foreground">{item.caption}</span>
              <span className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                {tintTypeLabel[item.tintType]}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
