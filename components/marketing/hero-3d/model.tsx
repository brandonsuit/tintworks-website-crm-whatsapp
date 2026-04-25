"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import {
  MATTE_OPACITY_THRESHOLD,
  TINT_ANIMATION_SPEED,
  TINT_MATERIAL_NAMES,
  type TintConfig,
} from "./tint-levels";

/**
 * Loads and renders the compressed GLB.
 *
 * `MODEL_SCALE` normalises the Sketchfab export's tiny native units
 * (~7–24 cm bounding box) to scene units where 1 ≈ 1 m.
 *
 * Tint targets: every material whose name appears in
 * `TINT_MATERIAL_NAMES` (currently PaletteMaterial001 +
 * PaletteMaterial004 — together they span every window on the car,
 * verified via the debug/find-all-windows throwaway branch). Every
 * mesh that uses one of those materials gets its own cloned instance
 * so multiple Canvases can modulate independently without
 * cross-contamination.
 *
 * Modulation rules
 *   - opacity, base colour: lerped each frame toward `tintConfig`.
 *   - metalness, roughness: lerped toward 0 and 1 (respectively)
 *     once `tintConfig.opacity` crosses MATTE_OPACITY_THRESHOLD, so
 *     Dark / Limo read as matte applied film rather than a mirror.
 *   - When `tintConfig.blackout === true` (static hero only): force
 *     `transparent: false` AND opacity = 1 regardless of config,
 *     guaranteeing a solid opaque window that nothing behind can
 *     show through.
 *
 * `hideInteriorMaterials`: optional list of material names whose
 * meshes are set to `visible = false`. Belt-and-braces for the
 * static hero — ensures the driver figure isn't visible even if any
 * transparency quirk lets light leak through the blackout.
 */

const MODEL_PATH = "/models/hero-car.glb";
const MODEL_SCALE = 12;

type TintRecord = {
  material: THREE.MeshStandardMaterial;
  nativeMetalness: number;
  nativeRoughness: number;
};

export function Model({
  tintConfig,
  hideInteriorMaterials,
}: {
  tintConfig: TintConfig;
  hideInteriorMaterials?: readonly string[];
}) {
  const { scene: originalScene } = useGLTF(MODEL_PATH);
  // Deep-clone the scene so each Canvas instance has its own Object3D
  // tree. Drei caches one parsed scene per URL and would otherwise
  // hand the same reference to every caller — which breaks when two
  // Canvases both do <primitive object={scene}> (three.js allows only
  // one parent per object).
  const scene = React.useMemo(
    () => originalScene.clone(true),
    [originalScene],
  );

  const tintRef = React.useRef<TintRecord[]>([]);
  // First useFrame after mount uses step=1 so the material snaps to
  // its target state rather than visibly lerping from the GLB's
  // native (near-clear) value. Matters for the static hero, which is
  // a locked-Limo render and should not fade-in.
  const firstFrameRef = React.useRef<boolean>(true);

  // Stable colour target — mutated via setRGB each frame, no per-frame
  // allocations.
  const targetColor = React.useMemo(() => new THREE.Color(), []);

  React.useEffect(() => {
    useGLTF.preload(MODEL_PATH);
  }, []);

  React.useEffect(() => {
    const records: TintRecord[] = [];
    const hideSet = new Set(hideInteriorMaterials ?? []);
    const tintSet = new Set(TINT_MATERIAL_NAMES);

    scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material;
      if (!material || Array.isArray(material)) return;
      const std = material as THREE.MeshStandardMaterial;

      if (hideSet.has(std.name)) {
        mesh.visible = false;
        return;
      }

      if (tintSet.has(std.name)) {
        const cloned = std.clone();
        cloned.transparent = true;
        mesh.material = cloned;
        records.push({
          material: cloned,
          nativeMetalness: std.metalness ?? 0,
          nativeRoughness: std.roughness ?? 1,
        });
      }
    });
    tintRef.current = records;
    firstFrameRef.current = true;

    return () => {
      records.forEach((r) => r.material.dispose());
    };
  }, [scene, hideInteriorMaterials]);

  useFrame((_state, delta) => {
    const records = tintRef.current;
    if (records.length === 0) return;

    // Framerate-independent lerp factor. Clamp to [0, 1] so a long
    // hitch can't overshoot the target (which would oscillate). On
    // the first frame after mount we snap straight to target.
    const step = firstFrameRef.current
      ? 1
      : Math.min(1, delta * TINT_ANIMATION_SPEED);
    firstFrameRef.current = false;

    const matte = tintConfig.opacity >= MATTE_OPACITY_THRESHOLD;
    const blackout = tintConfig.blackout === true;

    targetColor.setRGB(
      tintConfig.color[0],
      tintConfig.color[1],
      tintConfig.color[2],
    );

    for (const rec of records) {
      const { material } = rec;

      if (blackout) {
        // Static-hero path: force solid opaque black window.
        // No lerp — snap and hold, so the composition doesn't
        // visibly "settle" after mount.
        material.opacity = 1;
        if (material.transparent !== false) {
          material.transparent = false;
          material.needsUpdate = true;
        }
        material.color.copy(targetColor);
        material.metalness = 0;
        material.roughness = 1;
        continue;
      }

      // Interactive / standard path: ease toward the config each frame.
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
      // If we previously switched to opaque (blackout) and are now
      // back in a non-blackout config, make sure transparent is on
      // so the lerped opacity has effect.
      if (!material.transparent) {
        material.transparent = true;
        material.needsUpdate = true;
      }
    }
  });

  return (
    <group scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  );
}
