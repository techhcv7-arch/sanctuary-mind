import type { RiskTier } from "@/lib/types";

export const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "kill my self",
  "end it all",
  "end my life",
  "no reason to live",
  "hurt myself",
  "harm myself",
  "don't want to be here",
  "dont want to be here",
] as const;

export function detectCrisisKeyword(text: string | undefined | null): boolean {
  if (!text) return false;
  const haystack = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => haystack.includes(k));
}

/**
 * Score the 10-question Snapshot.
 *
 *   total ∈ [0, 30]
 *   tier:  0–10 → low | 11–20 → moderate | 21–30 → high
 *
 * If `freeText` contains any crisis keyword OR the most-severe answer
 * (Q10 — direct ideation question) is >= 2, the tier is forced to 'high'
 * regardless of total points. This is the platform's safety floor.
 */
export function scoreSnapshot(
  answers: number[],
  freeText?: string,
): { total: number; tier: RiskTier } {
  const total = answers.reduce((sum, a) => sum + (Number.isFinite(a) ? a : 0), 0);
  const ideationFlag = (answers[9] ?? 0) >= 2;
  const textFlag = detectCrisisKeyword(freeText);

  if (ideationFlag || textFlag || total >= 21) {
    return { total, tier: "high" };
  }
  if (total >= 11) return { total, tier: "moderate" };
  return { total, tier: "low" };
}
