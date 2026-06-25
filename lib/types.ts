export type RiskTier = "low" | "moderate" | "high";

export interface SnapshotQuestion {
  id: string;
  text: string;
  options: { label: string; points: 0 | 1 | 2 | 3 }[];
}

export interface SnapshotResult {
  total: number;
  tier: RiskTier;
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
