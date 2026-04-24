"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { useEnable3D } from "./use-enable-3d";
import { useTint } from "./tint-context";

/**
 * Client wrapper for the interactive tint-preview 3D scene.
 *
 *   - Renders inside its PARENT container (not full-bleed). The parent
 *     controls aspect-ratio via its own classes (typically
 *     `aspect-square md:aspect-[3/2]`).
 *   - Runs the perf gate (hardwareConcurrency, reduced-motion, env
 *     opt-out) via `useEnable3D`. On weak mobiles it falls back to the
 *     static poster instead of mounting three.js.
 *   - Reads the current tint config from `useTint()` OUTSIDE the
 *     Canvas (R3F creates its own React root; outer-tree context
 *     does not cross that boundary without a bridge) and passes it
 *     as a plain prop to the lazy-loaded scene.
 *   - three.js / R3F / drei all ship in the dynamic chunk — only
 *     fetched when the gate permits.
 */

const InteractiveScene = dynamic(() => import("./interactive-scene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

const POSTER_SRC = "/models/hero-car-poster.jpg";
const POSTER_ALT =
  "Vehicle being window tinted — 3D rendering unavailable, showing still image.";

export function InteractiveTintCanvas() {
  const { enable3D, prefersReducedMotion } = useEnable3D();
  const { config: tintConfig } = useTint();

  // Mutually exclusive render — never both at once:
  //   - null during SSR + first hydration tick (before gate resolves).
  //     Parent container already has `bg-card` to reserve layout, so
  //     CLS is zero even without a poster placeholder.
  //   - Poster only when the gate rejects 3D (weak mobile, reduced-
  //     motion opt-out, or NEXT_PUBLIC_DISABLE_3D_MOBILE).
  //   - InteractiveScene only when 3D is green-lit. The 3D canvas is
  //     transparent (no clear colour) so the parent `bg-card` shows
  //     through around the car — no poster needed underneath.
  if (enable3D === null) return null;
  if (enable3D === false) return <Poster />;

  return (
    <div className="absolute inset-0">
      <InteractiveScene
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
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.18), transparent 60%)",
        }}
      />
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-end justify-end p-4">
      <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden />
        Loading 3D view…
      </div>
    </div>
  );
}
