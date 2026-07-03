import type { BibleFigure, FigureName } from "@/lib/types";

export const BIBLE_FIGURES: Record<FigureName, BibleFigure> = {
  David: {
    id: "David",
    monogram: "D",
    portraitSrc: "/bible-characters/david.jpeg",
    strengths: ["Honest in lament", "Courage", "Repentant heart"],
    scripture:
      "\"He heals the brokenhearted and binds up their wounds.\" — Psalm 147:3",
    scriptureRef: "Psalm 23 · Psalm 51",
    copingPractice:
      "Five minutes of lament journaling each morning — write what you cannot yet pray.",
    blurb:
      "You feel deeply and bring everything — joy, grief, anger — before God. The Psalms are your home.",
  },
  Moses: {
    id: "Moses",
    monogram: "M",
    portraitSrc: "/bible-characters/moses.jpeg",
    strengths: ["Justice", "Persistence", "Humble leadership"],
    scripture:
      "\"The Lord will fight for you; you need only to be still.\" — Exodus 14:14",
    scriptureRef: "Exodus 3 · Numbers 12",
    copingPractice:
      "Take a 'burning bush' walk — 15 quiet minutes outside, listening for one nudge.",
    blurb:
      "You carry others further than you realize. The journey is long, but you were not sent alone.",
  },
  Elijah: {
    id: "Elijah",
    monogram: "E",
    portraitSrc: "/bible-characters/elijah.jpeg",
    strengths: ["Bold conviction", "Passion", "Spiritual courage"],
    scripture:
      "\"Get up and eat, for the journey is too much for you.\" — 1 Kings 19:7",
    scriptureRef: "1 Kings 18 · 1 Kings 19",
    copingPractice:
      "Name one sign of exhaustion, then answer it with food, rest, and one honest conversation before you push again.",
    blurb:
      "You can be fierce in faith and still collapse under prolonged strain. God meets you there with care before correction.",
  },
  Jonah: {
    id: "Jonah",
    monogram: "J",
    portraitSrc: "/bible-characters/jonah.jpeg",
    strengths: ["Honest emotion", "Strong conviction", "Capacity to repent"],
    scripture:
      "\"In my distress I called to the Lord, and he answered me.\" — Jonah 2:2",
    scriptureRef: "Jonah 1 · Jonah 4",
    copingPractice:
      "When resentment rises, write what you are resisting and end the page with one sentence of surrender.",
    blurb:
      "You feel things strongly and can resist what God is asking when it offends your sense of fairness. Mercy is still for you too.",
  },
  Peter: {
    id: "Peter",
    monogram: "P",
    portraitSrc: "/bible-characters/peter.jpeg",
    strengths: ["Loyalty", "Courage", "Restorability"],
    scripture:
      "\"Lord, you know all things; you know that I love you.\" — John 21:17",
    scriptureRef: "Matthew 14 · Luke 22 · John 21",
    copingPractice:
      "When you feel ashamed, name the moment clearly, then pair confession with one concrete next act of faithfulness.",
    blurb:
      "You move quickly, love deeply, and sometimes falter under pressure. Failure is not the end of your calling.",
  },
  Saul: {
    id: "Saul",
    monogram: "S",
    portraitSrc: "/bible-characters/saul.jpeg",
    strengths: ["Intensity", "Drive", "Desire to be chosen"],
    scripture:
      "\"Do not be afraid; you have done all this evil; yet do not turn away from the Lord.\" — 1 Samuel 12:20",
    scriptureRef: "1 Samuel 9 · 1 Samuel 18 · 1 Samuel 28",
    copingPractice:
      "When comparison starts running the room, step away and name what threat you are assuming before you act on it.",
    blurb:
      "Insecurity can turn pressure into suspicion and comparison into torment. Your soul needs steadiness more than control.",
  },
  Job: {
    id: "Job",
    monogram: "J",
    portraitSrc: "/bible-characters/job.jpeg",
    strengths: ["Honesty in suffering", "Refusal to abandon hope"],
    scripture:
      "\"Though he slay me, yet will I trust him.\" — Job 13:15",
    scriptureRef: "Job 1 · Job 38",
    copingPractice:
      "Name three things lost and three things still here. Sit with both. You don't have to resolve it.",
    blurb:
      "You are walking through real grief. Wrestling honestly with God is itself an act of faith.",
  },
  Jeremiah: {
    id: "Jeremiah",
    monogram: "J",
    portraitSrc: "/bible-characters/jeremiah.jpeg",
    strengths: ["Compassion", "Honesty", "Persistence"],
    scripture:
      "\"His compassions never fail. They are new every morning.\" — Lamentations 3:22-23",
    scriptureRef: "Jeremiah 20 · Lamentations 3",
    copingPractice:
      "Set aside ten quiet minutes to name your sadness without editing it, then end by naming one mercy that is still present.",
    blurb:
      "You feel the ache of people and places deeply. Sensitivity is part of your calling, but it can also leave you lonely and worn down.",
  },
  Martha: {
    id: "Martha",
    monogram: "M",
    portraitSrc: "/bible-characters/martha.jpeg",
    strengths: ["Responsibility", "Service", "Dependability"],
    scripture:
      "\"Martha, Martha, you are worried and upset about many things.\" — Luke 10:41",
    scriptureRef: "Luke 10 · John 11",
    copingPractice:
      "Pick one task to leave unfinished today as a way of practicing trust instead of over-functioning.",
    blurb:
      "You love by carrying, organizing, and providing. The strain comes when service turns into constant worry and no space remains for rest.",
  },
  Paul: {
    id: "Paul",
    monogram: "P",
    portraitSrc: "/bible-characters/paul.jpeg",
    strengths: ["Discipline", "Resilience", "Conviction"],
    scripture:
      "\"My grace is sufficient for you, for my power is made perfect in weakness.\" — 2 Corinthians 12:9",
    scriptureRef: "Romans 7 · 2 Corinthians 12 · Philippians 4",
    copingPractice:
      "Write down the burden you keep carrying for everyone else, then separate what is yours to tend from what only God can hold.",
    blurb:
      "You are driven, analytical, and mission-focused. You can endure a great deal, but pressure and self-criticism can quietly hollow you out.",
  },
};

export const FIGURE_NAMES: FigureName[] = [
  "David",
  "Moses",
  "Elijah",
  "Jonah",
  "Peter",
  "Saul",
  "Job",
  "Jeremiah",
  "Martha",
  "Paul",
];
