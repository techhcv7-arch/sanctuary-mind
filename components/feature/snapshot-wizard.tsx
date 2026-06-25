"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SNAPSHOT_QUESTIONS } from "@/lib/mock/snapshot-questions";
import { scoreSnapshot } from "@/lib/scoring/snapshot";
import { useAppStore } from "@/lib/store/app-store";

export function SnapshotWizard() {
  const router = useRouter();
  const setAnswer = useAppStore((s) => s.setSnapshotAnswer);
  const setFreeText = useAppStore((s) => s.setSnapshotFreeText);
  const setResult = useAppStore((s) => s.setSnapshotResult);
  const storedAnswers = useAppStore((s) => s.snapshot.answers);
  const storedText = useAppStore((s) => s.snapshot.freeText);

  const [step, setStep] = useState(0);
  const [draftText, setDraftText] = useState(storedText);

  const total = SNAPSHOT_QUESTIONS.length;
  const isFinalStep = step === total;
  const question = SNAPSHOT_QUESTIONS[step];
  const currentAnswer = storedAnswers[step];

  const goNext = () => { if (step < total) setStep((s) => s + 1); };
  const goBack = () => { if (step > 0) setStep((s) => s - 1); };

  const finish = () => {
    setFreeText(draftText);
    const { total: t, tier } = scoreSnapshot(storedAnswers, draftText);
    setResult({ total: t, tier, takenAt: new Date().toISOString() });
    router.push("/snapshot/result");
  };

  const pct = Math.round(((step) / (total)) * 100);

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {isFinalStep ? "Final step" : `Question ${step + 1} of ${total}`}
          </span>
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {pct}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#92b6f0]/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#3D5A87] transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="glass-card px-5 py-6 sm:px-7 sm:py-8">
        {!isFinalStep ? (
          <div>
            <p className="eyebrow mb-3">Snapshot</p>
            <h2 className="font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.018em] text-[#1E293B] sm:text-[1.5rem]">
              {question.text}
            </h2>

            <fieldset className="mt-5 space-y-2">
              <legend className="sr-only">Answer options</legend>
              {question.options.map((opt, idx) => {
                const selected = currentAnswer === opt.points;
                return (
                  <label
                    key={idx}
                    className={`flex cursor-pointer items-center gap-3.5 rounded-xl border px-4 py-3.5 transition ${
                      selected
                        ? "border-[#3D5A87] bg-[#3D5A87]/10 shadow-[inset_0_0_0_1.5px_#3D5A87]"
                        : "border-[#92b6f0]/40 bg-white/40 hover:border-[#3D5A87]/40 hover:bg-white/65"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${question.id}`}
                      value={opt.points}
                      checked={selected}
                      onChange={() => setAnswer(step, opt.points)}
                      className="sr-only"
                    />
                    <span
                      className="grid shrink-0 place-items-center rounded-full border-[1.5px] transition"
                      style={{
                        height: "1.125rem",
                        width: "1.125rem",
                        borderColor: selected ? "#3D5A87" : "rgba(61,90,135,0.35)",
                        background: selected ? "#3D5A87" : "transparent",
                      }}
                    >
                      {selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-[0.925rem] text-foreground">
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </div>
        ) : (
          <div>
            <p className="eyebrow mb-3">Optional reflection</p>
            <h2 className="font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.018em] text-[#1E293B] sm:text-[1.5rem]">
              Anything else on your heart?
            </h2>
            <p className="mt-2 text-[0.85rem] text-muted-foreground">
              Optional — stays private. Your pastor only sees it if you choose
              to share.
            </p>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="A few words about how you're feeling…"
              rows={5}
              className="mt-4 w-full resize-none rounded-xl border border-[#92b6f0]/40 bg-white/50 p-4 text-[0.9rem] leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-[#3D5A87] focus:outline-none focus:ring-2 focus:ring-[#3D5A87]/15"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        {!isFinalStep ? (
          <button
            type="button"
            onClick={goNext}
            disabled={currentAnswer === undefined}
            className="btn-primary inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-40"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="btn-primary inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            See my care path <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
