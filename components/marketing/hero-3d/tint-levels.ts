/**
 * Shared constants for the hero-3d tint preview.
 *
 * The values below are "vibe first" — opacity/colour pairs that read as
 * progressively darker window film on the rendered car, NOT precise VLT
 * simulation. Tune after eyeballing on the live site.
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
};

export const TINT_LEVELS: readonly TintConfig[] = [
  {
    id: "none",
    label: "None",
    plausibleLabel: "None (clear)",
    opacity: 0.0,
    color: [1, 1, 1],
  },
  {
    id: "light",
    label: "Light (70%)",
    plausibleLabel: "Light 70%",
    opacity: 0.35,
    color: [0.45, 0.45, 0.45],
  },
  {
    id: "medium",
    label: "Medium (50%)",
    plausibleLabel: "Medium 50%",
    opacity: 0.65,
    color: [0.2, 0.2, 0.2],
  },
  {
    id: "dark",
    label: "Dark (35%)",
    plausibleLabel: "Dark 35%",
    opacity: 0.85,
    color: [0.08, 0.08, 0.08],
  },
  {
    id: "limo",
    label: "Limo (20%)",
    plausibleLabel: "Limo 20%",
    opacity: 0.95,
    color: [0.02, 0.02, 0.02],
  },
] as const;

/** Starting state on first visit. Reads as "car already tinted nicely". */
export const DEFAULT_TINT_LEVEL: TintLevel = "medium";

/** Material.name on PaletteMaterial001 — confirmed via debug branch as
 *  the tint-film layer. PaletteMaterial004 (clear glass) + "chrome"
 *  (trim) are left untouched. */
export const TINT_MATERIAL_NAME = "PaletteMaterial001";

/** localStorage key for persistence. Namespaced to avoid collision with
 *  any quote-wizard or other local state. */
export const TINT_LOCALSTORAGE_KEY = "tintworks-tint-preview";

/** Animation speed (1/seconds). 1/0.4 = 400 ms to reach target if step
 *  is clamped to [0, 1]. Used by THREE.MathUtils.lerp in the Model. */
export const TINT_ANIMATION_SPEED = 1 / 0.4;

/** At or above this opacity, lerp the material toward matte: metallic=0,
 *  roughness=1. Makes dark tints read as "applied film", not a mirror. */
export const MATTE_OPACITY_THRESHOLD = 0.7;
