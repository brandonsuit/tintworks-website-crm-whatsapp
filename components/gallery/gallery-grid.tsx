"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { galleryItems, tintTypeLabel, type TintType, type GalleryItem } from "@/gallery.config";
import { cn } from "@/lib/utils";

/**
 * Filterable gallery grid + click-to-open lightbox. All client-side —
 * the grid animates when the filter changes and opens a modal viewer
 * with keyboard navigation (Esc to close, Arrow keys to step).
 */

type Filter = "all" | TintType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ceramic", label: "Ceramic" },
  { value: "carbon", label: "Carbon" },
  { value: "limo-black", label: "Limo" },
  { value: "sun-strip", label: "Sun strip" },
];

export function GalleryGrid() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const items = React.useMemo(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((i) => i.tintType === filter),
    [filter],
  );

  const closeLightbox = React.useCallback(() => setLightboxIndex(null), []);
  const stepLightbox = React.useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((i) => {
        if (i === null) return i;
        const next = (i + dir + items.length) % items.length;
        return next;
      });
    },
    [items.length],
  );

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") stepLightbox(1);
      else if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, stepLightbox]);

  // Lock body scroll while lightbox is open.
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  if (galleryItems.length === 0) {
    return <p className="text-sm text-muted-foreground">No images yet.</p>;
  }

  return (
    <div>
      <ul
        role="tablist"
        aria-label="Filter gallery"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <li key={f.value}>
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-sm border px-4 py-1.5 font-display text-sm uppercase tracking-wider transition-colors",
                  active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            </li>
          );
        })}
      </ul>

      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence initial={false}>
          {items.map((item, idx) => (
            <motion.li
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group block w-full overflow-hidden rounded-sm border border-border bg-card text-left transition-colors hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <figure>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 p-4 text-sm">
                    <span className="text-foreground">{item.caption}</span>
                    <span className="shrink-0 rounded-sm border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                      {tintTypeLabel[item.tintType]}
                    </span>
                  </figcaption>
                </figure>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Lightbox
        open={lightboxIndex !== null}
        item={lightboxIndex !== null ? items[lightboxIndex] : null}
        onClose={closeLightbox}
        onPrev={() => stepLightbox(-1)}
        onNext={() => stepLightbox(1)}
        total={items.length}
        index={lightboxIndex}
      />
    </div>
  );
}

function Lightbox({
  open,
  item,
  onClose,
  onPrev,
  onNext,
  total,
  index,
}: {
  open: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  index: number | null;
}) {
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-sm border border-border bg-background p-2 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.figure
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[86vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="rounded-sm object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>{item.caption}</span>
              {index !== null && (
                <span className="text-xs uppercase tracking-widest">
                  {index + 1} / {total}
                </span>
              )}
            </figcaption>
          </motion.figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-background p-3 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-background p-3 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
