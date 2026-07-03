"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { updatePassword } from "@/lib/actions/auth";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    startTransition(async () => {
      const result = await updatePassword(password);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="monolith-plate reveal-up reveal-up-1 p-8">
      <p className="eyebrow mb-2">Security</p>
      <h1 className="heading-engraved font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-[#0d1f3c] mb-3">
        Create a new password
      </h1>
      <p className="font-sans text-[0.85rem] text-[#2a3f6b]/80 mb-6">
        Choose a strong password of at least 8 characters.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="rp-password" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            New password
          </label>
          <div className="relative">
            <input
              id="rp-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="auth-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2a3f6b]/50 hover:text-[#0d1f3c]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rp-confirm" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Confirm new password
          </label>
          <input
            id="rp-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="auth-input"
          />
        </div>

        {error && (
          <p className="bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full justify-center py-3 text-[0.9rem] disabled:opacity-50"
        >
          {isPending ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
