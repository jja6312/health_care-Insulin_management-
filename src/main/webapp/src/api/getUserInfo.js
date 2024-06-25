import axiosInstance from "./axiosInstance";

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
    return null;
  }
};
