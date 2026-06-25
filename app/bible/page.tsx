"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { BibleWizard } from "@/components/feature/bible-wizard";
import { useAppStore } from "@/lib/store/app-store";

export default function BiblePage() {
  const reset = useAppStore((s) => s.resetBible);
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated) reset();
  }, [hydrated, reset]);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      <header className="relative space-y-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 right-0 h-32 w-48 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(146,182,240,0.5) 0%, transparent 70%)" }}
        />
        <p className="eyebrow relative">Bible · Reflection</p>
        <h1 className="relative font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#1E293B] sm:text-[2.25rem]">
          Which biblical figure{" "}
          <span className="italic font-medium text-[#1E4170]">resonates with you?</span>
        </h1>
        <p className="relative max-w-prose text-[0.9rem] text-muted-foreground">
          Ten reflective questions, around three minutes. There are no right
          answers — only your honest one.
        </p>
      </header>

      <BibleWizard />
    </div>
  );
}
