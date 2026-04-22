import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Dark, bordered service card with a subtle accent edge on hover.
 * Used on the landing teaser + the /services overview grid.
 */

export function ServiceCard({
  href,
  title,
  description,
  icon: Icon,
  cta = "Learn more",
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group focus-visible:outline-none"
    >
      <Card
        className={cn(
          "h-full p-6 transition-all duration-200",
          "group-hover:border-accent/60 group-hover:shadow-[0_0_0_1px_hsl(var(--accent)/0.35)]",
          "group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
        <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </p>
      </Card>
    </Link>
  );
}
