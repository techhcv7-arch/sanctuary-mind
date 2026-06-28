"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  BibleAnswer,
  BibleResult,
  Booking,
  ChatMessage,
  UserProfile,
  SnapshotResult,
} from "@/lib/types";

interface SnapshotState {
  answers: number[];
  freeText: string;
  result: SnapshotResult | null;
}

interface BibleState {
  answers: BibleAnswer[];
  result: BibleResult | null;
}

interface AppState {
  hydrated: boolean;
  user: UserProfile | null;
  crisisBannerDismissed: boolean;
  snapshot: SnapshotState;
  bible: BibleState;
  bookings: Booking[];
  chat: ChatMessage[];

  setHydrated: () => void;
  setUser: (user: UserProfile | null) => void;
  signOut: () => void;
  dismissCrisisBanner: () => void;

  setSnapshotAnswer: (index: number, points: number) => void;
  setSnapshotFreeText: (text: string) => void;
  setSnapshotResult: (result: SnapshotResult) => void;
  resetSnapshot: () => void;

  setBibleAnswer: (questionId: string, optionIndex: number) => void;
  setBibleResult: (result: BibleResult) => void;
  resetBible: () => void;

  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;

  appendChatMessage: (message: ChatMessage) => void;
  resetChat: () => void;
}


const emptySnapshot: SnapshotState = {
  answers: [],
  freeText: "",
  result: null,
};

const emptyBible: BibleState = {
  answers: [],
  result: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hydrated: false,
      user: null,
      crisisBannerDismissed: false,
      snapshot: emptySnapshot,
      bible: emptyBible,
      bookings: [],
      chat: [],

      setHydrated: () => set({ hydrated: true }),

      setUser: (user) => set({ user }),

      signOut: async () => {
        // Clear local state immediately
        set({
          user: null,
          snapshot: emptySnapshot,
          bible: emptyBible,
          bookings: [],
          chat: [],
          crisisBannerDismissed: false,
        });
        // Clear persisted store to prevent stale data on shared devices
        if (typeof window !== "undefined") {
          localStorage.removeItem("sanctuarymind-store");
        }
      },

      dismissCrisisBanner: () => set({ crisisBannerDismissed: true }),

      setSnapshotAnswer: (index, points) =>
        set((state) => {
          const answers = [...state.snapshot.answers];
          answers[index] = points;
          return { snapshot: { ...state.snapshot, answers } };
        }),
      setSnapshotFreeText: (text) =>
        set((state) => ({ snapshot: { ...state.snapshot, freeText: text } })),
      setSnapshotResult: (result) =>
        set((state) => ({ snapshot: { ...state.snapshot, result } })),
      resetSnapshot: () => set({ snapshot: emptySnapshot }),

      setBibleAnswer: (questionId, optionIndex) =>
        set((state) => {
          const existing = state.bible.answers.findIndex(
            (a) => a.questionId === questionId,
          );
          const answers = [...state.bible.answers];
          if (existing >= 0) answers[existing] = { questionId, optionIndex };
          else answers.push({ questionId, optionIndex });
          return { bible: { ...state.bible, answers } };
        }),
      setBibleResult: (result) =>
        set((state) => ({ bible: { ...state.bible, result } })),
      resetBible: () => set({ bible: emptyBible }),

      addBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),
      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      appendChatMessage: (message) =>
        set((state) => ({ chat: [...state.chat, message] })),
      resetChat: () => set({ chat: [] }),
    }),
    {
      name: "sanctuarymind-store-v3",
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: () => ({
        hydrated: false,
        user: null,
        crisisBannerDismissed: false,
        snapshot: emptySnapshot,
        bible: emptyBible,
        bookings: [],
        chat: [],
      }),
      onRehydrateStorage: () => (state) => {
        // Clear any stale mock user that doesn't have the real UserProfile shape
        if (state?.user && !("fullName" in state.user)) {
          state.user = null;
        }
        state?.setHydrated();
      },
    },
  ),
);
