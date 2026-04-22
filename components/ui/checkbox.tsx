"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Minimal, accessible checkbox — a styled <input type="checkbox">.
 * Avoids pulling in @radix-ui/react-checkbox since our forms use native
 * `<input>` elements with react-hook-form register(). Keeps bundle small.
 */

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer h-5 w-5 appearance-none rounded border border-input bg-background transition-colors",
            "checked:border-accent checked:bg-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <Check
          className="pointer-events-none absolute h-3.5 w-3.5 text-accent-foreground opacity-0 peer-checked:opacity-100"
          aria-hidden
        />
      </span>
    );
  },
);
Checkbox.displayName = "Checkbox";
