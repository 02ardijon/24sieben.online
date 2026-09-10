import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Passwort zurücksetzen | 24sieben.online",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="text-foreground">Kein gültiger Link zum Zurücksetzen gefunden.</p>
        <Link href="/forgot-password" className="text-accent hover:text-accent-hover">
          Neuen Link anfordern
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground">Neues Passwort setzen</h1>
      <ResetPasswordForm token={token} />
    </div>
  );
}
