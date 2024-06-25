import { create } from "zustand";

const useBloodSugarsVer2 = create((set) => ({
  bloodCountAvgInPeriod: 0, //전체유저 혈당 체크 회수 평균

  averageBloodSugar: null, // 개인 혈당 평균
  isNormal: true,
  bloodSugarVer2InPeriod: [],
  calculateAverageBloodSugar: (bloodSugarsVer2, start, end) => {
    // end 날짜를 포함하기 위해 23:59:59로 설정
    const endOfDay = new Date(end);
    endOfDay.setHours(23, 59, 59, 999);

    const filteredBloodSugars = bloodSugarsVer2.filter((entry) => {
      const date = new Date(entry.dateTime);
      return date >= start && date <= endOfDay;
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
  setBloodCountAvgInPeriod: (bloodCountAvgInPeriod) =>
    set({ bloodCountAvgInPeriod }),
  setBloodSugarVer2InPeriod: (bloodSugarVer2InPeriod) =>
    set({ bloodSugarVer2InPeriod }),
}));

export default useBloodSugarsVer2;
