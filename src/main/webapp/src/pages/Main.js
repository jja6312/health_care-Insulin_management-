import React, { useEffect, useState } from "react";
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
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="dark:bg-dark min-h-screen flex flex-col py-3 px-6">
      <Header />
      <div className="flex justify-center mt-1">
        <span className="text-4xl dark:text-white font-semibold">
          NH 당뇨관리 리포트
        </span>
      </div>
      <div className="flex flex-col items-center mt-3">
        <span className="dark:text-gray-500 text-gray-600 cursor-pointer underline mt-2">
          기간 선택
        </span>
        <span className="text-3xl dark:text-white  mt-2">5/10 ~ 5/16</span>
      </div>
      <Point />
    </div>
  );
};

export default Main;
