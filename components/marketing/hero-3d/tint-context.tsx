"use client";

import * as React from "react";

import {
  DEFAULT_TINT_LEVEL,
  TINT_LEVELS,
  TINT_LOCALSTORAGE_KEY,
  type TintConfig,
  type TintLevel,
} from "./tint-levels";

/**
 * Shared state for the hero tint-preview buttons and the 3D scene.
 * Wrap the hero section in `<TintProvider>`; the picker and the
 * 3D background both use `useTint()` to read/write the current level.
 *
 * The provider also owns:
 *   - localStorage persistence (post-mount restore, write-on-change)
 *   - Plausible custom-event emission on each change
 *
 * Note on SSR: the provider defaults to `DEFAULT_TINT_LEVEL` so the
 * first paint is stable across server + client. A useEffect restores
 * the saved value after hydration — may cause a one-frame visual
 * jump if the user's saved value differs from the default, but that's
 * an acceptable trade to avoid hydration-mismatch warnings.
 */

type TintContextValue = {
  level: TintLevel;
  setLevel: (next: TintLevel) => void;
  config: TintConfig;
};

const TintContext = React.createContext<TintContextValue | null>(null);

export function useTint(): TintContextValue {
  const ctx = React.useContext(TintContext);
  if (!ctx) {
    throw new Error("useTint must be used inside <TintProvider>");
  }
  return ctx;
}

const isTintLevel = (v: unknown): v is TintLevel =>
  typeof v === "string" && TINT_LEVELS.some((l) => l.id === v);

type PlausibleFn = (
  name: string,
  opts?: { props?: Record<string, string | number | boolean> },
) => void;

function firePlausible(level: TintLevel) {
  if (typeof window === "undefined") return;
  try {
    const cfg = TINT_LEVELS.find((l) => l.id === level);
    const label = cfg?.plausibleLabel ?? level;
    const w = window as typeof window & { plausible?: PlausibleFn };
    w.plausible?.("hero_tint_preview", { props: { level: label } });
  } catch {
    /* silent — Plausible not loaded locally, bad window.plausible, etc. */
  }
}

export function TintProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevelState] =
    React.useState<TintLevel>(DEFAULT_TINT_LEVEL);

  // Restore persisted preference post-hydration. useEffect (not
  // useLayoutEffect) to avoid SSR warnings.
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TINT_LOCALSTORAGE_KEY);
      if (isTintLevel(saved) && saved !== DEFAULT_TINT_LEVEL) {
        setLevelState(saved);
      }
    } catch {
      /* localStorage disabled (private mode, storage quota) — silent */
    }
  }, []);

  const setLevel = React.useCallback((next: TintLevel) => {
    setLevelState(next);
    try {
      window.localStorage.setItem(TINT_LOCALSTORAGE_KEY, next);
    } catch {
      /* silent */
    }
    firePlausible(next);
  }, []);

  const config = React.useMemo(
    () => TINT_LEVELS.find((l) => l.id === level) ?? TINT_LEVELS[2]!,
    [level],
  );

  const value = React.useMemo<TintContextValue>(
    () => ({ level, setLevel, config }),
    [level, setLevel, config],
  );

  return <TintContext.Provider value={value}>{children}</TintContext.Provider>;
}
