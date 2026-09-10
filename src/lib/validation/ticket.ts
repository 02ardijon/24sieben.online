import * as z from "zod";

export const ticketPriorities = ["NIEDRIG", "NORMAL", "HOCH", "DRINGEND"] as const;

export const createTicketSchema = z.object({
  title: z.string().trim().min(3, { error: "Mindestens 3 Zeichen." }).max(200),
  description: z.string().trim().min(10, { error: "Mindestens 10 Zeichen." }).max(5000),
  priority: z.enum(ticketPriorities),
  orderId: z.string().trim().optional().or(z.literal("")),
});

export const createTicketMessageSchema = z.object({
  body: z.string().trim().min(1, { error: "Nachricht darf nicht leer sein." }).max(5000),
});
