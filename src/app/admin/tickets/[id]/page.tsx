import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketStatusMap, ticketPriorityMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { TicketThread } from "@/components/tickets/ticket-thread";
import { ReplyForm } from "@/components/tickets/reply-form";
import { AttachmentList } from "@/components/attachment-list";
import { TicketControl } from "@/components/admin/ticket-control";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      customer: true,
      order: true,
      assignedTo: true,
      attachments: true,
      messages: {
        orderBy: { createdAt: "asc" },
        include: { author: true, attachments: true },
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  const status = ticketStatusMap[ticket.status];
  const priority = ticketPriorityMap[ticket.priority];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-8">
        <div>
          <Link href="/admin/tickets" className="text-sm text-muted hover:text-accent">
            &larr; Zurück zu Tickets
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{ticket.title}</h1>
            <Badge label={priority.label} className={priority.className} />
            <Badge label={status.label} className={status.className} />
          </div>
          <p className="mt-1 text-sm text-muted">
            Kunde: {ticket.customer.name ?? ticket.customer.email} ({ticket.customer.email})
          </p>
          {ticket.order && (
            <p className="mt-1 text-sm text-muted">
              Bezieht sich auf Auftrag:{" "}
              <Link
                href={`/admin/orders/${ticket.order.id}`}
                className="text-accent hover:text-accent-hover"
              >
                {ticket.order.title}
              </Link>
            </p>
          )}
          <p className="mt-3 whitespace-pre-wrap text-muted">{ticket.description}</p>
          {ticket.attachments.length > 0 && (
            <div className="mt-3">
              <AttachmentList attachments={ticket.attachments} />
            </div>
          )}
        </div>

        <TicketThread messages={ticket.messages} />
        <ReplyForm ticketId={ticket.id} />
      </div>

      <div className="w-full lg:w-80">
        <TicketControl
          ticketId={ticket.id}
          currentStatus={ticket.status}
          currentPriority={ticket.priority}
          assignedToName={ticket.assignedTo?.name ?? ticket.assignedTo?.email ?? null}
        />
      </div>
    </div>
  );
}
