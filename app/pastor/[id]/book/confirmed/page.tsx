"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, CalendarPlus, Check, Video } from "lucide-react";
import { findPastor } from "@/lib/mock/pastors";
import { useAppStore } from "@/lib/store/app-store";
import { formatSlot, fullDateLabel } from "@/lib/utils/dates";

const ACCENT_COLORS: Record<string, { bg: string; text: string }> = {
  navy:  { bg: "rgba(61,90,135,0.15)",   text: "#3D5A87" },
  gold:  { bg: "rgba(180,130,0,0.12)",   text: "#8B6914" },
  sage:  { bg: "rgba(5,150,105,0.12)",   text: "#059669" },
  clay:  { bg: "rgba(220,38,38,0.12)",   text: "#DC2626" },
};

export default function ConfirmedPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const bookingId = search.get("bk");

  const pastor = useMemo(() => findPastor(params.id), [params.id]);
  const booking = useAppStore((s) => s.bookings.find((b) => b.id === bookingId));
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && (!pastor || !booking)) router.replace("/pastor");
  }, [hydrated, pastor, booking, router]);

  if (!pastor || !booking) return null;

  const colors = ACCENT_COLORS[pastor.accent] ?? ACCENT_COLORS.navy;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Today
      </Link>

      {/* Success state */}
      <div className="flex flex-col items-center py-4 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-600/12 text-emerald-700 ring-1 ring-emerald-600/30">
          <Check className="h-7 w-7" strokeWidth={2} />
        </span>
        <p className="mt-5 eyebrow">Confirmed</p>
        <h1 className="mt-1.5 font-display text-[1.875rem] font-semibold leading-tight tracking-[-0.025em] text-[#1E293B] sm:text-[2.25rem]">
          You&rsquo;re <span className="italic font-medium">booked.</span>
        </h1>
        <p className="mt-2 max-w-xs text-[0.875rem] text-muted-foreground">
          A confirmation email is on the way{" "}
          <span className="italic">(in the live build, anyway)</span>.
        </p>
      </div>

      {/* Booking summary */}
      <div className="glass-card overflow-hidden">
        <div className="bg-[#c2d6f6] border-b border-[#92b6f0]/30 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-full font-sans text-[0.7rem] font-semibold"
              style={{ background: colors.bg, color: colors.text }}
            >
              {pastor.initials}
            </span>
            <div>
              <p className="font-display text-[1rem] font-semibold text-[#1E293B]">{pastor.name}</p>
              <p className="text-[0.75rem] italic text-muted-foreground">{pastor.title}</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-[#92b6f0]/20 px-5">
          <div className="flex items-center justify-between py-3.5">
            <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              When
            </span>
            <span className="font-display font-semibold text-[#1E293B]">
              {fullDateLabel(booking.dayOffset)} · {formatSlot(booking.slot)}
            </span>
          </div>
          <div className="flex items-center justify-between py-3.5">
            <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Where
            </span>
            <span className="text-[0.875rem] italic text-muted-foreground">
              In-app encrypted video
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition"
        >
          <CalendarPlus className="h-4 w-4" /> Add to calendar
        </button>
        <Link
          href={`/session/${booking.id}`}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
        >
          <Video className="h-4 w-4" /> Join session
        </Link>
      </div>
    </div>
  );
}
