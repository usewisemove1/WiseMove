import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <AuthShell dataComponent="sign-in">
      <div className="mb-8">
        <h1 className={cn(typography.h1, "text-2xl sm:text-3xl")}>Welcome Back</h1>
        <p className={cn(typography.caption, "mt-2 text-base")}>
          Secure access to your property portfolio.
        </p>
      </div>

      <SignInForm />
    </AuthShell>
  );
}
