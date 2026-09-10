"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import {
  createOrderSchema,
  updateOrderStatusSchema,
  updateTicketSchema,
} from "@/lib/validation/admin";
import type { FormState } from "@/lib/actions/auth";

const orderStatusLabels: Record<string, string> = {
  ANGENOMMEN: "Angenommen",
  IN_BEARBEITUNG: "In Bearbeitung",
  WARTET_AUF_KUNDE: "Wartet auf Kundenfeedback",
  ABGESCHLOSSEN: "Abgeschlossen",
  STORNIERT: "Storniert",
};

export async function createOrderAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await requireRole("ADMIN", "AGENT");

  const parsed = createOrderSchema.safeParse({
    customerId: formData.get("customerId"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const customer = await prisma.user.findUnique({ where: { id: parsed.data.customerId } });
  if (!customer || customer.role !== "CUSTOMER") {
    return { error: "Ungültiger Kunde ausgewählt." };
  }

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      title: parsed.data.title,
      description: parsed.data.description || null,
      events: {
        create: { message: "Auftrag angenommen.", actorId: session.user.id },
      },
    },
  });

  redirect(`/admin/orders/${order.id}`);
}

export async function updateOrderStatusAction(
  orderId: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireRole("ADMIN", "AGENT");

  const parsed = updateOrderStatusSchema.safeParse({
    status: formData.get("status"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return { error: "Auftrag nicht gefunden." };
  }

  const statusChanged = order.status !== parsed.data.status;
  const message = statusChanged
    ? `Status geändert zu „${orderStatusLabels[parsed.data.status]}“.${parsed.data.note ? ` ${parsed.data.note}` : ""}`
    : parsed.data.note || "";

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: parsed.data.status,
      ...(message && {
        events: { create: { message, actorId: session.user.id } },
      }),
    },
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/portal/orders/${orderId}`);

  return { success: true };
}

export async function updateTicketAction(
  ticketId: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireRole("ADMIN", "AGENT");

  const parsed = updateTicketSchema.safeParse({
    status: formData.get("status"),
    priority: formData.get("priority"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: parsed.data.status,
      priority: parsed.data.priority,
      assignedToId: session.user.id,
    },
  });

  revalidatePath(`/admin/tickets/${ticketId}`);
  revalidatePath(`/portal/tickets/${ticketId}`);

  return { success: true };
}
