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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#92b6f0]">
      {/* Top bar */}
      <header className="topo-bg relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center bg-[var(--brand-gold)] text-[#0d1f3c] font-display text-[0.9rem] leading-none">✣</span>
          <span className="heading-engraved font-display text-[1rem] font-medium text-[#0d1f3c] tracking-tight">SanctuaryMind</span>
        </div>
        <Link
          href="/login"
          className="border border-white/20 bg-[#a0bff0] px-4 py-1.5 font-sans text-[0.78rem] font-medium text-[#0d1f3c] transition hover:bg-[#b2cbf2]"
        >
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-4 text-center">
        <div className="reveal-up reveal-up-1 mb-5 inline-flex items-center gap-2 border border-[#0d1f3c]/25 bg-[#0d1f3c]/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 bg-[#0d1f3c]" />
          <span className="font-sans text-[0.75rem] font-semibold text-[#0d1f3c]">A Virtual Spiritual Hospital</span>
        </div>

        <h1 className="heading-engraved reveal-up reveal-up-2 font-display text-[2.75rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0d1f3c] sm:text-[3.75rem]">
          Faith,{" "}
          <span className="italic text-[#2a3f6b]">technology,</span>
          <br />and mental wellness.
        </h1>

        <p className="reveal-up reveal-up-3 mx-auto mt-6 max-w-[440px] text-[1rem] leading-relaxed text-[#2a3f6b]">
          SanctuaryMind connects church members to spiritual care, community, and
          licensed mental health pathways — built with the confidentiality your
          congregation deserves.
        </p>

        <div className="reveal-up reveal-up-4 mt-8 flex flex-wrap justify-center gap-2">
          {FEATURES.map((f) => (
            <span key={f.label} className="inline-flex items-center gap-1.5 border border-white/20 bg-[#a0bff0] px-3.5 py-1.5 font-sans text-[0.78rem] text-[#0d1f3c]">
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
          <hr className="fault-line my-4" aria-hidden />
          <p className="pull-quote text-[0.95rem] text-[#2a3f6b]">
            &ldquo;He heals the brokenhearted and binds up their wounds.&rdquo;
          </p>
          <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-widest text-[#0d1f3c]/50">Psalm 147 · 3</p>
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#0d1f3c]/40">
          Hartfield Consulting · Faith · Wellness · Technology · MMXXVI
        </p>
      </footer>
    </div>
  );
}
