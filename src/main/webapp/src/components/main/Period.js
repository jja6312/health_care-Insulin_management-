import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { formatDate, getWeeklyPeriods, stripTime } from "../../utils/dateUtils";
import { getUserInfo } from "../../api/getUserInfo";
import { usePeriodStore } from "../../store/usePeriodStore";

const Period = () => {
  const { setUserInfoDTO } = useUserInfoStore();
  const { periods, setPeriods, selectedPeriod, setSelectedPeriod } =
    usePeriodStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAndCalculatePeriods = async () => {
      const userInfo = await getUserInfo();
      setUserInfoDTO(userInfo);
      console.log("userInfo", userInfo);

      const startDate = new Date(2024, 4, 20); // 시작일
      const calculatedPeriods = getWeeklyPeriods(startDate);
      setPeriods(calculatedPeriods);
      console.log("periods", calculatedPeriods);

      const today = stripTime(new Date());
      console.log("today", today);

      const currentPeriod = calculatedPeriods.find((period) => {
        const periodStart = stripTime(period.start);
        const periodEnd = stripTime(period.end);
        return today >= periodStart && today <= periodEnd;
      });

      console.log("currentPeriod", currentPeriod);
      setSelectedPeriod(currentPeriod);
    };
    fetchAndCalculatePeriods();
  }, [setUserInfoDTO]);

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Period"
        className="modal dark:bg-dark dark:text-white h-52 overflow-y-scroll"
        overlayClassName="overlay"
      >
        <div className="flex flex-col justify-center">
          <div className="flex justify-center -translate-y-2">
            <span>기간 선택</span>
          </div>
          {periods.map((period) => (
            <React.Fragment key={period.week}>
              <div className="flex justify-center">
                <span
                  className={`cursor-pointer py-4 text-2xl ${
                    selectedPeriod && selectedPeriod.week === period.week
                      ? "text-nhblue font-bold"
                      : ""
                  }`}
                  onClick={() => handlePeriodSelect(period)}
                >
                  {`(${period.week}주차) ${formatDate(
                    period.start
                  )} ~ ${formatDate(period.end)}`}
                </span>
              </div>
              <hr className="w-[110%] border-gray-500 -translate-x-4"></hr>
            </React.Fragment>
          ))}
        </div>
      </Modal>

      <div className="flex flex-col items-center mt-1">
        <span
          className="text-gray-600 cursor-pointer underline mt-2"
          onClick={() => setIsModalOpen(true)}
        >
          기간 선택
        </span>
        {selectedPeriod && (
          <span
            className="text-xl font-semibold dark:text-white mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {`${formatDate(selectedPeriod.start)} ~ ${formatDate(
              selectedPeriod.end
            )}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Period;
