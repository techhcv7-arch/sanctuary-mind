import type { BibleQuestion } from "@/lib/types";

/**
 * Each question offers options weighted toward different biblical figures.
 * Sum weights across answers; highest total wins. Tie-break: weight on Q1.
 */
export const BIBLE_QUESTIONS: BibleQuestion[] = [
  {
    id: "b1",
    text: "Where do you most often meet God?",
    options: [
      {
        label: "In the highs and lows of my emotions, brought into prayer",
        weights: { David: 3, Job: 1 },
      },
      { label: "In quiet, listening for a still small voice", weights: { Mary: 2, Moses: 2 } },
      { label: "In study and conviction-driven action", weights: { Paul: 3 } },
      { label: "In serving my people behind the scenes", weights: { Esther: 3 } },
    ],
  },
  {
    id: "b2",
    text: "Which of these feels most like you in a hard season?",
    options: [
      { label: "I write down my grief and bring it raw to God", weights: { David: 2, Job: 2 } },
      { label: "I keep going for the people who depend on me", weights: { Moses: 2, Esther: 2 } },
      { label: "I throw myself deeper into purpose and study", weights: { Paul: 3 } },
      { label: "I rest in trust, even when I don't understand", weights: { Mary: 3 } },
    ],
  },
  {
    id: "b3",
    text: "When you face injustice, you tend to…",
    options: [
      { label: "Speak up boldly and persistently", weights: { Paul: 2, David: 1 } },
      { label: "Wait for the right moment, then act decisively", weights: { Esther: 3 } },
      { label: "Pray and listen before moving", weights: { Moses: 2, Mary: 1 } },
      { label: "Sit honestly with the grief of it", weights: { Job: 3 } },
    ],
  },
  {
    id: "b4",
    text: "Which gift would friends say is most yours?",
    options: [
      { label: "Honest, heartfelt presence", weights: { David: 2 } },
      { label: "Wisdom about timing", weights: { Esther: 2 } },
      { label: "Conviction and endurance", weights: { Paul: 2 } },
      { label: "Tender, faithful 'yes'", weights: { Mary: 2 } },
      { label: "Patient leadership", weights: { Moses: 2 } },
      { label: "Honesty about pain", weights: { Job: 2 } },
    ],
  },
  {
    id: "b5",
    text: "When you pray, you most naturally…",
    options: [
      { label: "Pour out everything — joy, anger, fear, hope", weights: { David: 3 } },
      { label: "Whisper short prayers throughout the day", weights: { Mary: 2, Moses: 1 } },
      { label: "Pray for boldness, for clarity, for the work", weights: { Paul: 2, Esther: 1 } },
      { label: "Sit quietly and ask 'why?' more than 'what?'", weights: { Job: 3 } },
    ],
  },
  {
    id: "b6",
    text: "Which season of life feels most familiar?",
    options: [
      { label: "Wilderness — long, slow, mostly faithful", weights: { Moses: 3 } },
      { label: "A storm I didn't ask for", weights: { Job: 3 } },
      { label: "A calling I'm growing into", weights: { Esther: 2, Mary: 1 } },
      { label: "A mission I'd give my life to", weights: { Paul: 3 } },
      { label: "The whole range, often in one week", weights: { David: 2 } },
    ],
  },
  {
    id: "b7",
    text: "Your favorite kind of Scripture is…",
    options: [
      { label: "The Psalms", weights: { David: 3 } },
      { label: "The Gospels", weights: { Mary: 2, Moses: 1 } },
      { label: "Paul's letters", weights: { Paul: 3 } },
      { label: "The narrative books — Esther, Ruth, Joseph", weights: { Esther: 3 } },
      { label: "Job and Ecclesiastes", weights: { Job: 3 } },
    ],
  },
  {
    id: "b8",
    text: "Which would be hardest for you?",
    options: [
      { label: "Sitting still and waiting", weights: { Paul: 2, David: 1 } },
      { label: "Speaking up in front of a crowd", weights: { Moses: 2, Mary: 1 } },
      { label: "Trusting God in the middle of grief", weights: { Job: 2 } },
      { label: "Acting before being totally certain", weights: { Esther: 2 } },
    ],
  },
  {
    id: "b9",
    text: "What do you long for most right now?",
    options: [
      { label: "To feel God's presence again", weights: { David: 2, Mary: 1 } },
      { label: "Courage to do the next hard thing", weights: { Esther: 2, Moses: 1 } },
      { label: "Renewed strength for the work ahead", weights: { Paul: 2 } },
      { label: "To make sense of what I've been through", weights: { Job: 3 } },
    ],
  },
  {
    id: "b10",
    text: "If you had to choose one verse for this season…",
    options: [
      {
        label: "\"The Lord is my shepherd; I shall not want.\"",
        weights: { David: 3 },
      },
      {
        label: "\"For such a time as this.\"",
        weights: { Esther: 3 },
      },
      {
        label: "\"My grace is sufficient for you.\"",
        weights: { Paul: 3 },
      },
      {
        label: "\"Be still, and know that I am God.\"",
        weights: { Moses: 2, Mary: 1 },
      },
      {
        label: "\"My soul magnifies the Lord.\"",
        weights: { Mary: 3 },
      },
      {
        label: "\"Though he slay me, yet will I trust him.\"",
        weights: { Job: 3 },
      },
    ],
  },
];
