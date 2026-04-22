"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Animated count-up that triggers once the block enters the viewport. Client
 * component — uses framer-motion values so the transition runs on the GPU
 * and we don't rerender on every tick.
 */

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10"
    >
      {stats.map((s) => (
        <li key={s.label}>
          <StatBlock stat={s} />
        </li>
      ))}
    </ul>
  );
}

function StatBlock({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => rounded.on("change", setDisplay), [rounded]);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, stat.value, {
      duration: 1.4,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return () => controls.stop();
  }, [inView, mv, stat.value]);

  return (
    <div ref={ref}>
      <p className="font-display text-5xl uppercase leading-none tracking-tight text-accent md:text-6xl">
        {display}
        {stat.suffix ?? ""}
      </p>
      <p className="mt-2 text-sm text-muted-foreground md:text-base">
        {stat.label}
      </p>
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
