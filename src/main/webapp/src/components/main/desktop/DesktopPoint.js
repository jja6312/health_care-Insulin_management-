import React from "react";
import kori from "../../../assets/코리.png";

const DesktopPoint = () => {
  return (
    <div className="gap-4 mt-6 w-full flex justify-center items-center">
      <div className="flex items-center justify-center w-1/12">
        <img className=" w-full max-w-24" alt="코리" src={kori} />
      </div>
      <div className="flex items-center justify-center  w-1/12">
        <span className=" dark:text-white text-5xl font-semibold">62</span>
      </div>
      <div className="flex items-center justify-center  w-1/12">
        <span className=" text-[#AEDDE8] text-3xl font-bold">코리</span>
      </div>
    </div>
  );
};

export default DesktopPoint;
