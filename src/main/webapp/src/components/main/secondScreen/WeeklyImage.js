import React, { useState } from "react";

import image1 from "../../../assets/eventImages/1회차/1.jpg";
import image2 from "../../../assets/eventImages/1회차/2.jpg";
import image3 from "../../../assets/eventImages/1회차/3.jpg";
import image4 from "../../../assets/eventImages/1회차/4.jpg";
import image5 from "../../../assets/eventImages/1회차/5.jpg";
import image6 from "../../../assets/eventImages/1회차/6.jpg";
import image7 from "../../../assets/eventImages/1회차/7.jpg";
import image8 from "../../../assets/eventImages/1회차/8.jpg";
import image9 from "../../../assets/eventImages/1회차/9.jpg";
import image10 from "../../../assets/eventImages/1회차/10.jpg";
import image11 from "../../../assets/eventImages/1회차/11.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
];

const WeeklyImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full max-w-4xl h-96 overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              className="block w-full h-full object-fit"
              alt={`slide${index + 1}`}
            />
          </div>
        ))}
        <button
          type="button"
          className="absolute text-nhblue top-1/2 -left-1 transform -translate-y-1/2 px-3 py-1 bg-white rounded-full shadow-md"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          type="button"
          className="absolute text-nhblue top-1/2 -right-1 transform -translate-y-1/2 px-3 py-1 bg-white rounded-full shadow-md"
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
      </div>
    </div>
  );
};

export default WeeklyImage;
