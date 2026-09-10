import { ContactForm } from "@/components/marketing/contact-form";

export function Contact() {
  return (
    <section id="kontakt" className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Kontakt</h2>
          <p className="mt-2 max-w-md text-muted">
            Schreib mir kurz, worum es bei deinem Projekt geht — ich melde mich zeitnah zurück.
          </p>
          <dl className="mt-8 flex flex-col gap-3 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">E-Mail:</dt>
              <dd>
                <a href="mailto:ardijon@live.de" className="text-accent hover:text-accent-hover">
                  ardijon@live.de
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Telefon:</dt>
              <dd>
                <a href="tel:+4917680354413" className="text-accent hover:text-accent-hover">
                  0176 80354413
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Standort:</dt>
              <dd className="text-foreground">Bremen, Deutschland</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
