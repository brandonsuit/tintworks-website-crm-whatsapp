"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";

import { Model } from "./model";
import type { TintConfig } from "./tint-levels";

/**
 * 3D hero scene. Right-weighted composition with a subtle camera
 * showcase orbit — not a full spin.
 *
 * Composition
 *   - Model sits at origin, scaled in `model.tsx` to realistic
 *     world units (~1 m per unit).
 *   - Camera looks from upper-right-front at an offset target
 *     (`TARGET`), which pushes the car toward the right 30% of the
 *     frame without moving the model. Tune `TARGET[0]` to slide the
 *     car left/right; tune `CAMERA_POSITION` + `CAMERA_FOV` to
 *     tighten or loosen framing.
 *   - Soft `Environment preset="warehouse"` + warm key light carry
 *     the gold accent palette.
 *   - Strengthened `ContactShadows` anchor the car to a ground plane
 *     (opacity 0.78, tight blur).
 *
 * Animation
 *   - Model is stationary.
 *   - `CameraAnimator` drives `OrbitControls.setAzimuthalAngle()` on
 *     every frame with a ±12° sine oscillation over a 28 s period —
 *     gentle showcase arc, not a full 360° spin.
 *   - User drag pauses the orbit; a 4 s inactivity timer resumes it
 *     by computing a time offset so the sine position matches the
 *     user's released angle — no jarring snap back to centre.
 *   - prefers-reduced-motion disables the orbit entirely. Drag still
 *     works, the scene just stays static until the user moves it.
 *
 * All Environment presets ship inside the drei bundle — no external
 * HDR fetch — so nothing can 404 on Railway.
 */

const CAMERA_POSITION: [number, number, number] = [4, 1.2, 5];
const CAMERA_FOV = 35;
const TARGET: [number, number, number] = [-0.8, 0, 0];

// OrbitControls' azimuth convention: atan2(x, z), measured from +Z
// toward +X. Pre-compute the base angle once so the animator can
// oscillate around it without reading camera state each frame.
const DX = CAMERA_POSITION[0] - TARGET[0];
const DZ = CAMERA_POSITION[2] - TARGET[2];
const BASE_AZIMUTH = Math.atan2(DX, DZ);

// Showcase orbit: ±12° swing, 28 s full cycle.
const ORBIT_AMPLITUDE = Math.PI / 15;
const ORBIT_PERIOD_SEC = 28;
const ORBIT_OMEGA = (2 * Math.PI) / ORBIT_PERIOD_SEC;

// Inactivity window before the auto-orbit resumes after a user drag.
const PAUSE_MS = 4000;

type OrbitControlsRef = React.ElementRef<typeof OrbitControls>;

type SceneProps = {
  prefersReducedMotion: boolean;
  /** Current tint-preview config. Plain prop (not context) because
   *  R3F's Canvas creates its own React root and context from the
   *  outer tree doesn't cross that boundary without a bridge. The
   *  caller reads `useTint()` outside Canvas and passes the config in. */
  tintConfig: TintConfig;
};

export default function Scene({
  prefersReducedMotion,
  tintConfig,
}: SceneProps) {
  const controlsRef = React.useRef<OrbitControlsRef | null>(null);
  // Paused while the user is actively dragging OR during the post-drag
  // inactivity window. `useRef` rather than state so useFrame can read
  // it without re-rendering the scene graph.
  const pausedRef = React.useRef<boolean>(prefersReducedMotion);
  const elapsedRef = React.useRef<number>(0);
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Stable Vector3 so OrbitControls doesn't churn its target on each
  // render. Memoised once — coords don't change at runtime.
  const targetVec = React.useMemo(
    () => new THREE.Vector3(...TARGET),
    [],
  );

  const onStart = React.useCallback(() => {
    if (prefersReducedMotion) return;
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, [prefersReducedMotion]);

  const onEnd = React.useCallback(() => {
    if (prefersReducedMotion) return;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      // Resume smoothly: pick an elapsed time whose sine output matches
      // the current azimuth offset so the orbit continues from where
      // the user released the camera rather than snapping back.
      const controls = controlsRef.current;
      if (controls) {
        const currentAz = controls.getAzimuthalAngle();
        const offset = currentAz - BASE_AZIMUTH;
        const clamped = Math.max(
          -ORBIT_AMPLITUDE,
          Math.min(ORBIT_AMPLITUDE, offset),
        );
        elapsedRef.current =
          Math.asin(clamped / ORBIT_AMPLITUDE) / ORBIT_OMEGA;
      }
      pausedRef.current = false;
    }, PAUSE_MS);
  }, [prefersReducedMotion]);

  React.useEffect(
    () => () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    },
    [],
  );

  return (
    <div
      role="img"
      aria-label="3D model of a vehicle being window tinted"
      className="absolute inset-0"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0A0A0A"]} />

        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={0.9}
          color="#f4e3b8"
        />

        <React.Suspense fallback={null}>
          <Environment preset="warehouse" />
          <Model tintConfig={tintConfig} />
          <ContactShadows
            position={[0, -0.25, 0]}
            opacity={0.78}
            scale={5}
            blur={1.8}
            far={2}
          />
        </React.Suspense>

        <OrbitControls
          ref={controlsRef}
          target={targetVec}
          enableZoom={false}
          enablePan={false}
          enableRotate
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
          onStart={onStart}
          onEnd={onEnd}
          makeDefault
        />

        <CameraAnimator
          enabled={!prefersReducedMotion}
          pausedRef={pausedRef}
          elapsedRef={elapsedRef}
          controlsRef={controlsRef}
        />
      </Canvas>
    </div>
  );
}

/**
 * Showcase camera orbit. Runs every frame via useFrame (only possible
 * inside <Canvas>, hence its own component). Drives the camera by
 * setting OrbitControls' azimuthal angle so it plays nicely with user
 * drag and OrbitControls' internal damping + change events.
 *
 * Does nothing when `enabled` is false (reduced-motion users) or
 * while `pausedRef.current` is true (user-drag or post-drag window).
 */
function CameraAnimator({
  enabled,
  pausedRef,
  elapsedRef,
  controlsRef,
}: {
  enabled: boolean;
  pausedRef: React.RefObject<boolean>;
  elapsedRef: React.RefObject<number>;
  controlsRef: React.RefObject<OrbitControlsRef | null>;
}) {
  useFrame((_state, delta) => {
    if (!enabled || pausedRef.current) return;
    elapsedRef.current += delta;
    const controls = controlsRef.current;
    if (!controls) return;
    const angle =
      BASE_AZIMUTH +
      ORBIT_AMPLITUDE * Math.sin(ORBIT_OMEGA * elapsedRef.current);
    controls.setAzimuthalAngle(angle);
    controls.update();
  });
  return null;
}
