import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Anmelden | 24sieben.online",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; reset?: string }>;
}) {
  const { callbackUrl, reset } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground">Anmelden</h1>
      {reset === "success" && (
        <p className="rounded-lg border border-success/30 bg-success/10 px-3.5 py-2.5 text-sm text-success">
          Passwort erfolgreich geändert. Du kannst dich jetzt anmelden.
        </p>
      )}
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
