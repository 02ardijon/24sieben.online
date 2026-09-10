import "server-only";

type Mail = { to: string; subject: string; text: string };

/**
 * Minimal mail sending. Uses SMTP via nodemailer when SMTP_HOST is
 * configured (production/VPS). Otherwise logs the message to the
 * console so local development doesn't require a mail server.
 */
export async function sendMail({ to, subject, text }: Mail): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`[mailer] SMTP nicht konfiguriert — würde E-Mail senden an ${to}:\n${subject}\n\n${text}`);
    return;
  }

  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });

  await transport.sendMail({
    from: process.env.SMTP_FROM ?? "24sieben.online <no-reply@24sieben.online>",
    to,
    subject,
    text,
  });
}
