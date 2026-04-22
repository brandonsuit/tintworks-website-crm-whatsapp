import { cn } from "@/lib/utils";

/**
 * Continuously-scrolling strip of vehicle makes we've worked on — pure CSS
 * animation (translateX), duplicated inline so the loop is seamless. Aria-
 * hidden (it's decorative; the content is a vibe cue, not information).
 */

const BRANDS = [
  "BMW",
  "Audi",
  "Mercedes",
  "Porsche",
  "Range Rover",
  "Tesla",
  "Volkswagen",
  "Ford",
  "Nissan",
  "Toyota",
  "Honda",
  "Mini",
  "Vauxhall",
  "Kia",
  "Hyundai",
  "Lexus",
];

export function BrandMarquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden border-y border-border/60 bg-background/60",
        className,
      )}
    >
      {/* Edge fades so the brands drift in/out rather than hard-cutting */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-tw-marquee gap-10 py-4 [animation-duration:48s]">
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="font-display text-xl uppercase tracking-[0.35em] text-muted-foreground/70"
          >
            {b}
            <span aria-hidden className="ml-10 text-accent/50">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
