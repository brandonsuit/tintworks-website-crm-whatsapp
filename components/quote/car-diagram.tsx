"use client";

import * as React from "react";

import type { WindowSet } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Top-down car silhouette with highlightable window regions. The wizard
 * renders this as a read-only visual — users actually pick windows through
 * the accompanying checkboxes, but regions light up on hover and when
 * selected so the mapping is obvious.
 */

type RegionKey =
  | "windscreen-strip"
  | "front-sides"
  | "rear-sides"
  | "rear-windscreen";

type RegionSpec = {
  key: RegionKey;
  title: string;
  /** The SVG path describing this region. */
  d: string;
  /**
   * Which WindowSet selections cause this region to light up. `frontPair`
   * matches front sides, `fullCar` matches front+rear sides (front kept
   * legal), etc. `fullRear` covers rear sides + rear windscreen.
   */
  activeWhen: WindowSet[];
};

const REGIONS: RegionSpec[] = [
  {
    key: "windscreen-strip",
    title: "Windscreen sun strip",
    d: "M80 52 Q170 46 260 52 L255 64 Q170 58 85 64 Z",
    activeWhen: ["sunStrip"],
  },
  {
    key: "front-sides",
    title: "Front side windows",
    // Two trapezoid panels, one each side of the front doors.
    d: "M58 96 L102 88 L102 140 L62 140 Z M282 96 L238 88 L238 140 L278 140 Z",
    activeWhen: ["frontPair", "fullCar"],
  },
  {
    key: "rear-sides",
    title: "Rear side windows",
    d: "M58 150 L102 150 L102 202 L62 210 Z M282 150 L238 150 L238 202 L278 210 Z",
    activeWhen: ["rearPair", "fullRear", "fullCar"],
  },
  {
    key: "rear-windscreen",
    title: "Rear windscreen",
    d: "M85 228 Q170 236 255 228 L258 246 Q170 252 82 246 Z",
    activeWhen: ["rearWindscreen", "fullRear", "fullCar"],
  },
];

export function CarDiagram({
  selected,
  className,
}: {
  selected: WindowSet[];
  className?: string;
}) {
  const isActive = (regionActiveWhen: WindowSet[]) =>
    regionActiveWhen.some((w) => selected.includes(w));

  return (
    <svg
      viewBox="0 0 340 320"
      role="img"
      aria-label="Car diagram showing which windows will be tinted"
      className={cn("h-auto w-full", className)}
    >
      {/* Body outline */}
      <rect
        x="48"
        y="36"
        width="244"
        height="260"
        rx="28"
        fill="hsl(var(--card))"
        stroke="hsl(var(--border))"
        strokeWidth="2"
      />

      {/* Roof / panel separation */}
      <line
        x1="48"
        y1="144"
        x2="292"
        y2="144"
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />
      <line
        x1="48"
        y1="216"
        x2="292"
        y2="216"
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />

      {/* Wheels hint */}
      <circle cx="40" cy="110" r="6" fill="hsl(var(--border))" />
      <circle cx="300" cy="110" r="6" fill="hsl(var(--border))" />
      <circle cx="40" cy="236" r="6" fill="hsl(var(--border))" />
      <circle cx="300" cy="236" r="6" fill="hsl(var(--border))" />

      {/* Windows */}
      {REGIONS.map((r) => {
        const active = isActive(r.activeWhen);
        return (
          <path
            key={r.key}
            d={r.d}
            fill={
              active ? "hsl(var(--accent) / 0.8)" : "hsl(var(--muted))"
            }
            stroke={
              active ? "hsl(var(--accent))" : "hsl(var(--border))"
            }
            strokeWidth={active ? 1.5 : 1}
            className="transition-all duration-200"
          >
            <title>
              {r.title}
              {active ? " — selected" : ""}
            </title>
          </path>
        );
      })}
    </svg>
  );
}
