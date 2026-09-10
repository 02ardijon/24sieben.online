"use client";

import { useActionState } from "react";
import { createTicketAction } from "@/lib/actions/ticket";
import type { FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

type OrderOption = { id: string; title: string };

export function CreateTicketForm({ orders }: { orders: OrderOption[] }) {
  const [state, formAction] = useActionState<FormState, FormData>(createTicketAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Titel" name="title" required errors={state?.fieldErrors?.title} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Beschreibung
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {state?.fieldErrors?.description?.map((err) => (
          <p key={err} className="text-sm text-danger">
            {err}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="priority" className="text-sm font-medium text-foreground">
          Priorität
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue="NORMAL"
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="NIEDRIG">Niedrig</option>
          <option value="NORMAL">Normal</option>
          <option value="HOCH">Hoch</option>
          <option value="DRINGEND">Dringend</option>
        </select>
      </div>

      {orders.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="orderId" className="text-sm font-medium text-foreground">
            Zugehöriger Auftrag (optional)
          </label>
          <select
            id="orderId"
            name="orderId"
            defaultValue=""
            className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="">Kein Auftrag</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="attachment" className="text-sm font-medium text-foreground">
          Dateianhang (optional, max. 10 MB)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          className="text-sm text-muted file:mr-3 file:rounded-lg file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:text-foreground"
        />
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Ticket erstellen</SubmitButton>
    </form>
  );
}
