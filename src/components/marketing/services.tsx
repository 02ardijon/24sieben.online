const services = [
  {
    title: "Webseiten-Erstellung",
    description:
      "Konzeption und Umsetzung moderner, responsiver Webseiten — von der Visitenkarten-Seite bis zur komplexeren Plattform.",
  },
  {
    title: "Wartung & Hosting",
    description:
      "Laufende Pflege, Updates und Betreuung bestehender Webseiten, damit sie sicher, aktuell und erreichbar bleiben.",
  },
  {
    title: "Individuelle Webservices",
    description:
      "Maßgeschneiderte Backend- und API-Lösungen für Prozesse, die eine Standardlösung nicht abdeckt.",
  },
];

export function Services() {
  return (
    <section id="leistungen" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground">Leistungen</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Drei Bausteine, die sich einzeln oder zusammen buchen lassen — je nachdem, was dein
        Projekt braucht.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-medium text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
