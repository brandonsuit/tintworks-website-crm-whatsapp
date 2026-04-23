"use client";

import { useGLTF } from "@react-three/drei";

/**
 * Loads and renders the compressed GLB. The model is stationary — the
 * showcase animation lives on the camera (see `CameraAnimator` in
 * scene.tsx), not the model itself.
 *
 * `MODEL_SCALE` normalises the Sketchfab export's tiny native units
 * (~7–24 cm bounding box) to scene units where 1 ≈ 1 m. Adjust this
 * constant when the .glb is replaced with a new asset that has
 * different native units.
 */

const MODEL_PATH = "/models/hero-car.glb";
const MODEL_SCALE = 12;

// Preload during the first client render so the network fetch overlaps
// with the Canvas / three.js warm-up. Drei hoists this out of the
// component when the module loads.
useGLTF.preload(MODEL_PATH);

export function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  return (
    <group scale={MODEL_SCALE}>
      {/* `primitive object={scene}` re-uses the parsed GLTF scene graph
          without re-cloning on every render; fine here because we only
          mount one model. */}
      <primitive object={scene} />
    </group>
  );
}
