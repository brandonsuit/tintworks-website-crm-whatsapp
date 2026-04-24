/**
 * Shared constants for the hero-3d tint preview.
 *
 * The values below are "vibe first" — opacity/colour pairs that read as
 * progressively darker window film on the rendered car, NOT precise VLT
 * simulation.
 *
 * VLT = Visible Light Transmission (lower number = darker film).
 *   70% = mostly clear, legal on front sides in the UK.
 *   50% = mid.
 *   35% = dark, common on rears.
 *   20% = "limo" — very dark, rear only.
 */

export type TintLevel = "none" | "light" | "medium" | "dark" | "limo";

export type TintConfig = {
  id: TintLevel;
  label: string;
  /** Shown in Plausible dashboards. Keep human-readable. */
  plausibleLabel: string;
  /** 0 = film layer invisible (clear glass); 1 = opaque film. */
  opacity: number;
  /** Linear RGB colour the film tends toward. Lerp target each frame. */
  color: readonly [number, number, number];
  /** When true, the tint material is forced opaque (`transparent: false`
   *  and `opacity: 1`) regardless of this config's `opacity` value, and
   *  matte (metalness 0, roughness 1). Used exclusively by the static
   *  hero's HERO_LIMO preset to give a guaranteed blackout. The shared
   *  interactive Limo preset leaves this undefined and keeps the
   *  transparent pipeline so opacity 0.98 reads as near-blackout. */
  blackout?: boolean;
};

export const TINT_LEVELS: readonly TintConfig[] = [
  {
    id: "none",
    label: "None",
    plausibleLabel: "None (clear)",
    opacity: 0.2,
    color: [0.8, 0.8, 0.8],
  },
  {
    id: "light",
    label: "Light (70%)",
    plausibleLabel: "Light 70%",
    opacity: 0.5,
    color: [0.5, 0.5, 0.5],
  },
  {
    id: "medium",
    label: "Medium (50%)",
    plausibleLabel: "Medium 50%",
    opacity: 0.7,
    color: [0.25, 0.25, 0.25],
  },
  {
    id: "dark",
    label: "Dark (35%)",
    plausibleLabel: "Dark 35%",
    opacity: 0.88,
    color: [0.08, 0.08, 0.08],
  },
  {
    id: "limo",
    label: "Limo (20%)",
    plausibleLabel: "Limo 20%",
    opacity: 0.98,
    color: [0, 0, 0],
  },
] as const;

/** Starting state on first visit. Reads as "car already tinted nicely". */
export const DEFAULT_TINT_LEVEL: TintLevel = "medium";

/** Material names that make up the full window set on the hero-car GLB.
 *  Verified via the throwaway debug/find-all-windows branch:
 *    - PaletteMaterial001 — driver + passenger (front) side windows
 *    - PaletteMaterial004 — rear windscreen, rear sides, quarter
 *                           windows, front windscreen
 *  Together they cover every piece of glass on the car. The tint
 *  system modulates ALL materials in this array with the same config,
 *  per frame. Add more names here if a future model asset splits
 *  glass across additional materials. */
export const TINT_MATERIAL_NAMES: readonly string[] = [
  "PaletteMaterial001",
  "PaletteMaterial004",
];

/** localStorage key for persistence. Namespaced to avoid collision with
 *  any quote-wizard or other local state. */
export const TINT_LOCALSTORAGE_KEY = "tintworks-tint-preview";

/** Animation speed (1/seconds). 1/0.4 = 400 ms to reach target if step
 *  is clamped to [0, 1]. Used by THREE.MathUtils.lerp in the Model. */
export const TINT_ANIMATION_SPEED = 1 / 0.4;

/** At or above this opacity, lerp the material toward matte: metallic=0,
 *  roughness=1. Makes dark tints read as "applied film", not a mirror. */
export const MATTE_OPACITY_THRESHOLD = 0.7;
