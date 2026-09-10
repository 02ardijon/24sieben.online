"use client";

import { useActionState } from "react";
import { createOrderAction } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

type CustomerOption = { id: string; name: string | null; email: string };

export function CreateOrderForm({ customers }: { customers: CustomerOption[] }) {
  const [state, formAction] = useActionState<FormState, FormData>(createOrderAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="customerId" className="text-sm font-medium text-foreground">
          Kunde
        </label>
        <select
          id="customerId"
          name="customerId"
          required
          defaultValue=""
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="" disabled>
            Kunde auswählen…
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name ?? customer.email} ({customer.email})
            </option>
          ))}
        </select>
        {state?.fieldErrors?.customerId?.map((err) => (
          <p key={err} className="text-sm text-danger">
            {err}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Titel
        </label>
        <input
          id="title"
          name="title"
          required
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {state?.fieldErrors?.title?.map((err) => (
          <p key={err} className="text-sm text-danger">
            {err}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Beschreibung (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Auftrag anlegen</SubmitButton>
    </form>
  );
}
