"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BIBLE_QUESTIONS } from "@/lib/mock/bible-questions";
import { scoreBible } from "@/lib/scoring/bible";
import { useAppStore } from "@/lib/store/app-store";

export function BibleWizard() {
  const router = useRouter();
  const setAnswer = useAppStore((s) => s.setBibleAnswer);
  const setResult = useAppStore((s) => s.setBibleResult);
  const storedAnswers = useAppStore((s) => s.bible.answers);

  const [step, setStep] = useState(0);
  const total = BIBLE_QUESTIONS.length;
  const question = BIBLE_QUESTIONS[step];
  const currentAnswer = storedAnswers.find((a) => a.questionId === question.id);

  const goNext = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else finish();
  };
  const goBack = () => { if (step > 0) setStep((s) => s - 1); };

  const finish = () => {
    const figure = scoreBible(storedAnswers);
    setResult({ figure, takenAt: new Date().toISOString() });
    router.push("/bible/result");
  };

  const pct = Math.round(((step + 1) / total) * 100);

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            Question {step + 1} of {total}
          </span>
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {pct}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#92b6f0]/30 overflow-hidden">
          <div
            className="h-full bg-[#0d1f3c] transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="monolith-plate thud-in px-5 py-6 sm:px-7 sm:py-8">
        <p className="eyebrow mb-3">Reflection</p>
        <h2 className="font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.018em] text-[#0d1f3c] sm:text-[1.5rem]">
          {question.text}
        </h2>

        <fieldset className="mt-5 space-y-2">
          <legend className="sr-only">Answer options</legend>
          {question.options.map((opt, idx) => {
            const selected = currentAnswer?.optionIndex === idx;
            return (
              <label
                key={idx}
                className={`flex cursor-pointer items-start gap-3.5 border px-4 py-3.5 transition ${
                  selected
                    ? "border-[#0d1f3c] bg-[#0d1f3c]/10 shadow-[inset_0_0_0_1.5px_#0d1f3c]"
                    : "border-white/20 bg-[#a0bff0] hover:border-[#0d1f3c]/30 hover:bg-[#b2cbf2]"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={idx}
                  checked={selected ?? false}
                  onChange={() => setAnswer(question.id, idx)}
                  className="sr-only"
                />
                <span
                  className="mt-0.5 grid shrink-0 place-items-center border-[1.5px] transition"
                  style={{
                    height: "1.125rem",
                    width: "1.125rem",
                    borderColor: selected ? "#0d1f3c" : "rgba(13,31,60,0.35)",
                    background: selected ? "#0d1f3c" : "transparent",
                  }}
                >
                  {selected && <span className="h-1.5 w-1.5 bg-white" />}
                </span>
                <span className="text-[0.925rem] leading-relaxed text-foreground">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </fieldset>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="btn-ghost inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!currentAnswer}
          className="btn-primary inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-40"
        >
          {step === total - 1 ? "See my result" : "Continue"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
