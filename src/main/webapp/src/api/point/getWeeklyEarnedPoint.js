import axiosInstance from "../axiosInstance";

export const getWeeklyEarnedPoints = async (startDate) => {
  try {
    const response = await axiosInstance.get("/getWeeklyEarnedPoints", {
      params: {
        startDate: startDate.toISOString().split("T")[0],
      },
    });
    return response.data;
  } catch (error) {
    console.error("주간 포인트 가져오기 실패", error);
    return null;
  }
};
