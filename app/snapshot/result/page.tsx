"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HandHeart,
  BookOpenText,
  CalendarClock,
  Phone,
  ShieldCheck,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { CrisisBanner } from "@/components/shared/crisis-banner";
import { useAppStore } from "@/lib/store/app-store";

export default function SnapshotResultPage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const result = useAppStore((s) => s.snapshot.result);

  useEffect(() => {
    if (hydrated && !result) router.replace("/snapshot");
  }, [hydrated, result, router]);

  if (!hydrated || !result) return null;
  const tier = result.tier;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      <header className="topo-bg space-y-3">
        <p className="eyebrow">Snapshot · Result</p>
        <h1 className="heading-engraved font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.25rem]">
          We <span className="italic font-medium">hear</span> you.
        </h1>
        <TierBadge tier={tier} />
        <p className="max-w-prose text-[0.9rem] text-muted-foreground">
          Thank you for taking a moment to check in. Here is the care path
          we&rsquo;d gently recommend.
        </p>
      </header>

      {tier === "high" && <CrisisBanner variant="urgent" />}

      {tier === "low" && <LowResult />}
      {tier === "moderate" && <ModerateResult />}
      {tier === "high" && <HighResult />}

      <div className="monolith-plate p-5">
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
          About this Snapshot
        </p>
        <p className="text-[0.875rem] leading-relaxed text-muted-foreground">
          The Snapshot is a faith-aware reflection inspired by validated
          screening tools — not a clinical diagnosis. Your decision tree was
          reviewed by your church&rsquo;s clinical advisor.
        </p>
        <p className="mt-3 font-sans text-[0.75rem] font-semibold text-muted-foreground/60">
          Reflection score · {result.total} / 30
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 btn-ghost rounded-full px-4 py-2 text-sm font-medium transition"
        >
          <ChevronLeft className="h-4 w-4" /> Back to today
        </Link>
        <Link
          href="/snapshot"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Retake
        </Link>
      </div>
    </div>
  );
}

function TierBadge({ tier }: { tier: "low" | "moderate" | "high" }) {
  const styles = {
    low:      "bg-emerald-600/12 text-emerald-700 border-emerald-600/30",
    moderate: "bg-amber-500/12 text-amber-700 border-amber-500/30",
    high:     "bg-red-600/12 text-red-600 border-red-500/30",
  } as const;
  const label = {
    low: "Low priority",
    moderate: "Moderate priority",
    high: "High priority",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[0.7rem] font-semibold uppercase tracking-wide ${styles[tier]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label[tier]}
    </span>
  );
}

function ResultCard({
  accent,
  Icon,
  overline,
  title,
  body,
  children,
}: {
  accent: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  overline: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="monolith-plate relative overflow-hidden p-5 sm:p-6"
      style={{ borderColor: `color-mix(in oklab, ${accent} 30%, rgba(255,255,255,0.18))` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ background: accent }}
      />
      <div className="flex items-start gap-4 pl-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center"
          style={{
            background: `color-mix(in oklab, ${accent} 12%, transparent)`,
            color: accent,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="eyebrow mb-2" style={{ color: accent }}>
            {overline}
          </p>
          <h2 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.018em] text-[#0d1f3c] sm:text-[1.375rem]">
            {title}
          </h2>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
            {body}
          </p>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  href,
  icon: Icon,
  label,
  color,
  filled,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  color?: string;
  filled?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-[0.875rem] font-medium transition ${
        filled
          ? "bg-red-600 border-red-600 text-white hover:opacity-90"
          : "border-white/20 bg-[#a0bff0] text-foreground hover:bg-[#b2cbf2]"
      }`}
    >
      <span
        className="shrink-0"
        style={!filled && color ? { color } : undefined}
      >
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </span>
      {label}
    </Link>
  );
}

function LowResult() {
  return (
    <ResultCard
      accent="#059669"
      Icon={HandHeart}
      overline="Low priority"
      title="Lean into prayer and community"
      body="Your reflection points to a steady season. Stay rooted with your congregation, daily Scripture, and a regular pastoral check-in."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <ActionBtn href="/prayer" icon={HandHeart} label="Join live prayer" color="#059669" />
        <ActionBtn href="/bible" icon={BookOpenText} label="Bible Personality" color="#059669" />
      </div>
    </ResultCard>
  );
}

function ModerateResult() {
  return (
    <ResultCard
      accent="#D97706"
      Icon={CalendarClock}
      overline="Moderate priority"
      title="A warm referral to a Christian psychologist"
      body="Your reflection suggests a heavier season. We'd love to connect you with a faith-aligned licensed psychologist — and a pastoral consultation alongside it."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <ActionBtn href="/pastor" icon={CalendarClock} label="Schedule a pastor" color="#D97706" />
        <ActionBtn href="/chat" icon={BookOpenText} label="Talk it through" color="#D97706" />
      </div>
      <p className="mt-3 text-[0.78rem] italic text-muted-foreground/70">
        In the live build, a licensed-provider list appears here, filtered to your church&rsquo;s vetted network.
      </p>
    </ResultCard>
  );
}

function HighResult() {
  return (
    <ResultCard
      accent="#DC2626"
      Icon={ShieldCheck}
      overline="High priority"
      title="Please reach out for immediate support"
      body="Your reflection includes signs we take seriously. The 988 Lifeline is free, confidential, and available 24/7."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href="tel:988"
          className="inline-flex items-center gap-2 rounded-xl border border-red-600 bg-red-600 px-4 py-3 text-[0.875rem] font-semibold text-white hover:opacity-90 transition"
        >
          <Phone className="h-4 w-4" /> Call 988 now
        </a>
        <ActionBtn href="/pastor" icon={CalendarClock} label="Talk to your pastor" color="#DC2626" />
      </div>
      <p className="mt-3 text-[0.78rem] italic text-muted-foreground/70">
        A staff member from your church will be notified that you&rsquo;d like support, with your permission.
      </p>
    </ResultCard>
  );
}
