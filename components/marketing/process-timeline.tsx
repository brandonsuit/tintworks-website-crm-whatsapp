import { MessageSquare, CalendarCheck2, Car, Sparkles } from "lucide-react";

/**
 * Four-step "how it works" timeline. Renders as a vertical list on mobile
 * and a horizontal row on md+, connected by an electric-blue line.
 */

const steps = [
  {
    icon: MessageSquare,
    title: "Get a quote",
    body: "Use the quote tool or send us a WhatsApp message. We'll come back the same day with pricing and a fitting slot.",
  },
  {
    icon: CalendarCheck2,
    title: "Book a slot",
    body: "Pick a day that suits you. Appointment-only, so no waiting around when you arrive.",
  },
  {
    icon: Car,
    title: "Drop the car off",
    body: "Brown Place, Holbeck (LS11). Wait at the studio or come back later — most jobs finish the same day.",
  },
  {
    icon: Sparkles,
    title: "Collect and drive",
    body: "Two-year fitting warranty. We'll always pick up the phone for aftercare questions.",
  },
] as const;

export function ProcessTimeline() {
  return (
    <ol
      role="list"
      className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 hidden h-[2px] w-[calc(100%-3rem)] bg-gradient-to-r from-accent/60 via-accent to-accent/60 md:block"
      />
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="relative">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-accent/50 bg-background text-accent shadow-glow-sm">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-5 font-display text-xs uppercase tracking-[0.25em] text-[hsl(var(--silver))]">
              Step {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-2xl uppercase tracking-tight">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
