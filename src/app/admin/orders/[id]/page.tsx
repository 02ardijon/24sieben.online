import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { orderStatusMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { AttachmentList } from "@/components/attachment-list";
import { OrderStatusControl } from "@/components/admin/order-status-control";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      events: { orderBy: { createdAt: "asc" }, include: { actor: true } },
      attachments: true,
      tickets: true,
    },
  });

  if (!order) {
    notFound();
  }

  const status = orderStatusMap[order.status];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-8">
        <div>
          <Link href="/admin/orders" className="text-sm text-muted hover:text-accent">
            &larr; Zurück zu Aufträgen
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{order.title}</h1>
            <Badge label={status.label} className={status.className} />
          </div>
          <p className="mt-1 text-sm text-muted">
            Kunde: {order.customer.name ?? order.customer.email} ({order.customer.email})
          </p>
          {order.description && <p className="mt-2 max-w-2xl text-muted">{order.description}</p>}
        </div>

        <div>
          <h2 className="text-lg font-medium text-foreground">Verlauf</h2>
          <div className="mt-4">
            <OrderTimeline events={order.events} />
          </div>
        </div>

        {order.attachments.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-foreground">Dateianhänge</h2>
            <div className="mt-3">
              <AttachmentList attachments={order.attachments} />
            </div>
          </div>
        )}

        {order.tickets.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-foreground">Zugehörige Tickets</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {order.tickets.map((ticket) => (
                <li key={ticket.id}>
                  <Link
                    href={`/admin/tickets/${ticket.id}`}
                    className="text-sm text-accent hover:text-accent-hover"
                  >
                    {ticket.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full lg:w-80">
        <OrderStatusControl orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
