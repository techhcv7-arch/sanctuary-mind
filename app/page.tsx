import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: "🧠", label: "Mental Health Snapshot" },
  { icon: "🤝", label: "Pastor Sessions" },
  { icon: "💬", label: "AI Companion" },
  { icon: "🙏", label: "Live Prayer" },
];

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#d1dff6]">
      {/* Aurora blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 55% at 50% -15%, rgba(146,182,240,0.45) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 85% 10%, rgba(160,191,240,0.30) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 35% at 15% 80%, rgba(178,203,242,0.25) 0%, transparent 60%)" }} />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand-gold)] text-[#0D1B2A] font-display text-[0.9rem] leading-none">✣</span>
          <span className="font-display text-[1rem] font-medium text-[#1E293B] tracking-tight">SanctuaryMind</span>
        </div>
        <Link
          href="/login"
          className="rounded-full border border-[#92b6f0]/40 bg-white/40 px-4 py-1.5 font-sans text-[0.78rem] font-medium text-[#3D5A87]/80 transition hover:bg-white/60"
        >
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-4 text-center">
        <div className="reveal-up reveal-up-1 mb-5 inline-flex items-center gap-2 rounded-full border border-[#3D5A87]/25 bg-[#3D5A87]/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3D5A87]" />
          <span className="font-sans text-[0.75rem] font-semibold text-[#3D5A87]">A Virtual Spiritual Hospital</span>
        </div>

        <h1 className="reveal-up reveal-up-2 font-display text-[2.75rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1E293B] sm:text-[3.75rem]">
          Faith,{" "}
          <span className="italic bg-gradient-to-r from-[#3D5A87] to-[#92b6f0] bg-clip-text text-transparent">technology,</span>
          <br />and mental wellness.
        </h1>

        <p className="reveal-up reveal-up-3 mx-auto mt-6 max-w-[440px] text-[1rem] leading-relaxed text-[#3D5A87]">
          SanctuaryMind connects church members to spiritual care, community, and
          licensed mental health pathways — built with the confidentiality your
          congregation deserves.
        </p>

        <div className="reveal-up reveal-up-4 mt-8 flex flex-wrap justify-center gap-2">
          {FEATURES.map((f) => (
            <span key={f.label} className="inline-flex items-center gap-1.5 rounded-full border border-[#92b6f0]/40 bg-white/45 px-3.5 py-1.5 font-sans text-[0.78rem] text-[#3D5A87]/80">
              <span>{f.icon}</span>{f.label}
            </span>
          ))}
        </div>

        <div className="reveal-up reveal-up-5 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup" className="btn-primary px-8 py-3.5 text-[0.95rem]">
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/login" className="btn-ghost px-7 py-3.5 text-[0.9rem]">
            Sign in
          </Link>
        </div>

        <div className="reveal-up reveal-up-5 mt-12 max-w-sm">
          <div className="mx-auto mb-3 h-px w-16 bg-[#92b6f0]/35" />
          <p className="pull-quote text-[0.95rem] text-[#3D5A87]/70">
            &ldquo;He heals the brokenhearted and binds up their wounds.&rdquo;
          </p>
          <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-widest text-[#3D5A87]/50">Psalm 147 · 3</p>
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#3D5A87]/40">
          Hartfield Consulting · Faith · Wellness · Technology · MMXXVI
        </p>
      </footer>
    </div>
  );
}
