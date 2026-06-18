"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";

import { authInputClassName } from "@/components/auth/authFormStyles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

const inputClassName = authInputClassName;

export default function SignInForm() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded || !signIn) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
        return;
      }

      setError("Additional verification is required. Please try another method.");
    } catch (err: unknown) {
      const clerkError = err as { errors?: { longMessage?: string; message?: string }[] };
      setError(
        clerkError.errors?.[0]?.longMessage ??
          clerkError.errors?.[0]?.message ??
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isLoaded || !signIn) return;

    if (!email.trim()) {
      setError("Enter your email address first, then click Forgot password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email.trim(),
      });
      router.push(`/login/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (err: unknown) {
      const clerkError = err as { errors?: { longMessage?: string; message?: string }[] };
      setError(
        clerkError.errors?.[0]?.longMessage ??
          clerkError.errors?.[0]?.message ??
          "Could not start password reset. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (strategy: "oauth_google" | "oauth_apple") => {
    if (!isLoaded || !signIn) return;

    setSocialLoading(strategy);
    setError("");

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/login/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch {
      setError("Could not start social sign-in. Please try again.");
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm font-semibold text-foreground">
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cn(inputClassName, "pr-11")}
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
        </div>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary/20"
          />
          <span className="text-sm text-muted-foreground">Keep me signed in</span>
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading || !isLoaded}
          className="h-11 w-full rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90"
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          or continue with
        </span>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={!isLoaded || socialLoading !== null}
          onClick={() => handleSocialSignIn("oauth_google")}
          className="h-11 rounded-lg border-border bg-white text-sm font-medium shadow-none hover:bg-muted/40"
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!isLoaded || socialLoading !== null}
          onClick={() => handleSocialSignIn("oauth_apple")}
          className="h-11 rounded-lg border-border bg-white text-sm font-medium shadow-none hover:bg-muted/40"
        >
          <AppleIcon />
          Apple
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to WiseMove?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-primary/80">
          Create an account
        </Link>
      </p>
    </div>
  );
}
