"use client";

import * as React from "react";

/**
 * Decides whether the 3D scene should mount on this device.
 *
 * Rules (ALL must pass to enable 3D):
 *   1. Not explicitly disabled for mobile via env var.
 *   2. If on a small viewport (<768px), hardwareConcurrency >= 4 — weak
 *      phones stutter under three.js, so fall back to the static poster.
 *   3. User hasn't requested reduced motion at the OS level.
 *
 * Runs client-only. During SSR + the first hydration pass we return
 * `null` so the caller renders the poster unconditionally until we
 * know what the device can handle. This avoids a hydration mismatch
 * and the cost of mounting three.js just to tear it back down.
 *
 * Also returns `prefersReducedMotion` so the scene can disable
 * autoRotate while still allowing the user to click-drag the camera.
 */

export type Enable3DResult = {
  /** `null` = still deciding (render the poster). `true`/`false` = final. */
  enable3D: boolean | null;
  prefersReducedMotion: boolean;
};

const DISABLE_ON_MOBILE_ENV =
  process.env.NEXT_PUBLIC_DISABLE_3D_MOBILE === "true";

const MOBILE_BREAKPOINT_PX = 768;
const MIN_CORES_ON_MOBILE = 4;

export function useEnable3D(): Enable3DResult {
  const [state, setState] = React.useState<Enable3DResult>({
    enable3D: null,
    prefersReducedMotion: false,
  });

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isNarrow = window.innerWidth < MOBILE_BREAKPOINT_PX;
    const cores =
      typeof navigator.hardwareConcurrency === "number"
        ? navigator.hardwareConcurrency
        : 8;

    const mobileDisabled =
      DISABLE_ON_MOBILE_ENV && isNarrow;
    const weakMobile = isNarrow && cores < MIN_CORES_ON_MOBILE;

    setState({
      enable3D: !mobileDisabled && !weakMobile,
      prefersReducedMotion,
    });
  }, []);

  return state;
}
