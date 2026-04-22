import Link from "next/link";
import Image from "next/image";

import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/gallery.config";
import { cn } from "@/lib/utils";

/**
 * Server-rendered gallery with category filter via `?category=<key>`.
 *
 * Filter links use <Link> — category switches are a full navigation so
 * there's no hydration cost and the URL is shareable + back-button friendly.
 */

type ParsedCategory = GalleryCategory | "all";

function parseCategory(value: string | undefined): ParsedCategory {
  if (
    value === "automotive" ||
    value === "residential" ||
    value === "commercial"
  ) {
    return value;
  }
  return "all";
}

export function GalleryGrid({ category }: { category?: string }) {
  const active: ParsedCategory = parseCategory(category);
  const items =
    active === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <div>
      <nav
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2"
      >
        <FilterPill href="/gallery" label="All work" active={active === "all"} />
        {galleryCategories.map(({ key, label }) => (
          <FilterPill
            key={key}
            href={`/gallery?category=${key}`}
            label={label}
            active={active === key}
          />
        ))}
      </nav>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No images in this category yet.
        </p>
      ) : (
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
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
                    {item.category}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent/15 text-accent"
          : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}
