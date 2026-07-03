import { BIBLE_QUESTIONS } from "@/lib/mock/bible-questions";
import { FIGURE_NAMES } from "@/lib/mock/bible-figures";
import type { BibleAnswer, FigureName } from "@/lib/types";

export function scoreBible(answers: BibleAnswer[]): FigureName {
  const totals = Object.fromEntries(
    FIGURE_NAMES.map((name) => [name, 0]),
  ) as Record<FigureName, number>;

  for (const ans of answers) {
    const q = BIBLE_QUESTIONS.find((qq) => qq.id === ans.questionId);
    const opt = q?.options[ans.optionIndex];
    if (!opt) continue;
    for (const [name, w] of Object.entries(opt.weights) as [FigureName, number][]) {
      totals[name] += w;
    }
  }

  let winner: FigureName = "David";
  let max = -1;
  for (const name of FIGURE_NAMES) {
    if (totals[name] > max) {
      max = totals[name];
      winner = name;
    }
  }

  const tied = FIGURE_NAMES.filter((n) => totals[n] === max);
  if (tied.length > 1) {
    const q1Answer = answers.find((a) => a.questionId === "b1");
    if (q1Answer) {
      const q1 = BIBLE_QUESTIONS.find((q) => q.id === "b1");
      const opt = q1?.options[q1Answer.optionIndex];
      if (opt) {
        let bestQ1 = -1;
        for (const n of tied) {
          const w = opt.weights[n] ?? 0;
          if (w > bestQ1) {
            bestQ1 = w;
            winner = n;
          }
        }
      }
    }
  }

  return winner;
}
