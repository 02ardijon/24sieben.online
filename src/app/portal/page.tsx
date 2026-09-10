import { verifySession } from "@/lib/dal";

export default async function PortalPage() {
  const session = await verifySession();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">
        Willkommen, {session.user.name ?? session.user.email}
      </h1>
      <p className="mt-2 text-muted">
        Dein Kundendashboard mit Aufträgen und Tickets folgt in Kürze.
      </p>
    </div>
  );
}
