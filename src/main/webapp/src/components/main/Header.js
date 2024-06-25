import React from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import handleLogout from "../../utils/login/handleLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEventStore } from "../../store/useEventStore";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleIconClick, showSecondScreen }) => {
  const { userInfoDTO } = useUserInfoStore();
  const { readList, eventList, noticeList } = useEventStore();

  return (
    <div className="relative w-full flex justify-end items-center  my-2 text-[12px]">
      {showSecondScreen && (
        <FontAwesomeIcon
          className="text-xl absolute left-6 top-1 text-gray-500"
          onClick={handleIconClick}
          icon={faChevronLeft}
        />
      )}
      <div className="relative">
        <FontAwesomeIcon
          className="text-xl mr-3 text-gray-600 cursor-pointer hover:opacity-80"
          onClick={handleIconClick}
          icon={showSecondScreen ? faHouse : faBell}
        />
        {!showSecondScreen &&
          readList.length !== eventList.length + noticeList.length && (
            <div className="absolute -top-0 right-2 bg-red-500 rounded-full w-2 h-2"></div>
          )}
      </div>
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
