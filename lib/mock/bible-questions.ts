import type { BibleQuestion } from "@/lib/types";

export const BIBLE_QUESTIONS: BibleQuestion[] = [
  {
    id: "b1",
    text: "When pressure builds, which reaction feels most familiar?",
    options: [
      {
        label: "My emotions rise quickly, and I bring them straight to God.",
        weights: { David: 3, Jeremiah: 1 },
      },
      {
        label: "I keep serving, but anxiety rises because too much depends on me.",
        weights: { Martha: 3, Moses: 1 },
      },
      {
        label: "After carrying too much for too long, I want to shut down and disappear.",
        weights: { Elijah: 3, Job: 1 },
      },
      {
        label: "I avoid the issue, then feel irritated that it is still there.",
        weights: { Jonah: 3, Saul: 1 },
      },
      {
        label: "I push harder, analyze everything, and blame myself for not doing better.",
        weights: { Paul: 3, Peter: 1 },
      },
    ],
  },
  {
    id: "b2",
    text: "What tends to wound you most deeply?",
    options: [
      {
        label: "A moral or spiritual failure that leaves me carrying remorse.",
        weights: { David: 2, Paul: 2 },
      },
      {
        label: "Feeling inadequate for the responsibility in front of me.",
        weights: { Moses: 3, Martha: 1 },
      },
      {
        label: "Being rejected or left alone while trying to stay faithful.",
        weights: { Jeremiah: 3, Job: 1 },
      },
      {
        label: "Realizing fear got the better of me in a key moment.",
        weights: { Peter: 3, Saul: 1 },
      },
      {
        label: "Watching things go mercifully for others when I wanted justice instead.",
        weights: { Jonah: 3, Saul: 2 },
      },
    ],
  },
  {
    id: "b3",
    text: "How do people usually experience you at your best?",
    options: [
      {
        label: "Warm, expressive, creative, and spiritually alive.",
        weights: { David: 3 },
      },
      {
        label: "Steady, humble, and quietly faithful under responsibility.",
        weights: { Moses: 3, Jeremiah: 1 },
      },
      {
        label: "Bold, intense, and conviction-driven.",
        weights: { Elijah: 2, Paul: 2 },
      },
      {
        label: "Loyal, action-oriented, and ready to jump in.",
        weights: { Peter: 3 },
      },
      {
        label: "Dependable, organized, and always carrying what others forget.",
        weights: { Martha: 3, Saul: 1 },
      },
    ],
  },
  {
    id: "b4",
    text: "Which inner struggle feels closest right now?",
    options: [
      {
        label: "Emotional ups and downs after big moments or painful failures.",
        weights: { David: 2, Elijah: 2 },
      },
      {
        label: "Persistent worry that I am not doing enough for everyone.",
        weights: { Martha: 3, Moses: 1 },
      },
      {
        label: "Shame, comparison, or jealousy changing how I see people.",
        weights: { Saul: 3, Peter: 1 },
      },
      {
        label: "Grief, sadness, or loneliness that lingers longer than others realize.",
        weights: { Job: 2, Jeremiah: 2 },
      },
      {
        label: "Conflict between what I believe and what I actually do.",
        weights: { Paul: 3, Jonah: 1 },
      },
    ],
  },
  {
    id: "b5",
    text: "When God asks something difficult of you, you usually…",
    options: [
      {
        label: "Say yes, but feel the weight of the call almost immediately.",
        weights: { Paul: 2, Jeremiah: 1 },
      },
      {
        label: "Hesitate because I feel unqualified, but move anyway.",
        weights: { Moses: 3 },
      },
      {
        label: "Run the other direction or delay the obedience.",
        weights: { Jonah: 3 },
      },
      {
        label: "Respond quickly, then wobble when pressure hits.",
        weights: { Peter: 3, David: 1 },
      },
      {
        label: "Wrestle honestly in prayer before I take the next step.",
        weights: { David: 2, Job: 2 },
      },
    ],
  },
  {
    id: "b6",
    text: "Which sentence sounds most like your current season?",
    options: [
      {
        label: "I am exhausted after being strong for too long.",
        weights: { Elijah: 3, Moses: 1 },
      },
      {
        label: "I am carrying sorrow and still trying to stay faithful.",
        weights: { Job: 3, Jeremiah: 2 },
      },
      {
        label: "I am responsible for too much, and rest feels irresponsible.",
        weights: { Martha: 3, Paul: 1 },
      },
      {
        label: "I am driven by purpose, but the pressure never fully turns off.",
        weights: { Paul: 3, Moses: 1 },
      },
      {
        label: "I know what is right, but part of me resists it anyway.",
        weights: { Jonah: 2, Saul: 2 },
      },
    ],
  },
  {
    id: "b7",
    text: "In relationships, what trips you up most?",
    options: [
      {
        label: "I react quickly and later wish I had slowed down.",
        weights: { Peter: 3, David: 1 },
      },
      {
        label: "I withdraw into resentment instead of saying what is really true.",
        weights: { Jonah: 3 },
      },
      {
        label: "I become suspicious, defensive, or threatened by others.",
        weights: { Saul: 3 },
      },
      {
        label: "I take care of everyone and then feel alone in it.",
        weights: { Martha: 2, Jeremiah: 2 },
      },
      {
        label: "I carry conflict inside and keep performing anyway.",
        weights: { Moses: 2, Paul: 2 },
      },
    ],
  },
  {
    id: "b8",
    text: "What kind of Scripture or prayer space draws you most?",
    options: [
      {
        label: "Psalms that let me grieve, praise, confess, and sing.",
        weights: { David: 3 },
      },
      {
        label: "Wilderness stories about endurance, calling, and obedience.",
        weights: { Moses: 2, Elijah: 1 },
      },
      {
        label: "Laments that make room for sadness and honesty.",
        weights: { Jeremiah: 2, Job: 2 },
      },
      {
        label: "Direct teaching that sharpens conviction and purpose.",
        weights: { Paul: 3 },
      },
      {
        label: "Stories of failure, restoration, and second chances.",
        weights: { Peter: 3, Jonah: 1 },
      },
    ],
  },
  {
    id: "b9",
    text: "What do you most need from God right now?",
    options: [
      {
        label: "Mercy after failure and courage to begin again.",
        weights: { David: 2, Peter: 2 },
      },
      {
        label: "Strength to carry responsibility without burning out.",
        weights: { Moses: 2, Martha: 2, Paul: 1 },
      },
      {
        label: "Hope in the middle of deep sadness or fatigue.",
        weights: { Elijah: 2, Jeremiah: 2, Job: 1 },
      },
      {
        label: "Freedom from anger, bitterness, or resistance.",
        weights: { Jonah: 3, Saul: 1 },
      },
      {
        label: "Peace in the middle of inner conflict and pressure.",
        weights: { Paul: 2, Saul: 1, Martha: 1 },
      },
    ],
  },
  {
    id: "b10",
    text: "Which warning feels most personal?",
    options: [
      {
        label: "Do not let shame write the whole story after you fall.",
        weights: { David: 2, Peter: 2 },
      },
      {
        label: "Do not confuse exhaustion with failure.",
        weights: { Elijah: 2, Moses: 2, Martha: 1 },
      },
      {
        label: "Do not let grief isolate you from God and people.",
        weights: { Job: 2, Jeremiah: 2 },
      },
      {
        label: "Do not keep running from what God has already made clear.",
        weights: { Jonah: 3 },
      },
      {
        label: "Do not let insecurity turn other people into threats.",
        weights: { Saul: 3, Paul: 1 },
      },
    ],
  },
];
