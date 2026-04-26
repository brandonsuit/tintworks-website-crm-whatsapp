"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Site-wide 500. Client component so React can attach the `reset` boundary.
 *
 * Kept deliberately minimal and free of marketing-shell imports: the shell
 * transitively reads server-only env (via lib/business), which is undefined
 * in the client bundle and would crash the error boundary itself. If the
 * boundary crashes, Next falls back to its generic gray "Application error"
 * screen — exactly what we want to avoid.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[tintworks] runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="container py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-accent">500</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-balance md:text-5xl">
            Something came off the rails.
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Sorry — the page hit an error. Try again, or head back to the
            home page.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reference:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">
                {error.digest}
              </code>
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="accent" size="lg" onClick={reset}>
              Try again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to the home page</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
