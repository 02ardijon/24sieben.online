export function About() {
  return (
    <section id="ueber-mich" className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-20 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Über mich</h2>
          <p className="mt-2 text-sm text-muted">Ardijon Durguti — Inhaber, 24sieben.online</p>
        </div>
        <div className="flex flex-col gap-4 text-muted">
          <p>
            Ich studiere Informatik an der Universität Bremen mit Schwerpunkt auf theoretischer
            Informatik und formalen Methoden. Diese Herangehensweise — Probleme präzise
            durchdenken, bevor man sie löst — bringe ich auch in Web-Projekte ein: sauber
            strukturiert, nachvollziehbar und wartbar.
          </p>
          <p>
            24sieben.online betreibe ich im Nebenerwerb aus Bremen heraus. Der Fokus liegt auf
            langfristig betreuten Projekten statt kurzlebigen Einmal-Lösungen.
          </p>
        </div>
      </div>
    </section>
  );
}
