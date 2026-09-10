"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { saveUploadedFile } from "@/lib/uploads";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { createTicketSchema, createTicketMessageSchema } from "@/lib/validation/ticket";
import type { FormState } from "@/lib/actions/auth";

export async function createTicketAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await verifySession();

  const ip = getClientIp(await headers());
  if (!rateLimit(`ticket-create:${session.user.id}:${ip}`, 10, 60_000)) {
    return { error: "Zu viele Anfragen. Bitte kurz warten." };
  }

  const orderIdRaw = formData.get("orderId");
  const parsed = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    orderId: orderIdRaw,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let orderId: string | undefined;
  if (parsed.data.orderId) {
    const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
    if (!order || order.customerId !== session.user.id) {
      return { error: "Ungültiger Auftrag ausgewählt." };
    }
    orderId = order.id;
  }

  let attachment: Awaited<ReturnType<typeof saveUploadedFile>> = null;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    try {
      attachment = await saveUploadedFile(file);
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Datei-Upload fehlgeschlagen." };
    }
  }

  const ticket = await prisma.ticket.create({
    data: {
      customerId: session.user.id,
      orderId,
      title: parsed.data.title,
      description: parsed.data.description,
      priority: parsed.data.priority,
      ...(attachment && {
        attachments: {
          create: {
            filename: attachment.filename,
            url: attachment.storageKey,
            mimeType: attachment.mimeType,
            size: attachment.size,
          },
        },
      }),
    },
  });

  redirect(`/portal/tickets/${ticket.id}`);
}

export async function addTicketMessageAction(
  ticketId: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await verifySession();

  const ip = getClientIp(await headers());
  if (!rateLimit(`ticket-message:${session.user.id}:${ip}`, 20, 60_000)) {
    return { error: "Zu viele Nachrichten. Bitte kurz warten." };
  }

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  const isStaff = session.user.role === "ADMIN" || session.user.role === "AGENT";
  if (!ticket || (!isStaff && ticket.customerId !== session.user.id)) {
    return { error: "Ticket nicht gefunden." };
  }

  const parsed = createTicketMessageSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let attachment: Awaited<ReturnType<typeof saveUploadedFile>> = null;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    try {
      attachment = await saveUploadedFile(file);
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Datei-Upload fehlgeschlagen." };
    }
  }

  await prisma.ticketMessage.create({
    data: {
      ticketId: ticket.id,
      authorId: session.user.id,
      body: parsed.data.body,
      ...(attachment && {
        attachments: {
          create: {
            filename: attachment.filename,
            url: attachment.storageKey,
            mimeType: attachment.mimeType,
            size: attachment.size,
          },
        },
      }),
    },
  });

  // Kunden-Antwort auf ein Ticket, das auf Kundenfeedback wartete, setzt es
  // wieder auf "offen" für den Agenten zurück.
  if (!isStaff && ticket.status === "WARTET_AUF_KUNDE") {
    await prisma.ticket.update({ where: { id: ticket.id }, data: { status: "OFFEN" } });
  } else {
    await prisma.ticket.update({ where: { id: ticket.id }, data: { updatedAt: new Date() } });
  }

  revalidatePath(`/portal/tickets/${ticket.id}`);
  revalidatePath(`/admin/tickets/${ticket.id}`);

  return { success: true };
}
