import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-muted">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Datenschutzerklärung
      </h1>
      <p className="mt-2 text-sm text-warning">
        Platzhalter-Inhalt — bitte vor Live-Schaltung individuell prüfen (Hosting-Anbieter,
        eingesetzte Cookies/Dienste, Speicherfristen) und rechtlich absichern lassen.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">1. Verantwortlicher</h2>
        <p>
          Ardijon Durguti, 24sieben.online, [Anschrift einfügen], E-Mail: ardijon@live.de
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">2. Hosting</h2>
        <p>
          Diese Website wird auf einem eigenen Server (VPS) gehostet. Beim Aufruf der Seite
          verarbeitet der Hosting-Anbieter automatisch technische Zugriffsdaten
          (Server-Logfiles) wie IP-Adresse, Datum/Uhrzeit, aufgerufene Seite und Browsertyp.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
          sicheren, stabilen Betrieb).
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">3. Kontaktformular</h2>
        <p>
          Nutzt du das Kontaktformular, speichern wir die von dir angegebenen Daten (Name,
          E-Mail, optional Telefon, Nachricht) zur Bearbeitung deiner Anfrage. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfrage) bzw. lit. f DSGVO
          (berechtigtes Interesse an Kommunikation).
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">4. Kundenportal</h2>
        <p>
          Für das Kundenportal legen wir ein Nutzerkonto mit E-Mail-Adresse und einem
          gehashten Passwort an. Die Verarbeitung erfolgt zur Durchführung des
          Vertragsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO). Angemeldete Sitzungen werden
          über ein Cookie verwaltet, das für den Betrieb des Portals technisch notwendig ist.
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">5. Speicherdauer</h2>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck
          erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium text-foreground">6. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner
          Daten. Wende dich dazu an die oben genannte Kontaktadresse. Außerdem besteht ein
          Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
        </p>
      </section>
    </div>
  );
}
