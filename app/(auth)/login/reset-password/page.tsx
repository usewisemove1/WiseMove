import Link from "next/link";

import AuthShell from "@/components/auth/AuthShell";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email ?? "";

  return (
    <AuthShell dataComponent="reset-password">
      <div className="max-w-md">
        <h1 className={cn(typography.h1, "text-2xl sm:text-3xl")}>Reset password</h1>
        <p className={cn(typography.caption, "mt-2 text-base")}>
          {email
            ? `We sent a reset code to ${email}. Enter it on the next screen to choose a new password.`
            : "Check your email for a reset code to choose a new password."}
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary/80"
        >
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
