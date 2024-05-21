import axiosInstance from "./axiosInstance";

export const loginApi = async (loginDTO) => {
  const response = await axiosInstance.post("/login", loginDTO);
  return response.data;
};
