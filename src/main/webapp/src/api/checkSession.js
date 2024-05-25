import axiosInstance from "./axiosInstance"; // axiosInstance 경로에 맞게 수정

const checkSession = async () => {
  try {
    const response = await axiosInstance.get("/check-session");
    console.log("checkSession, response:" + response);
    return response.status === 200;
  } catch (error) {
    console.error("세션 체크 실패", error);
    return false;
  }
};

export default checkSession;
