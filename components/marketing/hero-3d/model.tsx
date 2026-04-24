"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import {
  GLASS_MATERIAL_NAME,
  MATTE_OPACITY_THRESHOLD,
  TINT_ANIMATION_SPEED,
  TINT_MATERIAL_NAME,
  type TintConfig,
} from "./tint-levels";

/**
 * Loads and renders the compressed GLB.
 *
 * `MODEL_SCALE` normalises the Sketchfab export's tiny native units
 * (~7–24 cm bounding box) to scene units where 1 ≈ 1 m. Adjust this
 * constant when the .glb is replaced with an asset with different
 * native units.
 *
 * Two materials are modulated:
 *   1. PaletteMaterial001 — the tint-film layer. Opacity / colour /
 *      metalness / roughness all lerp toward the current `tintConfig`
 *      each frame.
 *   2. PaletteMaterial004 — the clear-glass pane. Left at native alpha
 *      for every level EXCEPT Limo, where `tintConfig.glassBlackout`
 *      forces its opacity to 1 and flips `transparent` to false. With
 *      film + glass both opaque at Limo you can no longer see the
 *      interior through the stack — true blackout.
 *
 * Both materials are cloned on mount so drei's cached GLTF stays
 * pristine for HMR / future mounts / the other Canvas instance.
 */

const MODEL_PATH = "/models/hero-car.glb";
const MODEL_SCALE = 12;

useGLTF.preload(MODEL_PATH);

type FilmRecord = {
  material: THREE.MeshStandardMaterial;
  nativeMetalness: number;
  nativeRoughness: number;
};

type GlassRecord = {
  material: THREE.MeshStandardMaterial;
  nativeOpacity: number;
  nativeTransparent: boolean;
  /** Clone of the glass's authored base colour so we can lerp back
   *  to it when leaving a level that overrode glassColor. */
  nativeColor: THREE.Color;
};

export function Model({
  tintConfig,
  hideInteriorMaterials,
}: {
  tintConfig: TintConfig;
  /** Optional list of material names whose meshes should be rendered
   *  invisible on this instance. Used by the static hero to hide the
   *  driver figure + any interior geometry so nothing reads through
   *  the blackout glass. */
  hideInteriorMaterials?: readonly string[];
}) {
  const { scene: originalScene } = useGLTF(MODEL_PATH);
  // CRITICAL: drei's useGLTF returns ONE parsed scene for this URL
  // (HTTP caching) — but the returned Object3D can only have one
  // parent in the three.js scene graph. When two Canvases both do
  // `<primitive object={scene}>` with the same reference, whichever
  // mounts last yanks the scene out of the other's graph (and the
  // first Canvas's `mesh.material = cloned` swaps get trampled too).
  // Cloning the scene per-instance gives each Canvas its own scene
  // tree + its own mesh instances to mutate safely.
  //
  // `scene.clone(true)` deep-clones the Object3D hierarchy. Geometry
  // is shared by reference (fine — geometry is read-only at render
  // time). Materials are shared by reference too (fine — we clone
  // every material we intend to mutate in the effect below).
  const scene = React.useMemo(
    () => originalScene.clone(true),
    [originalScene],
  );

  const filmRef = React.useRef<FilmRecord[]>([]);
  const glassRef = React.useRef<GlassRecord[]>([]);
  // First useFrame after mount uses step=1 so the material snaps
  // straight to its configured tint rather than visibly lerping from
  // the GLB's native state. Matters most for the static hero, which
  // is a locked-Limo render.
  const firstFrameRef = React.useRef<boolean>(true);

  // Stable targets. Re-used across frames; mutate via setRGB rather
  // than allocating a new THREE.Color every frame.
  const targetColor = React.useMemo(() => new THREE.Color(), []);
  const targetGlassColor = React.useMemo(() => new THREE.Color(), []);

  // Clone tint film + clear glass materials on mount. Each Canvas
  // instance runs this effect on ITS clone of the scene — so the
  // two landing-page Canvases each get their own private clones.
  // Also hides any meshes whose material name matches
  // `hideInteriorMaterials` (used by the static hero to hide the
  // driver figure behind the blackout glass).
  React.useEffect(() => {
    const film: FilmRecord[] = [];
    const glass: GlassRecord[] = [];
    const hideSet = new Set(hideInteriorMaterials ?? []);

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

      if (std.name === TINT_MATERIAL_NAME) {
        const cloned = std.clone();
        cloned.transparent = true;
        mesh.material = cloned;
        film.push({
          material: cloned,
          nativeMetalness: std.metalness ?? 0,
          nativeRoughness: std.roughness ?? 1,
        });
      } else if (std.name === GLASS_MATERIAL_NAME) {
        const cloned = std.clone();
        mesh.material = cloned;
        glass.push({
          material: cloned,
          nativeOpacity: std.opacity ?? 1,
          nativeTransparent: std.transparent,
          nativeColor: std.color.clone(),
        });
      }
    });
    filmRef.current = film;
    glassRef.current = glass;
    firstFrameRef.current = true;
  }, [scene, hideInteriorMaterials]);

  // Per-frame ease toward the current tint config.
  useFrame((_state, delta) => {
    const film = filmRef.current;
    const glass = glassRef.current;
    if (film.length === 0 && glass.length === 0) return;

    // Framerate-independent lerp factor. Clamp to [0, 1] so a long
    // hitch can't overshoot the target (which would oscillate). On
    // the first frame after mount we snap straight to target.
    const step = firstFrameRef.current
      ? 1
      : Math.min(1, delta * TINT_ANIMATION_SPEED);
    firstFrameRef.current = false;

    // ── Film layer ─────────────────────────────────────────────────
    targetColor.setRGB(
      tintConfig.color[0],
      tintConfig.color[1],
      tintConfig.color[2],
    );
    const matte = tintConfig.opacity >= MATTE_OPACITY_THRESHOLD;

    for (const rec of film) {
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
    }

    // ── Clear-glass layer — only modulated at Limo ─────────────────
    const glassOpacityTarget = tintConfig.glassBlackout ? 1 : undefined;
    const glassTransparentTarget = tintConfig.glassBlackout
      ? false
      : undefined;

    for (const rec of glass) {
      const { material } = rec;
      const opTarget = glassOpacityTarget ?? rec.nativeOpacity;
      material.opacity = THREE.MathUtils.lerp(material.opacity, opTarget, step);

      // Optional colour override (static hero passes [0,0,0] for a
      // pure-black glass pane that hides the interior). When absent,
      // lerp back to the material's authored base colour.
      if (tintConfig.glassColor) {
        targetGlassColor.setRGB(
          tintConfig.glassColor[0],
          tintConfig.glassColor[1],
          tintConfig.glassColor[2],
        );
        material.color.lerp(targetGlassColor, step);
      } else {
        material.color.lerp(rec.nativeColor, step);
      }

      // `transparent` is a boolean — no lerp. Flipping mid-frame
      // re-sorts the three.js render queue but that's a visual
      // non-event at our scene size. Only write when it actually
      // needs to change so we don't poke three's material cache.
      const txTarget = glassTransparentTarget ?? rec.nativeTransparent;
      if (material.transparent !== txTarget) {
        material.transparent = txTarget;
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
