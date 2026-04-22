/* eslint-disable @next/next/no-img-element */
/**
 * Throwaway accent A/B — blue (current global default) vs red (alternate).
 *
 * This route is deleted after Group 2 once the accent is locked. Both columns
 * share every base token; only --accent / --ring / --whatsapp-unchanged
 * diverge, scoped to the column via inline style. That way the comparison
 * is apples-to-apples with the real theme variables (no hard-coded hex).
 *
 * Marked noindex — if this ships accidentally it won't hit search.
 */

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Style preview — Tintworks",
  robots: { index: false, follow: false },
};

type AccentTokens = {
  label: string;
  hsl: string;     // "H S% L%"
  foreground: string;
};

// Electric blue — current global default in app/globals.css.
const BLUE: AccentTokens = {
  label: "Electric blue — 210 100% 56%",
  hsl: "210 100% 56%",
  foreground: "0 0% 100%",
};

// Red alternate as proposed.
const RED: AccentTokens = {
  label: "Red — 358 75% 55%",
  hsl: "358 75% 55%",
  foreground: "0 0% 100%",
};

function accentStyle(t: AccentTokens): React.CSSProperties {
  return {
    // Scoped override — these CSS vars win only inside this column.
    ["--accent" as string]: t.hsl,
    ["--accent-foreground" as string]: t.foreground,
    ["--ring" as string]: t.hsl,
  };
}

function Swatch({ label, varName, alpha = 1 }: { label: string; varName: string; alpha?: number }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className="h-10 w-16 rounded-md border border-border"
        style={{ background: `hsl(var(${varName}) / ${alpha})` }}
      />
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  );
}

function AccentColumn({ tokens }: { tokens: AccentTokens }) {
  return (
    <div
      className="flex flex-1 flex-col gap-8 rounded-xl border border-border bg-background p-8"
      style={accentStyle(tokens)}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Accent</p>
          <h2 className="font-display text-2xl font-bold">{tokens.label}</h2>
        </div>
        <Badge variant="accent">LIVE TOKENS</Badge>
      </div>

      {/* Surface elevations */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Surface elevations
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-md border border-border bg-background p-4">
            <div className="text-xs text-muted-foreground">background</div>
            <div className="mt-1 text-sm font-medium">Body</div>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">card</div>
            <div className="mt-1 text-sm font-medium">Card</div>
          </div>
          <div className="rounded-md border border-border bg-muted p-4">
            <div className="text-xs text-muted-foreground">muted</div>
            <div className="mt-1 text-sm font-medium">Muted</div>
          </div>
        </div>
      </section>

      {/* Accent at 5 opacities */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Accent opacities
        </h3>
        <div className="flex flex-wrap gap-4">
          <Swatch label="10%" varName="--accent" alpha={0.1} />
          <Swatch label="20%" varName="--accent" alpha={0.2} />
          <Swatch label="40%" varName="--accent" alpha={0.4} />
          <Swatch label="60%" varName="--accent" alpha={0.6} />
          <Swatch label="100%" varName="--accent" alpha={1} />
        </div>
      </section>

      {/* Buttons — all four variants in resting + hover (hover-on-focus demo via :focus-visible) */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Buttons (hover + click to see states)
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" size="lg">Accent</Button>
          <Button variant="outline" size="lg">Outline</Button>
          <Button variant="ghost" size="lg">Ghost</Button>
          <Button variant="whatsapp" size="lg">WhatsApp</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Hover each. The ghost + outline variants pick up the accent on focus; check the ring.
        </p>
      </section>

      {/* Focus-ring test on an input */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Focus ring (Tab into the input, or click it)
        </h3>
        <div className="space-y-2">
          <Label htmlFor={`preview-input-${tokens.hsl}`}>Your name</Label>
          <Input
            id={`preview-input-${tokens.hsl}`}
            placeholder="Click or tab into me to see the ring"
            defaultValue=""
          />
        </div>
      </section>

      {/* Accent-on-text + link samples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Text + link on dark
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Car window tinting Leeds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Bring your vehicle to our Holbeck studio. Professional ceramic tints with a lifetime warranty.
            </p>
            <p>
              Body text on card. <a className="text-accent underline-offset-4 hover:underline" href="#">Accent link sample</a>.
            </p>
            <p>
              <span className="text-accent">Accent-coloured text</span> for small highlights like prices.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Logo sizes — reuses public/logo.svg, which has its own baked-in blue tick.
          Rendering it here to check it still reads against the chosen accent's
          overall palette. If the red wins, we'll retone the logo SVG's tick. */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Logo (current wordmark, blue tick baked in)
        </h3>
        <div className="flex flex-wrap items-center gap-8 rounded-md bg-card p-6">
          <img src="/logo.svg" alt="Tintworks" style={{ height: 24 }} />
          <img src="/logo.svg" alt="Tintworks" style={{ height: 40 }} />
          <img src="/logo.svg" alt="Tintworks" style={{ height: 64 }} />
        </div>
        <p className="text-xs text-muted-foreground">
          Note: the tick is hard-coded blue in public/logo.svg. If we go red, I&apos;ll retone it then.
        </p>
      </section>
    </div>
  );
}

export default function StylePreviewPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Throwaway preview — removed once accent is locked
          </p>
          <h1 className="font-display text-4xl font-bold">Accent A/B</h1>
          <p className="max-w-2xl text-muted-foreground">
            Both columns share every other theme token. Only <code>--accent</code>,{" "}
            <code>--accent-foreground</code>, and <code>--ring</code> differ. Pick the one that
            feels right for an automotive tint studio; the accent propagates to buttons, focus
            rings, link colours, email CTAs, and (optionally) the logo tick.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <AccentColumn tokens={BLUE} />
          <AccentColumn tokens={RED} />
        </div>

        <footer className="mt-10 text-xs text-muted-foreground">
          Tip: hover + tab through both columns. The focus ring and hover states are where
          candidate accents usually fall down, not the base swatch.
        </footer>
      </div>
    </main>
  );
}
