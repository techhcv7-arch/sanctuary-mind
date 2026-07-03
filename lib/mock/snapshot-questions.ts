import type { SnapshotQuestion } from "@/lib/types";

const FREQUENCY_OPTIONS = [
  { label: "Never / Not at all", points: 1 },
  { label: "Rarely (1–2 times)", points: 2 },
  { label: "Sometimes (Weekly)", points: 3 },
  { label: "Often (Several times per week)", points: 4 },
  { label: "Nearly always / Daily", points: 5 },
] as const;

const SCREENING_QUESTIONS: SnapshotQuestion[] = [
  {
    id: "s1",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s2",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s3",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or slept too much?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s4",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you felt tired or had little energy?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s5",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had poor appetite or overeaten?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s6",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you felt bad about yourself, like you are a failure, or like you have let yourself or your family down?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s7",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had trouble concentrating on things like reading or watching something?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s8",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you been moving or speaking so slowly that people noticed, or the opposite and felt especially restless or fidgety?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s9",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
    options: [...FREQUENCY_OPTIONS],
    critical: true,
  },
  {
    id: "s10",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s11",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you not been able to stop or control worrying?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s12",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you worried too much about different things?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s13",
    kind: "screening",
    text: "Over the last 2 weeks, how often have you had trouble relaxing?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s14",
    kind: "screening",
    text: "During the past 60 days, how often have feelings of grief, loss, loneliness, or sadness related to the death of a loved one or another significant life loss interfered with your ability to function?",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s15",
    kind: "screening",
    text: "During the past 60 days, how often have symptoms from a previous mental health condition returned or worsened?",
    note: "Think about prior depression, anxiety, PTSD, bipolar disorder, or similar symptoms you have previously experienced.",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s16",
    kind: "screening",
    text: "During the past 60 days, how often have feelings of spiritual disconnection, guilt, shame, abandonment by God, religious conflict, or loss of faith caused emotional distress?",
    note: "This question is about spiritual distress that is affecting your emotional well-being.",
    options: [...FREQUENCY_OPTIONS],
  },
  {
    id: "s17",
    kind: "screening",
    text: "During the past 60 days, how often have you experienced thoughts of self-harm, wishing you were dead, or thoughts that life is not worth living?",
    options: [...FREQUENCY_OPTIONS],
    critical: true,
  },
] as const;

const ARCHETYPE_QUESTIONS: SnapshotQuestion[] = [
  {
    id: "a1",
    kind: "archetype",
    text: "Which statement best describes your biggest challenge right now?",
    options: [
      { label: "I feel exhausted and want to give up.", archetype: "Elijah" },
      { label: "I am carrying guilt from mistakes I have made.", archetype: "David" },
      { label: "I constantly worry about everything.", archetype: "Martha" },
      { label: "I feel trapped between who I was and who I want to become.", archetype: "Paul" },
    ],
  },
  {
    id: "a2",
    kind: "archetype",
    text: "When you are under stress, what do you typically do?",
    options: [
      { label: "Withdraw from people.", archetype: "Elijah" },
      { label: "Act impulsively and regret it later.", archetype: "Peter" },
      { label: "Become angry or resentful.", archetype: "Jonah" },
      { label: "Work harder and take on more responsibility.", archetype: "Martha" },
    ],
  },
  {
    id: "a3",
    kind: "archetype",
    text: "What emotion do you struggle with most?",
    options: [
      { label: "Shame", archetype: "Peter" },
      { label: "Grief", archetype: "Job" },
      { label: "Fear", archetype: "Moses" },
      { label: "Jealousy or comparison", archetype: "Saul" },
    ],
  },
  {
    id: "a4",
    kind: "archetype",
    text: "What kind of encouragement do you most need right now?",
    options: [
      { label: "Hope", archetype: "Elijah" },
      { label: "Forgiveness", archetype: "David" },
      { label: "Purpose", archetype: "Paul" },
      { label: "Peace", archetype: "Martha" },
    ],
  },
] as const;

export const SNAPSHOT_SCREENING_COUNT = SCREENING_QUESTIONS.length;
export const SNAPSHOT_QUESTIONS: SnapshotQuestion[] = [
  ...SCREENING_QUESTIONS,
  ...ARCHETYPE_QUESTIONS,
];
