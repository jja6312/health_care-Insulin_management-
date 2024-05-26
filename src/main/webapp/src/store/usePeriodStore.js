import { create } from "zustand";

export const usePeriodStore = create((set) => ({
  periods: [],
  selectedPeriod: null,

  setPeriods: (periods) => set({ periods }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
}));
