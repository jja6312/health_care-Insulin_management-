import axiosInstance from "../axiosInstance";

export const getNotices = async () => {
  try {
    const response = await axiosInstance.get("/getNotices");
    return response.data;
  } catch (error) {
    console.error("알림 가져오기 실패", error);
    return null;
  }
};
