import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Header from "../components/main/Header";
import Point from "../components/main/Point";
import logo from "../assets/logo2.gif";
import Period from "../components/main/Period";
import Steps from "../components/main/Steps";
import BloodSurgarVer2 from "../components/main/bloodSugarVer2/BloodSurgarVer2";
import { textArray } from "../utils/point/pointText";
import { handleKoriClick } from "../utils/point/pointHelpers";
import { usePointStore } from "../store/usePointStore";
import { usePopupStore } from "../store/usePopupStore";
import Popup from "../components/main/popup/Popup";

import "../css/main/Main.css";
import SecondScreen from "../components/main/secondScreen/SecondScreen";
import { useEventStore } from "../store/useEventStore";
import EventModal from "../components/main/secondScreen/modal/EventModal";

Modal.setAppElement("#root");

const Main = () => {
  const { setTexts } = usePointStore();
  const { openPopup } = usePopupStore();
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const { isEventModalOpen } = useEventStore();
  const mainRef = useRef(null);
  const secondScreenRef = useRef(null);

  const handleIconClick = () => {
    setShowSecondScreen(!showSecondScreen);
  };
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    const darkMode2 = localStorage.getItem("theme");
    if (darkMode === "dark" || darkMode2 === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // useEffect(() => {
  //   //showSecondScreen이 true로 바뀌면 0.5초뒤에 실행
  //   if (showSecondScreen) {
  //     // setTimeout(() => {
  //     //   mainRef.current.style.display = "none";
  //     // }, 500);
  //     // secondScreenRef.current.style.display = "block";
  //   }
  //   //showSecondScreen이 false로 바뀌면 실행
  //   if (!showSecondScreen) {
  //     setTimeout(() => {
  //       secondScreenRef.current.style.display = "none";
  //     }, 500);
  //   }
  // }, [showSecondScreen]);

  return (
    <div
      className="dark:bg-dark min-h-screen flex flex-col py-1 relative"
      onClick={() => handleKoriClick(setTexts, textArray)}
    >
      <Header
        handleIconClick={handleIconClick}
        showSecondScreen={showSecondScreen}
      />

      {openPopup && <Popup />}
      <div
        ref={mainRef}
        className={`dark:bg-dark h-full screen mainScreen mt-10 ${
          showSecondScreen ? "slideOutLeft" : "slideInRight"
        }
        
        `}
      >
        <div className="flex justify-center mt-1 gap-2">
          <img src={logo} className="w-7" alt="logo" />
          <span className="text-[27px] text-nhblue dark:text-nhblue font-extrabold">
            NH 당뇨관리 리포트
          </span>
        </div>
        <Period />
        <Point />
        <Steps />
        <BloodSurgarVer2 />
      </div>

      {/* 2번째스크린 : 이벤트 화면 */}
      <div
        className={`screen secondScreen mt-10 ${
          showSecondScreen ? "slideInRight" : "slideOutLeft"
        }`}
        ref={secondScreenRef}
      >
        <SecondScreen showSecondScreen={showSecondScreen} />
      </div>
      {isEventModalOpen && <EventModal />}
    </div>
  );
};

export default Main;
