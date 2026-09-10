"use client";

import { useActionState, useRef, useEffect } from "react";
import { updateOrderStatusAction } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

const statusOptions = [
  { value: "ANGENOMMEN", label: "Angenommen" },
  { value: "IN_BEARBEITUNG", label: "In Bearbeitung" },
  { value: "WARTET_AUF_KUNDE", label: "Wartet auf Kundenfeedback" },
  { value: "ABGESCHLOSSEN", label: "Abgeschlossen" },
  { value: "STORNIERT", label: "Storniert" },
];

export function OrderStatusControl({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const action = updateOrderStatusAction.bind(null, orderId);
  const [state, formAction] = useActionState<FormState, FormData>(action, undefined);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.success && noteRef.current) {
      noteRef.current.value = "";
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-medium text-foreground">Status ändern</h2>
      <select
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
      <textarea
        ref={noteRef}
        name="note"
        rows={3}
        placeholder="Notiz zum Verlauf (optional)"
        className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
      {state?.success && <p className="text-sm text-success">Gespeichert.</p>}
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <SubmitButton>Speichern</SubmitButton>
    </form>
  );
}
