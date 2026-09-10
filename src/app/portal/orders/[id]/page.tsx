import Link from "next/link";
import { notFound } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { orderStatusMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { AttachmentList } from "@/components/attachment-list";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await verifySession();
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      events: { orderBy: { createdAt: "asc" }, include: { actor: true } },
      attachments: true,
    },
  });

  // Sowohl "nicht gefunden" als auch "gehört einem anderen Kunden" -> 404,
  // um keine Existenz fremder Auftrags-IDs preiszugeben.
  if (!order || order.customerId !== session.user.id) {
    notFound();
  }

  const status = orderStatusMap[order.status];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/portal" className="text-sm text-muted hover:text-accent">
          &larr; Zurück zur Übersicht
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">{order.title}</h1>
          <Badge label={status.label} className={status.className} />
        </div>
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
    </div>
  );
}
