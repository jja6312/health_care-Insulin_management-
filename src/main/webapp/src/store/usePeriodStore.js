import { create } from "zustand";

export const usePeriodStore = create((set) => ({
  periods: [],
  startDate: new Date(2024, 5, 17), // 시작일
  selectedPeriod: null,

  setPeriods: (periods) => set({ periods }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
}));
