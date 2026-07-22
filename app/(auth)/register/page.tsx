import RegisterShell from "@/components/auth/RegisterShell";
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <RegisterShell>
      <div className="mb-4">
        <h1 className={cn(typography.h1, "text-xl sm:text-2xl")}>Create Account</h1>
        <p className={cn(typography.caption, "mt-1 text-sm")}>
          Choose the account that fits how you&apos;ll use WiseMove.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-primary bg-primary/[0.03] p-3"><p className="text-sm font-bold text-foreground">Individual</p><p className="mt-1 text-xs text-muted-foreground">Buy, rent and save properties.</p></div>
        <Link href="/agent/signup" className="rounded-xl border border-border p-3 transition hover:border-primary"><p className="text-sm font-bold text-foreground">Property agent</p><p className="mt-1 text-xs text-muted-foreground">Verify your account and list homes.</p></Link>
      </div>

      <SignUpForm />
    </RegisterShell>
  );
}
