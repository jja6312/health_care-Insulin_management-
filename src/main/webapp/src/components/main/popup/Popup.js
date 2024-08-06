import React, { useState, useEffect } from "react";

import popup17 from "../../../assets/popup/popup17.jpg";
import { usePopupStore } from "../../../store/usePopupStore";

const images = [popup17];

const Popup = () => {
  const { setOpenPopup } = usePopupStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleDoNotShowToday = () => {
    const today = new Date();
    const expireTime = new Date(today.setHours(23, 59, 59, 999));
    localStorage.setItem("popupDoNotShowUntil", expireTime);
    handleClose();
  };

  useEffect(() => {
    const doNotShowUntil = new Date(
      localStorage.getItem("popupDoNotShowUntil")
    );
    const now = new Date();
    if (doNotShowUntil && now < doNotShowUntil) {
      setOpenPopup(false);
    }
  }, [setOpenPopup]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80"
      onClick={handleOutsideClick}
    >
      <div className="relative w-11/12 max-w-4xl h-[340px] overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute flex justify-center items-start inset-0 transition-opacity duration-1000 
              bg-white
              ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={img}
              className="block w-full object-fit"
              alt={`popup${index + 1}`}
            />
          </div>
        ))}
        <button
          type="button"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-white rounded-full text-nhgreen shadow-md"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-white rounded-full text-nhgreen shadow-md"
          onClick={nextSlide}
        >
          &gt;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === index ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        {/* 삭제해야할 앵커  */}
        <div className="flex justify-end items-center z-50">
          {/* <a
            href="https://youtube.com/shorts/7y0-rxLCI0A?feature=shared"
            className="absolute bottom-12 right-0 h-12 text-lg text-blue-500 underline bg-white w-full flex justify-center items-center"
          >
            음주와  저혈당
          </a> */}
          <span>음주와 저혈당</span>
        </div>
      </div>
      <div className="flex justify-end w-11/12 ">
        <div className="cursor-pointer mr-2" onClick={handleDoNotShowToday}>
          <span className="text-white">오늘 하루 보지 않기</span>
        </div>
        <div
          className="bg-red-500 px-2 cursor-pointer"
          onClick={() => setOpenPopup(false)}
        >
          <span className="text-white">close</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
