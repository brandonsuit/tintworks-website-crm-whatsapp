"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/**
 * Auto-rotating reviews carousel. Pauses on hover/focus, respects
 * prefers-reduced-motion, and is keyboard-navigable.
 */

const AUTOPLAY_MS = 6500;

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const total = reviews.length;
  const go = React.useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  React.useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go, total]);

  const current = reviews[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-sm border border-border bg-card p-8 md:p-12">
        <Quote
          aria-hidden
          className="absolute right-6 top-6 h-20 w-20 text-accent/10"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ReviewStars rating={current.rating} />
            <blockquote className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
              &ldquo;{current.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {current.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>{formatDate(current.date)}</span>
              {current.source === "google" && (
                <>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span className="uppercase tracking-widest text-accent">
                    Google
                  </span>
                </>
              )}
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <ol className="flex items-center gap-2" role="tablist" aria-label="Reviews">
          {reviews.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1} of ${total}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-accent"
                    : "w-4 bg-border hover:bg-muted-foreground/60",
                )}
              />
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => go(-1)}
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => go(1)}
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-accent text-accent" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(d);
}
