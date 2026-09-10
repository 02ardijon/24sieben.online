"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function RegisterForm() {
  const [state, formAction] = useActionState<FormState, FormData>(registerAction, undefined);

  if (state?.success) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <p className="text-foreground">
          Falls die E-Mail-Adresse noch nicht registriert war, wurde dein Konto angelegt.
        </p>
        <Link href="/login" className="text-accent hover:text-accent-hover">
          Jetzt anmelden
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        label="Name"
        name="name"
        autoComplete="name"
        required
        errors={state?.fieldErrors?.name}
      />
      <Field
        label="E-Mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        errors={state?.fieldErrors?.email}
      />
      <Field
        label="Passwort"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.fieldErrors?.password}
      />
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Registrieren</SubmitButton>
      <p className="text-center text-sm text-muted">
        Schon ein Konto?{" "}
        <Link href="/login" className="text-accent hover:text-accent-hover">
          Anmelden
        </Link>
      </p>
    </form>
  );
}
