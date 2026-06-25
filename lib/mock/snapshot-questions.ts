import type { SnapshotQuestion } from "@/lib/types";

/**
 * Faith-aware Likert items for the 10-question Snapshot.
 *
 * Inspired by validated screening tools (PHQ-9, GAD-7, PSS) but rewritten
 * in plain, faith-aware language. NOT a substitute for clinical screening
 * and NOT verbatim from any licensed instrument.
 *
 * Scoring: each option is worth 0–3 points. Total 0–30.
 *   0–10 → low | 11–20 → moderate | 21–30 → high
 */
const STANDARD_OPTIONS = [
  { label: "Not at all", points: 0 },
  { label: "A few days", points: 1 },
  { label: "More than half the days", points: 2 },
  { label: "Nearly every day", points: 3 },
] as const;

export const SNAPSHOT_QUESTIONS: SnapshotQuestion[] = [
  {
    id: "q1",
    text: "Over the past two weeks, how often have you felt little interest or joy in things you usually love?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q2",
    text: "Over the past two weeks, how often have you felt down, anxious, or hopeless?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q3",
    text: "How often have you had trouble sleeping, or slept far more than usual?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q4",
    text: "How often have you felt tired, drained, or low on energy — even after rest?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q5",
    text: "How often have you struggled to concentrate, pray, or focus on Scripture?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q6",
    text: "How often have worries or 'what-ifs' felt hard to quiet down?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q7",
    text: "How often have you withdrawn from family, friends, or your church community?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q8",
    text: "How often have you felt unworthy, ashamed, or far from God's love?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q9",
    text: "How often have you felt overwhelmed by stress at work, home, or in relationships?",
    options: [...STANDARD_OPTIONS],
  },
  {
    id: "q10",
    text: "How often have you had thoughts that life is not worth living, or thoughts of harming yourself?",
    options: [...STANDARD_OPTIONS],
  },
];
