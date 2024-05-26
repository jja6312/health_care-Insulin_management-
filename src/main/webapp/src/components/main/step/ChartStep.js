import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useStepStore } from "../../../store/useStepStore";
import { useUserInfoStore } from "../../../store/useUserInfoStore";

// 필요한 구성 요소 등록
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ChartStep = () => {
  const { stepsInPeriod } = useStepStore();
  const { userInfoDTO } = useUserInfoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInfoDTO) {
      setIsLoading(false);
    }
  }, [userInfoDTO]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // Helper function to generate all dates between two dates
  const generateDateArray = (start, end) => {
    const arr = [];
    const dt = new Date(start);
    while (dt <= new Date(end)) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  // Get the start and end dates from stepsInPeriod
  const startDate =
    stepsInPeriod.length > 0 ? new Date(stepsInPeriod[0].date) : null;
  const endDate =
    stepsInPeriod.length > 0
      ? new Date(stepsInPeriod[stepsInPeriod.length - 1].date)
      : null;

  if (!startDate || !endDate) {
    return <div>No data available</div>;
  }

  const allDates = generateDateArray(startDate, endDate);

  const stepsMap = stepsInPeriod.reduce((acc, entry) => {
    acc[entry.date] = entry.stepsCount;
    return acc;
  }, {});

  const labels = allDates.map((date) => {
    return daysOfWeek[date.getDay()];
  });

  const data = allDates.map((date) => {
    const dateString = date.toISOString().split("T")[0];
    return stepsMap[dateString] || 0;
  });

  const backgroundColor = data.map((count) =>
    count >= userInfoDTO.stepGoal ? "#00B050" : "rgba(255, 159, 64, 1)"
  );
  const borderColor = data.map((count) =>
    count >= userInfoDTO.stepGoal ? "#00B050" : "rgb(255, 159, 64)"
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "", // 라벨을 빈 문자열로 설정
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false, // y축 눈금 라벨 비활성화
        },
        grid: {
          display: false, // y축 그리드 라인 비활성화
        },
      },
      x: {
        ticks: {
          font: {
            size: 18, // 요일 폰트 크기 설정
          },
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20, // 상단 여백 추가
      },
    },
    plugins: {
      legend: {
        display: false, // Legend 플러그인 비활성화
      },
      datalabels: {
        anchor: "end",
        align: "end", // "top"에서 "end"로 변경하여 위치 조정
        offset: -5, // 막대에서 레이블을 떨어뜨리는 거리 설정
        clip: false, // 레이블이 차트 영역을 벗어나지 않도록 설정
        formatter: (value) => value.toLocaleString(), // 천 단위 콤마 추가
        // color: "#C4DFB3",
        color: "#aedc91",
        font: {
          weight: "bold",
          size: 16,
        },
      },
    },
  };

  return (
    <div className="w-[90%] h-[160px] mt-6 ">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartStep;
