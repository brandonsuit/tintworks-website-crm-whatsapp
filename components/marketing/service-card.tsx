import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Dark, angular service card with an electric-blue glow halo on hover.
 * Used on the home teaser + the /services overview grid.
 */

export function ServiceCard({
  href,
  title,
  description,
  icon: Icon,
  cta = "Learn more",
  badge,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cta?: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="group focus-visible:outline-none">
      <Card
        className={cn(
          "relative h-full overflow-hidden p-6 transition-all duration-200 hover-glow",
          "group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.2), transparent 55%)",
          }}
        />
        {badge && (
          <span className="absolute right-4 top-4 rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
            {badge}
          </span>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-accent/40 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-display text-2xl uppercase tracking-tight">
            {title}
          </h3>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
        <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
          {cta}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </p>
      </Card>
    </Link>
  );
}
