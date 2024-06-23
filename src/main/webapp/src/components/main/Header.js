import React from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import handleLogout from "../../utils/login/handleLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleIconClick }) => {
  const { userInfoDTO } = useUserInfoStore();

  return (
    <div className="w-full flex justify-end items-center  my-2 text-[12px]">
      <FontAwesomeIcon
        className="mr-3 text-gray-600 cursor-pointer hover:opacity-80"
        onClick={handleIconClick}
        icon={faBell}
      />
      <span className=" text-gray-600 ">{userInfoDTO?.empId} 님</span>
      <span className=" mx-3 text-gray-600"> | </span>
      <span
        className=" text-gray-600 cursor-pointer underline mr-4"
        onClick={handleLogout}
      >
        로그아웃
      </span>
    </div>
  );
};

export default Header;
