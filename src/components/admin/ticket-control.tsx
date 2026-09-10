"use client";

import { useActionState } from "react";
import { updateTicketAction } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

const statusOptions = [
  { value: "OFFEN", label: "Offen" },
  { value: "IN_BEARBEITUNG", label: "In Bearbeitung" },
  { value: "WARTET_AUF_KUNDE", label: "Wartet auf Kundenfeedback" },
  { value: "GESCHLOSSEN", label: "Geschlossen" },
];

const priorityOptions = [
  { value: "NIEDRIG", label: "Niedrig" },
  { value: "NORMAL", label: "Normal" },
  { value: "HOCH", label: "Hoch" },
  { value: "DRINGEND", label: "Dringend" },
];

export function TicketControl({
  ticketId,
  currentStatus,
  currentPriority,
  assignedToName,
}: {
  ticketId: string;
  currentStatus: string;
  currentPriority: string;
  assignedToName: string | null;
}) {
  const action = updateTicketAction.bind(null, ticketId);
  const [state, formAction] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-medium text-foreground">Ticket verwalten</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className="text-xs text-muted">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="priority" className="text-xs text-muted">
          Priorität
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue={currentPriority}
          className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted">
        Zugewiesen an: {assignedToName ?? "niemand"} (wird beim Speichern auf dich gesetzt)
      </p>

      {state?.success && <p className="text-sm text-success">Gespeichert.</p>}
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Speichern</SubmitButton>
    </form>
  );
}
