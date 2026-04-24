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
 * Interactive tint-preview scene. Used inside a contained panel on
 * the landing page (3:2 desktop / square mobile) — NOT full-bleed.
 *
 * Composition
 *   - Model at origin, scaled in `model.tsx` to realistic world units.
 *   - Camera centred on the car (target at origin) since this instance
 *     sits in an aspect-constrained container — not offset like the
 *     full-bleed hero is.
 *   - Environment "warehouse" + warm key light for the gold palette.
 *
 * Animation
 *   - Model is stationary.
 *   - `CameraAnimator` drives OrbitControls.setAzimuthalAngle with a
 *     sine oscillation — ±15° over 25 s. Slightly more pronounced than
 *     the (now removed) hero orbit because this instance IS the main
 *     interaction; users are here to see the car move.
 *   - User drag pauses the orbit; a 4 s timer resumes it from the
 *     user's release angle so there's no snap back to centre.
 *   - prefers-reduced-motion disables the orbit entirely. Drag still
 *     works; the scene just sits still until the user moves it.
 *
 * Tint modulation happens in Model.tsx via the `tintConfig` prop.
 */

const CAMERA_POSITION: [number, number, number] = [4, 1.2, 5];
const CAMERA_FOV = 32;
const TARGET: [number, number, number] = [0, 0, 0];

const DX = CAMERA_POSITION[0] - TARGET[0];
const DZ = CAMERA_POSITION[2] - TARGET[2];
const BASE_AZIMUTH = Math.atan2(DX, DZ);

// Showcase orbit: ±15° swing, 25 s full cycle.
const ORBIT_AMPLITUDE = Math.PI / 12;
const ORBIT_PERIOD_SEC = 25;
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
