"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import {
  MATTE_OPACITY_THRESHOLD,
  TINT_ANIMATION_SPEED,
  TINT_MATERIAL_NAME,
  type TintConfig,
} from "./tint-levels";

/**
 * Loads and renders the compressed GLB. The model is stationary — the
 * showcase animation lives on the camera (see `CameraAnimator` in
 * scene.tsx), not the model itself.
 *
 * `MODEL_SCALE` normalises the Sketchfab export's tiny native units
 * (~7–24 cm bounding box) to scene units where 1 ≈ 1 m. Adjust this
 * constant when the .glb is replaced with a new asset that has
 * different native units.
 *
 * Tint modulation
 *   On GLB load we locate every mesh using the "PaletteMaterial001"
 *   material (the tint-film layer per the debug-branch verification)
 *   and clone each one, so drei's cached GLTF stays pristine for
 *   HMR and any future instances. `useFrame` then eases each cloned
 *   material's opacity + colour + (conditionally) metallic/roughness
 *   toward the current `tintConfig` each frame.
 */

const MODEL_PATH = "/models/hero-car.glb";
const MODEL_SCALE = 12;

useGLTF.preload(MODEL_PATH);

type MaterialRecord = {
  material: THREE.MeshStandardMaterial;
  nativeMetalness: number;
  nativeRoughness: number;
};

export function Model({ tintConfig }: { tintConfig: TintConfig }) {
  const { scene } = useGLTF(MODEL_PATH);
  const materialsRef = React.useRef<MaterialRecord[]>([]);

  // Stable targets. Re-used across frames; mutate via setRGB/setScalar
  // rather than allocating a new THREE.Color each frame.
  const targetColor = React.useMemo(() => new THREE.Color(), []);

  // Clone the tint-film material on mount so we own a private instance.
  // Drei caches the parsed GLTF by URL — mutating the original would
  // bleed state across HMR reloads and any future component mounts.
  React.useEffect(() => {
    const records: MaterialRecord[] = [];
    scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material;
      if (!material || Array.isArray(material)) return;
      if (material.name !== TINT_MATERIAL_NAME) return;
      const std = material as THREE.MeshStandardMaterial;
      const cloned = std.clone();
      cloned.transparent = true;
      mesh.material = cloned;
      records.push({
        material: cloned,
        nativeMetalness: std.metalness ?? 0,
        nativeRoughness: std.roughness ?? 1,
      });
    });
    materialsRef.current = records;
  }, [scene]);

  // Per-frame ease toward the current tint config.
  useFrame((_state, delta) => {
    const records = materialsRef.current;
    if (records.length === 0) return;

    // Framerate-independent lerp factor. Clamp to [0, 1] so a long
    // hitch can't overshoot the target (which would oscillate).
    const step = Math.min(1, delta * TINT_ANIMATION_SPEED);

    targetColor.setRGB(
      tintConfig.color[0],
      tintConfig.color[1],
      tintConfig.color[2],
    );
    const matte = tintConfig.opacity >= MATTE_OPACITY_THRESHOLD;

    for (const rec of records) {
      const { material } = rec;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        tintConfig.opacity,
        step,
      );
      material.color.lerp(targetColor, step);

      const targetMetalness = matte ? 0 : rec.nativeMetalness;
      const targetRoughness = matte ? 1 : rec.nativeRoughness;
      material.metalness = THREE.MathUtils.lerp(
        material.metalness,
        targetMetalness,
        step,
      );
      material.roughness = THREE.MathUtils.lerp(
        material.roughness,
        targetRoughness,
        step,
      );
      // `needsUpdate` is only required when uniforms that get cached on
      // the program itself change (textures, defines). opacity/colour/
      // metalness/roughness are material uniforms and don't need it —
      // writing here would force a full re-compile every frame. Leave
      // it off for performance.
    }
  });

  return (
    <group scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  );
}
