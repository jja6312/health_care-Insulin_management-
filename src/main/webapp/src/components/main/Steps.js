import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { usePeriodStore } from "../../store/usePeriodStore";
import { useStepStore } from "../../store/useStepStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ChartStep from "./step/ChartStep";
import numberFormat from "../../utils/numberFormat";
import { getConsecutiveGoalSteps } from "../../api/steps/getConsecutiveGoalSteps";
import GradientFire from "./GradientFire";
import { useDarkModeStore } from "../../store/useDarkModeStore";

const Steps = () => {
  const { userInfoDTO } = useUserInfoStore();
  const { isDarkMode } = useDarkModeStore();
  const { selectedPeriod } = usePeriodStore();
  const {
    countConsecutiveGoalSteps,
    setCountConsecutiveGoalSteps,
    stepsInPeriod,
    setStepsInPeriod,
    setAverageSteps,
    averageSteps,
  } = useStepStore();
  const [moreOrLessStep, setMoreOrLessStep] = useState(false);
  const [subStep, setSubStep] = useState(0);
  const [stepColor, setStepColor] = useState("text-nhgreen");

  const stripTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const stepGoalSubAvgerageStep = (stepGoal) => {
    if (averageSteps > stepGoal) {
      setMoreOrLessStep(true);
      setSubStep(averageSteps - stepGoal);
    } else {
      setMoreOrLessStep(false);
      setSubStep(stepGoal - averageSteps);
    }
  };

  useEffect(() => {
    if (userInfoDTO?.stepGoal && averageSteps) {
      stepGoalSubAvgerageStep(userInfoDTO.stepGoal);
      setStepColor(
        averageSteps >= userInfoDTO.stepGoal
          ? "text-nhgreen"
          : "text-orange-400"
      );
    }
  }, [userInfoDTO, averageSteps]);

  useEffect(() => {
    if (selectedPeriod && userInfoDTO.steps) {
      const startDate = stripTime(new Date(selectedPeriod.start));
      const endDate = stripTime(new Date(selectedPeriod.end));

      const stepsInPeriod = userInfoDTO.steps.filter((step) => {
        const stepDate = stripTime(new Date(step.date));
        return stepDate >= startDate && stepDate <= endDate;
      });

      setStepsInPeriod(stepsInPeriod);

      const totalSteps = stepsInPeriod.reduce(
        (sum, step) => sum + step.stepsCount,
        0
      );
      const averageSteps =
        stepsInPeriod.length > 0
          ? Math.round(totalSteps / stepsInPeriod.length)
          : 0;

      setAverageSteps(averageSteps);
    }
  }, [selectedPeriod, userInfoDTO, setStepsInPeriod, setAverageSteps]);

  useEffect(() => {
    const fetchConsecutiveGoalSteps = async () => {
      const consecutiveGoalSteps = await getConsecutiveGoalSteps();
      setCountConsecutiveGoalSteps(consecutiveGoalSteps);
    };
    fetchConsecutiveGoalSteps();
  }, [setCountConsecutiveGoalSteps]);

  return (
    <div className="relative flex flex-col justify-center items-center pt-5 mt-5 ">
      <div className="flex justify-center ">
        <div className="flex items-center text-[20px] sm:text-[27px] font-semibold">
          <FontAwesomeIcon
            className={stepColor}
            size="lg"
            icon={faCircleCheck}
          />
          <span className="dark:text-white ml-3">일평균</span>
          <span className={stepColor + " ml-2"}>
            {numberFormat(Math.round(averageSteps))}
          </span>
          <span className="dark:text-white">걸음 걸었어요</span>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex justify-center items-center font-bold mt-2 text-[13px]">
          {countConsecutiveGoalSteps > 0 && (
            <div className="relative mr-2 -translate-y-1">
              <GradientFire />
              <div className="min-w-max absolute inset-0 flex justify-center items-center text-[8px] translate-y-1 dark:text-pink-100">
                <span>연속</span>
                <div>
                  <span className="font-extrabold text-[14px]">
                    {countConsecutiveGoalSteps}
                  </span>
                  <span>일</span>
                </div>
              </div>
            </div>
          )}
          <span className="text-gray-500">
            목표 {numberFormat(userInfoDTO?.stepGoal)}걸음 대비
          </span>
          <span
            className={`ml-2 ${
              moreOrLessStep
                ? "text-nhgreen"
                : "dark:text-orange-300 text-orange-400"
            }`}
          >
            {numberFormat(subStep)}걸음 {moreOrLessStep ? "더" : "적게"}{" "}
            걸었어요
          </span>
        </div>
      </div>
      <div className="relative w-10/12 border-2 border-gray-100 dark:border-[#202A33] flex justify-center">
        {stepsInPeriod.length === 0 && (
          <span className="absolute inset-0 flex items-center justify-center dark:text-white">
            걸음수 업데이트가 필요해요
          </span>
        )}
        <ChartStep textColor={isDarkMode ? "white" : "black"} />
      </div>
    </div>
  );
};

export default Steps;
