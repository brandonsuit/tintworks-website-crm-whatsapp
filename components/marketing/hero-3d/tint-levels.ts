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
  /** True at Limo: force the clear-glass material to full opacity AND
   *  `transparent: false` so you can't see the interior through the
   *  glass + film stack. Real-world limo tint is effectively blackout. */
  glassBlackout?: boolean;
  /** Optional override of the clear-glass material's base colour,
   *  lerped to each frame (same pace as the film). Used by the static
   *  hero instance only — forces the glass to pure black so the
   *  interior/driver is invisible through the rear windows. The
   *  shared interactive presets leave this undefined. */
  glassColor?: readonly [number, number, number];
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
    opacity: 0.25,
    color: [0.5, 0.5, 0.5],
  },
  {
    id: "medium",
    label: "Medium (50%)",
    plausibleLabel: "Medium 50%",
    opacity: 0.55,
    color: [0.25, 0.25, 0.25],
  },
  {
    id: "dark",
    label: "Dark (35%)",
    plausibleLabel: "Dark 35%",
    opacity: 0.8,
    color: [0.08, 0.08, 0.08],
  },
  {
    id: "limo",
    label: "Limo (20%)",
    plausibleLabel: "Limo 20%",
    opacity: 0.99,
    color: [0, 0, 0],
    glassBlackout: true,
  },
] as const;

/** Starting state on first visit. Reads as "car already tinted nicely". */
export const DEFAULT_TINT_LEVEL: TintLevel = "medium";

/** Material.name on the tint-film layer — confirmed via the throwaway
 *  debug/verify-window-material branch. */
export const TINT_MATERIAL_NAME = "PaletteMaterial001";

/** Material.name on the clear-glass pane. We only touch this at Limo,
 *  to eliminate the interior see-through and give true blackout. */
export const GLASS_MATERIAL_NAME = "PaletteMaterial004";

/** localStorage key for persistence. Namespaced to avoid collision with
 *  any quote-wizard or other local state. */
export const TINT_LOCALSTORAGE_KEY = "tintworks-tint-preview";

/** Animation speed (1/seconds). 1/0.4 = 400 ms to reach target if step
 *  is clamped to [0, 1]. Used by THREE.MathUtils.lerp in the Model. */
export const TINT_ANIMATION_SPEED = 1 / 0.4;

/** At or above this opacity, lerp the material toward matte: metallic=0,
 *  roughness=1. Makes dark tints read as "applied film", not a mirror. */
export const MATTE_OPACITY_THRESHOLD = 0.7;
