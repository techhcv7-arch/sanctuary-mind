import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#d1dff6]">
      {/* Aurora blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% -15%, rgba(146,182,240,0.45) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 85% 10%, rgba(160,191,240,0.30) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 15% 80%, rgba(178,203,242,0.25) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SanctuaryMind home">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand-gold)] text-[#0D1B2A] font-display text-[0.9rem] leading-none"
          >
            ✣
          </span>
          <span className="font-display text-[1rem] font-medium text-[#1E293B] tracking-tight">
            SanctuaryMind
          </span>
        </Link>
      </header>

      {/* Page content */}
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16 pt-4">
        {children}
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#3D5A87]/40">
          Hartfield Consulting · Faith · Wellness · Technology · MMXXVI
        </p>
      </footer>
    </div>
  );
}
