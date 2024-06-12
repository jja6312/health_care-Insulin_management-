import React from "react";
import kori from "../../assets/코리.png";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import numberFormat from "../../utils/numberFormat";
import "../../css/main/point.css";
import { usePointStore } from "../../store/usePointStore";

const Point = ({ onKoriClick }) => {
  const { userInfoDTO } = useUserInfoStore();
  const { texts } = usePointStore();

  console.log("Current texts:", texts); // Debug log

  return (
    // grid로 1:2:2:2:1 배치
    <div className="gap-1 md:gap-4 mt-5 w-full flex justify-center items-center relative">
      {Array.isArray(texts) &&
        texts.map((item) => (
          <span
            key={item.id}
            className="point-text text-nhblue dark:text-white absolute left-0 -top-10"
          >
            {item.text}
          </span>
        ))}
      <div className="flex items-center justify-center w-1/4 md:w-1/12 mr-1">
        <img
          className="w-10/12 max-w-24 kori"
          alt="코리"
          src={kori}
          onClick={onKoriClick}
        />
      </div>
      <div className="flex items-center justify-center w-1/8">
        <span className="dark:text-white text-4xl font-semibold">
          {numberFormat(userInfoDTO?.totalPoints)}
        </span>
      </div>
      <div className="flex items-center justify-center w-1/4 md:w-1/12">
        <span className="text-[#55aed4] dark:text-[#AEDDE8] text-2xl font-bold -translate-x-2 translate-y-1">
          코리
        </span>
      </div>
    </div>
  );
};

export default Point;
