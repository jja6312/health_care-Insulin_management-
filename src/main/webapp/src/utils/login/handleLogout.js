import { useNavigate } from "react-router-dom";

const handleLogout = (navigate) => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  localStorage.removeItem("refreshToken");
  navigate("/login");
};

export default handleLogout;
