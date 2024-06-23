import axiosInstance from "../axiosInstance";

export const getEvents = async () => {
  try {
    const response = await axiosInstance.get("/getEvents");
    return response.data;
  } catch (error) {
    console.error("공지 가져오기 실패", error);
    return null;
  }
};
