import React, { useEffect } from "react";
import { useUserInfoStore } from "../../../store/useUserInfoStore";
import useBloodSugarsVer2 from "../../../store/useBloodSugarsVer2"; // 수정된 경로에 따라 변경

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { usePeriodStore } from "../../../store/usePeriodStore";

const BloodSurgarVer2 = () => {
  const { userInfoDTO } = useUserInfoStore();
  const { averageBloodSugar, isNormal, calculateAverageBloodSugar } =
    useBloodSugarsVer2();
  const { selectedPeriod } = usePeriodStore(); // 수정된 경로에 따라 변경

  useEffect(() => {
    if (userInfoDTO && userInfoDTO.bloodSugarsVer2) {
      calculateAverageBloodSugar(
        userInfoDTO.bloodSugarsVer2,
        selectedPeriod.start,
        selectedPeriod.end
      );
    }
  }, [userInfoDTO, selectedPeriod, calculateAverageBloodSugar]);

  if (!userInfoDTO) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
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
        <div className="flex justify-center items-center font-semibold mt-2 text-[12px]">
          <span className="text-gray-500">{userInfoDTO.empId}님은</span>
          <span
            className={` ml-2 
          ${
            averageBloodSugar !== null && averageBloodSugar > 140
              ? "text-orange-300"
              : "text-green-300"
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
      {/* {stepsInPeriod.length === 0 && (
        <>
          <div className="absolute flex justify-center items-center bg-black opacity-80 w-full h-full text-white ">
            <span>해당 기간 걸음수가 아직 입력되지 않았어요😊</span>
          </div>
          <div className="h-[160px]"></div>
        </>
      )} */}
    </div>
  );
};

export default BloodSurgarVer2;
