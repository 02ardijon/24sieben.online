import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { logoutAction } from "@/lib/actions/auth";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/portal" className="text-lg font-semibold tracking-tight text-foreground">
              24<span className="text-accent">sieben</span>.online
            </Link>
            <nav className="hidden gap-4 text-sm text-muted sm:flex">
              <Link href="/portal" className="hover:text-accent">
                Aufträge
              </Link>
              <Link href="/portal/tickets" className="hover:text-accent">
                Tickets
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="hidden sm:inline">{session.user.name ?? session.user.email}</span>
            {(session.user.role === "ADMIN" || session.user.role === "AGENT") && (
              <Link href="/admin" className="hover:text-accent">
                Admin
              </Link>
            )}
            <form action={logoutAction}>
              <button type="submit" className="hover:text-accent">
                Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
