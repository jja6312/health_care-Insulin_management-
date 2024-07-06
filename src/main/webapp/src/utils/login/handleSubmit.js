import { loginApi } from "../../api/authApi";

const handleSubmit = async (
  e,
  navigate,
  setLoading,
  setError,
  loginDTO,
  rememberMe
) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const { accessToken, refreshToken, message } = await loginApi(loginDTO);

    if (accessToken && refreshToken) {
      sessionStorage.setItem("accessToken", accessToken);
      if (rememberMe) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        sessionStorage.setItem("refreshToken", refreshToken);
      }
      console.log("로그인 성공");
      setLoading(false);
      navigate("/");
    } else {
      setError(message);
      setLoading(false);
    }
  } catch (e) {
    console.error("로그인 에러 응답 데이터:", e.response?.data);
    console.error("로그인 에러", e);
    setError(
      e.response?.data?.message ||
        "로그인에 실패했습니다. 미래전략 박수빈 계장님께 문의해주세요."
    );
    console.log("로그인 실패");
    console.log("로그인 에러 응답 데이터:", e.response?.data);
    setLoading(false);
  }
};

export default handleSubmit;
