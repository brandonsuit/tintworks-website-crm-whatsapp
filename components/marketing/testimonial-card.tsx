import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Testimonial card. v1 ships placeholder quotes marked {# TODO #} so the
 * layout is real; swap for genuine Google/Facebook reviews before launch.
 */

export function TestimonialCard({
  quote,
  author,
  context,
  isPlaceholder = false,
}: {
  quote: string;
  author: string;
  context: string;
  isPlaceholder?: boolean;
}) {
  return (
    <Card className="relative h-full p-6">
      {isPlaceholder && (
        <Badge variant="muted" className="absolute right-3 top-3 text-[10px]">
          {/* {# TODO: replace with real review before launch #} */}
          placeholder
        </Badge>
      )}
      <Quote className="h-5 w-5 text-accent" aria-hidden />
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-4 text-sm font-medium">{author}</p>
      <p className="text-xs text-muted-foreground">{context}</p>
    </Card>
  );
}
