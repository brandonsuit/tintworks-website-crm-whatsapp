"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type * as THREE from "three";

/**
 * Renders the compressed GLB, centred at the scene origin, and applies
 * gentle auto-rotation unless the caller disables it (prefers-reduced-motion
 * or recent user input).
 *
 * ~6–8 seconds per full rotation → 2π / 7 ≈ 0.9 rad/sec works well.
 * useFrame's `delta` is already frame-rate-independent.
 */

const MODEL_PATH = "/models/hero-car.glb";
const ROTATION_SPEED = (Math.PI * 2) / 7; // rad/sec

// Preload during the first client render so the network fetch overlaps
// with the Canvas / three.js warm-up. Drei hoists this out of the
// component when the module loads.
useGLTF.preload(MODEL_PATH);

export function Model({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useFrame((_state, delta) => {
    if (!autoRotate || !groupRef.current) return;
    groupRef.current.rotation.y += ROTATION_SPEED * delta;
  });

  return (
    <group ref={groupRef}>
      {/* `primitive object={scene}` re-uses the parsed GLTF scene graph
          without re-cloning on every render; fine here because we only
          mount one model. */}
      <primitive object={scene} />
    </group>
  );
}
