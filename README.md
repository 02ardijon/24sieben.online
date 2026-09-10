# 24sieben.online

Business-Website mit Kundenportal für das Einzelunternehmen 24sieben.online
(Ardijon Durguti, Bremen) — Erstellung und Erhaltung von Webseiten und
individuellen Webservices.

Öffentlicher Bereich (Leistungen, Über mich, Portfolio, Kontakt) +
geschütztes Kundenportal (Auftragsstatus, Support-Tickets) +
Admin-/Agenten-Bereich für den Betreiber.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4
- Prisma 7 + PostgreSQL (`@prisma/adapter-pg`)
- Auth.js (NextAuth v5, Credentials Provider, JWT-Sessions)
- Docker + docker-compose für Self-Hosting

## Lokale Entwicklung

Voraussetzungen: Node.js 20.9+, eine erreichbare PostgreSQL-Instanz.

```bash
npm install
cp .env.example .env   # DATABASE_URL, AUTH_SECRET etc. anpassen
npx prisma migrate dev
npm run db:seed        # legt Admin-Account aus SEED_ADMIN_EMAIL/PASSWORD an
npm run dev
```

Für Demo-Daten (Beispielkunde + Beispielauftrag) zusätzlich
`SEED_DEMO_DATA=true` vor `npm run db:seed` setzen.

## Deployment (Docker / VPS)

```bash
cp .env.example .env
# POSTGRES_PASSWORD, AUTH_SECRET (openssl rand -base64 32), NEXTAUTH_URL
# setzen — DATABASE_URL wird für den Container automatisch aus den
# POSTGRES_*-Variablen zusammengesetzt.

docker compose up --build -d
docker compose exec app npm run db:seed   # einmalig: Admin-Account anlegen
```

Datenbank-Migrationen laufen automatisch bei jedem Container-Start
(`docker-entrypoint.sh` → `prisma migrate deploy`). Hochgeladene
Ticket-/Auftrags-Anhänge liegen im benannten Volume `uploads`, die
Postgres-Daten im Volume `postgres_data` — beide überstehen
`docker compose down` (nicht `down -v`).

Reverse Proxy / TLS (z.B. nginx + Let's Encrypt, oder Caddy) ist nicht
Teil dieses Setups und muss auf dem VPS separat vor Port 3000 gesetzt
werden.

## Rollen

- **CUSTOMER** — Kundenportal (`/portal`): eigene Aufträge, Tickets
- **AGENT** / **ADMIN** — Admin-Bereich (`/admin`): alle Kunden, Aufträge,
  Tickets verwalten. Aktuell gibt es praktisch nur die Rolle ADMIN (der
  Betreiber); AGENT existiert im Datenmodell für eine spätere Erweiterung
  um weitere Mitarbeiter.

## Wichtige Hinweise vor Live-Schaltung

- `/impressum` und `/datenschutz` enthalten Platzhalter (fehlende
  Anschrift, USt-IdNr.) — vor Veröffentlichung ergänzen und rechtlich
  prüfen lassen.
- SMTP für den Passwort-Reset-Versand konfigurieren (`SMTP_*`-Variablen);
  ohne SMTP-Konfiguration werden Reset-Links nur in die Server-Logs
  geschrieben.
