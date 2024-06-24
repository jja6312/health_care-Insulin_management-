import React, { useEffect } from "react";
import superKori from "../../../assets/superKori.png";
import "../../../css/main/bloodSugarVer2/superKori.css";
import useBloodSugarsVer2 from "../../../store/useBloodSugarsVer2";
import { getBloodCountAvgInPeriod } from "../../../api/getBloodCountAvgInPeriod";
import { usePeriodStore } from "../../../store/usePeriodStore";

const BloodProgressKori = () => {
  const {
    bloodSugarVer2InPeriod,
    bloodCountAvgInPeriod,
    setBloodCountAvgInPeriod,
  } = useBloodSugarsVer2();
  const { selectedPeriod } = usePeriodStore();

  useEffect(() => {
    const fetchBloodCountAvgInPeriod = async () => {
      const bloodCountAvgInPeriod = await getBloodCountAvgInPeriod(
        selectedPeriod.start,
        selectedPeriod.end
      );
      console.log(
        "bloodCountAvgInPeriod(기간별 유저 평균 혈당측정횟수)",
        bloodCountAvgInPeriod
      );
      setBloodCountAvgInPeriod(bloodCountAvgInPeriod);
    };
    fetchBloodCountAvgInPeriod();
  }, [selectedPeriod, setBloodCountAvgInPeriod]);

  return (
    <div className="w-10/12 border-4 border-gray-100 dark:border-[#202A33] h-40 my-4 flex flex-col mb-20">
      <div className="w-full flex justify-end">
        <span className="text-gray-500 text-sm mr-1 mt-2">
          *주간 사용자 평균 : {bloodCountAvgInPeriod}회
        </span>
      </div>
      <div className="flex justify-center items-end pb-12 w-full h-full">
        <div className="relative w-10/12 h-[6px] bg-[#1DAA53]">
          {/* 0 */}
          <div
            className="absolute w-5 rounded-full bg-[#1DAA53] h-5 transform -translate-x-1/2 -translate-y-1/3"
            style={{ left: "0%" }}
          >
            <div className="absolute w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          {bloodSugarVer2InPeriod.length === 0 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "0%" }}
            />
          )}
          {/* 1 */}
          <div
            className="absolute w-4 h-4 rounded-full bg-[#1DAA53] transform -translate-x-1/2 -translate-y-1/4"
            style={{ left: "14.29%" }}
          ></div>
          {bloodSugarVer2InPeriod.length === 1 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "14.29%" }}
            />
          )}
          {/* 2 */}
          <div
            className="absolute w-4 h-4 rounded-full bg-[#1DAA53] transform -translate-x-1/2 -translate-y-1/4"
            style={{ left: "28.57%" }}
          ></div>
          {bloodSugarVer2InPeriod.length === 2 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "28.57%" }}
            />
          )}
          {/* 3 */}
          <div
            className="absolute w-5 rounded-full bg-[#1DAA53] h-5 transform -translate-x-1/2 -translate-y-1/3"
            style={{ left: "42.86%" }}
          >
            <div className="absolute w-3 h-3 rounded-full   bg-gray-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div
              className="absolute flex items-center justify-center top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/3 whitespace-nowrap
            text-gray-400 gap-[1px] font-semibold"
            >
              <span className="">최소 3회</span>
            </div>
          </div>
          {bloodSugarVer2InPeriod.length === 3 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "42.86%" }}
            />
          )}
          {/* 4 */}
          <div
            className="absolute w-4 h-4 rounded-full bg-[#1DAA53] transform -translate-x-1/2 -translate-y-1/4"
            style={{ left: "57.14%" }}
          ></div>
          {bloodSugarVer2InPeriod.length === 4 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "57.14%" }}
            />
          )}
          {/* 5 */}
          <div
            className="absolute w-5 rounded-full bg-[#1DAA53] h-5 transform -translate-x-1/2 -translate-y-1/3"
            style={{ left: "71.43%" }}
          >
            <div className="absolute w-3 h-3 rounded-full bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div
              className="absolute flex items-center justify-center top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/3 whitespace-nowrap
            text-gray-500 dark:text-gray-300 gap-[1px] font-semibold"
            >
              <span className="">권장 5회</span>
            </div>
          </div>
          {bloodSugarVer2InPeriod.length === 5 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "71.43%" }}
            />
          )}
          {/* 6 */}
          <div
            className="absolute w-4 h-4 rounded-full bg-[#1DAA53] transform -translate-x-1/2 -translate-y-1/4"
            style={{ left: "85.71%" }}
          ></div>
          {bloodSugarVer2InPeriod.length === 6 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "85.71%" }}
            />
          )}
          {/* 7 */}
          <div
            className="absolute w-5 rounded-full bg-[#1DAA53] h-5 transform -translate-x-1/2 -translate-y-1/3"
            style={{ left: "100%" }}
          >
            <div className="absolute w-3 h-3 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div
              className="absolute flex items-center justify-center top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/3 whitespace-nowrap
            text-black dark:text-white gap-[1px] font-semibold"
            >
              <span className="mr-1">우수 7회</span>
            </div>
          </div>
          {bloodSugarVer2InPeriod.length === 7 && (
            <img
              src={superKori}
              alt="superKori"
              className="superKori absolute w-14 h-14 top-1/2 left-1/2"
              style={{ left: "100%" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodProgressKori;
