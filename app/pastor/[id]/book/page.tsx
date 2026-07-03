"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ShieldCheck, Video } from "lucide-react";
import { findPastor } from "@/lib/mock/pastors";
import {
  dayLabelFromOffset,
  formatSlot,
  fullDateLabel,
  isoDateFromOffset,
} from "@/lib/utils/dates";
import { useAppStore } from "@/lib/store/app-store";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { createPastorBooking } from "@/lib/supabase/member-data";

const ACCENT_COLORS: Record<string, { bg: string; text: string }> = {
  navy:  { bg: "rgba(61,90,135,0.15)",   text: "#3D5A87" },
  gold:  { bg: "rgba(180,130,0,0.12)",   text: "#8B6914" },
  sage:  { bg: "rgba(5,150,105,0.12)",   text: "#059669" },
  clay:  { bg: "rgba(220,38,38,0.12)",   text: "#DC2626" },
};

export default function BookPastorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const addBooking = useAppStore((s) => s.addBooking);
  const user = useAppStore((s) => s.user);

  const pastor = useMemo(() => findPastor(params.id), [params.id]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (!pastor) router.replace("/pastor");
  }, [pastor, router]);

  if (!pastor) return null;

  const colors = ACCENT_COLORS[pastor.accent] ?? ACCENT_COLORS.navy;
  const dayBlock = pastor.availability.find((a) => a.dayOffset === selectedDay);

  const confirm = async () => {
    if (!selectedSlot) return;
    const booking = {
      id: crypto.randomUUID(),
      pastorId: pastor.id,
      scheduledFor: isoDateFromOffset(selectedDay),
      slot: selectedSlot,
      confirmedAt: new Date().toISOString(),
      status: "scheduled" as const,
      completedAt: null,
      cancelledAt: null,
    };
    addBooking(booking);
    if (user) {
      const supabase = createClient();
      try {
        await createPastorBooking(supabase, user.id, booking);
      } catch {
        toast.error("Booking saved locally only", {
          description: "We could not write this session to Supabase right now.",
        });
      }
    }
    toast.success("Session booked", {
      description: `${pastor.name} · ${fullDateLabel(selectedDay)} at ${formatSlot(selectedSlot)}`,
    });
    router.push(`/pastor/${pastor.id}/book/confirmed?bk=${booking.id}`);
  };

  return (
    <div className="space-y-6">
      <Link
        href="/pastor"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Pastors
      </Link>

      {/* Pastor card */}
      <div className="monolith-plate overflow-hidden">
        <div className="bg-[#92b6f0] border-b border-white/10 px-5 py-6 sm:px-7">
          <div className="flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-sans text-[0.85rem] font-semibold"
              style={{ background: colors.bg, color: colors.text }}
            >
              {pastor.initials}
            </span>
            <div className="flex-1 min-w-0">
              <p className="eyebrow mb-1">Booking</p>
              <h1 className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.022em] text-[#0d1f3c] sm:text-[1.75rem]">
                {pastor.name}
              </h1>
              <p className="text-sm italic text-muted-foreground">{pastor.title}</p>
            </div>
          </div>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
            {pastor.bio}
          </p>
        </div>
      </div>

      {/* Day picker */}
      <section className="space-y-3">
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Pick a day
        </p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {pastor.availability.map((a) => {
            const { day, date } = dayLabelFromOffset(a.dayOffset);
            const active = selectedDay === a.dayOffset;
            const empty = a.slots.length === 0;
            return (
              <button
                key={a.dayOffset}
                type="button"
                onClick={() => { setSelectedDay(a.dayOffset); setSelectedSlot(null); }}
                disabled={empty}
                className={`flex w-[68px] shrink-0 flex-col items-center rounded-xl border px-2 py-3 text-center transition ${
                  empty
                    ? "border-[#92b6f0]/15 bg-white/20 text-muted-foreground/35 cursor-not-allowed"
                    : active
                      ? "border-[#3D5A87] bg-[#3D5A87] text-white shadow-md"
                      : "border-[#92b6f0]/35 bg-white/40 text-[#0d1f3c] hover:border-[#3D5A87]/50 hover:bg-white/65"
                }`}
              >
                <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-wide opacity-80">
                  {day}
                </span>
                <span className="mt-1 font-display text-[1rem] font-semibold">
                  {date}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Time slots */}
      <section className="space-y-3">
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Available times
        </p>
        {dayBlock && dayBlock.slots.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {dayBlock.slots.map((slot) => {
              const active = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-xl border px-4 py-3 font-sans text-[0.9rem] font-medium transition ${
                    active
                      ? "border-[#3D5A87] bg-[#3D5A87] text-white shadow-sm"
                      : "border-[#92b6f0]/35 bg-white/40 text-foreground hover:border-[#3D5A87]/50 hover:bg-white/65"
                  }`}
                >
                  {formatSlot(slot)}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No times available on this day. Try another day.
          </p>
        )}
      </section>

      {/* Privacy note */}
      <div className="flex items-center justify-between monolith-plate rounded-xl px-4 py-3 text-[0.82rem] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Encrypted, not recorded
        </span>
        <span className="inline-flex items-center gap-2 italic">
          <Video className="h-3.5 w-3.5" />
          In-app video
        </span>
      </div>

      <button
        type="button"
        onClick={confirm}
        disabled={!selectedSlot}
        className="btn-primary w-full py-3.5 text-[0.95rem] rounded-full disabled:pointer-events-none disabled:opacity-40"
      >
        {selectedSlot
          ? `Confirm · ${fullDateLabel(selectedDay)} · ${formatSlot(selectedSlot)}`
          : "Select a time to continue"}
      </button>
    </div>
  );
}
