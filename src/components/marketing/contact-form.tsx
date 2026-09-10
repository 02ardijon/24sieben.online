"use client";

import { useActionState } from "react";
import { submitContactRequestAction } from "@/lib/actions/contact";
import type { FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function ContactForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    submitContactRequestAction,
    undefined,
  );

  if (state?.success) {
    return (
      <p className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-success">
        Danke für deine Nachricht! Ich melde mich so schnell wie möglich zurück.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Honeypot — für Menschen unsichtbar */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Field label="Name" name="name" required errors={state?.fieldErrors?.name} />
      <Field
        label="E-Mail"
        name="email"
        type="email"
        required
        errors={state?.fieldErrors?.email}
      />
      <Field label="Telefon (optional)" name="phone" type="tel" errors={state?.fieldErrors?.phone} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {state?.fieldErrors?.message?.map((err) => (
          <p key={err} className="text-sm text-danger">
            {err}
          </p>
        ))}
      </div>
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Nachricht senden</SubmitButton>
    </form>
  );
}
