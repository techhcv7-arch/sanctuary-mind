import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="topo-bg relative flex min-h-screen flex-col overflow-hidden bg-[#92b6f0]">
      {/* Header */}
      <header className="relative z-10 flex items-center px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SanctuaryMind home">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center bg-[var(--brand-gold)] text-[#0d1f3c] font-display text-[0.9rem] leading-none"
          >
            ✣
          </span>
          <span className="heading-engraved font-display text-[1rem] font-medium text-[#0d1f3c] tracking-tight">
            SanctuaryMind
          </span>
        </Link>
      </header>

      {/* Page content */}
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16 pt-4">
        {children}
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#0d1f3c]/40">
          Hartfield Consulting · Faith · Wellness · Technology · MMXXVI
        </p>
      </footer>
    </div>
  );
}
