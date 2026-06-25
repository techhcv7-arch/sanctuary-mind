import type { BibleFigure, FigureName } from "@/lib/types";

export const BIBLE_FIGURES: Record<FigureName, BibleFigure> = {
  David: {
    id: "David",
    monogram: "D",
    strengths: ["Honest in lament", "Courage", "Repentant heart"],
    scripture:
      "\"He heals the brokenhearted and binds up their wounds.\" — Psalm 147:3",
    scriptureRef: "Psalm 23 · Psalm 51",
    copingPractice:
      "Five minutes of lament journaling each morning — write what you cannot yet pray.",
    blurb:
      "You feel deeply and bring everything — joy, grief, anger — before God. The Psalms are your home.",
  },
  Esther: {
    id: "Esther",
    monogram: "E",
    strengths: ["Quiet courage", "Wise timing", "Care for community"],
    scripture:
      "\"For such a time as this.\" — Esther 4:14",
    scriptureRef: "Esther 4 · Proverbs 31",
    copingPractice:
      "Before saying yes, fast from a small comfort for one day to discern your voice.",
    blurb:
      "You see what others miss and act when it counts. Strength wears a quiet face on you.",
  },
  Paul: {
    id: "Paul",
    monogram: "P",
    strengths: ["Conviction", "Endurance", "Theology of grace"],
    scripture:
      "\"My grace is sufficient for you, for my power is made perfect in weakness.\" — 2 Corinthians 12:9",
    scriptureRef: "Philippians 4 · Romans 8",
    copingPractice:
      "When stuck, write a letter you'll never send. Name the thorn. Then re-read Romans 8.",
    blurb:
      "You are driven, principled, and tireless. Your work matters — and so does your rest.",
  },
  Moses: {
    id: "Moses",
    monogram: "M",
    strengths: ["Patience under pressure", "Faithfulness", "Listening"],
    scripture:
      "\"The Lord will fight for you; you need only to be still.\" — Exodus 14:14",
    scriptureRef: "Exodus 3 · Numbers 12",
    copingPractice:
      "Take a 'burning bush' walk — 15 quiet minutes outside, listening for one nudge.",
    blurb:
      "You carry others further than you realize. The journey is long, but you were not sent alone.",
  },
  Mary: {
    id: "Mary",
    monogram: "M",
    strengths: ["Trust", "Tenderness", "Sustained 'yes'"],
    scripture:
      "\"My soul magnifies the Lord.\" — Luke 1:46",
    scriptureRef: "Luke 1 · John 19",
    copingPractice:
      "Pray the Magnificat slowly each evening this week — let gratitude be a discipline.",
    blurb:
      "You hold tender courage. Your 'yes' has shaped lives in ways you may never see.",
  },
  Job: {
    id: "Job",
    monogram: "J",
    strengths: ["Honesty in suffering", "Refusal to abandon hope"],
    scripture:
      "\"Though he slay me, yet will I trust him.\" — Job 13:15",
    scriptureRef: "Job 1 · Job 38",
    copingPractice:
      "Name three things lost and three things still here. Sit with both. You don't have to resolve it.",
    blurb:
      "You are walking through real grief. Wrestling honestly with God is itself an act of faith.",
  },
};

export const FIGURE_NAMES: FigureName[] = [
  "David",
  "Esther",
  "Paul",
  "Moses",
  "Mary",
  "Job",
];
