"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { authInputClassNameCompact } from "@/components/auth/authFormStyles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = "form" | "verify-email";

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\s+/g, "");
}

function isPasswordValid(password: string): boolean {
  return password.length >= 8 && /\d/.test(password);
}

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();

  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const completeSignUp = async () => {
    if (!signUp) return;

    if (signUp.status === "complete") {
      await setActive({ session: signUp.createdSessionId });
      router.push("/dashboard");
      return;
    }

    setError("Please complete email verification to continue.");
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded || !signUp) return;

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters and include one number.");
      return;
    }

    const { firstName, lastName } = splitFullName(fullName);
    if (!firstName) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: email.trim(),
        password,
        firstName,
        lastName: lastName || undefined,
        phoneNumber: phone.trim() ? normalizePhoneNumber(phone) : undefined,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify-email");
    } catch (err: unknown) {
      const clerkError = err as { errors?: { longMessage?: string; message?: string }[] };
      setError(
        clerkError.errors?.[0]?.longMessage ??
          clerkError.errors?.[0]?.message ??
          "Could not create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded || !signUp) return;

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
        return;
      }

      await completeSignUp();
    } catch (err: unknown) {
      const clerkError = err as { errors?: { longMessage?: string; message?: string }[] };
      setError(
        clerkError.errors?.[0]?.longMessage ??
          clerkError.errors?.[0]?.message ??
          "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === "verify-email") {
    return (
      <div className="w-full">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Verify your email</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a verification code to <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleVerifyEmail} className="space-y-3" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="verification-code" className="text-sm font-semibold text-foreground">
              Verification code
            </label>
            <input
              id="verification-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className={authInputClassNameCompact}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-1.5 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading || !isLoaded}
            className="h-10 w-full rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90"
          >
            {loading ? "Verifying…" : "Verify & continue"}
          </Button>

          <button
            type="button"
            onClick={() => {
              setStep("form");
              setVerificationCode("");
              setError("");
            }}
            className="w-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to registration
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleRegister} className="space-y-3" noValidate>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="full-name" className="text-sm font-semibold text-foreground">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={authInputClassNameCompact}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="register-email" className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={authInputClassNameCompact}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={authInputClassNameCompact}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="register-password" className="text-sm font-semibold text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cn(authInputClassNameCompact, "pr-10")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Minimum 8 characters with at least one number.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-input text-primary focus:ring-primary/20"
          />
          <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
            I agree to the{" "}
            <Link href="#" className="font-semibold text-primary hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-semibold text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-1.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading || !isLoaded}
          className="h-10 w-full rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90"
        >
          {loading ? "Creating account…" : "Create Account"}
          {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
            Sign In
          </Link>
        </p>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-[11px] font-medium text-foreground">
              End-to-End Encryption Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
