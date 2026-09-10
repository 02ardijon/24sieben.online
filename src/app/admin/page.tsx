import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ticketStatusMap, ticketPriorityMap } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  const [customerCount, orderCount, openTicketCount, recentTickets] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count(),
    prisma.ticket.count({ where: { status: { in: ["OFFEN", "IN_BEARBEITUNG"] } } }),
    prisma.ticket.findMany({
      where: { status: { in: ["OFFEN", "IN_BEARBEITUNG"] } },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { customer: true },
    }),
  ]);

  const stats = [
    { label: "Kunden", value: customerCount, href: "/admin/customers" },
    { label: "Aufträge", value: orderCount, href: "/admin/orders" },
    { label: "Offene Tickets", value: openTicketCount, href: "/admin/tickets" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admin-Übersicht</h1>
        <p className="mt-1 text-muted">Kunden, Aufträge und offene Tickets im Blick.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Offene Tickets</h2>
          <Link href="/admin/tickets" className="text-sm text-accent hover:text-accent-hover">
            Alle ansehen
          </Link>
        </div>
        {recentTickets.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Keine offenen Tickets.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {recentTickets.map((ticket) => {
              const status = ticketStatusMap[ticket.status];
              const priority = ticketPriorityMap[ticket.priority];
              return (
                <Link
                  key={ticket.id}
                  href={`/admin/tickets/${ticket.id}`}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{ticket.title}</p>
                    <p className="text-sm text-muted">
                      {ticket.customer.name ?? ticket.customer.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge label={priority.label} className={priority.className} />
                    <Badge label={status.label} className={status.className} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
