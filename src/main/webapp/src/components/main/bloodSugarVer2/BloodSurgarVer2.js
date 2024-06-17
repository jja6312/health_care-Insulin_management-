import React, { useEffect } from "react";
import { useUserInfoStore } from "../../../store/useUserInfoStore";
import useBloodSugarsVer2 from "../../../store/useBloodSugarsVer2"; // 수정된 경로에 따라 변경

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { usePeriodStore } from "../../../store/usePeriodStore";
import ChartBloodSugarVer2 from "./ChartBloodSugarVer2";
import BloodProgressKori from "./BloodProgressKori";

const BloodSurgarVer2 = () => {
  const { userInfoDTO } = useUserInfoStore();
  const {
    averageBloodSugar,
    isNormal,
    calculateAverageBloodSugar,
    bloodSugarVer2InPeriod,
    setBloodSugarVer2InPeriod,
  } = useBloodSugarsVer2();
  const { selectedPeriod } = usePeriodStore(); // 수정된 경로에 따라 변경

  useEffect(() => {
    if (userInfoDTO && userInfoDTO.bloodSugarsVer2) {
      const endOfDay = new Date(selectedPeriod.end);
      endOfDay.setHours(23, 59, 59, 999);

      calculateAverageBloodSugar(
        userInfoDTO.bloodSugarsVer2,
        selectedPeriod.start,
        endOfDay
      );

      console.log("userInfoDTO.bloodSugarsVer2", userInfoDTO.bloodSugarsVer2);

      const bloodSugarVer2InPeriod = userInfoDTO.bloodSugarsVer2.filter(
        (entry) => {
          const date = new Date(entry.dateTime);
          return date >= selectedPeriod.start && date <= endOfDay;
        }
      );
      setBloodSugarVer2InPeriod(bloodSugarVer2InPeriod);
      console.log("bloodSugarVer2InPeriod", bloodSugarVer2InPeriod);
    }
  }, [userInfoDTO, selectedPeriod, calculateAverageBloodSugar]);

  if (!userInfoDTO) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center mt-5 pt-5">
      <div className="flex justify-center">
        <div className="flex items-center text-[22px] sm:text-[27px] font-semibold">
          <FontAwesomeIcon
            className={isNormal ? "text-nhgreen" : "text-orange-400"}
            size="lg"
            icon={faCircleCheck}
          />
          <div>
            <span className="dark:text-white ml-3">평균 혈당은 </span>
            <span className={isNormal ? "text-nhgreen" : "text-orange-400"}>
              {averageBloodSugar !== null
                ? Math.round(averageBloodSugar)
                : "N/A"}
            </span>
            <span className="dark:text-white">입니다</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div
          className={`flex justify-center items-center font-semibold mt-2 ${
            averageBloodSugar !== null && averageBloodSugar > 140
              ? "text-[12px]"
              : "text-[15px]"
          }`}
        >
          <span className="text-gray-500">{userInfoDTO.empId}님은</span>
          <span
            className={` ml-2 
          ${
            averageBloodSugar !== null && averageBloodSugar > 140
              ? "text-orange-300"
              : "dark:text-green-300 text-green-500"
          }
          `}
          >
            평균 혈당이{" "}
            {averageBloodSugar !== null && averageBloodSugar > 140
              ? `표준 혈당보다 ${Math.round(averageBloodSugar - 140)} 높아요`
              : "정상이에요"}
          </span>
        </div>
      </div>

      {/* 혈당차트  */}
      {/* <div className="w-full flex justify-center">
        <ChartBloodSugarVer2 />
      </div> */}

      {/* 모달 */}
      {/* {bloodSugarVer2InPeriod.length === 0 && (
        <>
          <div className="absolute flex flex-col justify-center items-center bg-black dark:opacity-80 opacity-50 w-full md:w-1/3 h-full text-white -translate-y-5">
            <span className="text-xl">해당 기간의</span>
            <span className="text-[20px] text-yellow-300">
              💉혈당이 아직 집계되지 않았어요
            </span>
            <span className="text-[12px] text-gray-400">
              (미래전략 박수빈 계장에게 데이터를 보내주세요)
            </span>
          </div>
          <div className="h-[180px]"></div>
        </>
      )} */}

      <BloodProgressKori />
    </div>
  );
};

export default BloodSurgarVer2;
