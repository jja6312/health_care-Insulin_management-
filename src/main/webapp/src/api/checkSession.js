import axiosInstance from "./axiosInstance";

const refreshAccessToken = async () => {
  const refreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token found");
    return false;
  }

  try {
    const response = await axiosInstance.post("/refresh", { refreshToken });
    if (response.status === 200) {
      const { accessToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      console.log("Access token refreshed successfully");
      return true;
    } else {
      console.error("Failed to refresh access token", response);
      return false;
    }
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return false;
  }
};

const checkSession = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("No access token found");
      const refreshed = await refreshAccessToken();
      return refreshed;
    }

    const response = await axiosInstance.get("/check-session", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      const refreshed = await refreshAccessToken();
      return refreshed;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("로그아웃 진행. 세션이 만료되었습니다.");
    } else {
      console.error("세션 체크 실패", error);
    }

    return false;
  }
};

export default checkSession;
