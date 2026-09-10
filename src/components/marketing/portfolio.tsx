const placeholderProjects = [
  { title: "Projekt A", description: "Platzhalter — Beschreibung folgt." },
  { title: "Projekt B", description: "Platzhalter — Beschreibung folgt." },
  { title: "Projekt C", description: "Platzhalter — Beschreibung folgt." },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground">
        Portfolio &amp; Referenzen
      </h2>
      <p className="mt-2 max-w-2xl text-muted">
        Hier entstehen nach und nach echte Projektbeispiele. Aktuell noch Platzhalter.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProjects.map((project) => (
          <div
            key={project.title}
            className="flex aspect-video flex-col justify-end rounded-2xl border border-dashed border-border bg-surface/50 p-6"
          >
            <h3 className="text-lg font-medium text-foreground/70">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
