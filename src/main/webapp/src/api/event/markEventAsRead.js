import axiosInstance from "../axiosInstance";

export const markEventAsRead = async (eventId) => {
  try {
    const response = await axiosInstance.post(`/events/${eventId}/read`);
    return response; // 응답값 반환
  } catch (error) {
    console.error("이벤트 읽기 에러", error);
    throw error; // 에러를 다시 던져서 호출자에게 전달
  }
};
