import type { Pastor } from "@/lib/types";

const WEEKDAY_SLOTS = ["09:00", "11:30", "14:00", "16:30"];
const LIGHT_DAY_SLOTS = ["10:00", "15:00"];

function makeAvailability(pattern: "full" | "light" | "evening") {
  return Array.from({ length: 7 }, (_, dayOffset) => {
    if (pattern === "full") {
      return {
        dayOffset,
        slots: dayOffset === 0 || dayOffset === 6 ? LIGHT_DAY_SLOTS : WEEKDAY_SLOTS,
      };
    }
    if (pattern === "light") {
      return {
        dayOffset,
        slots: dayOffset % 2 === 0 ? LIGHT_DAY_SLOTS : WEEKDAY_SLOTS.slice(0, 3),
      };
    }
    return {
      dayOffset,
      slots: dayOffset === 6 ? [] : ["18:00", "19:30", "20:30"],
    };
  });
}

export const PASTORS: Pastor[] = [
  {
    id: "pastor-malachi",
    name: "Pastor Malachi Reed",
    title: "Lead Pastor · Cornerstone Fellowship",
    bio: "Twenty years of pastoral counseling. Passionate about meeting people in their hardest seasons.",
    initials: "MR",
    accent: "navy",
    availability: makeAvailability("full"),
  },
  {
    id: "pastor-elena",
    name: "Pastor Elena Vasquez",
    title: "Care Pastor · Cornerstone Fellowship",
    bio: "Trained in trauma-informed care. Bilingual English/Spanish. Loves Psalms and walking together through grief.",
    initials: "EV",
    accent: "gold",
    availability: makeAvailability("light"),
  },
  {
    id: "pastor-david",
    name: "Pastor David Okafor",
    title: "Young Adults Pastor · Cornerstone Fellowship",
    bio: "Evening availability for those balancing work and family. Anxiety, vocation, and identity in Christ.",
    initials: "DO",
    accent: "sage",
    availability: makeAvailability("evening"),
  },
];

export function findPastor(id: string): Pastor | undefined {
  return PASTORS.find((p) => p.id === id);
}
