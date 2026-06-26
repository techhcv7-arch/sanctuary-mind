"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { signUpWithEmail, signInWithGoogle, completeOAuthProfile } from "@/lib/actions/auth";
import { TermsContent } from "@/components/feature/terms-content";

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "America/Phoenix",
  "America/Puerto_Rico",
  "Europe/London",
  "Europe/Paris",
  "Africa/Lagos",
  "Asia/Manila",
];

type Step = 1 | 2 | 3;

interface ProfileData {
  fullName: string;
  phone: string;
  churchName: string;
  denomination: string;
  timezone: string;
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="monolith-plate p-8 animate-pulse h-96" />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const startStep = searchParams.get("step") === "2" ? 2 : 1;
  const isGoogleUser = startStep === 2;

  const [step, setStep] = useState<Step>(startStep as Step);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    phone: "",
    churchName: "",
    denomination: "",
    timezone: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  // Auto-detect timezone
  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setProfile((p) => ({ ...p, timezone: detected || "America/New_York" }));
  }, []);

  function handleStep1(e: React.FormEvent) {
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
    setStep(2);
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!profile.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    setStep(3);
  }

  function handleGoogleSignIn() {
    setError(null);
    startGoogleTransition(async () => {
      await signInWithGoogle();
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    setError(null);
    startTransition(async () => {
      let result;
      if (isGoogleUser) {
        result = await completeOAuthProfile(profile);
      } else {
        result = await signUpWithEmail(email, password, profile);
      }
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="monolith-plate reveal-up reveal-up-1 p-8">
      {/* Step indicator */}
      <div className="mb-5 flex items-center gap-2">
        {([1, 2, 3] as Step[]).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 transition-all ${
              s <= step ? "bg-[#0d1f3c]" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <Step1
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error}
          isPending={isPending}
          isGooglePending={isGooglePending}
          onSubmit={handleStep1}
          onGoogle={handleGoogleSignIn}
        />
      )}

      {step === 2 && (
        <Step2
          profile={profile}
          setProfile={setProfile}
          error={error}
          isGoogleUser={isGoogleUser}
          onBack={() => { if (!isGoogleUser) setStep(1); }}
          onSubmit={handleStep2}
        />
      )}

      {step === 3 && (
        <Step3
          agreed={agreed}
          setAgreed={setAgreed}
          error={error}
          isPending={isPending}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

/* ── Step 1: Credentials ── */
function Step1({
  email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
  showPassword, setShowPassword, error, isPending, isGooglePending, onSubmit, onGoogle,
}: {
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  error: string | null; isPending: boolean; isGooglePending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogle: () => void;
}) {
  return (
    <>
      <p className="eyebrow mb-2">Create your account</p>
      <h1 className="heading-engraved font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-[#0d1f3c] mb-6">
        Begin your journey
      </h1>

      <button
        type="button"
        onClick={onGoogle}
        disabled={isGooglePending || isPending}
        className="mb-5 flex w-full items-center justify-center gap-3 border border-white/20 bg-white/60 px-4 py-2.5 font-sans text-[0.88rem] font-medium text-[#0d1f3c] transition hover:bg-white/80 disabled:opacity-50"
      >
        <GoogleIcon />
        {isGooglePending ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="relative mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/20" />
        <span className="font-sans text-[0.72rem] text-[#2a3f6b]/60">or</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="su-email" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Email address
          </label>
          <input
            id="su-email"
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
          <label htmlFor="su-password" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Password
          </label>
          <div className="relative">
            <input
              id="su-password"
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2a3f6b]/50 hover:text-[#0d1f3c]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="su-confirm" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Confirm password
          </label>
          <input
            id="su-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="auth-input"
          />
        </div>

        {error && (
          <p className="bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
            {error}
          </p>
        )}

        <button type="submit" disabled={isPending} className="btn-primary w-full justify-center py-3 text-[0.9rem]">
          Continue
        </button>
      </form>

      <p className="mt-5 text-center font-sans text-[0.8rem] text-[#2a3f6b]/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#0d1f3c] hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}

/* ── Step 2: Profile ── */
function Step2({
  profile, setProfile, error, isGoogleUser, onBack, onSubmit,
}: {
  profile: ProfileData; setProfile: (p: ProfileData) => void;
  error: string | null; isGoogleUser: boolean;
  onBack: () => void; onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      {!isGoogleUser && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1 font-sans text-[0.78rem] text-[#2a3f6b]/70 hover:text-[#0d1f3c] transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back
        </button>
      )}
      <p className="eyebrow mb-2">Your profile</p>
      <h2 className="heading-engraved font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-[#0d1f3c] mb-6">
        Tell us about yourself
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="p-name" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Full name <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id="p-name"
            type="text"
            autoComplete="name"
            required
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            placeholder="Maya Brooks"
            className="auth-input"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-phone" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Phone number <span className="text-[#2a3f6b]/40 font-normal">(optional)</span>
          </label>
          <input
            id="p-phone"
            type="tel"
            autoComplete="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="auth-input"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-church" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Church / Congregation <span className="text-[#2a3f6b]/40 font-normal">(optional)</span>
          </label>
          <input
            id="p-church"
            type="text"
            value={profile.churchName}
            onChange={(e) => setProfile({ ...profile, churchName: e.target.value })}
            placeholder="Cornerstone Fellowship"
            className="auth-input"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-denom" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Denomination <span className="text-[#2a3f6b]/40 font-normal">(optional)</span>
          </label>
          <input
            id="p-denom"
            type="text"
            value={profile.denomination}
            onChange={(e) => setProfile({ ...profile, denomination: e.target.value })}
            placeholder="Non-denominational, Baptist, etc."
            className="auth-input"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-tz" className="block font-sans text-[0.78rem] font-medium text-[#2a3f6b]">
            Timezone
          </label>
          <select
            id="p-tz"
            value={profile.timezone}
            onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
            className="auth-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%230d1f3c%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-8"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full justify-center py-3 text-[0.9rem]">
          Continue
        </button>
      </form>
    </>
  );
}

/* ── Step 3: T&C ── */
function Step3({
  agreed, setAgreed, error, isPending, onBack, onSubmit,
}: {
  agreed: boolean; setAgreed: (v: boolean) => void;
  error: string | null; isPending: boolean;
  onBack: () => void; onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 font-sans text-[0.78rem] text-[#2a3f6b]/70 hover:text-[#0d1f3c] transition"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back
      </button>
      <p className="eyebrow mb-2">One last step</p>
      <h2 className="heading-engraved font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-[#0d1f3c] mb-3">
        Review &amp; agree
      </h2>
      <p className="font-sans text-[0.8rem] text-[#2a3f6b]/80 mb-4">
        Please read the SanctuaryMind User Agreement before creating your account.
      </p>

      <div className="mb-4 h-64 overflow-y-auto border border-white/20 bg-white/20 p-4">
        <TermsContent />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 border-white/30 accent-[#0d1f3c]"
          />
          <span className="font-sans text-[0.8rem] text-[#0d1f3c]/80 leading-relaxed">
            I have read and agree to the SanctuaryMind™ User Agreement, Disclaimer, and Informed
            Consent. I understand this electronic acceptance has the same force as a handwritten
            signature.
          </span>
        </label>

        {error && (
          <p className="bg-[#DC2626]/10 px-3 py-2 font-sans text-[0.78rem] text-[#DC2626]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!agreed || isPending}
          className="btn-primary w-full justify-center py-3 text-[0.9rem] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isPending ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </>
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
