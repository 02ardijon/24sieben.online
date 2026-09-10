import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { CreateTicketForm } from "@/components/tickets/create-ticket-form";

export const metadata: Metadata = {
  title: "Problem melden",
};

export default async function NewTicketPage() {
  const session = await verifySession();

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.id },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold text-foreground">Problem melden</h1>
      <p className="mt-1 text-muted">
        Beschreib dein Anliegen — wir melden uns so schnell wie möglich.
      </p>
      <div className="mt-8">
        <CreateTicketForm orders={orders} />
      </div>
    </div>
  );
}
