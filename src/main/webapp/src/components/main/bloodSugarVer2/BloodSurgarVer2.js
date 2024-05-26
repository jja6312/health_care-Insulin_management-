import React, { useEffect } from "react";
import { useUserInfoStore } from "../../../store/useUserInfoStore";
import useBloodSugarsVer2Store from "../../../store/useBloodSugarsVer2"; // 수정된 경로에 따라 변경

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { usePeriodStore } from "../../../store/usePeriodStore";

const BloodSurgarVer2 = () => {
  const { userInfoDTO } = useUserInfoStore();
  const { averageBloodSugar, isNormal, calculateAverageBloodSugar } =
    useBloodSugarsVer2Store();
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
    <div className="flex flex-col justify-center items-start mt-10">
      <div className="flex justify-center">
        <div className="flex items-center text-[27px] font-semibold">
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
        <div className="flex justify-center items-center font-semibold mt-2">
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
    </div>
  );
};

export default BloodSurgarVer2;
