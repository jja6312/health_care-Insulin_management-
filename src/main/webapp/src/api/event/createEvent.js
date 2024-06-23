import axiosInstance from "../axiosInstance";

export const createEvent = async (eventDTO) => {
  try {
    if (prompt("비밀번호입력") === "지안") {
      const response = await axiosInstance.post("/createEvent", eventDTO);
      console.log("이벤트 등록 성공", response.data);
      return response.data;
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error("이벤트 등록에 문제가 있습니다.", error);
    return null;
  }
};
