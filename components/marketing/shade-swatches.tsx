import { cn } from "@/lib/utils";

/**
 * Visual tint-shade reference strip. Each swatch represents a VLT %
 * (higher = lets more light through = lighter tint). Pure presentation —
 * the quote wizard renders a larger interactive version with selection
 * state.
 */

const SHADES: { label: string; vlt: number; note?: string }[] = [
  { label: "Limo", vlt: 5, note: "Rear glass only" },
  { label: "Dark", vlt: 20 },
  { label: "Medium", vlt: 35 },
  { label: "Light", vlt: 50 },
  { label: "Very light", vlt: 70, note: "UK-legal for front sides" },
];

export function ShadeSwatches({ className }: { className?: string }) {
  return (
    <ul
      role="list"
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-5",
        className,
      )}
    >
      {SHADES.map((s) => (
        <li key={s.vlt} className="text-center">
          <div
            aria-hidden
            className="h-20 rounded-sm border border-border ring-1 ring-inset ring-white/5"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,${
                (100 - s.vlt) / 100
              }), rgba(0,0,0,${(100 - s.vlt) / 100}))`,
              backgroundColor: `rgba(8,8,10, ${(100 - s.vlt) / 100})`,
            }}
          />
          <p className="mt-2 font-display text-lg uppercase tracking-tight">
            {s.vlt}%
          </p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
          {s.note && (
            <p className="mt-1 text-[10px] uppercase tracking-widest text-accent">
              {s.note}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
