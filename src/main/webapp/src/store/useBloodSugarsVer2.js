import { create } from "zustand";

const useBloodSugarsVer2Store = create((set) => ({
  averageBloodSugar: null,
  isNormal: true,
  bloodSugarVer2InPeriod: [],
  calculateAverageBloodSugar: (bloodSugarsVer2, start, end) => {
    const filteredBloodSugars = bloodSugarsVer2.filter((entry) => {
      const date = new Date(entry.dateTime);
      return date >= start && date <= end;
    });

    if (filteredBloodSugars.length > 0) {
      const total = filteredBloodSugars.reduce(
        (sum, entry) => sum + entry.bloodSugarVer2,
        0
      );
      const average = total / filteredBloodSugars.length;
      set({
        averageBloodSugar: average,
        isNormal: average <= 140,
      });
    } else {
      set({
        averageBloodSugar: null,
        isNormal: true,
      });
    }
  },
  setBloodSugarVer2InPeriod: (bloodSugarVer2InPeriod) =>
    set({ bloodSugarVer2InPeriod }),
}));

export default useBloodSugarsVer2Store;
