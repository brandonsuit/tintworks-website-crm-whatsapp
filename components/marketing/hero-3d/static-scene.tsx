"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";

import { Model } from "./model";
import { TINT_LEVELS, type TintConfig } from "./tint-levels";

/**
 * Static hero scene — the "premium product-shot" composition.
 *
 *   - No OrbitControls, no drag, no auto-rotate. Camera is locked
 *     every frame via CameraLockOn so nothing can drift it off the
 *     model.
 *   - Locked Limo tint, with a static-hero-only `blackout: true`
 *     flag that forces the tint material (the full window set,
 *     PaletteMaterial004) to `transparent: false` + opacity 1 +
 *     pure-black colour — a guaranteed opaque window. The shared
 *     interactive Limo preset leaves this undefined (opacity 0.98
 *     with the transparent pipeline still on).
 *   - Camera is centred on the model (target [0, 0, 0]). The
 *     right-anchoring on desktop is achieved by sizing the Canvas
 *     itself to the right 60% of the hero in `hero-car-static.tsx`
 *     — not by offsetting the target, which fought readability and
 *     made the car look tucked into a corner.
 */

const CAMERA_POSITION: [number, number, number] = [3.5, 1.0, 4.5];
const CAMERA_FOV = 32;
const TARGET: readonly [number, number, number] = [0, 0, 0];

// Locked Limo with the static-hero-only blackout flag on. Since
// PaletteMaterial004 now covers EVERY window (front, rear, sides,
// quarter), making that single material opaque is sufficient — no
// need for any separate glass-layer override as in the previous
// two-material approach.
const LIMO_BASE = TINT_LEVELS.find((l) => l.id === "limo")!;
const HERO_LIMO: TintConfig = {
  ...LIMO_BASE,
  blackout: true,
};

// The GLB's driver figure uses a material named "Ch01_body.001"
// ("Ch01" = Sketchfab/Blender character-naming convention). On the
// static hero we hide that mesh entirely — nobody should see the
// driver through the blackout-tinted windows, and it's also a
// belt-and-braces fallback if the glass opacity alone leaves faint
// interior detail visible. Interactive section keeps the driver
// visible at lighter tints (None/Light/Medium).
const HERO_HIDDEN_MATERIALS = ["Ch01_body.001"] as const;

/**
 * Keep the camera pointed at TARGET on every frame. `useFrame` is
 * more reliable than `onCreated` for this — onCreated fires once
 * during mount and the initial render may happen before its
 * lookAt takes effect, leaving the camera's default -Z orientation
 * stuck on the first paint and the model entirely out of frame.
 */
function CameraLockOn({
  target,
}: {
  target: readonly [number, number, number];
}) {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}

export default function StaticScene() {
  return (
    <div
      role="img"
      aria-label="3D model of a premium car with limo-black window tint"
      className="absolute inset-0"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Canvas clear colour intentionally NOT set — scene is
            transparent so the hero's grid + accent-glow show through
            around the car. `gl.alpha: true` ensures the buffer keeps
            its alpha channel so the HTML behind the <canvas> shows. */}

        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={0.9}
          color="#f4e3b8"
        />

        <React.Suspense fallback={null}>
          <Environment preset="warehouse" />
          <Model
            tintConfig={HERO_LIMO}
            hideInteriorMaterials={HERO_HIDDEN_MATERIALS}
          />
          <ContactShadows
            position={[0, -0.25, 0]}
            opacity={0.78}
            scale={5}
            blur={1.8}
            far={2}
          />
        </React.Suspense>

        <CameraLockOn target={TARGET} />
      </Canvas>
    </div>
  );
}
