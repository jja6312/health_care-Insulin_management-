import { create } from "zustand";

export const usePeriodStore = create((set) => ({
  periods: [],
  startDate: new Date(Date.UTC(2024, 5, 24)), // UTC 기준으로 시작일 설정

  selectedPeriod: null,

  setPeriods: (periods) => set({ periods }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
}));
