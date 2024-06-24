import axiosInstance from "../axiosInstance";

export const getReadListByEmpId = async () => {
  try {
    const response = await axiosInstance.get("/events/readList");
    return response.data;
  } catch (error) {
    console.error("읽은 이벤트 가져오기 에러", error);
    throw error;
  }
};
