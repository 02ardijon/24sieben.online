"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, formAction] = useActionState<FormState, FormData>(loginAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/portal"} />
      <Field label="E-Mail" name="email" type="email" autoComplete="email" required />
      <Field
        label="Passwort"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Anmelden</SubmitButton>
      <div className="flex items-center justify-between text-sm text-muted">
        <Link href="/forgot-password" className="hover:text-accent">
          Passwort vergessen?
        </Link>
        <Link href="/register" className="hover:text-accent">
          Neu hier? Registrieren
        </Link>
      </div>
    </form>
  );
}
