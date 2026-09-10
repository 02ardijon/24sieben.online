import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Mindestens 2 Zeichen." }).max(100),
  email: z.email({ error: "Bitte eine gültige E-Mail-Adresse angeben." }).trim(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, { error: "Mindestens 10 Zeichen." }).max(5000),
  // Honeypot-Feld — für Menschen unsichtbar, Bots füllen es oft trotzdem aus.
  website: z.string().max(0).optional().or(z.literal("")),
});
