"use client";

import dynamic from "next/dynamic";

/**
 * Static hero 3D car — locked Limo tint, no orbit, no drag, no perf
 * gate.
 *
 * Composition
 *   On desktop (lg+) the Canvas is deliberately only the RIGHT 60% of
 *   the hero section. This anchors the car to the right edge of the
 *   viewport without having to fight OrbitControls / target offsets to
 *   achieve the same visual. Text on the left sits over the hero
 *   background gradient, un-obscured by a full-bleed Canvas.
 *
 *   On mobile (< lg) the Canvas is full-bleed behind the text, same
 *   as before — the narrow viewport means right-anchoring would leave
 *   the car visible only in the tiny right slice, so we let it sit
 *   behind the text with the scrim doing the legibility work.
 */

const StaticScene = dynamic(
  () => import("@/components/marketing/hero-3d/static-scene"),
  {
    ssr: false,
    loading: () => null,
  },
);

export function HeroCarStatic() {
  return (
    <>
      {/* Mobile: full-bleed behind text (< lg only). */}
      <div className="absolute inset-0 lg:hidden">
        <StaticScene />
      </div>
      {/* Desktop: right 60% only — car anchors to the right viewport
          edge, left 40% stays clear for the hero copy. */}
      <div className="absolute inset-y-0 right-0 hidden w-[60%] lg:block">
        <StaticScene />
      </div>
    </>
  );
}
