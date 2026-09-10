"use client";

import { useActionState, useRef, useEffect } from "react";
import { addTicketMessageAction } from "@/lib/actions/ticket";
import type { FormState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const action = addTicketMessageAction.bind(null, ticketId);
  const [state, formAction] = useActionState<FormState, FormData>(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 border-t border-border pt-4"
    >
      <textarea
        name="body"
        rows={3}
        required
        placeholder="Antwort schreiben…"
        className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
      {state?.fieldErrors?.body?.map((err) => (
        <p key={err} className="text-sm text-danger">
          {err}
        </p>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <input
          name="attachment"
          type="file"
          className="text-sm text-muted file:mr-3 file:rounded-lg file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:text-foreground"
        />
        <div className="ml-auto w-40">
          <SubmitButton>Senden</SubmitButton>
        </div>
      </div>
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
    </form>
  );
}
