import { create } from "zustand";

export const usePointStore = create((set) => ({
  texts: [],
  weeklyEarnedPoints: [],

  setTexts: (update) => {
    set((state) => {
      const newTexts =
        typeof update === "function" ? update(state.texts) : update;
      // console.log("Setting texts:", newTexts); // Debug log
      return { texts: newTexts };
    });
  },
  setWeeklyEarnedPoints: (data) => set({ weeklyEarnedPoints: data }),
}));
