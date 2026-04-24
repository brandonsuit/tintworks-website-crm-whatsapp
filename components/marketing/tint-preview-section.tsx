"use client";

import * as React from "react";

import { InteractiveTintCanvas } from "@/components/marketing/hero-3d";
import { TintProvider } from "@/components/marketing/hero-3d/tint-context";
import { TintPicker } from "@/components/marketing/hero-3d/tint-picker";

/**
 * Interactive tint-preview section.
 *
 * Lives between `<BrandMarquee />` and the services grid on the
 * landing page. Users drag the car, click darkness buttons, watch
 * the tint change in real time.
 *
 * `<TintProvider>` is scoped to this section — the static hero
 * instance above doesn't need it (it hardcodes Limo).
 *
 * Canvas aspect: square on mobile (tight vertical viewports), 3:2 on
 * desktop (wider for the drag-rotate gesture to feel right).
 * Container width: full on mobile, capped on desktop so the picker
 * and title sit in comfortable reading measures above/below.
 */

export function TintPreviewSection() {
  return (
    <TintProvider>
      <section
        id="tint-preview"
        className="relative isolate border-t border-border/60 bg-background bg-grain"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(var(--accent) / 0.18), transparent 55%)",
          }}
        />

        <div className="container section-padding">
          <div className="max-w-4xl">
            <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
              Interactive preview
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
              Pick your shade — see it live
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Drag to rotate. Tap a darkness level to see the difference.
            </p>
          </div>

          {/* Canvas container — centred, capped width, aspect-ratio
              locked per breakpoint so the Canvas has predictable
              layout before three.js mounts. */}
          <div className="mx-auto mt-10 w-full max-w-4xl">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-card md:aspect-[3/2]">
              <InteractiveTintCanvas />
            </div>
          </div>

          <div className="mx-auto mt-6 w-full max-w-4xl">
            <TintPicker label="Tint darkness" />
          </div>
        </div>
      </section>
    </TintProvider>
  );
}
