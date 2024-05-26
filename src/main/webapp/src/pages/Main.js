import React from "react";
import Modal from "react-modal";
import Header from "../components/main/Header";
import Point from "../components/main/Point";
import logo from "../assets/logo2.gif";
import Period from "../components/main/Period";
import Steps from "../components/main/Steps";
import BloodSurgarVer2 from "../components/main/bloodSugarVer2/BloodSurgarVer2";

Modal.setAppElement("#root");

const Main = () => {
  return (
    <div className="dark:bg-dark min-h-screen flex flex-col py-1 px-6">
      <Header />

      <div className="flex justify-center mt-1 gap-2">
        <img src={logo} className="w-7" alt="logo" />
        <span className="text-3xl text-nhblue dark:text-nhblue font-semibold">
          NH 당뇨관리 리포트
        </span>
      </div>
      <Period />
      <Point />
      <Steps />
      <BloodSurgarVer2 />
    </div>
  );
};

export default Main;
