import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CreateOrderForm } from "@/components/admin/create-order-form";

export const metadata: Metadata = {
  title: "Neuer Auftrag | Admin",
};

export default async function NewOrderPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold text-foreground">Neuer Auftrag</h1>
      <div className="mt-8">
        <CreateOrderForm customers={customers} />
      </div>
    </div>
  );
}
