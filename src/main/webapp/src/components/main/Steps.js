import React, { useEffect } from "react";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { usePeriodStore } from "../../store/usePeriodStore";
import { useStepStore } from "../../store/useStepStore";

const Steps = () => {
  const { userInfoDTO } = useUserInfoStore();
  const { selectedPeriod } = usePeriodStore();
  const { setStepsInPeriod, setAverageSteps, stepsInPeriod, averageSteps } =
    useStepStore();

  const stripTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

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

      console.log("Steps in Period:", stepsInPeriod);
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
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex justify-center">
        <div className="flex text-[27px] font-semibold">
          <span className="dark:text-white">일평균</span>
          <span className="ml-2 text-[#379c5c] dark:text-[#20FE71]">
            {Math.round(averageSteps)}
          </span>
          <span className="dark:text-white">걸음 걸었어요</span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
