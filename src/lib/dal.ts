import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Role } from "@/generated/prisma/enums";

export const verifySession = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
});

/** Like verifySession, but returns null instead of redirecting. Useful for UI that adapts to auth state. */
export const getOptionalSession = cache(async () => {
  return auth();
});

export async function requireRole(...roles: Role[]) {
  const session = await verifySession();
  if (!roles.includes(session.user.role)) {
    redirect("/portal");
  }
  return session;
}
