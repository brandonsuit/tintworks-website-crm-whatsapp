"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { TINT_LEVELS } from "./tint-levels";
import { useTint } from "./tint-context";
import { useEnable3D } from "./use-enable-3d";

/**
 * Five-button tint-darkness picker. Sits between the hero's CTA row
 * and the trust badges. Active button uses the accent-gold fill;
 * inactive buttons are outline.
 *
 * Rendered as `role="radiogroup"` with `role="radio"` children so
 * screen readers announce it as a single-select group.
 *
 * Hidden entirely when the perf gate disables 3D — the buttons would
 * be useless (no model to modulate) and misleading.
 */

export function TintPicker({
  className,
  label = "See the tint",
}: {
  className?: string;
  /** Small uppercase caption above the button row. Pass `null` to
   *  hide it entirely (consumer is providing its own heading). */
  label?: string | null;
}) {
  const { level, setLevel } = useTint();
  const { enable3D } = useEnable3D();

  // `null` during SSR + first hydration tick → render a stable
  // placeholder so layout doesn't jump when the gate resolves.
  // `false` = low-end device / reduced-motion → hide the picker.
  if (enable3D === false) return null;

  return (
    <div className={cn("pointer-events-auto", className)}>
      {label !== null && (
        <p className="mb-2 font-display text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      <div
        role="radiogroup"
        aria-label="Tint preview darkness"
        className="flex flex-wrap gap-2"
      >
        {TINT_LEVELS.map((opt) => {
          const active = opt.id === level;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setLevel(opt.id)}
              className={cn(
                "rounded-sm px-3 py-1.5 font-display text-xs uppercase tracking-wider transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "bg-accent text-accent-foreground shadow-glow-sm"
                  : "border border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
              )}
              data-analytics="hero-tint-preview"
              data-analytics-level={opt.plausibleLabel}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
