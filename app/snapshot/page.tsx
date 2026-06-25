"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { SnapshotWizard } from "@/components/feature/snapshot-wizard";
import { useAppStore } from "@/lib/store/app-store";

export default function SnapshotPage() {
  const resetSnapshot = useAppStore((s) => s.resetSnapshot);
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated) resetSnapshot();
  }, [hydrated, resetSnapshot]);

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
          className="pointer-events-none absolute -top-4 right-0 h-32 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--aurora-1) 0%, transparent 70%)" }}
        />
        <p className="eyebrow relative">Mental Health · Reflection</p>
        <h1 className="relative font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[2.25rem]">
          A short, faith-aware{" "}
          <span className="italic font-medium">check-in.</span>
        </h1>
        <p className="relative max-w-prose text-[0.9rem] text-muted-foreground">
          Ten questions. No right answers — your responses help us route you to
          the right kind of support.
        </p>
      </header>

      <SnapshotWizard />
    </div>
  );
}
