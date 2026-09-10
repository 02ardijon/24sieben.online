import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Impressum</h1>
      <p className="mt-2 text-sm text-warning">
        Platzhalter-Inhalt — bitte vor Live-Schaltung um die fehlenden Pflichtangaben ergänzen
        und rechtlich prüfen lassen.
      </p>

      <section className="mt-8 space-y-2 text-muted">
        <h2 className="text-lg font-medium text-foreground">Angaben gemäß § 5 TMG</h2>
        <p>
          Ardijon Durguti
          <br />
          24sieben.online
          <br />
          [Straße und Hausnummer einfügen]
          <br />
          [PLZ Ort einfügen]
          <br />
          Deutschland
        </p>
      </section>

      <section className="mt-8 space-y-2 text-muted">
        <h2 className="text-lg font-medium text-foreground">Kontakt</h2>
        <p>
          Telefon: 0176 80354413
          <br />
          E-Mail: ardijon@live.de
        </p>
      </section>

      <section className="mt-8 space-y-2 text-muted">
        <h2 className="text-lg font-medium text-foreground">Umsatzsteuer-ID</h2>
        <p>[USt-IdNr. einfügen, falls vorhanden]</p>
      </section>

      <section className="mt-8 space-y-2 text-muted">
        <h2 className="text-lg font-medium text-foreground">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p>Ardijon Durguti (Anschrift wie oben)</p>
      </section>

      <section className="mt-8 space-y-2 text-muted">
        <h2 className="text-lg font-medium text-foreground">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit: https://ec.europa.eu/consumers/odr/. Zur Teilnahme an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht
          verpflichtet und nicht bereit.
        </p>
      </section>
    </div>
  );
}
