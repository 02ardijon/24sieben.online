import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 text-lg font-semibold tracking-tight text-foreground">
        24<span className="text-accent">sieben</span>.online
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-2xl shadow-black/20">
        {children}
      </div>
    </div>
  );
}
