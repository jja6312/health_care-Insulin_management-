import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { message } = location.state || {
    message: "알 수 없는 에러가 발생했습니다.",
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-red-500 text-2xl">에러</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
