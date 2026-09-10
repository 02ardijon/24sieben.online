import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { orderStatusMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Aufträge | Admin",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
    include: { customer: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Aufträge</h1>
        <Link
          href="/admin/orders/new"
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Neuer Auftrag
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-muted">Noch keine Aufträge vorhanden.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const status = orderStatusMap[order.status];
            return (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-medium text-foreground">{order.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {order.customer.name ?? order.customer.email}
                  </p>
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
