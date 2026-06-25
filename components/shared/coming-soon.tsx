"use client";

import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

export function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb: string;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-gold)]/15 text-[var(--brand-gold)]">
        <Construction className="h-6 w-6" />
      </div>
      <h1 className="font-serif text-2xl font-semibold text-[var(--brand-navy)]">
        {title}
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">{blurb}</p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
