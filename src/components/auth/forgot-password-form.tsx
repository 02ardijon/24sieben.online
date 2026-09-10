"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    requestPasswordResetAction,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <p className="text-foreground">
          Falls ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen
          verschickt.
        </p>
        <Link href="/login" className="text-accent hover:text-accent-hover">
          Zurück zum Login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        label="E-Mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        errors={state?.fieldErrors?.email}
      />
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Link anfordern</SubmitButton>
    </form>
  );
}
