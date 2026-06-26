"use client";

import Link from "next/link";
import {
  HeartPulse,
  CalendarClock,
  MessageSquareText,
  HandHeart,
  BookOpenText,
  ArrowRight,
} from "lucide-react";
import { CrisisBanner } from "@/components/shared/crisis-banner";
import { useAppStore } from "@/lib/store/app-store";

const FEATURES = [
  {
    href: "/snapshot",
    overline: "3 minutes",
    title: "Mental Health Snapshot",
    body: "A faith-aware check-in that routes you to the right care.",
    icon: HeartPulse,
    color: "#3D5A87",
    bg: "rgba(61,90,135,0.15)",
    featured: true,
  },
  {
    href: "/pastor",
    overline: "Pastoral care",
    title: "Talk with a Pastor",
    body: "Confidential video sessions in-app.",
    icon: CalendarClock,
    color: "#059669",
    bg: "rgba(5,150,105,0.12)",
  },
  {
    href: "/chat",
    overline: "24 / 7",
    title: "AI Companion",
    body: "A faith-aware listener — escalates when needed.",
    icon: MessageSquareText,
    color: "#D97706",
    bg: "rgba(217,119,6,0.12)",
  },
  {
    href: "/prayer",
    overline: "Live now",
    title: "Prayer & Belonging",
    body: "Live prayer rooms and anonymized requests.",
    icon: HandHeart,
    color: "#DC2626",
    bg: "rgba(220,38,38,0.10)",
  },
  {
    href: "/bible",
    overline: "Reflection",
    title: "Bible Personality",
    body: "Discover the biblical figure whose story resonates with yours.",
    icon: BookOpenText,
    color: "#0E7490",
    bg: "rgba(14,116,144,0.10)",
  },
] as const;

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const snapshot = useAppStore((s) => s.snapshot.result);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [headline, ...others] = FEATURES;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <header className="topo-bg relative space-y-1 pt-2">
        <p className="eyebrow relative">{today}</p>
        <h1 className="heading-engraved relative font-display text-[2rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.5rem]">
          Peace be with you,{" "}
          <span className="italic font-medium">
            {user?.fullName ? user.fullName.split(" ")[0] : "friend"}.
          </span>
        </h1>
        <p className="relative max-w-prose text-[0.9rem] text-muted-foreground">
          {snapshot
            ? "You took your Snapshot recently. Whatever this day holds, care is here."
            : "However you arrive today, a small reflection is a good place to begin."}
        </p>
      </header>

      {/* Verse card */}
      <div className="monolith-plate thud-in thud-in-1 overflow-hidden px-5 py-5">
        <p className="eyebrow mb-2">A verse for today</p>
        <p className="pull-quote text-[1.15rem] text-foreground sm:text-[1.3rem]">
          &ldquo;He heals the brokenhearted, and binds up their wounds.&rdquo;
        </p>
        <p className="mt-2 font-sans text-[0.7rem] font-medium uppercase tracking-widest text-muted-foreground/70">
          Psalm 147 · 3
        </p>
      </div>

      <hr className="fault-line my-2" aria-hidden />

      {/* Crisis banner */}
      <CrisisBanner dismissible />

      {/* Featured feature */}
      <Link
        href={headline.href}
        className="group block focus:outline-none"
        aria-label={headline.title}
      >
        <div className="monolith-plate monolith-plate-hover thud-in thud-in-2 overflow-hidden p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center text-lg transition group-hover:scale-105"
              style={{
                background: headline.bg,
                color: headline.color,
                clipPath: "polygon(0 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% 100%, 0 100%)",
              }}
            >
              <headline.icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="eyebrow mb-1" style={{ color: headline.color }}>
                {headline.overline}
              </p>
              <h2 className="font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.018em] text-[#0d1f3c] sm:text-[1.5rem]">
                {headline.title}
              </h2>
              <p className="mt-1.5 text-[0.875rem] text-muted-foreground">
                {headline.body}
              </p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#0d1f3c]/30 transition group-hover:translate-x-1 group-hover:text-[#0d1f3c]" />
          </div>
        </div>
      </Link>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3">
        {others.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.href}
              href={f.href}
              className="group block focus:outline-none"
              aria-label={f.title}
            >
              <div className="monolith-plate monolith-plate-hover h-full p-4">
                <span
                  className="mb-3 grid h-9 w-9 place-items-center transition group-hover:scale-105"
                  style={{ background: f.bg, color: f.color }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-wide mb-0.5" style={{ color: f.color }}>
                  {f.overline}
                </p>
                <h3 className="font-display text-[1rem] font-semibold leading-tight tracking-[-0.014em] text-[#0d1f3c]">
                  {f.title}
                </h3>
                <p className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">
                  {f.body}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-center font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground/40">
        Cornerstone Fellowship · Member edition
      </p>
    </div>
  );
}
