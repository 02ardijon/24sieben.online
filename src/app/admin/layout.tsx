import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { logoutAction } from "@/lib/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole("ADMIN", "AGENT");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="text-lg font-semibold tracking-tight text-foreground">
            24<span className="text-accent">sieben</span>.online <span className="text-muted">/ Admin</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{session.user.name ?? session.user.email}</span>
            <Link href="/portal" className="hover:text-accent">
              Kundenportal
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-accent">
                Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
