import React from "react";
import Logo from "../assets/logo.svg";
import DarkModeBtnCircle from "../components/darkMode/DarkModeBtnCircle";
import { useLoginStore } from "../store/useLoginStore";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";

const Login = () => {
  const { loginDTO, setLoginDTO, setLoading, setError, loading, error } =
    useLoginStore();
  const navigate = useNavigate();

  const handleLoginDTO = (e) => {
    setLoginDTO(e.target.id, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { accessToken, refreshToken, message } = await loginApi(loginDTO);

      if (accessToken && refreshToken) {
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("로그인 성공");
        setLoading(false);
        navigate("/"); // 성공 시 원하는 페이지로 이동
      } else {
        setError(message);
        setLoading(false);
      }
    } catch (e) {
      console.error("로그인 에러 응답 데이터:", e.response?.data);
      console.error("로그인 에러", e);
      setError(
        e.response?.data?.message ||
          "로그인에 실패했습니다. 다시 시도해 주세요."
      );
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen gap-7 bg-white dark:bg-dark md:gap-10">
      <img className="w-1/2 md:w-1/3" src={Logo} alt="logo" />
      <form className="w-2/3 md:w-1/2" onSubmit={handleSubmit}>
        {/* 사번 */}
        <div className="flex flex-col justify-between items-start">
          <label
            htmlFor="empId"
            className="text-gray-600 dark:text-white w-1/3 text-sm md:text-2xl"
          >
            사번
          </label>
          <input
            id="empId"
            className="border-2 mt-2 p-4 w-full border-gray-200 focus:border-gray-400 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none h-12 md:h-16 rounded-lg md:text-3xl dark:bg-dark text-black dark:text-white"
            onChange={handleLoginDTO}
            value={loginDTO.empId}
            type="text"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col justify-between items-start mt-4">
          <label
            htmlFor="password"
            className="text-gray-600 dark:text-white w-1/3 text-sm md:text-2xl"
          >
            비밀번호
          </label>
          <input
            id="password"
            className="border-2 mt-2 p-4 w-full border-gray-200 focus:border-gray-400 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none h-12 md:h-16 rounded-lg md:text-3xl dark:bg-dark text-black dark:text-white"
            onChange={handleLoginDTO}
            value={loginDTO.password}
            type="password"
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          className="bg-blue-500 text-white rounded-lg hover:opacity-80 transition duration-150 w-full mt-4 h-12 md:h-16 text-xl md:text-3xl"
          type="submit"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <div className="absolute right-10 bottom-10">
        <DarkModeBtnCircle />
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
