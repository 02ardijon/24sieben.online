"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Menü umschalten"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-4">
          <ul className="flex flex-col gap-3 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
