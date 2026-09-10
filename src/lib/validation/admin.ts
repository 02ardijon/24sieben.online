import * as z from "zod";
import { ticketPriorities } from "@/lib/validation/ticket";

export const orderStatuses = [
  "ANGENOMMEN",
  "IN_BEARBEITUNG",
  "WARTET_AUF_KUNDE",
  "ABGESCHLOSSEN",
  "STORNIERT",
] as const;

export const ticketStatuses = ["OFFEN", "IN_BEARBEITUNG", "WARTET_AUF_KUNDE", "GESCHLOSSEN"] as const;

export const createOrderSchema = z.object({
  customerId: z.string().min(1, { error: "Bitte einen Kunden auswählen." }),
  title: z.string().trim().min(3, { error: "Mindestens 3 Zeichen." }).max(200),
  description: z.string().trim().max(5000).optional().or(z.literal("")),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(orderStatuses),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const updateTicketSchema = z.object({
  status: z.enum(ticketStatuses),
  priority: z.enum(ticketPriorities),
});
