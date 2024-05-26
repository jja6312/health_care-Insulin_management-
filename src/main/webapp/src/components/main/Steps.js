import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { usePeriodStore } from "../../store/usePeriodStore";
import { useStepStore } from "../../store/useStepStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ChartStep from "./step/ChartStep";
import numberFormat from "../../utils/numberFormat";

const Steps = () => {
  const { userInfoDTO } = useUserInfoStore();
  const { selectedPeriod } = usePeriodStore();
  const { setStepsInPeriod, setAverageSteps, averageSteps } = useStepStore();
  const [moreOrLessStep, setMoreOrLessStep] = useState(false);
  const [subStep, setSubStep] = useState(0);
  const [stepColor, setStepColor] = useState("text-nhgreen");

  const stripTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const stepGoalSubAvgerageStep = (stepGoal) => {
    if (averageSteps > stepGoal) {
      // 더걸었어요
      setMoreOrLessStep(true);
      setSubStep(averageSteps - stepGoal);
    } else {
      // 목표보다 덜걸었어요
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
      console.log("Selected Period:", selectedPeriod);
      console.log("Start Date:", startDate, "End Date:", endDate);

      const stepsInPeriod = userInfoDTO.steps.filter((step) => {
        const stepDate = stripTime(new Date(step.date));
        console.log("Step Date:", stepDate);
        return stepDate >= startDate && stepDate <= endDate;
      });

      console.log("stepsInPeriod:", stepsInPeriod);
      setStepsInPeriod(stepsInPeriod);

      const totalSteps = stepsInPeriod.reduce(
        (sum, step) => sum + step.stepsCount,
        0
      );
      const averageSteps =
        stepsInPeriod.length > 0 ? totalSteps / stepsInPeriod.length : 0;

      console.log("Total Steps:", totalSteps, "Average Steps:", averageSteps);
      setAverageSteps(averageSteps);
    }
  }, [selectedPeriod, userInfoDTO, setStepsInPeriod, setAverageSteps]);

  return (
    <div className="flex flex-col justify-center items-start mt-10">
      <div className="flex justify-center ">
        <div className="flex items-center text-[27px] font-semibold">
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

      {/* 목표보다 얼마나 더걸었는지 표시 */}
      <div className="w-full flex justify-center">
        <div className="flex justify-center items-center font-semibold mt-2">
          <span className="text-gray-500">
            목표 {numberFormat(userInfoDTO?.stepGoal)}걸음 대비
          </span>
          <span
            className={` ml-2 ${
              moreOrLessStep ? "text-nhgreen" : "text-orange-300"
            }`}
          >
            {numberFormat(subStep)}걸음 {moreOrLessStep ? "더" : "적게"}{" "}
            걸었어요
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ChartStep />
      </div>
    </div>
  );
};

export default Steps;
