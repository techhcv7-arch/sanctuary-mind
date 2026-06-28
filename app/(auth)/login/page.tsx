"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmail, signInWithGoogle } from "@/lib/actions/auth";

const ERROR_MESSAGES: Record<string, string> = {
  google_failed: "Google sign-in failed. Please try again.",
  auth_failed: "Authentication failed. Please try again.",
  missing_code: "Invalid sign-in link. Please try again.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="monolith-plate p-8 animate-pulse h-96" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError ? (ERROR_MESSAGES[urlError] ?? "Something went wrong. Please try again.") : null,
  );
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signInWithEmail(email, password);
      if (result?.error) setError(result.error);
    });
  }

  function handleGoogleSignIn() {
    setError(null);
    startGoogleTransition(async () => {
      await signInWithGoogle();
    });
  }

  return (
    <div className="monolith-plate reveal-up reveal-up-1 p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Welcome back</p>
          <h1 className="heading-engraved font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-[#13233f]">
            Sign in to your account
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#4b628d]">
            Access your dashboard, private conversations, prayer spaces, and pastoral care schedule.
          </p>
        </div>
        <div className="hidden rounded-[1.2rem] bg-[#13233f] px-3 py-2 text-right text-[#dfe9fb] sm:block">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
            Member care
          </p>
          <p className="mt-1 text-sm font-medium text-white">Secure sign-in</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGooglePending || isPending}
        className="mb-5 flex w-full items-center justify-center gap-3 rounded-[1.1rem] border border-white/70 bg-white/74 px-4 py-3 font-sans text-[0.9rem] font-medium text-[#13233f] transition hover:bg-white/88 disabled:opacity-50"
      >
        <GoogleIcon />
        {isGooglePending ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="relative mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/20" />
        <span className="font-sans text-[0.72rem] text-[#4b628d]/70">or</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-sans text-[0.78rem] font-medium text-[#4b628d]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="auth-input"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block font-sans text-[0.78rem] font-medium text-[#4b628d]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-sans text-[0.74rem] text-[#4b628d] transition hover:text-[#13233f]"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b628d]/60 hover:text-[#13233f]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-[1rem] bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || isGooglePending}
          className="btn-primary w-full justify-center py-3 text-[0.9rem] disabled:opacity-50"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="mt-6 rounded-[1.2rem] border border-white/56 bg-white/38 px-4 py-4">
        <p className="text-sm leading-6 text-[#4b628d]">
          New to SanctuaryMind? Create an account to access guided check-ins, live prayer, and confidential pastoral support.
        </p>
      </div>

      <p className="mt-5 text-center font-sans text-[0.8rem] text-[#4b628d]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#13233f] hover:underline">
          Get started
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}
