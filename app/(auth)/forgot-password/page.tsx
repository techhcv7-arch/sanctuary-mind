"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sendPasswordReset } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await sendPasswordReset(email);
      setSent(true);
    });
  }

  return (
    <div className="glass-card reveal-up reveal-up-1 rounded-2xl p-8">
      <Link
        href="/login"
        className="mb-5 flex items-center gap-1.5 font-sans text-[0.78rem] text-[#3D5A87]/70 hover:text-[#3D5A87] transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
      </Link>

      {sent ? (
        <div className="text-center">
          <div className="mb-4 mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#3D5A87]/10">
            <span className="font-display text-2xl">✉</span>
          </div>
          <h1 className="font-display text-[1.5rem] font-semibold tracking-tight text-[#1E293B] mb-3">
            Check your inbox
          </h1>
          <p className="font-sans text-[0.85rem] text-[#3D5A87]/80 mb-6">
            We sent a password reset link to <strong>{email}</strong>. The link expires in 24 hours.
          </p>
          <p className="font-sans text-[0.78rem] text-[#3D5A87]/60">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-[#3D5A87] hover:underline font-medium"
            >
              try again
            </button>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="eyebrow mb-2">Password reset</p>
          <h1 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-[#1E293B] mb-3">
            Forgot your password?
          </h1>
          <p className="font-sans text-[0.85rem] text-[#3D5A87]/80 mb-6">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="fp-email" className="block font-sans text-[0.78rem] font-medium text-[#3D5A87]">
                Email address
              </label>
              <input
                id="fp-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full justify-center py-3 text-[0.9rem] disabled:opacity-50"
            >
              {isPending ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
