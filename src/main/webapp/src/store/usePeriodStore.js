import { create } from "zustand";

export const usePeriodStore = create((set) => ({
  periods: [],
  startDate: new Date(2024, 4, 20), // 시작일
  selectedPeriod: null,

  setPeriods: (periods) => set({ periods }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
}));
