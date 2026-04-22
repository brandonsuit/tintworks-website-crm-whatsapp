"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Phone,
  Car as CarIcon,
  Truck,
  Sparkles,
  Shield,
  Flame,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { CarDiagram } from "@/components/quote/car-diagram";
import { quoteSchema, type QuoteInput } from "@/lib/validation/quote";
import {
  VEHICLE_TYPES,
  WINDOW_SETS,
  TINT_SHADES,
  EXTRAS,
  vehicleTypeLabels,
  windowSetLabels,
  tintShadeLabels,
  extraLabels,
  calculateQuote,
  formatGbp,
  type VehicleType,
  type WindowSet,
  type TintShade,
  type ExtraKey,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Multi-step quote wizard. Client component that builds state locally,
 * persists to localStorage, and on submit POSTs to /api/quote which returns
 * a pre-built WhatsApp URL for the customer to tap through.
 *
 * Seven steps:
 *   1. Vehicle type (visual grid)
 *   2. Vehicle details (make / model / year)
 *   3. Windows to tint (multi-select + car diagram, live total starts)
 *   4. Tint shade (VLT swatches + UK law explainer)
 *   5. Extras
 *   6. Contact details
 *   7. Summary + submit
 */

type WizardState = QuoteInput;

const LS_KEY = "tintworks.quoteWizard.v1";

const INITIAL_STATE: WizardState = {
  vehicleType: undefined as unknown as VehicleType,
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "" as unknown as number,
  windows: [],
  shade: undefined as unknown as TintShade,
  extras: [],
  name: "",
  phone: "",
  contactTime: "",
  notes: "",
  company: "",
};

const STEP_COUNT = 7;

type SuccessState = {
  whatsAppUrl: string;
  shortCode: string;
  emailSent: boolean;
};

export function QuoteWizard() {
  const [state, setState] = React.useState<WizardState>(INITIAL_STATE);
  const [step, setStep] = React.useState(1);
  const [loaded, setLoaded] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<SuccessState | null>(null);

  // Hydrate from localStorage once on mount.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: WizardState;
          step?: number;
        };
        if (parsed.state) setState({ ...INITIAL_STATE, ...parsed.state });
        if (parsed.step && parsed.step >= 1 && parsed.step <= STEP_COUNT) {
          setStep(parsed.step);
        }
      }
    } catch {
      /* ignore storage errors */
    }
    setLoaded(true);
  }, []);

  // Persist state + step whenever they change (after initial hydrate).
  React.useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify({ state, step }));
    } catch {
      /* quota / disabled storage — non-fatal */
    }
  }, [state, step, loaded]);

  const update = React.useCallback(
    <K extends keyof WizardState>(key: K, value: WizardState[K]) =>
      setState((s) => ({ ...s, [key]: value })),
    [],
  );

  const toggleWindow = React.useCallback((w: WindowSet) => {
    setState((s) => {
      const list = s.windows ?? [];
      const next = list.includes(w)
        ? list.filter((v) => v !== w)
        : [...list, w];
      return { ...s, windows: next };
    });
  }, []);

  const toggleExtra = React.useCallback((e: ExtraKey) => {
    setState((s) => {
      const list = s.extras ?? [];
      const next = list.includes(e)
        ? list.filter((v) => v !== e)
        : [...list, e];
      return { ...s, extras: next };
    });
  }, []);

  const breakdown = React.useMemo(
    () =>
      calculateQuote({
        vehicleType: state.vehicleType ?? null,
        windows: state.windows ?? [],
        shade: state.shade ?? null,
        extras: state.extras ?? [],
      }),
    [state.vehicleType, state.windows, state.shade, state.extras],
  );

  const canAdvance = React.useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(state.vehicleType);
      case 2:
        return state.vehicleMake.trim().length > 0 && state.vehicleModel.trim().length > 0;
      case 3:
        return (state.windows ?? []).length > 0;
      case 4:
        return Boolean(state.shade);
      case 5:
        return true; // extras optional
      case 6:
        return state.name.trim().length >= 2 && state.phone.trim().length >= 7;
      default:
        return true;
    }
  }, [step, state]);

  const goNext = () => {
    if (!canAdvance) return;
    if (step < STEP_COUNT) setStep(step + 1);
  };
  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    const parsed = quoteSchema.safeParse(state);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setSubmitError(
        firstIssue?.message ??
          "We couldn't read the form — check the fields and try again.",
      );
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload = await res.json();
      if (!res.ok || !payload.ok) {
        setSubmitError(
          typeof payload.error === "string"
            ? payload.error
            : "Something went wrong — please try again or message us on WhatsApp.",
        );
        return;
      }
      // Clear persisted state on successful submit.
      try {
        window.localStorage.removeItem(LS_KEY);
      } catch {
        /* ignore */
      }
      setSuccess({
        whatsAppUrl: payload.whatsAppUrl as string,
        shortCode: payload.shortCode as string,
        emailSent: Boolean(payload.emailSent),
      });
    } catch {
      setSubmitError(
        "Couldn't reach the server — check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <WizardSuccess success={success} />;
  }

  return (
    <div className="rounded-sm border border-border bg-card">
      <WizardProgress step={step} total={STEP_COUNT} showTotal={breakdown.priced} totalPennies={breakdown.total} />

      <div className="p-6 md:p-10">
        {/* Honeypot — must stay empty */}
        <div
          aria-hidden
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        >
          <label>
            Company (leave blank)
            <input
              tabIndex={-1}
              autoComplete="off"
              value={state.company ?? ""}
              onChange={(e) => update("company", e.target.value)}
            />
          </label>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {step === 1 && (
              <StepVehicleType
                value={state.vehicleType}
                onChange={(v) => update("vehicleType", v)}
              />
            )}
            {step === 2 && (
              <StepVehicleDetails
                make={state.vehicleMake}
                model={state.vehicleModel}
                year={state.vehicleYear}
                onMake={(v) => update("vehicleMake", v)}
                onModel={(v) => update("vehicleModel", v)}
                onYear={(v) => update("vehicleYear", v)}
              />
            )}
            {step === 3 && (
              <StepWindows
                value={state.windows ?? []}
                onToggle={toggleWindow}
              />
            )}
            {step === 4 && (
              <StepShade
                value={state.shade}
                onChange={(v) => update("shade", v)}
              />
            )}
            {step === 5 && (
              <StepExtras
                value={state.extras ?? []}
                onToggle={toggleExtra}
              />
            )}
            {step === 6 && (
              <StepContact
                name={state.name}
                phone={state.phone}
                contactTime={state.contactTime}
                notes={state.notes}
                onName={(v) => update("name", v)}
                onPhone={(v) => update("phone", v)}
                onContactTime={(v) => update("contactTime", v)}
                onNotes={(v) => update("notes", v)}
              />
            )}
            {step === 7 && (
              <StepSummary
                state={state}
                breakdown={breakdown}
                submitting={submitting}
                submitError={submitError}
                onSubmit={handleSubmit}
                onEdit={(n) => setStep(n)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {step < STEP_COUNT && (
          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              variant="accent"
              size="lg"
              onClick={goNext}
              disabled={!canAdvance}
              className="gap-2 shadow-glow"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Progress bar + running total ────────────────────────────────────────────

function WizardProgress({
  step,
  total,
  showTotal,
  totalPennies,
}: {
  step: number;
  total: number;
  showTotal: boolean;
  totalPennies: number;
}) {
  const pct = (step / total) * 100;
  return (
    <div className="border-b border-border bg-background/40 px-6 py-4 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Step {String(step).padStart(2, "0")} /{" "}
          <span className="text-foreground">
            {String(total).padStart(2, "0")}
          </span>
        </p>
        {showTotal && (
          <p className="text-sm" aria-live="polite">
            Running total:{" "}
            <span className="font-display text-lg uppercase tracking-tight text-accent">
              {formatGbp(totalPennies)}
            </span>
          </p>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"
      >
        <motion.div
          className="h-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

// ── Step 1 — Vehicle type ────────────────────────────────────────────────────

const VEHICLE_ICONS: Record<VehicleType, React.ComponentType<{ className?: string }>> = {
  hatchback: CarIcon,
  saloon: CarIcon,
  estate: CarIcon,
  coupe: CarIcon,
  suv: CarIcon,
  fourByFour: CarIcon,
  van: Truck,
  other: CarIcon,
};

function StepVehicleType({
  value,
  onChange,
}: {
  value: VehicleType | undefined;
  onChange: (v: VehicleType) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 01"
        title="What are you tinting?"
        lead="Pick the body style closest to your vehicle — it helps us price accurately."
      />
      <ul
        role="radiogroup"
        aria-label="Vehicle type"
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {VEHICLE_TYPES.map((v) => {
          const Icon = VEHICLE_ICONS[v];
          const selected = value === v;
          return (
            <li key={v}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(v)}
                className={cn(
                  "group flex h-28 w-full flex-col items-center justify-center gap-2 rounded-sm border bg-background text-center transition-all hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected
                    ? "border-accent bg-accent/5 shadow-glow-sm"
                    : "border-border hover:border-accent/60",
                )}
              >
                <Icon
                  className={cn(
                    "h-7 w-7 transition-colors",
                    selected ? "text-accent" : "text-muted-foreground",
                  )}
                  aria-hidden
                />
                <span className="font-display text-sm uppercase tracking-wider">
                  {vehicleTypeLabels[v]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Step 2 — Vehicle details ─────────────────────────────────────────────────

function StepVehicleDetails({
  make,
  model,
  year,
  onMake,
  onModel,
  onYear,
}: {
  make: string;
  model: string;
  year: number | "" | undefined;
  onMake: (v: string) => void;
  onModel: (v: string) => void;
  onYear: (v: number | "") => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 02"
        title="Tell us about your vehicle."
        lead="Make + model at minimum. Year helps if it's a recent model with factory-tinted rear glass."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Make" htmlFor="make" required>
          <Input
            id="make"
            placeholder="e.g. BMW"
            value={make}
            onChange={(e) => onMake(e.target.value)}
            autoComplete="off"
          />
        </Field>
        <Field label="Model" htmlFor="model" required>
          <Input
            id="model"
            placeholder="e.g. 3 Series"
            value={model}
            onChange={(e) => onModel(e.target.value)}
            autoComplete="off"
          />
        </Field>
        <Field label="Year" htmlFor="year" hint="Optional">
          <Input
            id="year"
            type="number"
            inputMode="numeric"
            min={1950}
            max={new Date().getFullYear() + 1}
            placeholder="e.g. 2022"
            value={year ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              onYear(v === "" ? "" : Number(v));
            }}
          />
        </Field>
      </div>
    </div>
  );
}

// ── Step 3 — Windows ─────────────────────────────────────────────────────────

function StepWindows({
  value,
  onToggle,
}: {
  value: WindowSet[];
  onToggle: (w: WindowSet) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 03"
        title="Which windows?"
        lead="Pick one or more. The car diagram lights up to show what you've selected."
      />
      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <ul role="list" className="space-y-3">
          {WINDOW_SETS.map((w) => {
            const checked = value.includes(w);
            return (
              <li key={w}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors",
                    checked
                      ? "border-accent bg-accent/5 text-foreground"
                      : "border-border hover:border-accent/60",
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => onToggle(w)}
                  />
                  <span>{windowSetLabels[w]}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className="rounded-sm border border-border bg-background p-4 md:p-6">
          <CarDiagram selected={value} />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Front side windows must stay at{" "}
            <span className="text-accent">70% VLT</span> minimum by UK law — we
            keep you compliant.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Step 4 — Tint shade ──────────────────────────────────────────────────────

function StepShade({
  value,
  onChange,
}: {
  value: TintShade | undefined;
  onChange: (v: TintShade) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 04"
        title="Pick your shade."
        lead="Lower % = darker. Not sure? Pick 20% — the most common all-round pick."
      />
      <ul
        role="radiogroup"
        aria-label="Tint shade"
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5"
      >
        {TINT_SHADES.map((s) => {
          const selected = value === s;
          const vlt = Number(s);
          return (
            <li key={s}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(s)}
                className={cn(
                  "w-full rounded-sm border bg-background p-3 text-center transition-all hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected
                    ? "border-accent bg-accent/5 shadow-glow-sm"
                    : "border-border hover:border-accent/60",
                )}
              >
                <div
                  aria-hidden
                  className="h-16 rounded-sm border border-border ring-1 ring-inset ring-white/5"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,${
                      (100 - vlt) / 100
                    }), rgba(0,0,0,${(100 - vlt) / 100}))`,
                    backgroundColor: `rgba(8,8,10, ${(100 - vlt) / 100})`,
                  }}
                />
                <p
                  className={cn(
                    "mt-3 font-display text-xl uppercase tracking-tight",
                    selected ? "text-accent" : "text-foreground",
                  )}
                >
                  {s}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {tintShadeLabels[s].split(" — ")[1] ?? ""}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        UK law: front sides must be <span className="text-foreground">≥70%</span>{" "}
        VLT, windscreen <span className="text-foreground">≥75%</span>. Rear
        glass — no restriction.
      </p>
    </div>
  );
}

// ── Step 5 — Extras ──────────────────────────────────────────────────────────

const EXTRA_ICONS: Record<ExtraKey, React.ComponentType<{ className?: string }>> = {
  ceramic: Sparkles,
  heatRejection: Flame,
  privacy: Eye,
  mobileService: Shield,
};

function StepExtras({
  value,
  onToggle,
}: {
  value: ExtraKey[];
  onToggle: (e: ExtraKey) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 05"
        title="Any upgrades?"
        lead="Optional — skip this step if the base install is enough."
      />
      <ul role="list" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {EXTRAS.map((e) => {
          const Icon = EXTRA_ICONS[e];
          const checked = value.includes(e);
          return (
            <li key={e}>
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-4 text-sm transition-colors",
                  checked
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/60",
                )}
              >
                <Checkbox
                  className="mt-0.5"
                  checked={checked}
                  onChange={() => onToggle(e)}
                />
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-display text-base uppercase tracking-tight">
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                    {extraLabels[e]}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Step 6 — Contact ────────────────────────────────────────────────────────

function StepContact({
  name,
  phone,
  contactTime,
  notes,
  onName,
  onPhone,
  onContactTime,
  onNotes,
}: {
  name: string;
  phone: string;
  contactTime: string | undefined;
  notes: string | undefined;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onContactTime: (v: string) => void;
  onNotes: (v: string) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 06"
        title="How do we reach you?"
        lead="We'll confirm the quote and fitting slot on WhatsApp. No spam, no call-centre nonsense."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Your name" htmlFor="name" required>
          <Input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => onName(e.target.value)}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          required
          hint="UK number — we'll WhatsApp the quote"
        >
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07735 839280"
            value={phone}
            onChange={(e) => onPhone(e.target.value)}
          />
        </Field>
        <Field
          label="Best time to reach you"
          htmlFor="contactTime"
          hint="Optional — e.g. 'after 5pm'"
        >
          <Input
            id="contactTime"
            placeholder="e.g. After work"
            value={contactTime ?? ""}
            onChange={(e) => onContactTime(e.target.value)}
          />
        </Field>
        <div className="md:col-span-2">
          <Field
            label="Anything else to flag?"
            htmlFor="notes"
            hint="Optional — factory tint, body-wrapped vehicle, specific date etc."
          >
            <Textarea
              id="notes"
              rows={4}
              value={notes ?? ""}
              onChange={(e) => onNotes(e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ── Step 7 — Summary ────────────────────────────────────────────────────────

function StepSummary({
  state,
  breakdown,
  submitting,
  submitError,
  onSubmit,
  onEdit,
}: {
  state: WizardState;
  breakdown: ReturnType<typeof calculateQuote>;
  submitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
  onEdit: (n: number) => void;
}) {
  const vehicleLine = [
    state.vehicleYear || null,
    state.vehicleMake,
    state.vehicleModel,
    state.vehicleType ? `(${vehicleTypeLabels[state.vehicleType]})` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <StepHeading
        eyebrow="Step 07"
        title="Review and send."
        lead="Check everything looks right, then we'll open WhatsApp with your quote pre-filled."
      />

      <dl className="mt-8 divide-y divide-border border-y border-border">
        <SummaryRow label="Vehicle" editStep={1} onEdit={onEdit}>
          {vehicleLine || "—"}
        </SummaryRow>
        <SummaryRow label="Windows" editStep={3} onEdit={onEdit}>
          {state.windows.length > 0
            ? state.windows.map((w) => windowSetLabels[w]).join(", ")
            : "—"}
        </SummaryRow>
        <SummaryRow label="Shade" editStep={4} onEdit={onEdit}>
          {state.shade ? tintShadeLabels[state.shade] : "—"}
        </SummaryRow>
        <SummaryRow label="Extras" editStep={5} onEdit={onEdit}>
          {(state.extras ?? []).length > 0
            ? (state.extras ?? []).map((e) => extraLabels[e]).join(", ")
            : "None"}
        </SummaryRow>
        <SummaryRow label="Contact" editStep={6} onEdit={onEdit}>
          {state.name || "—"}
          {state.phone ? ` · ${state.phone}` : ""}
          {state.contactTime ? ` · ${state.contactTime}` : ""}
        </SummaryRow>
      </dl>

      <div className="mt-8 rounded-sm border border-accent/40 bg-accent/5 p-6">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Estimated price
        </p>
        <p className="mt-2 font-display text-5xl uppercase tracking-tight text-accent">
          {breakdown.priced ? formatGbp(breakdown.total) : "Price on request"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {breakdown.priced
            ? "Indicative — final price is confirmed when we see the vehicle."
            : "We'll confirm a firm price on WhatsApp once we've seen your vehicle details."}
        </p>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {submitError}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="whatsapp"
          size="xl"
          onClick={onSubmit}
          disabled={submitting}
          className="gap-2"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <WhatsAppIcon className="h-4 w-4" />
          )}
          {submitting ? "Sending…" : "Send Quote via WhatsApp"}
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  children,
  editStep,
  onEdit,
}: {
  label: string;
  children: React.ReactNode;
  editStep: number;
  onEdit: (n: number) => void;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 py-4">
      <dt className="font-display text-sm uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{children}</dd>
      <button
        type="button"
        onClick={() => onEdit(editStep)}
        className="text-xs uppercase tracking-widest text-accent underline-offset-4 hover:underline"
      >
        Edit
      </button>
    </div>
  );
}

// ── Success card ────────────────────────────────────────────────────────────

function WizardSuccess({ success }: { success: SuccessState }) {
  return (
    <div className="rounded-sm border border-accent/40 bg-card p-8 md:p-12">
      <div className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.3em] text-accent">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        Quote sent — ref {success.shortCode}
      </div>
      <h2 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
        One more tap to open WhatsApp.
      </h2>
      <p className="mt-4 max-w-xl text-muted-foreground">
        We&apos;ve pre-filled the message with your quote details. Tap the
        button below to open WhatsApp and send — we&apos;ll reply from there.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="whatsapp" size="xl" className="gap-2">
          <a
            href={success.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="cta-whatsapp"
            data-analytics-page="quote-success"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Open WhatsApp
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </Button>
        <Button asChild variant="outline" size="xl" className="gap-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
      {!success.emailSent && (
        <p className="mt-6 text-xs text-muted-foreground">
          We couldn&apos;t auto-notify the studio by email, but your details
          are safe — tap WhatsApp above and we&apos;ll take it from there.
        </p>
      )}
    </div>
  );
}

// ── Small UI atoms ───────────────────────────────────────────────────────────

function StepHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{lead}</p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
