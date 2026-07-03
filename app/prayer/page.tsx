"use client";

import Link from "next/link";
import { ChevronLeft, BellRing, Plus } from "lucide-react";
import { toast } from "sonner";
import { PRAYER_FEED } from "@/lib/mock/prayer-feed";

export default function PrayerPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      <header className="topo-bg relative space-y-2">
        <p className="eyebrow relative">Community · Live</p>
        <h1 className="heading-engraved relative font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.25rem]">
          You <span className="italic font-medium">belong</span> here.
        </h1>
        <p className="relative max-w-prose text-[0.9rem] text-muted-foreground">
          Live prayer alerts, group rooms, and praise reports from your church.
        </p>
      </header>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            toast.success("Notifications enabled", {
              description: "We'll alert you when new prayer calls go live.",
            })
          }
          className="btn-ghost inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-[0.875rem] font-medium transition"
        >
          <BellRing className="h-4 w-4 text-amber-600" />
          Alert me to live prayers
        </button>
        <button
          type="button"
          onClick={() =>
            toast("Prayer request submitted", {
              description: "Your pastor will moderate before sharing.",
            })
          }
          className="btn-ghost inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[0.875rem] font-medium transition"
        >
          <Plus className="h-4 w-4 text-emerald-600" />
          Request
        </button>
      </div>

      <hr className="fault-line my-2" aria-hidden />

      {/* Prayer feed */}
      <section className="space-y-3">
        {PRAYER_FEED.map((p) => (
          <article key={p.id} className="monolith-plate monolith-plate-hover p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-display text-[1rem] font-semibold leading-snug text-[#0d1f3c]">
                    {p.title}
                  </h3>
                  {p.isLive && (
                    <span className="inline-flex items-center gap-1.5 bg-red-600 px-2.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      Live
                    </span>
                  )}
                </div>
                <p className="text-[0.875rem] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <p className="mt-2 font-sans text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground/55">
                  {p.churchName} · {p.timestamp}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.success(p.isLive ? "Joined" : "Praying with you", {
                    description: p.isLive
                      ? "You're in the prayer room."
                      : "We'll lift this up alongside you.",
                  })
                }
                className={`shrink-0 self-start font-sans text-[0.72rem] font-semibold transition ${
                  p.isLive
                    ? "bg-red-600 px-3.5 py-1.5 text-white hover:opacity-90"
                    : "btn-ghost px-3.5 py-1.5"
                }`}
              >
                {p.isLive ? "Join" : "Pray"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
