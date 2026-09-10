import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:py-32">
        <p className="rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-accent">
          Webservices &amp; Webseiten aus Bremen
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Zuverlässige Webseiten und Webservices — geplant, gebaut und betreut aus einer Hand.
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Ich entwickle und pflege Webseiten und individuelle Webservices für kleine
          Unternehmen und Selbstständige — von der ersten Idee bis zum laufenden Betrieb.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/#kontakt"
            className="rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Projekt anfragen
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Zum Kundenportal
          </Link>
        </div>
      </div>
    </section>
  );
}
