import { SNAPSHOT_QUESTIONS, SNAPSHOT_SCREENING_COUNT } from "@/lib/mock/snapshot-questions";
import type { RiskTier, SnapshotArchetype, SnapshotResult } from "@/lib/types";

export const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "kill my self",
  "end it all",
  "end my life",
  "no reason to live",
  "hurt myself",
  "harm myself",
  "self-harm",
  "self harm",
  "wish i were dead",
  "life is not worth living",
  "don't want to be here",
  "dont want to be here",
] as const;

export const SNAPSHOT_ARCHETYPE_NOTES: Record<SnapshotArchetype, string> = {
  David: "Forgiveness and mercy may be the deepest need in this season.",
  Elijah: "Exhaustion and discouragement may be calling for renewed hope.",
  Job: "Grief and endurance may be shaping this season more than words can easily hold.",
  Jonah: "Resentment or anger may be asking for honest surrender.",
  Martha: "Worry and over-responsibility may be crowding out peace.",
  Moses: "Fear may be present even while you are still being called forward.",
  Paul: "You may be carrying tension between your past and your next becoming.",
  Peter: "Shame and regret may need grace, not hiding.",
  Saul: "Comparison or jealousy may be draining your peace.",
};

export const SNAPSHOT_TIER_COPY: Record<
  RiskTier,
  {
    label: string;
    status: string;
    overline: string;
    message: string;
  }
> = {
  wellness: {
    label: "Wellness Resources",
    status: "Healthy / Low Concern",
    overline: "Level 1",
    message:
      "Your responses suggest relatively low levels of emotional distress right now. Continue with wellness and spiritual growth resources.",
  },
  prayer: {
    label: "Prayer Support",
    status: "Mild Emotional Distress",
    overline: "Level 2",
    message:
      "Your responses indicate mild emotional strain. Connecting with faith-based support and prayer resources may be beneficial.",
  },
  pastoral: {
    label: "Pastoral Care",
    status: "Moderate Emotional Distress",
    overline: "Level 3",
    message:
      "Your responses indicate that speaking with a trusted pastor or church leader may provide meaningful support.",
  },
  specialist: {
    label: "Christian Mental Health Specialist",
    status: "Elevated Emotional Distress",
    overline: "Level 4",
    message:
      "Your responses indicate elevated emotional distress. A licensed mental health professional may help you develop additional coping strategies.",
  },
  clinical: {
    label: "Clinical Mental Health Evaluation",
    status: "High Emotional Distress",
    overline: "Level 5",
    message:
      "Your responses indicate significant emotional distress. Professional clinical support is strongly recommended.",
  },
};

const ARCHETYPE_ORDER: SnapshotArchetype[] = [
  "David",
  "Elijah",
  "Martha",
  "Paul",
  "Peter",
  "Jonah",
  "Job",
  "Moses",
  "Saul",
];

const SCREENING_MAX_SCORE = SNAPSHOT_SCREENING_COUNT * 5;

export function detectCrisisKeyword(text: string | undefined | null): boolean {
  if (!text) return false;
  const haystack = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => haystack.includes(k));
}

function tierFromScaledScore(total: number): RiskTier {
  if (total <= 35) return "wellness";
  if (total <= 50) return "prayer";
  if (total <= 65) return "pastoral";
  if (total <= 80) return "specialist";
  return "clinical";
}

export function scoreSnapshot(
  answers: number[],
  freeText?: string,
): Omit<SnapshotResult, "takenAt"> {
  let rawTotal = 0;
  let criticalTriggered = false;
  const archetypeTotals: Record<SnapshotArchetype, number> = {
    David: 0,
    Elijah: 0,
    Job: 0,
    Jonah: 0,
    Martha: 0,
    Moses: 0,
    Paul: 0,
    Peter: 0,
    Saul: 0,
  };

  SNAPSHOT_QUESTIONS.forEach((question, index) => {
    const selectedIndex = answers[index];
    const option = question.options[selectedIndex];
    if (!option) return;

    if (question.kind === "screening") {
      const points = option.points ?? 0;
      rawTotal += points;
      if (question.critical && points >= 4) criticalTriggered = true;
      return;
    }

    if (option.archetype) archetypeTotals[option.archetype] += 1;
  });

  const total = Math.round((rawTotal / SCREENING_MAX_SCORE) * 100);
  const crisisOverride = criticalTriggered || detectCrisisKeyword(freeText);
  const tier = crisisOverride ? "clinical" : tierFromScaledScore(total);

  const rankedArchetypes = [...ARCHETYPE_ORDER].sort((a, b) => {
    const delta = archetypeTotals[b] - archetypeTotals[a];
    return delta !== 0 ? delta : ARCHETYPE_ORDER.indexOf(a) - ARCHETYPE_ORDER.indexOf(b);
  });
  const primaryArchetype = archetypeTotals[rankedArchetypes[0]] > 0 ? rankedArchetypes[0] : null;
  const secondaryArchetype = archetypeTotals[rankedArchetypes[1]] > 0 ? rankedArchetypes[1] : null;

  return {
    rawTotal,
    total,
    tier,
    crisisOverride,
    primaryArchetype,
    secondaryArchetype,
  };
}
