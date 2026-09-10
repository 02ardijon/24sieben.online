import Link from "next/link";
import { notFound } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { ticketStatusMap, ticketPriorityMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { TicketThread } from "@/components/tickets/ticket-thread";
import { ReplyForm } from "@/components/tickets/reply-form";
import { AttachmentList } from "@/components/attachment-list";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await verifySession();
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      order: true,
      attachments: true,
      messages: {
        orderBy: { createdAt: "asc" },
        include: { author: true, attachments: true },
      },
    },
  });

  if (!ticket || ticket.customerId !== session.user.id) {
    notFound();
  }

  const status = ticketStatusMap[ticket.status];
  const priority = ticketPriorityMap[ticket.priority];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <Link href="/portal/tickets" className="text-sm text-muted hover:text-accent">
          &larr; Zurück zu Tickets
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">{ticket.title}</h1>
          <Badge label={priority.label} className={priority.className} />
          <Badge label={status.label} className={status.className} />
        </div>
        {ticket.order && (
          <p className="mt-1 text-sm text-muted">
            Bezieht sich auf Auftrag:{" "}
            <Link href={`/portal/orders/${ticket.order.id}`} className="text-accent hover:text-accent-hover">
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
  );
}
