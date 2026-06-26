"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, BookOpenText, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store/app-store";
import { BIBLE_FIGURES } from "@/lib/mock/bible-figures";

export default function BibleResultPage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const result = useAppStore((s) => s.bible.result);

  useEffect(() => {
    if (hydrated && !result) router.replace("/bible");
  }, [hydrated, result, router]);

  if (!hydrated || !result) return null;
  const figure = BIBLE_FIGURES[result.figure];

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      <header className="space-y-2">
        <p className="eyebrow">Bible Personality · Result</p>
        <h1 className="font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.25rem]">
          You resonate with{" "}
          <span className="italic font-medium text-[#2a3f6b]">
            {figure.id}.
          </span>
        </h1>
      </header>

      {/* Hero figure card */}
      <div className="monolith-plate overflow-hidden">
        {/* Dark hero plate — kept dark for contrast with white text inside */}
        <div
          className="relative px-5 py-8 sm:px-8 sm:py-10"
          style={{ background: "linear-gradient(135deg, #2D4A70 0%, #1E3A5A 100%)" }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 18% 50%, #92b6f0 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-center gap-5 sm:gap-7">
            {/* Monogram */}
            <div className="relative shrink-0">
              <span
                className="grid h-20 w-20 place-items-center rounded-2xl bg-[var(--brand-gold)] font-display text-[3.25rem] font-semibold leading-none text-[#0B0F19] shadow-lg sm:h-24 sm:w-24 sm:text-[4rem]"
              >
                {figure.monogram}
              </span>
            </div>
            <div>
              <p className="eyebrow text-[#d1dff6]/70 mb-1">
                {figure.scriptureRef}
              </p>
              <p className="font-display text-[2rem] font-semibold leading-tight text-white sm:text-[2.5rem]">
                {figure.id}
              </p>
            </div>
          </div>
          <p className="relative mt-5 text-[0.9rem] leading-relaxed text-white/70">
            {figure.blurb}
          </p>
        </div>

        {/* Lower section */}
        <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-7">
          {/* Strengths */}
          <section>
            <p className="eyebrow-muted mb-2">Strengths</p>
            <div className="flex flex-wrap gap-2">
              {figure.strengths.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-emerald-600/25 bg-emerald-600/10 px-3 py-1 font-sans text-[0.75rem] font-medium text-emerald-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Scripture */}
          <section>
            <p className="eyebrow-muted mb-3">A verse for you</p>
            <blockquote className="border-l-2 border-[#D4AF37] pl-4 pull-quote text-[1.125rem] text-foreground sm:text-[1.3rem]">
              {figure.scripture}
            </blockquote>
          </section>

          {/* Practice */}
          <section>
            <p className="eyebrow-muted mb-2">A small practice this week</p>
            <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
              {figure.copingPractice}
            </p>
          </section>
        </div>
      </div>

      {/* Action row */}
      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            toast.success("Saved to your reflections", {
              description: "Find it in your prayer journal (in the live build).",
            })
          }
          className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.875rem] font-medium transition"
        >
          <BookOpenText className="h-4 w-4" /> Save
        </button>
        <button
          type="button"
          onClick={() =>
            toast("Shareable card ready", {
              description: "Share is opt-in — you control where it goes.",
            })
          }
          className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.875rem] font-medium transition"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        <Link
          href="/bible"
          className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.875rem] font-medium transition"
        >
          <RotateCcw className="h-4 w-4" /> Retake
        </Link>
      </div>
    </div>
  );
}
