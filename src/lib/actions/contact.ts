"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import type { FormState } from "@/lib/actions/auth";

export async function submitContactRequestAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const ip = getClientIp(await headers());
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return { error: "Zu viele Anfragen. Bitte später erneut versuchen." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // Honeypot getriggert -> stillschweigend als "erfolgreich" quittieren.
  if (parsed.data.website) {
    return { success: true };
  }

  await prisma.contactRequest.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    },
  });

  return { success: true };
}
