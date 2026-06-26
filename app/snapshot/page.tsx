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

      <header className="topo-bg relative space-y-2">
        <p className="eyebrow relative">Mental Health · Reflection</p>
        <h1 className="heading-engraved relative font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.25rem]">
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
