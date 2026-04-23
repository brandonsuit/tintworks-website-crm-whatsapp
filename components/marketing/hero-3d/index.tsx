"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { useEnable3D } from "./use-enable-3d";
import { useTint } from "./tint-context";

/**
 * Client wrapper for the 3D hero background.
 *
 *   - Decides whether to mount the three.js scene at all (see
 *     `useEnable3D` for the gating rules: mobile cores, env flag,
 *     prefers-reduced-motion).
 *   - On weak / opt-out / SSR / first-hydration: renders the static
 *     poster image. Zero three.js code is even requested.
 *   - When enabled: lazy-loads `./scene` via next/dynamic with
 *     ssr:false, so three.js ships in its own chunk and only when
 *     needed. The poster stays visible as the Suspense-level
 *     fallback until the scene is ready to paint.
 *
 * This component is a "background layer" — always absolutely positioned
 * to fill the hero. The text + CTAs sit on top, authored as real DOM.
 */

const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

const POSTER_SRC = "/models/hero-car-poster.jpg";
const POSTER_ALT =
  "Vehicle being window tinted — 3D rendering unavailable, showing still image.";

export function Hero3DBackground() {
  const { enable3D, prefersReducedMotion } = useEnable3D();
  // Read tint state OUTSIDE the Canvas — R3F's Canvas creates its own
  // React root and outer-tree context doesn't cross that boundary
  // without a bridge. Pass the config as a plain prop through to Model.
  const { config: tintConfig } = useTint();

  // Before the gate has decided (SSR, first hydration tick), show the
  // poster. Avoids hydration mismatch and reserves the exact final
  // layout so there's zero CLS when the gate resolves.
  if (enable3D !== true) {
    return <Poster />;
  }

  return (
    <div className="absolute inset-0">
      <Poster />
      <Scene
        prefersReducedMotion={prefersReducedMotion}
        tintConfig={tintConfig}
      />
    </div>
  );
}

function Poster() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={POSTER_SRC}
        alt={POSTER_ALT}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Accent glow overlay echoing the site theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.25), transparent 55%)",
        }}
      />
      {/* Dark scrim to keep hero text legible against the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20"
      />
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-end justify-end p-6">
      <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden />
        Loading 3D view…
      </div>
    </div>
  );
}
