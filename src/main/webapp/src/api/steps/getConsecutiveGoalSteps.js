import axiosInstance from "../axiosInstance";

export const getConsecutiveGoalSteps = async () => {
  try {
    const response = await axiosInstance.get("/step/getConsecutiveGoalSteps");
    return response.data;
  } catch (error) {
    console.error("연속 목표 걸음 수 가져오기 실패", error);
    return null;
  }
};
