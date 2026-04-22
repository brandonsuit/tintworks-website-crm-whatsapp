"use client";

import Link from "next/link";
import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import {
  leadSchema,
  TINT_WINDOWS,
  TINT_DARKNESS,
  windowLabels,
  darknessLabels,
  type LeadInput,
} from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

/**
 * Quote form. Client component (react-hook-form + zodResolver), submits
 * to /api/leads and, on success, swaps to a "Continue on WhatsApp" card.
 *
 * Zero auto-redirects — user-initiated click survives popup blockers on
 * mobile and desktop. If Resend fails server-side, the WhatsApp URL still
 * comes back and the card still renders; we surface a tiny non-blocking
 * note so the user knows the email went astray but the lead is safe.
 */

type SuccessState = {
  whatsappUrl: string;
  shortCode: string;
  emailSent: boolean;
};

const currentYear = new Date().getFullYear();

export function QuoteForm() {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<SuccessState | null>(null);

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: currentYear,
      windows: [],
      // `darkness` left unset so the user must actively pick; zod rejects
      // missing values at submit with a clear error.
      message: "",
      consent: false,
      company: "", // honeypot
    } as unknown as LeadInput,
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LeadInput> = async (data) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      setSuccess({
        whatsappUrl: payload.whatsappUrl as string,
        shortCode: payload.shortCode as string,
        emailSent: Boolean(payload.emailSent),
      });
    } catch {
      setSubmitError(
        "Couldn't reach the server — check your connection and try again, or message us on WhatsApp.",
      );
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-accent/40 bg-card p-6">
        <p className="text-xs uppercase tracking-widest text-accent">
          Details saved — ref {success.shortCode}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold">
          One more tap to send it over on WhatsApp.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We&apos;ve pre-filled your details into a WhatsApp message. Hit the
          button below to open WhatsApp and send — we&apos;ll reply from there.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={success.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta-whatsapp"
              data-analytics-page="quote-success"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Continue on WhatsApp
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
        {!success.emailSent && (
          <p className="mt-4 text-xs text-muted-foreground">
            We couldn&apos;t auto-notify the studio by email just now, but
            your details are safe — tap the WhatsApp button above and
            we&apos;ll take it from there.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-lg border border-border bg-card p-6 md:p-8"
    >
      {/* Honeypot — visually + AT hidden, no tab stop */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          Company (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Your name" error={errors.name?.message} required htmlFor="name">
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field
          label="Phone"
          error={errors.phone?.message}
          required
          htmlFor="phone"
          hint="UK number — we default to +44"
        >
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07735 839280"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field
          label="Email"
          error={errors.email?.message}
          htmlFor="email"
          hint="Optional — WhatsApp is our primary channel"
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <fieldset className="space-y-5">
        <legend className="font-display text-base font-semibold">
          Your vehicle
        </legend>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Field label="Make" error={errors.vehicleMake?.message} required htmlFor="vehicleMake">
            <Input
              id="vehicleMake"
              placeholder="e.g. BMW"
              aria-invalid={Boolean(errors.vehicleMake)}
              {...register("vehicleMake")}
            />
          </Field>
          <Field label="Model" error={errors.vehicleModel?.message} required htmlFor="vehicleModel">
            <Input
              id="vehicleModel"
              placeholder="e.g. 3 Series"
              aria-invalid={Boolean(errors.vehicleModel)}
              {...register("vehicleModel")}
            />
          </Field>
          <Field label="Year" error={errors.vehicleYear?.message} required htmlFor="vehicleYear">
            <Input
              id="vehicleYear"
              type="number"
              inputMode="numeric"
              min={1950}
              max={currentYear + 1}
              aria-invalid={Boolean(errors.vehicleYear)}
              {...register("vehicleYear")}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-display text-base font-semibold">
          Which windows? <span className="text-destructive">*</span>
        </legend>
        <p className="text-sm text-muted-foreground">
          Pick all that apply.
        </p>
        <ul
          role="list"
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          {TINT_WINDOWS.map((key) => (
            <li key={key}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border px-4 py-3 text-sm hover:border-accent/40">
                <Checkbox
                  value={key}
                  {...register("windows")}
                />
                <span>{windowLabels[key]}</span>
              </label>
            </li>
          ))}
        </ul>
        {errors.windows && (
          <p className="text-sm font-medium text-destructive">
            {errors.windows.message as string}
          </p>
        )}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-display text-base font-semibold">
          Preferred tint darkness <span className="text-destructive">*</span>
        </legend>
        <p className="text-sm text-muted-foreground">
          Lower % = darker. Not sure? Pick the last option and we&apos;ll
          advise.
        </p>
        <ul role="list" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TINT_DARKNESS.map((key) => (
            <li key={key}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border px-4 py-3 text-sm hover:border-accent/40">
                <input
                  type="radio"
                  value={key}
                  className="h-4 w-4 accent-[hsl(var(--accent))]"
                  {...register("darkness")}
                />
                <span>{darknessLabels[key]}</span>
              </label>
            </li>
          ))}
        </ul>
        {errors.darkness && (
          <p className="text-sm font-medium text-destructive">
            {errors.darkness.message as string}
          </p>
        )}
      </fieldset>

      <Field
        label="Anything else we should know?"
        error={errors.message?.message}
        htmlFor="message"
        hint="Optional — e.g. fitting date preferences, factory tint already fitted, body-wrapped vehicle"
      >
        <Textarea
          id="message"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <Checkbox className="mt-0.5" {...register("consent")} />
          <span>
            I agree to be contacted about my enquiry.{" "}
            <span className="text-destructive">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="text-sm font-medium text-destructive">
            {errors.consent.message as string}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting}
          className={cn("w-full sm:w-auto")}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Sending…" : "Send quote request"}
        </Button>
        <p className="text-xs text-muted-foreground">
          We&apos;ll only use your details to respond to your enquiry. See
          our{" "}
          <Link
            href="/privacy"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
