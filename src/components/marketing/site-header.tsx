import Link from "next/link";
import { MobileNav } from "@/components/marketing/mobile-nav";

const navItems = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          24<span className="text-accent">sieben</span>.online
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Kundenportal
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
