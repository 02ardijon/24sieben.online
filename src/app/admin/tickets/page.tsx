import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ticketStatusMap, ticketPriorityMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tickets | Admin",
};

export default async function AdminTicketsPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    include: { customer: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-muted">Keine Tickets vorhanden.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => {
            const status = ticketStatusMap[ticket.status];
            const priority = ticketPriorityMap[ticket.priority];
            return (
              <Link
                key={ticket.id}
                href={`/admin/tickets/${ticket.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-medium text-foreground">{ticket.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {ticket.customer.name ?? ticket.customer.email}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Badge label={priority.label} className={priority.className} />
                  <Badge label={status.label} className={status.className} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
