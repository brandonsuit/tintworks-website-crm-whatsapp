"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Single-open FAQ accordion. Client component — uses layout animations for
 * the expand/collapse. Keyboard: Enter/Space toggle, Tab moves between items.
 */

export type FaqItem = {
  q: string;
  a: React.ReactNode;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <ul role="list" className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className={cn(
                "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                expanded ? "text-accent" : "text-foreground hover:text-accent",
              )}
            >
              <span className="font-display text-xl uppercase tracking-tight md:text-2xl">
                {item.q}
              </span>
              <ChevronDown
                aria-hidden
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                  expanded && "rotate-180 text-accent",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-10 text-muted-foreground">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
