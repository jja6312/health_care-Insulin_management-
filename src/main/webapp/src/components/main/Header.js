import React from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";

const Header = () => {
  const { userInfoDTO } = useUserInfoStore();

  return (
    <div className="w-full flex justify-end my-3 ">
      <span className="dark:text-gray-500 text-gray-600 ">
        {userInfoDTO?.empId} 님
      </span>
      <span className="dark:text-gray-500 mx-3 text-gray-600"> | </span>
      <span className="dark:text-gray-500 text-gray-600 cursor-pointer underline">
        로그아웃
      </span>
    </div>
  );
};

export default Header;
