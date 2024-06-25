import create from "zustand";

export const useStepStore = create((set) => ({
  stepsInPeriod: [],
  averageSteps: 0,
  countConsecutiveGoalSteps: 0, //연속 걸음수 목표 달성 횟수
  setStepsInPeriod: (steps) => set({ stepsInPeriod: steps }),
  setAverageSteps: (average) => set({ averageSteps: average }),
  setCountConsecutiveGoalSteps: (count) =>
    set({ countConsecutiveGoalSteps: count }),
}));
