import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { ticketStatusMap, ticketPriorityMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export default async function TicketsPage() {
  const session = await verifySession();

  const tickets = await prisma.ticket.findMany({
    where: { customerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Tickets</h1>
          <p className="mt-1 text-muted">Deine Support-Anfragen und ihr Status.</p>
        </div>
        <Link
          href="/portal/tickets/new"
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Problem melden
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          Noch keine Tickets vorhanden.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => {
            const status = ticketStatusMap[ticket.status];
            const priority = ticketPriorityMap[ticket.priority];
            return (
              <Link
                key={ticket.id}
                href={`/portal/tickets/${ticket.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-medium text-foreground">{ticket.title}</h2>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">{ticket.description}</p>
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
