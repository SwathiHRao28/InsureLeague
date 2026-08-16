"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { callbackFormSchema, type CallbackFormValues } from "@/lib/validations/callback";
import {
  insuranceCategoryOptions,
  insuranceProductOptions,
  callbackTimeOptions,
} from "@/data/navigation";
import { cn } from "@/lib/utils";

export function CallbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: { consent: true as const, message: "" },
  });

  const selectedCategory = watch("insuranceCategory");
  const productOptions = selectedCategory ? insuranceProductOptions[selectedCategory] ?? [] : [];

  async function onSubmit(values: CallbackFormValues) {
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      reset();
      toast.success("Request received — we'll call you back soon.");
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you — one of our advisors will call you back during your preferred time slot.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, bots often fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Priya Sharma"
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label="Phone number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="98765 43210"
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <Field label="Email address" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Customer type" error={errors.customerType?.message}>
          <select {...register("customerType")} className={inputClass(!!errors.customerType)} defaultValue="">
            <option value="" disabled>Select customer type</option>
            <option value="individual">Individual</option>
            <option value="corporate">Corporate</option>
          </select>
        </Field>

        <Field label="Preferred callback time" error={errors.callbackTime?.message}>
          <select {...register("callbackTime")} className={inputClass(!!errors.callbackTime)} defaultValue="">
            <option value="" disabled>Select a time slot</option>
            {callbackTimeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Insurance category" error={errors.insuranceCategory?.message}>
          <select {...register("insuranceCategory")} className={inputClass(!!errors.insuranceCategory)} defaultValue="">
            <option value="" disabled>Select a category</option>
            {insuranceCategoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Insurance product" error={errors.insuranceProduct?.message}>
          <select
            {...register("insuranceProduct")}
            className={inputClass(!!errors.insuranceProduct)}
            defaultValue=""
            disabled={!selectedCategory}
          >
            <option value="" disabled>
              {selectedCategory ? "Select a product" : "Select a category first"}
            </option>
            {productOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message (optional)" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us a bit about what you're looking for..."
          className={inputClass(!!errors.message)}
        />
      </Field>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          I consent to be contacted by InsureLeague regarding my insurance requirements.
        </label>
        {errors.consent && <p className="mt-1 text-xs text-error">{errors.consent.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Request a callback"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
    hasError ? "border-error" : "border-input"
  );
}
