"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Bounds,
} from "@react-three/drei";

import { Model } from "./model";

/**
 * The actual R3F Canvas. Loaded only inside a next/dynamic ssr:false
 * boundary (see ./index.tsx) — three.js cannot SSR.
 *
 * Palette
 *   Background is #0A0A0A (matches globals.css `--background: 0 0% 4%`).
 *   Environment preset "warehouse" — warm indoor reflections that
 *   flatter the warm-gold (#d2a02a) accent; "studio" was too cool
 *   against this palette. Key light is tinted slightly warm for the
 *   same reason. All presets ship with the drei bundle (no external
 *   HDR fetch) so nothing can 404 on Railway.
 *
 * Behaviour
 *   - Auto-rotate unless prefers-reduced-motion.
 *   - User drag pauses auto-rotate for 4s then resumes.
 *   - Zoom + pan disabled (keep the composition stable).
 *   - <Bounds fit clip observe> auto-frames the model.
 *   - <ContactShadows> soft shadow underneath.
 *
 * aria-label is on the wrapping div rather than the <canvas> because
 * R3F forwards the canvas ref internally; the outer div reads the same
 * for screen readers.
 */

type SceneProps = {
  prefersReducedMotion: boolean;
};

export default function Scene({ prefersReducedMotion }: SceneProps) {
  const [autoRotate, setAutoRotate] = React.useState(!prefersReducedMotion);
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // When the user drags, pause auto-rotation for 4s then resume.
  const handleStart = React.useCallback(() => {
    if (prefersReducedMotion) return;
    setAutoRotate(false);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, [prefersReducedMotion]);

  const handleEnd = React.useCallback(() => {
    if (prefersReducedMotion) return;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setAutoRotate(true), 4000);
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
        camera={{ position: [4, 2, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0A0A0A"]} />

        {/* Warehouse HDR handles reflections; the directional key is
            tinted slightly warm to sit nicely with the gold accent. */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={0.85}
          color="#f4e3b8"
        />

        <React.Suspense fallback={null}>
          <Environment preset="warehouse" />
          <Bounds fit clip observe margin={1.1}>
            <Model autoRotate={autoRotate} />
          </Bounds>
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.55}
            scale={12}
            blur={2.5}
            far={4}
          />
        </React.Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
          onStart={handleStart}
          onEnd={handleEnd}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
