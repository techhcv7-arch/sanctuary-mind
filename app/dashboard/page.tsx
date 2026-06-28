"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarClock,
  HandHeart,
  HeartPulse,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { CrisisBanner } from "@/components/shared/crisis-banner";
import { SNAPSHOT_TIER_COPY } from "@/lib/scoring/snapshot";
import { useAppStore } from "@/lib/store/app-store";

const FEATURES = [
  {
    href: "/snapshot",
    overline: "01 / TRIAGE",
    title: "Mental Health Snapshot",
    body: "Run a private three-minute check-in to route today toward the right kind of support.",
    icon: HeartPulse,
    accent: "#FF8C69",
    featured: true,
  },
  {
    href: "/pastor",
    overline: "02 / HUMAN CARE",
    title: "Talk with a Pastor",
    body: "Book structured pastoral sessions with clear times and practical follow-through.",
    icon: CalendarClock,
    accent: "#9EFFBF",
  },
  {
    href: "/chat",
    overline: "03 / COMPANION",
    title: "AI Companion",
    body: "Use the companion for guided reflection when you need support immediately.",
    icon: MessageSquareText,
    accent: "#F4D35E",
  },
  {
    href: "/prayer",
    overline: "04 / COMMUNITY",
    title: "Prayer & Belonging",
    body: "Join live rooms or leave requests that can be carried by the community.",
    icon: HandHeart,
    accent: "#7FA8EA",
  },
  {
    href: "/bible",
    overline: "05 / REFLECTION",
    title: "Bible Personality",
    body: "Take a structured scripture reflection mapped to biblical figures and themes.",
    icon: BookOpenText,
    accent: "#1F4D93",
  },
] as const;

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const snapshot = useAppStore((s) => s.snapshot.result);
  const bookings = useAppStore((s) => s.bookings);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "member";
  const tierLabel = snapshot
    ? snapshot.crisisOverride
      ? "Crisis support routing"
      : `${SNAPSHOT_TIER_COPY[snapshot.tier].label} routing`
    : "Initial care routing";

  const [primaryFeature, ...secondaryFeatures] = FEATURES;

  return (
    <div className="space-y-10">
      <section className="grid gap-px bg-[rgba(58,58,56,0.2)] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="bg-[#f7f7f5] px-6 py-8 sm:px-8">
          <span className="status-badge">member live</span>
          <p className="mt-8 border-l border-[rgba(58,58,56,0.2)] pl-4 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
            {today}
          </p>
          <h1 className="mt-8 max-w-4xl font-display text-[3.5rem] font-semibold text-[#18386e] sm:text-[4.8rem]">
            {firstName}, here is today&apos;s care map.
          </h1>
          <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-[#5d6f8d]">
            This dashboard is structured to reduce ambiguity. Start with the clearest next action, then move outward into prayer, pastoral care, or private reflection as needed.
          </p>

          <div className="mt-10 grid gap-px bg-[rgba(58,58,56,0.2)] sm:grid-cols-3">
            <div className="bg-[#f7f7f5] px-4 py-4">
              <p className="eyebrow">Snapshot state</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
                {snapshot ? "Completed" : "Suggested"}
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-6 text-[#5d6f8d]">
                {snapshot
                  ? `Logged ${new Date(snapshot.takenAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}`
                  : "No recent check-in"}
              </p>
            </div>
            <div className="bg-[#f7f7f5] px-4 py-4">
              <p className="eyebrow">Pastor sessions</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
                {bookings.length ? `${bookings.length} booked` : "Open schedule"}
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-6 text-[#5d6f8d]">
                Human support stays one step away
              </p>
            </div>
            <div className="bg-[#f7f7f5] px-4 py-4">
              <p className="eyebrow">Prayer network</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#18386e]">
                2 live rooms
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-6 text-[#5d6f8d]">
                Community support is active now
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/snapshot" className="btn-primary px-5 py-3">
              01. Start snapshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/chat" className="btn-ghost px-5 py-3">
              02. Open companion
            </Link>
          </div>
        </div>

        <aside className="bg-[#f7f7f5] px-6 py-8 sm:px-8">
          <div className="flex items-start justify-between gap-4 border-b border-[rgba(58,58,56,0.2)] pb-5">
            <div>
              <p className="eyebrow">Routing status</p>
              <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-[#18386e]">
                {tierLabel}
              </h2>
            </div>
            <span className="grid h-10 w-10 place-items-center border border-[rgba(58,58,56,0.2)] text-[#1f4d93]">
              <ShieldCheck className="h-5 w-5" />
            </span>
          </div>

          <div className="space-y-px bg-[rgba(58,58,56,0.2)]">
            {(snapshot
              ? [
                  "Use the snapshot result to pick one gentle next step instead of opening every tool at once.",
                  "If you need private support now, the companion is the fastest follow-up path.",
                  "If the need feels human or relational, move directly into pastor booking or prayer.",
                ]
              : [
                  "Begin with the snapshot if you need clarity about what kind of care fits today.",
                  "Use the companion when you want reflection without waiting for an appointment.",
                  "Move into prayer rooms when support needs to feel communal rather than private.",
                ]).map((item, index) => (
              <div key={item} className="bg-[#f7f7f5] px-4 py-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                  Step 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#18386e]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-[rgba(58,58,56,0.2)] px-4 py-4">
            <p className="eyebrow">Verse for today</p>
            <p className="mt-3 text-sm leading-7 text-[#18386e]">
              &ldquo;He heals the brokenhearted, and binds up their wounds.&rdquo;
            </p>
            <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
              Psalm 147 : 3
            </p>
          </div>
        </aside>
      </section>

      <CrisisBanner dismissible />

      <section>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Tool set</p>
            <h2 className="mt-2 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#18386e] sm:text-[3rem]">
              Technical pathways for different kinds of care.
            </h2>
          </div>
          <p className="max-w-lg font-mono text-[0.72rem] uppercase tracking-[0.12em] leading-6 text-[#5d6f8d]">
            Each module has a clear role. The dashboard should help people choose the right one, not browse aimlessly.
          </p>
        </div>

        <div className="grid gap-px bg-[rgba(58,58,56,0.2)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Link href={primaryFeature.href} className="group bg-[#f7f7f5] p-8 transition hover:bg-[#eef3f9]">
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p
                  className="border-l pl-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]"
                  style={{ borderColor: primaryFeature.accent }}
                >
                  {primaryFeature.overline}
                </p>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-[#18386e] sm:text-[2.4rem]">
                      {primaryFeature.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d6f8d]">
                      {primaryFeature.body}
                    </p>
                  </div>
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center border border-[rgba(58,58,56,0.2)]"
                    style={{ color: primaryFeature.accent }}
                  >
                    <primaryFeature.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                </div>
              </div>

              <div className="code-mock">
                <div>route.intent = "initial-care"</div>
                <div>triage.window = "3m"</div>
                <div>handoff.available = true</div>
              </div>
            </div>
          </Link>

          <div className="grid gap-px bg-[rgba(58,58,56,0.2)] sm:grid-cols-2">
            {secondaryFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group bg-[#f7f7f5] p-6 transition hover:bg-[#eef3f9]"
                >
                  <p
                    className="border-l pl-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]"
                    style={{ borderColor: feature.accent }}
                  >
                    {feature.overline}
                  </p>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[1.2rem] font-semibold tracking-[-0.04em] text-[#18386e]">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#5d6f8d]">
                        {feature.body}
                      </p>
                    </div>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center border border-[rgba(58,58,56,0.2)]"
                      style={{ color: feature.accent }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
