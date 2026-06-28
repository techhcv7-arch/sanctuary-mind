export type RiskTier =
  | "wellness"
  | "prayer"
  | "pastoral"
  | "specialist"
  | "clinical";

export type SnapshotArchetype =
  | "David"
  | "Elijah"
  | "Job"
  | "Jonah"
  | "Martha"
  | "Moses"
  | "Paul"
  | "Peter"
  | "Saul";

export interface SnapshotOption {
  label: string;
  points?: 1 | 2 | 3 | 4 | 5;
  archetype?: SnapshotArchetype;
}

export interface SnapshotQuestion {
  id: string;
  text: string;
  kind: "screening" | "archetype";
  options: SnapshotOption[];
  note?: string;
  critical?: boolean;
}

export interface SnapshotResult {
  rawTotal: number;
  total: number;
  tier: RiskTier;
  crisisOverride: boolean;
  primaryArchetype: SnapshotArchetype | null;
  secondaryArchetype: SnapshotArchetype | null;
  takenAt: string;
}

export type FigureName =
  | "David"
  | "Esther"
  | "Paul"
  | "Moses"
  | "Mary"
  | "Job";

export interface BibleFigure {
  id: FigureName;
  monogram: string;
  strengths: string[];
  scripture: string;
  scriptureRef: string;
  copingPractice: string;
  blurb: string;
}

export interface BibleQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    weights: Partial<Record<FigureName, number>>;
  }[];
}

export interface BibleAnswer {
  questionId: string;
  optionIndex: number;
}

export interface BibleResult {
  figure: FigureName;
  takenAt: string;
}

export interface Pastor {
  id: string;
  name: string;
  title: string;
  bio: string;
  initials: string;
  accent: "navy" | "gold" | "sage" | "clay";
  /** dayOffset 0..6, slots are HH:MM 24h strings */
  availability: { dayOffset: number; slots: string[] }[];
}

export interface Booking {
  id: string;
  pastorId: string;
  dayOffset: number;
  slot: string;
  confirmedAt: string;
}

export interface PrayerAlert {
  id: string;
  churchName: string;
  title: string;
  body: string;
  isLive: boolean;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  ts: number;
  isCrisisEscalation?: boolean;
}

export interface MockUser {
  name: string;
  denomination: string;
  timezone: string;
  churchName: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  churchName: string | null;
  denomination: string | null;
  timezone: string;
  termsAcceptedAt: string;
}
