"use client";

import Link from "next/link";
import { ChevronLeft, Video, ShieldCheck } from "lucide-react";
import { PASTORS } from "@/lib/mock/pastors";
import { useAppStore } from "@/lib/store/app-store";
import { formatSlot, fullDateLabelFromISO } from "@/lib/utils/dates";

const ACCENT_COLORS: Record<string, { bg: string; text: string }> = {
  navy:  { bg: "rgba(61,90,135,0.15)",   text: "#3D5A87" },
  gold:  { bg: "rgba(180,130,0,0.12)",   text: "#8B6914" },
  sage:  { bg: "rgba(5,150,105,0.12)",   text: "#059669" },
  clay:  { bg: "rgba(220,38,38,0.12)",   text: "#DC2626" },
};

export default function PastorListPage() {
  const bookings = useAppStore((s) => s.bookings);
  const upcomingBookings = bookings.filter((b) => b.status === "scheduled");
  const pastBookings = bookings.filter((b) => b.status !== "scheduled");

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      <header className="topo-bg relative space-y-2">
        <p className="eyebrow relative">Pastoral Care</p>
        <h1 className="heading-engraved relative font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d1f3c] sm:text-[2.25rem]">
          Talk with a <span className="italic font-medium">pastor.</span>
        </h1>
        <p className="relative max-w-prose text-[0.9rem] text-muted-foreground">
          Confidential video sessions in seconds. No links to chase — every
          conversation happens in-app.
        </p>
      </header>

      {/* Privacy notice */}
      <div className="monolith-surface flex items-center gap-2.5 px-4 py-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
        Sessions are end-to-end encrypted and not recorded by default.
      </div>

      {/* Upcoming bookings */}
      {upcomingBookings.length > 0 && (
        <section className="space-y-3">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            Upcoming
          </p>
          {upcomingBookings.map((b) => {
            const pastor = PASTORS.find((p) => p.id === b.pastorId);
            if (!pastor) return null;
            const colors = ACCENT_COLORS[pastor.accent] ?? ACCENT_COLORS.navy;
            return (
              <div key={b.id} className="monolith-plate flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center font-sans text-[0.7rem] font-semibold"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      clipPath: "polygon(0 0, calc(100% - 0.4rem) 0, 100% 0.4rem, 100% 100%, 0 100%)",
                    }}
                  >
                    {pastor.initials}
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[#0d1f3c]">
                      {pastor.name}
                    </p>
                    <p className="text-[0.75rem] text-muted-foreground">
                      {fullDateLabelFromISO(b.scheduledFor)} · {formatSlot(b.slot)}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/session/${b.id}`}
                  className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-[0.8rem] font-semibold"
                >
                  <Video className="h-3.5 w-3.5" /> Join
                </Link>
              </div>
            );
          })}
        </section>
      )}

      {pastBookings.length > 0 && (
        <section className="space-y-3">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            Previous sessions
          </p>
          {pastBookings.map((b) => {
            const pastor = PASTORS.find((p) => p.id === b.pastorId);
            if (!pastor) return null;
            const colors = ACCENT_COLORS[pastor.accent] ?? ACCENT_COLORS.navy;
            return (
              <div key={b.id} className="monolith-plate flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center font-sans text-[0.7rem] font-semibold"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      clipPath: "polygon(0 0, calc(100% - 0.4rem) 0, 100% 0.4rem, 100% 100%, 0 100%)",
                    }}
                  >
                    {pastor.initials}
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[#0d1f3c]">
                      {pastor.name}
                    </p>
                    <p className="text-[0.75rem] text-muted-foreground">
                      {b.status === "completed" ? "Completed" : "Cancelled"} · {fullDateLabelFromISO(b.scheduledFor)} · {formatSlot(b.slot)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {bookings.length > 0 && <hr className="fault-line my-2" aria-hidden />}

      {/* Pastor list */}
      <section className="space-y-3">
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Choose a pastor
        </p>
        <div className="space-y-3">
          {PASTORS.map((p) => {
            const colors = ACCENT_COLORS[p.accent] ?? ACCENT_COLORS.navy;
            return (
              <Link
                key={p.id}
                href={`/pastor/${p.id}/book`}
                className="group block focus:outline-none"
              >
                <div className="monolith-plate monolith-plate-hover flex items-start gap-4 p-4 sm:p-5">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center font-sans text-[0.8rem] font-semibold"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      clipPath: "polygon(0 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% 100%, 0 100%)",
                    }}
                  >
                    {p.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-[1.05rem] font-semibold leading-tight text-[#0d1f3c]">
                          {p.name}
                        </p>
                        <p className="text-[0.8rem] italic text-muted-foreground">
                          {p.title}
                        </p>
                      </div>
                      <span className="mt-0.5 border border-[#D4AF37]/40 bg-white/20 px-2.5 py-0.5 font-sans text-[0.65rem] font-medium text-muted-foreground transition group-hover:border-[#D4AF37]/70 group-hover:text-[#0d1f3c]">
                        Book →
                      </span>
                    </div>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                      {p.bio}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
