import React from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { useNavigate } from "react-router-dom";
import handleLogout from "../../utils/login/handleLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEventStore } from "../../store/useEventStore";
import { usePopupStore } from "../../store/usePopupStore";
import { useSecondScreenStore } from "../../store/useSecondScreenStore";

const Header = ({ handleIconClick, showSecondScreen }) => {
  const { userInfoDTO } = useUserInfoStore();
  const { setShowSecondScreen } = useSecondScreenStore();

  const { readList, eventList, noticeList } = useEventStore();
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex justify-end items-center my-2 text-[12px]">
      {noticeList
        ?.filter((e) => e.title.includes("주차")) // includes 메소드로 변경
        .filter((e) => !e.readByUsers.includes(userInfoDTO.empId)).length > // some 메소드로 변경
        0 && (
        <span
          className="bg-yellow-400 text-black py-1 px-2 mr-4"
          onClick={() => {
            setShowSecondScreen(true);
          }}
        >
          리브레 메시지 확인
        </span>
      )}
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
        onClick={() => handleLogout(navigate)}
      >
        로그아웃
      </span>
    </div>
  );
};

export default Header;
