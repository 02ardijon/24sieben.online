import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Kunden | Admin",
};

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true, tickets: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Kunden</h1>

      {customers.length === 0 ? (
        <p className="text-muted">Noch keine Kunden registriert.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">E-Mail</th>
                <th className="px-4 py-3 font-medium">Aufträge</th>
                <th className="px-4 py-3 font-medium">Tickets</th>
                <th className="px-4 py-3 font-medium">Registriert</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">{customer.name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{customer.email}</td>
                  <td className="px-4 py-3 text-muted">{customer._count.orders}</td>
                  <td className="px-4 py-3 text-muted">{customer._count.tickets}</td>
                  <td className="px-4 py-3 text-muted">
                    {customer.createdAt.toLocaleDateString("de-DE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
