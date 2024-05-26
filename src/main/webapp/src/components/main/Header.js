import React from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import handleLogout from "../../utils/login/handleLogout";

const Header = () => {
  const { userInfoDTO } = useUserInfoStore();

  return (
    <div className="w-full flex justify-end my-2 ">
      <span className=" text-gray-400 ">{userInfoDTO?.empId} 님</span>
      <span className=" mx-3 text-gray-400"> | </span>
      <span
        className=" text-gray-400 cursor-pointer underline"
        onClick={handleLogout}
      >
        로그아웃
      </span>
    </div>
  );
};

export default Header;
