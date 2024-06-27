import { useNavigate } from "react-router-dom";

const handleLogout = (navigate) => {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken"); // 만약 로컬 스토리지의 리프레시 토큰도 제거해야 한다면 추가
  navigate("/login");
};

export default handleLogout;
