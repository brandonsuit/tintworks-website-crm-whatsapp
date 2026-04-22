"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Draggable before/after reveal. Pointer + touch + keyboard all supported.
 * Keyboard: Left/Right arrows to nudge 2% at a time, Home/End to jump to
 * the ends, 0–9 to set in 10% increments.
 */

export type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  caption,
  className,
}: BeforeAfterSliderProps) {
  const [pct, setPct] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, raw)));
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPct((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPct((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPct(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPct(100);
    } else if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      setPct(Number(e.key) * 10);
    }
  };

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] select-none overflow-hidden rounded-sm border border-border bg-card"
        onPointerDown={(e) => {
          e.preventDefault();
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
      >
        {/* After (underneath, fully visible) */}
        <Image
          src={afterSrc}
          alt={`${alt} — after`}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
          draggable={false}
        />
        {/* Before (on top, clipped to left of the handle) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={`${alt} — before`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Badges */}
        <span className="absolute left-3 top-3 rounded-sm border border-white/30 bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-sm border border-accent/50 bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
          After
        </span>

        {/* Divider line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-accent shadow-[0_0_12px_hsl(var(--accent))]"
          style={{ left: `${pct}%` }}
        />

        {/* Handle */}
        <button
          type="button"
          role="slider"
          aria-label="Drag to reveal before or after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${Math.round(pct)}% before`}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
            updateFromClientX(e.clientX);
          }}
          className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent bg-background text-accent shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ left: `${pct}%` }}
        >
          <ChevronLeft className="-mr-1 h-4 w-4" aria-hidden />
          <GripVertical className="h-4 w-4" aria-hidden />
          <ChevronRight className="-ml-1 h-4 w-4" aria-hidden />
        </button>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
