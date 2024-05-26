import create from "zustand";

export const useStepStore = create((set) => ({
  stepsInPeriod: [],
  averageSteps: 0,
  setStepsInPeriod: (steps) => set({ stepsInPeriod: steps }),
  setAverageSteps: (average) => set({ averageSteps: average }),
}));
