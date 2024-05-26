const handleLogout = () => {
  sessionStorage.removeItem("accessToken");
  window.location.href = "/login";
};

export default handleLogout;
