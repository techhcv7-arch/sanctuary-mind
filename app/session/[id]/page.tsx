"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Phone,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { findPastor } from "@/lib/mock/pastors";
import { useAppStore } from "@/lib/store/app-store";
import { fullDateLabel, formatSlot } from "@/lib/utils/dates";
import { toast } from "sonner";

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const cancelBooking = useAppStore((s) => s.cancelBooking);
  const booking = useAppStore((s) => s.bookings.find((b) => b.id === params.id));

  const pastor = useMemo(
    () => (booking ? findPastor(booking.pastorId) : undefined),
    [booking],
  );

  const [muted, setMuted] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (hydrated && (!booking || !pastor)) router.replace("/pastor");
  }, [hydrated, booking, pastor, router]);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!booking || !pastor) return null;

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const end = () => {
    cancelBooking(booking.id);
    toast("Session ended", { description: `${mm}:${ss} elapsed.` });
    router.push("/dashboard");
  };

  return (
    <div
      className="-mx-4 -my-6 flex min-h-[calc(100vh-3.5rem)] flex-col"
      style={{ background: "linear-gradient(160deg, #a0bff0 0%, #b2cbf2 50%, #c2d6f6 100%)" }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-5">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="rounded-xl p-2 text-[#1E293B]/60 transition hover:bg-[#3D5A87]/15 hover:text-[#1E293B]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 rounded-full border border-[#3D5A87]/25 bg-white/40 px-3 py-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-[#1E293B]/70">
            Encrypted
          </span>
        </div>

        <span className="font-sans text-sm font-semibold tabular text-[#1E293B]/70">
          {mm}:{ss}
        </span>
      </header>

      {/* Video area */}
      <div className="flex flex-1 items-center justify-center px-5 py-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-[#3D5A87]/20 sm:max-w-2xl" style={{ aspectRatio: "9/16" }}>
          {/* Background — kept dark to simulate a video feed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 30%, #1E4D7A 0%, #0D2240 60%, #060F1E 100%)",
            }}
          />

          {/* Pastor info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <span
              className="grid h-20 w-20 place-items-center rounded-full font-sans text-[0.95rem] font-semibold ring-2 ring-[#D4A640]/40"
              style={{
                background: "rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {pastor.initials}
            </span>
            <p className="mt-4 font-display text-[1.5rem] font-semibold leading-tight sm:text-[1.75rem]">
              {pastor.name}
            </p>
            <p className="text-[0.85rem] italic text-white/60">{pastor.title}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">
                Live · {fullDateLabel(booking.dayOffset)} · {formatSlot(booking.slot)}
              </span>
            </div>
          </div>

          {/* Self-view */}
          <div className="absolute bottom-3 right-3 flex h-24 w-20 flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-black/50 text-white/50 sm:h-28 sm:w-36">
            {camOn ? (
              <>
                <Camera className="h-4 w-4" />
                <span className="font-sans text-[0.55rem] uppercase tracking-widest">You</span>
              </>
            ) : (
              <>
                <CameraOff className="h-4 w-4" />
                <span className="font-sans text-[0.55rem] uppercase tracking-widest">Off</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <footer className="flex items-center justify-center gap-3 px-5 pb-10 pt-2">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
          className={`grid h-12 w-12 place-items-center rounded-full transition ${
            muted
              ? "bg-[#DC2626] text-white"
              : "bg-[#3D5A87]/20 text-[#1E293B] hover:bg-[#3D5A87]/35"
          }`}
        >
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={() => setCamOn((c) => !c)}
          aria-label={camOn ? "Stop camera" : "Start camera"}
          className={`grid h-12 w-12 place-items-center rounded-full transition ${
            !camOn
              ? "bg-[#DC2626] text-white"
              : "bg-[#3D5A87]/20 text-[#1E293B] hover:bg-[#3D5A87]/35"
          }`}
        >
          {camOn ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={end}
          aria-label="End session"
          className="grid h-12 w-16 place-items-center rounded-full bg-[#DC2626] text-white hover:opacity-90 transition"
        >
          <Phone className="h-5 w-5 rotate-[135deg]" />
        </button>
      </footer>
    </div>
  );
}
