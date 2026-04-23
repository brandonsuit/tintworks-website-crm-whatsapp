"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Stylised side-profile coupe SVG for the hero. Dark body with tinted
 * "greenhouse" (windows) fading to electric blue — which IS the service.
 * Animated in: a light sweep runs across the body on mount, and the
 * window panel pulses softly. Pure decoration; aria-hidden.
 *
 * Designed at 1200×420 viewBox; scales responsively via className.
 */

export function HeroCar({ className }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1200 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={cn("pointer-events-none h-auto w-full", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <defs>
        <linearGradient id="tw-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(0 0% 15%)" />
          <stop offset="0.55" stopColor="hsl(0 0% 7%)" />
          <stop offset="1" stopColor="hsl(0 0% 4%)" />
        </linearGradient>
        <linearGradient id="tw-tint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(42 67% 55% / 0.55)" />
          <stop offset="1" stopColor="hsl(42 67% 35% / 0.15)" />
        </linearGradient>
        <linearGradient id="tw-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(0 0% 100% / 0)" />
          <stop offset="0.5" stopColor="hsl(0 0% 100% / 0.08)" />
          <stop offset="1" stopColor="hsl(0 0% 100% / 0)" />
        </linearGradient>
        <radialGradient id="tw-ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(0,0,0,0.85)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="tw-glow" x="-25%" y="-50%" width="150%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx="600"
        cy="385"
        rx="500"
        ry="14"
        fill="url(#tw-ground)"
        opacity="0.7"
      />

      {/* Accent glow behind the greenhouse (bleeds through the tint) */}
      <motion.g
        filter="url(#tw-glow)"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="585"
          cy="170"
          rx="260"
          ry="55"
          fill="hsl(42 67% 49%)"
          opacity="0.45"
        />
      </motion.g>

      {/* Body — stylised GT coupe profile */}
      <path
        d="
          M 110 330
          L 110 280
          C 110 250, 135 225, 195 218
          L 325 214
          C 345 214, 360 208, 375 194
          L 435 142
          C 460 128, 495 120, 540 120
          L 715 120
          C 760 122, 790 140, 810 175
          L 840 218
          L 880 220
          C 935 222, 1000 223, 1080 226
          C 1105 228, 1115 260, 1115 290
          L 1115 330
          Z
        "
        fill="url(#tw-body)"
        stroke="hsl(0 0% 20%)"
        strokeWidth="1.5"
      />

      {/* Greenhouse (the tint — the actual service) */}
      <path
        d="
          M 398 170
          L 438 152
          C 462 140, 495 132, 540 132
          L 715 132
          C 748 134, 773 148, 790 175
          L 810 214
          L 620 214
          L 400 214
          Z
        "
        fill="url(#tw-tint)"
        stroke="hsl(42 67% 49% / 0.7)"
        strokeWidth="1"
      />

      {/* B-pillar */}
      <path
        d="M 612 135 L 625 214 L 605 214 L 598 135 Z"
        fill="hsl(0 0% 5%)"
      />
      {/* Door cut */}
      <line
        x1="500"
        y1="150"
        x2="500"
        y2="214"
        stroke="hsl(0 0% 22%)"
        strokeWidth="1.2"
      />
      {/* Side crease line */}
      <line
        x1="180"
        y1="268"
        x2="1080"
        y2="272"
        stroke="hsl(0 0% 28% / 0.6)"
        strokeWidth="1"
      />

      {/* Wheel arches (cutouts) */}
      <path
        d="M 210 300 a 90 90 0 0 1 180 0"
        fill="hsl(0 0% 2%)"
      />
      <path
        d="M 830 300 a 90 90 0 0 1 180 0"
        fill="hsl(0 0% 2%)"
      />

      {/* Wheels */}
      <Wheel cx={300} cy={310} />
      <Wheel cx={920} cy={310} />

      {/* Headlight (front) — subtle gold accent */}
      <ellipse
        cx="118"
        cy="282"
        rx="14"
        ry="6"
        fill="hsl(42 67% 75%)"
        opacity="0.85"
      />
      <ellipse
        cx="118"
        cy="282"
        rx="28"
        ry="10"
        fill="hsl(42 67% 60%)"
        opacity="0.25"
        filter="url(#tw-glow)"
      />

      {/* Taillight (rear) — red, to sell "drive away" moment */}
      <rect
        x="1085"
        y="268"
        width="18"
        height="8"
        rx="1"
        fill="hsl(0 92% 55%)"
        opacity="0.85"
      />

      {/* Light sweep across the body — runs continuously, slow */}
      <motion.rect
        x="-400"
        y="120"
        width="300"
        height="200"
        fill="url(#tw-sweep)"
        initial={{ x: -400 }}
        animate={{ x: 1400 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </motion.svg>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  const spokeLen = 36;
  const spokes = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i / 5) * 2 * Math.PI;
    const x2 = cx + Math.cos(angle) * spokeLen;
    const y2 = cy + Math.sin(angle) * spokeLen;
    return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} />;
  });

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={72}
        fill="hsl(0 0% 6%)"
        stroke="hsl(0 0% 16%)"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r={48} fill="hsl(0 0% 12%)" />
      <g stroke="hsl(0 0% 28%)" strokeWidth="3.5" strokeLinecap="round">
        {spokes}
      </g>
      <circle cx={cx} cy={cy} r={12} fill="hsl(0 0% 18%)" />
      <circle cx={cx} cy={cy} r={4} fill="hsl(42 67% 49%)" />
    </g>
  );
}
