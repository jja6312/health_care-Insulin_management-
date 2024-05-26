import React from "react";
import kori from "../../../assets/코리.png";

const MobilePoint = () => {
  return (
    <div className="gap-4 mt-6 grid grid-cols-12">
      <div className="col-span-1 "></div>
      <div
        className="flex items-center justify-center
      col-span-3"
      >
        <img className=" w-full" alt="코리" src={kori} />
      </div>
      <div
        className="flex items-center justify-center
      col-span-3"
      >
        <span className=" dark:text-white text-4xl font-semibold">62</span>
      </div>
      <div
        className="flex items-center justify-center
      col-span-3"
      >
        <span className="text-[#66c4d9] dark:text-[#AEDDE8] text-2xl font-bold">
          코리
        </span>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default MobilePoint;
