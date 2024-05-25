import React from "react";
import kori from "../../assets/코리.png";

const Point = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <img className="w-24" src={kori} />
      <span className="dark:text-white text-5xl font-semibold">62</span>
      <span className="text-[#AEDDE8] text-3xl font-bold">코리</span>
    </div>
  );
};

export default Point;
