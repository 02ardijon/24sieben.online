import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@24sieben.online";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Ardijon Durguti",
      role: "ADMIN",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });
  console.log(`Admin-Konto bereit: ${admin.email} (Passwort nur bei Erststart wie angegeben)`);

  if (process.env.SEED_DEMO_DATA === "true") {
    const customer = await prisma.user.upsert({
      where: { email: "demo-kunde@example.com" },
      update: {},
      create: {
        email: "demo-kunde@example.com",
        name: "Demo Kunde",
        role: "CUSTOMER",
        passwordHash: await bcrypt.hash("demo1234", 12),
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        title: "Neue Unternehmenswebseite",
        description: "Responsive Webseite mit Kontaktformular und Portfolio-Bereich.",
        status: "IN_BEARBEITUNG",
        events: {
          create: [
            { message: "Auftrag angenommen.", actorId: admin.id },
            { message: "Konzept- und Designphase gestartet.", actorId: admin.id },
          ],
        },
      },
    });
    console.log(`Demo-Auftrag angelegt: ${order.title} für ${customer.email}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
