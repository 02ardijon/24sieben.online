import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} 24sieben.online — Ardijon Durguti</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/impressum" className="hover:text-foreground">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-foreground">
            Datenschutz
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Kundenportal-Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
