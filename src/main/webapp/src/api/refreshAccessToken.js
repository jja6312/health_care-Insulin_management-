import axiosInstance from "./axiosInstance"; // axiosInstance 경로에 맞게 수정

const refreshAccessToken = async () => {
  const refreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token found");
    return false;
  }

  try {
    console.log("Refreshing access token..."); // 로그 추가
    const response = await axiosInstance.post("/refresh", { refreshToken });
    if (response.status === 200) {
      const { accessToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      console.log("Access token refreshed successfully"); // 로그 추가
      return true;
    }
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return false;
  }
};

export default refreshAccessToken;
