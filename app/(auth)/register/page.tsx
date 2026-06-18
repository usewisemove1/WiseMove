import RegisterShell from "@/components/auth/RegisterShell";
import SignUpForm from "@/components/auth/SignUpForm";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <RegisterShell>
      <div className="mb-4">
        <h1 className={cn(typography.h1, "text-xl sm:text-2xl")}>Create Account</h1>
        <p className={cn(typography.caption, "mt-1 text-sm")}>
          Enter your details to start your property journey.
        </p>
      </div>

      <SignUpForm />
    </RegisterShell>
  );
}
