import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import { formatDate, getWeeklyPeriods, stripTime } from "../../utils/dateUtils";
import { getUserInfo } from "../../api/getUserInfo";
import { usePeriodStore } from "../../store/usePeriodStore";

const Period = () => {
  const { setUserInfoDTO } = useUserInfoStore();
  const { startDate, periods, setPeriods, selectedPeriod, setSelectedPeriod } =
    usePeriodStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchAndCalculatePeriods = async () => {
  //     const userInfo = await getUserInfo();
  //     setUserInfoDTO(userInfo);
  //     console.log("userInfo", userInfo);
  //     console.log("startDate", startDate);
  //     const calculatedPeriods = getWeeklyPeriods(startDate);
  //     setPeriods(calculatedPeriods);
  //     console.log("periods", calculatedPeriods);

  //     const today = stripTime(new Date());
  //     console.log("today", today);

  //     const currentPeriod = calculatedPeriods.find((period) => {
  //       const periodStart = stripTime(period.start);
  //       const periodEnd = stripTime(period.end);
  //       return today >= periodStart && today <= periodEnd;
  //     });

  //     console.log("currentPeriod", currentPeriod);
  //     setSelectedPeriod(currentPeriod);
  //   };
  //   fetchAndCalculatePeriods();
  // }, [setUserInfoDTO, setPeriods, setSelectedPeriod]);
  useEffect(() => {
    const fetchAndCalculatePeriods = async () => {
      const userInfo = await getUserInfo();
      setUserInfoDTO(userInfo);
      console.log("userInfo", userInfo);
      console.log("startDate", startDate);
      const calculatedPeriods = getWeeklyPeriods(startDate);
      setPeriods(calculatedPeriods);
      console.log("periods", calculatedPeriods);

      const today = stripTime(new Date());
      console.log("today", today);

      const isThursdayOrLater = today.getDay() >= 4; // 4는 목요일

      const currentPeriod = calculatedPeriods.find((period) => {
        const periodStart = stripTime(period.start);
        const periodEnd = stripTime(period.end);
        return today >= periodStart && today <= periodEnd;
      });

      const previousPeriodIndex = calculatedPeriods.indexOf(currentPeriod) - 1;
      const previousPeriod = calculatedPeriods[previousPeriodIndex];

      console.log("currentPeriod", currentPeriod);
      console.log("previousPeriod", previousPeriod);

      if (isThursdayOrLater) {
        setSelectedPeriod(currentPeriod);
      } else {
        setSelectedPeriod(previousPeriod);
      }
    };
    fetchAndCalculatePeriods();
  }, [setUserInfoDTO, setPeriods, setSelectedPeriod, startDate]);

  const handlePeriodSelect = (period) => {
    if (period.start > new Date()) {
      alert("아직 시작되지 않은 기간입니다.");
      return;
    }
    setSelectedPeriod(period);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex flex-col items-center mt-1">
        <span
          className="text-gray-600 cursor-pointer underline mt-2 hover:opacity-70"
          onClick={() => setIsModalOpen(true)}
        >
          기간 선택
        </span>
        {selectedPeriod && (
          <span
            className="text-xl font-semibold dark:text-white mt-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {`${formatDate(selectedPeriod.start)} ~ ${formatDate(
              selectedPeriod.end
            )}`}
          </span>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Period"
        className="modal dark:bg-dark dark:text-white h-64 overflow-y-scroll mt-[4%]"
        overlayClassName="overlay"
      >
        <div className="flex flex-col justify-center">
          <div className="relative flex w-full justify-center -translate-y-2">
            <span>기간 선택</span>
            <span
              className="absolute right-2 dark:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              x
            </span>
          </div>

          {periods.map((period) => (
            <React.Fragment key={period.week}>
              <div className="flex justify-center">
                <span
                  className={`cursor-pointer py-4 text-2xl ${
                    selectedPeriod && selectedPeriod.week === period.week
                      ? "text-nhblue font-bold"
                      : ""
                  }
                  
                  ${period.start > new Date() && "text-gray-600"}
                  `}
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
    </div>
  );
};

export default Period;
