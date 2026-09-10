import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(8, { error: "Mindestens 8 Zeichen." })
  .regex(/[a-zA-Z]/, { error: "Mindestens ein Buchstabe." })
  .regex(/[0-9]/, { error: "Mindestens eine Zahl." });

export const registerSchema = z.object({
  name: z.string().trim().min(2, { error: "Mindestens 2 Zeichen." }).max(100),
  email: z.email({ error: "Bitte eine gültige E-Mail-Adresse angeben." }).trim().toLowerCase(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email({ error: "Bitte eine gültige E-Mail-Adresse angeben." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Passwort erforderlich." }),
});

export const requestPasswordResetSchema = z.object({
  email: z.email({ error: "Bitte eine gültige E-Mail-Adresse angeben." }).trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
