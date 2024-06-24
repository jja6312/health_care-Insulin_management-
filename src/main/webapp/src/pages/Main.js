import React, { useState } from "react";
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

Modal.setAppElement("#root");

const Main = () => {
  const { setTexts } = usePointStore();
  const { openPopup } = usePopupStore();
  const [showSecondScreen, setShowSecondScreen] = useState(false);

  const handleIconClick = () => {
    setShowSecondScreen(!showSecondScreen);
  };

  return (
    <div
      className="dark:bg-dark min-h-screen flex flex-col py-1 relative"
      onClick={() => handleKoriClick(setTexts, textArray)}
    >
      <Header handleIconClick={handleIconClick} />

      {openPopup && <Popup />}
      <div
        className={`dark:bg-dark screen mainScreen mt-10 ${
          showSecondScreen ? "slideOutLeft" : "slideInRight"
        }`}
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
      <div
        className={`screen secondScreen  mt-10 ${
          showSecondScreen ? "slideInRight" : "slideOutLeft"
        }`}
      >
        <SecondScreen />
      </div>
    </div>
  );
};

export default Main;
