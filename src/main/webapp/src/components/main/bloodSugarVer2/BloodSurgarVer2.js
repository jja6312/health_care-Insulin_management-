import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../../store/useUserInfoStore";
import useBloodSugarsVer2 from "../../../store/useBloodSugarsVer2"; // 수정된 경로에 따라 변경

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { usePeriodStore } from "../../../store/usePeriodStore";
import ChartBloodSugarVer2 from "./ChartBloodSugarVer2";
import BloodProgressKori from "./BloodProgressKori";
import WarningMessage from "./WarningMessage";

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

  const [showWarning, setShowWarning] = useState(false); //WarningMessage 표시 여부를 관리하는 상태

  useEffect(() => {
    if (userInfoDTO && userInfoDTO.bloodSugarsVer2 && selectedPeriod) {
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

      //----------------------------------------------
      //긴급알림 localstorage 로직
      //오늘이 일요일 이후인지 확인하고, 해당 주차에 대해 WarningMessage를 표시할지 결정
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

      if (
        // selectedPeriod.start <= today &&
        // selectedPeriod.end >= today &&
        dayOfWeek >= 0 &&
        //혈당 데이터가 3회 미만인경우
        bloodSugarVer2InPeriod.length < 3
      ) {
        const weekKey = `hideWarning_week_${selectedPeriod.week}`;
        if (!localStorage.getItem(weekKey)) {
          //해당주차 weekKey가 없으면
          setShowWarning(true); //WarningMessage를 표시
        } else {
          //해당주차 weekKey가 있으면
          setShowWarning(false); //끄기
        }
      } else {
        //3회이상측정했으면
        setShowWarning(false); //끄기
      }
    }
  }, [
    userInfoDTO,
    selectedPeriod,
    calculateAverageBloodSugar,
    setBloodSugarVer2InPeriod,
  ]);

  // 추가: '확인' 버튼 클릭 핸들러
  const handleConfirm = () => {
    const weekKey = `hideWarning_week_${selectedPeriod.week}`;
    localStorage.setItem(weekKey, true);
    setShowWarning(false);
  };

  if (!userInfoDTO || !selectedPeriod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center mt-5 pt-5">
      {showWarning && <WarningMessage onConfirm={handleConfirm} />}
      <div className="flex justify-center">
        <div className="flex items-center text-[22px] sm:text-[27px] font-semibold">
          <FontAwesomeIcon
            className={`${
              bloodSugarVer2InPeriod.length >= 3
                ? "text-green-500"
                : "text-orange-400"
            }`}
            // {isNormal ? "text-nhgreen" : "text-orange-400"}

            size="lg"
            icon={faCircleCheck}
          />
          <div>
            <span className="dark:text-white ml-3">이번주 </span>
            <span
              className={`${
                bloodSugarVer2InPeriod.length >= 3
                  ? "dark:text-green-300 text-green-500"
                  : "text-orange-400"
              }`}
              // {isNormal ? "text-nhgreen" : "text-orange-400"}
            >
              {/* {averageBloodSugar !== null
                ? Math.round(averageBloodSugar)
                : "N/A"} */}
              {bloodSugarVer2InPeriod.length}회 측정
            </span>
            <span className="dark:text-white">했어요</span>
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
          <span className="text-gray-500">{userInfoDTO.empId}님,</span>
          <span
            className={` ml-2 
          ${
            bloodSugarVer2InPeriod.length >= 3
              ? "dark:text-green-300 text-green-500"
              : "text-orange-400"
          }
          `}
          >
            {bloodSugarVer2InPeriod.length >= 7
              ? "우수 7회 혈당체크를 달성했어요"
              : bloodSugarVer2InPeriod.length >= 5
              ? "권장 5회 혈당체크를 달성했어요"
              : bloodSugarVer2InPeriod.length >= 3
              ? "최소 3회 혈당체크를 달성했어요"
              : bloodSugarVer2InPeriod.length === 2
              ? "혈당을 2회 측정했어요"
              : bloodSugarVer2InPeriod.length === 1
              ? "혈당을 1회 측정했어요"
              : "혈당을 아직 측정하지 않았어요"}
          </span>
          {/* <span
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
          </span> */}
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
