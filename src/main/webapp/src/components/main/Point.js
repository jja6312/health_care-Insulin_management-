import React, { useEffect, useState } from "react";
import kori from "../../assets/코리.png";
import { useUserInfoStore } from "../../store/useUserInfoStore";
import numberFormat from "../../utils/numberFormat";
import "../../css/main/point.css";
import { usePointStore } from "../../store/usePointStore";
import Modal from "react-modal";
import { usePeriodStore } from "../../store/usePeriodStore";
import { getWeeklyEarnedPoints } from "../../api/point/getWeeklyEarnedPoint";
import { formatDate } from "../../utils/dateUtils";

const Point = ({ onKoriClick }) => {
  const { userInfoDTO } = useUserInfoStore();
  const { texts, weeklyEarnedPoints, setWeeklyEarnedPoints } = usePointStore();
  const { startDate } = usePeriodStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const weeklyPointsData = await getWeeklyEarnedPoints(startDate);
      setWeeklyEarnedPoints(weeklyPointsData);
      console.log("weeklyEarnedPoints", weeklyPointsData);
    };

    fetchPoints();
  }, []);

  return (
    // grid로 1:2:2:2:1 배치
    <div className="flex flex-col justify-center items-end">
      <div className="gap-1 md:gap-4 mt-5 w-full flex justify-center items-center relative">
        {Array.isArray(texts) &&
          texts.map((item) => (
            <span
              key={item.id}
              className="point-text text-nhblue dark:text-white absolute left-0 -top-10"
            >
              {item.text}
            </span>
          ))}
        <div className="flex items-center justify-center w-1/4 md:w-1/12 mr-1">
          <img
            className="w-10/12 max-w-24 kori"
            alt="코리"
            src={kori}
            onClick={onKoriClick}
          />
        </div>
        <div className="flex items-center justify-center w-1/8">
          <span className="dark:text-white text-4xl font-semibold">
            {numberFormat(userInfoDTO?.totalPoints)}
          </span>
        </div>
        <div className="flex items-center justify-center w-1/4 md:w-1/12">
          <span className="text-[#55aed4] dark:text-[#AEDDE8] text-2xl font-bold -translate-x-2 translate-y-1">
            코리
          </span>
        </div>
      </div>
      <div>
        <span
          className="dark:text-gray-400 mr-14 curosr-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          적립 내역 보기
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Period"
        className="modal dark:bg-dark dark:text-white h-[85vh] overflow-y-scroll mt-[48%]"
        overlayClassName="overlay"
      >
        <div className="flex flex-col justify-center">
          {/* title */}
          <div className="relative flex justify-center -translate-y-2">
            <span>포인트 적립 내역</span>
            <span
              className="absolute right-2 curosr-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              x
            </span>
          </div>

          {/* content */}
          <table className="text-center">
            <tr className="h-12 font-semibold">
              <td>기간</td>
              <td>적립코리</td>
            </tr>
            {weeklyEarnedPoints
              ?.filter((point) => point.point !== 0)
              .reverse()
              .map((point) => (
                <tr key={point.id} className="h-8">
                  <td className="text-sm">
                    ({point.week}) {formatDate(new Date(point.startPeriod))}~
                    {formatDate(new Date(point.endPeriod))}
                  </td>
                  <td>
                    {point.point}
                    <span className="ml-1 text-[#55aed4] dark:text-[#AEDDE8]">
                      코리
                    </span>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default Point;
