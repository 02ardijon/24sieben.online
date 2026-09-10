"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { sendMail } from "@/lib/mailer";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "@/lib/validation/auth";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
} | undefined;

const BCRYPT_ROUNDS = 12;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h

export async function registerAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const ip = getClientIp(await headers());
  if (!rateLimit(`register:${ip}`, 5, 60_000)) {
    return { error: "Zu viele Versuche. Bitte später erneut probieren." };
  }

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Keine Info preisgeben, ob die E-Mail schon existiert (Account-Enumeration).
    return { success: true };
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  await prisma.user.create({
    data: { name, email, passwordHash, role: "CUSTOMER" },
  });

  return { success: true };
}

export async function loginAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const callbackUrl = (formData.get("callbackUrl") as string) || "/portal";

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: callbackUrl,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === "CredentialsSignin") {
        const code = (err as { code?: string }).code;
        if (code === "too_many_attempts") {
          return { error: "Zu viele Anmeldeversuche. Bitte kurz warten." };
        }
        return { error: "E-Mail oder Passwort ist falsch." };
      }
      return { error: "Anmeldung fehlgeschlagen." };
    }
    throw err;
  }

  return { success: true };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function requestPasswordResetAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const ip = getClientIp(await headers());
  if (!rateLimit(`reset-request:${ip}`, 5, 60_000)) {
    return { error: "Zu viele Versuche. Bitte später erneut probieren." };
  }

  const parsed = requestPasswordResetSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  if (user) {
    const token = randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    await sendMail({
      to: user.email,
      subject: "Passwort zurücksetzen – 24sieben.online",
      text: `Hallo${user.name ? ` ${user.name}` : ""},\n\nüber diesen Link kannst du dein Passwort zurücksetzen (gültig für 1 Stunde):\n${resetUrl}\n\nWenn du das nicht angefordert hast, ignoriere diese E-Mail.`,
    });
  }

  // Immer Erfolg melden — kein Enumeration-Leak, ob die E-Mail existiert.
  return { success: true };
}

export async function resetPasswordAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { token, password } = parsed.data;

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { error: "Der Link ist ungültig oder abgelaufen. Bitte neu anfordern." };
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  redirect("/login?reset=success");
}
