import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { orderStatusMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export default async function PortalPage() {
  const session = await verifySession();

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Willkommen, {session.user.name ?? session.user.email}
        </h1>
        <p className="mt-1 text-muted">Hier siehst du den Status deiner Aufträge.</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          Noch keine Aufträge vorhanden.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const status = orderStatusMap[order.status];
            return (
              <Link
                key={order.id}
                href={`/portal/orders/${order.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-medium text-foreground">{order.title}</h2>
                  {order.description && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted">{order.description}</p>
                  )}
                </div>
                <Badge label={status.label} className={status.className} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
