import React, { useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";
import Header from "../components/main/Header";
import { useUserInfoStore } from "../store/useUserInfoStore";
import Point from "../components/main/Point";

const Main = () => {
  const { setUserInfoDTO } = useUserInfoStore();
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfoDTO(userInfo);
      console.log("userInfo", userInfo);
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="dark:bg-dark min-h-screen flex flex-col py-1 px-6">
      <Header />
      <div className="flex justify-center mt-1">
        <span className="text-4xl text-nhblue dark:text-white font-semibold">
          NH 당뇨관리 리포트
        </span>
      </div>
      <div className="flex flex-col items-center mt-1">
        <span className="text-gray-400  cursor-pointer underline mt-2">
          기간 선택
        </span>
        <span className="text-xl dark:text-white ">5/10 ~ 5/16</span>
      </div>
      <Point />
    </div>
  );
};

export default Main;
