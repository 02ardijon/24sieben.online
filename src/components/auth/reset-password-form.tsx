"use client";

import { useActionState } from "react";
import { resetPasswordAction, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState<FormState, FormData>(resetPasswordAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      <Field
        label="Neues Passwort"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.fieldErrors?.password}
      />
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Passwort setzen</SubmitButton>
    </form>
  );
}
