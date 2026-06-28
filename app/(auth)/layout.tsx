import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="border-b border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]">
        <Link
          href="/"
          className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8"
          aria-label="SanctuaryMind home"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center border border-[#1f4d93] bg-[#1f4d93] text-[0.82rem] leading-none text-white"
          >
            ✣
          </span>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
              SanctuaryMind
            </p>
            <p className="font-sans text-[0.88rem] font-medium tracking-[-0.03em] text-[#18386e]">
              Member access
            </p>
          </div>
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-px px-4 pb-10 pt-6 sm:px-6 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(320px,0.95fr)_minmax(420px,1fr)] lg:px-8 lg:pt-10">
        <section className="monolith-surface hidden h-full flex-col justify-between p-8 lg:flex">
          <div className="relative z-10">
            <p className="eyebrow">Digital sanctuary</p>
            <h1 className="mt-3 font-display text-[3rem] font-semibold text-[#18386e]">
              Calm entry, clear structure, private care.
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-7 text-[#5d6f8d]">
              The sign-in experience should feel like the rest of the system: flat, precise, and easy to trust when someone is already carrying a heavy day.
            </p>
          </div>

          <div className="space-y-px bg-[rgba(58,58,56,0.2)]">
            {[
              "Private member access with faith-aware support flows.",
              "Pastoral booking, prayer, and reflection in one account.",
              "Designed to reduce friction when users are already overwhelmed.",
            ].map((item) => (
              <div key={item} className="bg-[#f7f7f5] px-4 py-4 text-sm leading-6 text-[#18386e]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-lg flex-col justify-center">
          {children}
        </div>
      </main>

      <footer className="border-t border-[rgba(58,58,56,0.2)] px-6 py-4 text-center">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
          Hartfield Consulting · Faith · Wellness · Technology · MMXXVI
        </p>
      </footer>
    </div>
  );
}
