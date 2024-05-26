import React, { useState } from "react";
import kori from "../../assets/코리.png";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import numberFormat from "../../utils/numberFormat";
import "../../css/main/point.css";

const textArray = [
  "기분 좋아!",
  "코리가 도와줄게요!",
  "우리 운동하자!",
  "코리는 포인트야!",
  "걸음수로 코리를 모아봐!",
  "코리가 응원해요!",
];

const Point = () => {
  const { userInfoDTO } = useUserInfoStore();
  const [texts, setTexts] = useState([]);

  const textFloat = () => {
    const text = textArray[Math.floor(Math.random() * textArray.length)];
    const id = Date.now(); // Unique ID
    setTexts((prevTexts) => [...prevTexts, { id, text }]);

    // 텍스트를 일정 시간 후에 제거
    setTimeout(() => {
      setTexts((prevTexts) => prevTexts.filter((t) => t.id !== id));
    }, 2000); // 2초 후 제거
  };

  const handleKoriClick = () => {
    const koriElement = document.querySelector(".kori");
    koriElement.classList.add("jump");
    koriElement.addEventListener(
      "animationend",
      () => {
        koriElement.classList.remove("jump");
      },
      { once: true }
    );

    textFloat();
  };

  return (
    // grid로 1:2:2:2:1 배치
    <div className="gap-1 md:gap-4 mt-5 w-full flex justify-center items-center relative">
      {texts.map((item) => (
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
          onClick={handleKoriClick}
        />
      </div>
      <div className="flex items-center justify-center w-1/8">
        <span className="dark:text-white text-4xl font-semibold">
          {numberFormat(userInfoDTO?.totalPoints)}
        </span>
      </div>
      <div className="flex items-center justify-center w-1/4 md:w-1/12">
        <span className="text-[#55aed4] dark:text-[#AEDDE8] text-2xl font-bold">
          코리
        </span>
      </div>
    </div>
  );
};

export default Point;
