import axiosInstance from "./axiosInstance";

export const getBloodCountAvgInPeriod = async (start, end) => {
  try {
    const response = await axiosInstance.get("/blood/count/avg", {
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("기간에 따른 혈당 측정 평균 가져오기 실패", error);
    return null;
  }
};
