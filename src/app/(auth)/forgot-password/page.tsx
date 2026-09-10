import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Passwort vergessen | 24sieben.online",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground">Passwort vergessen</h1>
      <ForgotPasswordForm />
    </div>
  );
}
