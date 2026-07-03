"use client";

import { useEffect, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpenText,
  CalendarClock,
  ChevronLeft,
  HandHeart,
  MessageSquareText,
  Phone,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { CrisisBanner } from "@/components/shared/crisis-banner";
import {
  SNAPSHOT_ARCHETYPE_NOTES,
  SNAPSHOT_TIER_COPY,
} from "@/lib/scoring/snapshot";
import { useAppStore } from "@/lib/store/app-store";
import type { RiskTier, SnapshotArchetype } from "@/lib/types";

export default function SnapshotResultPage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const result = useAppStore((s) => s.snapshot.result);

  useEffect(() => {
    if (hydrated && !result) router.replace("/snapshot");
  }, [hydrated, result, router]);

  if (!hydrated || !result) return null;

  const routeCopy = SNAPSHOT_TIER_COPY[result.tier];

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
          Your next care path is{" "}
          <span className="italic font-medium">clearer now.</span>
        </h1>
        <TierBadge tier={result.tier} crisisOverride={result.crisisOverride} />
        <p className="max-w-prose text-[0.9rem] text-muted-foreground">
          {result.crisisOverride
            ? "A crisis indicator was detected, so we are showing the urgent support route regardless of total score."
            : routeCopy.message}
        </p>
      </header>

      {result.crisisOverride && <CrisisBanner variant="urgent" />}

      {result.crisisOverride ? <CrisisResult /> : <RouteResult tier={result.tier} />}

      {(result.primaryArchetype || result.secondaryArchetype) && (
        <ArchetypeCard
          primary={result.primaryArchetype}
          secondary={result.secondaryArchetype}
        />
      )}

      <div className="monolith-plate p-5">
        <p className="mb-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          About this assessment
        </p>
        <p className="text-[0.875rem] leading-relaxed text-muted-foreground">
          This check-in combines the documented screening questions with a short
          spiritual-pattern layer. The care route uses the screening score plus
          crisis-override rules. It is not a diagnosis.
        </p>
        <div className="mt-4 grid gap-px bg-[rgba(58,58,56,0.2)] sm:grid-cols-3">
          <div className="bg-[#f7f7f5] px-4 py-4">
            <p className="eyebrow">Screening score</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
              {result.total} / 100
            </p>
          </div>
          <div className="bg-[#f7f7f5] px-4 py-4">
            <p className="eyebrow">Raw response total</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
              {result.rawTotal}
            </p>
          </div>
          <div className="bg-[#f7f7f5] px-4 py-4">
            <p className="eyebrow">Route status</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
              {result.crisisOverride ? "Crisis escalation override" : routeCopy.status}
            </p>
          </div>
        </div>
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

function TierBadge({
  tier,
  crisisOverride,
}: {
  tier: RiskTier;
  crisisOverride: boolean;
}) {
  if (crisisOverride) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-600/12 px-3 py-1 font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        Crisis support route
      </span>
    );
  }

  const styles: Record<RiskTier, string> = {
    wellness: "border-emerald-600/30 bg-emerald-600/12 text-emerald-700",
    prayer: "border-sky-600/30 bg-sky-600/12 text-sky-700",
    pastoral: "border-amber-500/30 bg-amber-500/12 text-amber-700",
    specialist: "border-orange-500/30 bg-orange-500/12 text-orange-700",
    clinical: "border-red-500/30 bg-red-600/12 text-red-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[0.7rem] font-semibold uppercase tracking-wide ${styles[tier]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {SNAPSHOT_TIER_COPY[tier].label}
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
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  overline: string;
  title: string;
  body: string;
  children: ReactNode;
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
        <div className="min-w-0 flex-1">
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
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  color?: string;
  filled?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-[0.875rem] font-medium transition ${
        filled
          ? "border-[#18386e] bg-[#18386e] text-white hover:opacity-90"
          : "border-white/20 bg-[#a0bff0] text-foreground hover:bg-[#b2cbf2]"
      }`}
    >
      <span className="shrink-0" style={!filled && color ? { color } : undefined}>
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </span>
      {label}
    </Link>
  );
}

function RouteResult({ tier }: { tier: RiskTier }) {
  switch (tier) {
    case "wellness":
      return (
        <ResultCard
          accent="#059669"
          Icon={BookOpenText}
          overline="Level 1 · Wellness Resources"
          title="Stay rooted in steady wellness rhythms"
          body="Your score falls in the low-concern band. This route emphasizes devotional support, self-guided prayer, and ongoing spiritual growth resources."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <ActionBtn href="/bible" icon={BookOpenText} label="Bible personality" color="#059669" />
            <ActionBtn href="/prayer" icon={HandHeart} label="Self-guided prayer" color="#059669" />
          </div>
        </ResultCard>
      );
    case "prayer":
      return (
        <ResultCard
          accent="#0284C7"
          Icon={HandHeart}
          overline="Level 2 · Prayer Support"
          title="Lean into prayer and community support"
          body="Your score points to mild emotional strain. The most appropriate next step is faith-based encouragement, prayer support, and community reinforcement."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <ActionBtn href="/prayer" icon={HandHeart} label="Open prayer support" color="#0284C7" />
            <ActionBtn href="/chat" icon={MessageSquareText} label="Daily encouragement" color="#0284C7" />
          </div>
        </ResultCard>
      );
    case "pastoral":
      return (
        <ResultCard
          accent="#D97706"
          Icon={CalendarClock}
          overline="Level 3 · Pastoral Care"
          title="A trusted pastor is the right next step"
          body="Your responses indicate moderate emotional distress. This route prioritizes a pastor video call, church counseling support, and prayer-team follow-up."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <ActionBtn href="/pastor" icon={CalendarClock} label="Schedule pastor care" color="#D97706" />
            <ActionBtn href="/prayer" icon={HandHeart} label="Prayer team follow-up" color="#D97706" />
          </div>
        </ResultCard>
      );
    case "specialist":
      return (
        <ResultCard
          accent="#EA580C"
          Icon={ShieldCheck}
          overline="Level 4 · Christian Mental Health Specialist"
          title="A faith-aligned licensed specialist is recommended"
          body="Your score reflects elevated emotional distress. This route points toward a Christian psychologist or counselor, while keeping pastoral support active around the referral."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <ActionBtn href="/pastor" icon={CalendarClock} label="Start pastoral handoff" color="#EA580C" />
            <ActionBtn href="/chat" icon={MessageSquareText} label="Talk it through now" color="#EA580C" />
          </div>
          <p className="mt-3 text-[0.78rem] italic text-muted-foreground/70">
            In the live build, a vetted Christian provider list would appear here.
          </p>
        </ResultCard>
      );
    case "clinical":
      return (
        <ResultCard
          accent="#DC2626"
          Icon={ShieldCheck}
          overline="Level 5 · Clinical Mental Health Evaluation"
          title="Professional clinical support is strongly recommended"
          body="Your score falls in the highest non-crisis route. This path is designed to move you toward a clinical mental health evaluation, licensed provider referral, and an ongoing support plan."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <ActionBtn href="/pastor" icon={CalendarClock} label="Request support planning" color="#DC2626" />
            <ActionBtn href="/chat" icon={MessageSquareText} label="Stay connected now" color="#DC2626" />
          </div>
          <p className="mt-3 text-[0.78rem] italic text-muted-foreground/70">
            This route is not the same as crisis escalation, but it does call for prompt clinical follow-through.
          </p>
        </ResultCard>
      );
  }
}

function CrisisResult() {
  return (
    <ResultCard
      accent="#DC2626"
      Icon={ShieldCheck}
      overline="Crisis escalation override"
      title="Please reach out for immediate support"
      body="A critical risk response was detected. The next step is immediate support through 988, emergency resources, and a pastor contact option."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href="tel:988"
          className="inline-flex items-center gap-2 rounded-xl border border-red-600 bg-red-600 px-4 py-3 text-[0.875rem] font-semibold text-white transition hover:opacity-90"
        >
          <Phone className="h-4 w-4" /> Call 988 now
        </a>
        <ActionBtn href="/pastor" icon={CalendarClock} label="Talk to your pastor" color="#DC2626" />
      </div>
      <p className="mt-3 text-[0.78rem] italic text-muted-foreground/70">
        If you are in immediate danger, call emergency services now.
      </p>
    </ResultCard>
  );
}

function ArchetypeCard({
  primary,
  secondary,
}: {
  primary: SnapshotArchetype | null;
  secondary: SnapshotArchetype | null;
}) {
  if (!primary) return null;

  return (
    <div className="monolith-plate p-5 sm:p-6">
      <p className="eyebrow mb-2">Spiritual pattern layer</p>
      <h2 className="font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0d1f3c] sm:text-[1.35rem]">
        Your responses most resemble {primary}
        {secondary ? `, with ${secondary} close behind.` : "."}
      </h2>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
        {SNAPSHOT_ARCHETYPE_NOTES[primary]}
      </p>
      {secondary && (
        <p className="mt-2 text-[0.82rem] leading-6 text-muted-foreground/80">
          Secondary pattern: {secondary}. {SNAPSHOT_ARCHETYPE_NOTES[secondary]}
        </p>
      )}
    </div>
  );
}
