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
    <Suspense fallback={<div className="glass-card rounded-2xl p-8 animate-pulse h-96" />}>
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
    <div className="glass-card reveal-up reveal-up-1 rounded-2xl p-8">
      <p className="eyebrow mb-2">Welcome back</p>
      <h1 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-[#1E293B] mb-6">
        Sign in to your account
      </h1>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGooglePending || isPending}
        className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-[#92b6f0]/40 bg-white/60 px-4 py-2.5 font-sans text-[0.88rem] font-medium text-[#1E293B] transition hover:bg-white/80 disabled:opacity-50"
      >
        <GoogleIcon />
        {isGooglePending ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="relative mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#92b6f0]/30" />
        <span className="font-sans text-[0.72rem] text-[#3D5A87]/50">or</span>
        <div className="h-px flex-1 bg-[#92b6f0]/30" />
      </div>

      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-sans text-[0.78rem] font-medium text-[#3D5A87]">
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
            <label htmlFor="password" className="block font-sans text-[0.78rem] font-medium text-[#3D5A87]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-sans text-[0.74rem] text-[#3D5A87]/70 hover:text-[#3D5A87] transition"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D5A87]/50 hover:text-[#3D5A87]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
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

      <p className="mt-5 text-center font-sans text-[0.8rem] text-[#3D5A87]/70">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#3D5A87] hover:underline">
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
