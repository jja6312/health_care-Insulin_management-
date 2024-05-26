import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getUserInfo } from "../api/getUserInfo";
import Header from "../components/main/Header";
import { useUserInfoStore } from "../store/useUserInfoStore";
import Point from "../components/main/Point";
import { formatDate, getWeeklyPeriods, stripTime } from "../utils/dateUtils";
import logo from "../assets/logo2.gif";
import Period from "../components/main/Period";

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
    </div>
  );
};

export default Main;
