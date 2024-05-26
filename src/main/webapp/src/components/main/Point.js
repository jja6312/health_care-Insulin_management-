import React from "react";
import kori from "../../assets/코리.png";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import numberFormat from "../../utils/numberFormat";

const Point = () => {
  const { userInfoDTO } = useUserInfoStore();

  return (
    // grid로 1:2:2:2:1 배치
    <div className="gap-1 md:gap-4 mt-5  w-full flex justify-center items-center">
      <div className="flex items-center justify-center w-1/4 md:w-1/12 mr-1">
        <img className=" w-10/12 max-w-24" alt="코리" src={kori} />
      </div>
      <div className="flex items-center justify-center  w-1/8">
        <span className=" dark:text-white text-4xl font-semibold">
          {numberFormat(userInfoDTO.totalPoints)}
        </span>
      </div>
      <div className="flex items-center justify-center  w-1/4 md:w-1/12">
        <span className=" text-[#66c4d9] dark:text-[#AEDDE8]  text-2xl font-bold">
          코리
        </span>
      </div>
    </div>
  );
};

export default Point;
