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

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ChartStep = ({ textColor }) => {
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

  const generateDateArray = (start, end) => {
    const arr = [];
    const dt = new Date(start);
    while (dt <= new Date(end)) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const startDate =
    stepsInPeriod.length > 0 ? new Date(stepsInPeriod[0].date) : null;
  const endDate =
    stepsInPeriod.length > 0
      ? new Date(stepsInPeriod[stepsInPeriod.length - 1].date)
      : null;

  const allDates =
    startDate && endDate ? generateDateArray(startDate, endDate) : [];

  const stepsMap = stepsInPeriod.reduce((acc, entry) => {
    acc[entry.date] = entry.stepsCount;
    return acc;
  }, {});

  const labels = allDates.map((date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "short" });
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
        label: "",
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
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 18,
          },
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: -5,
        clip: false,
        formatter: (value) => value.toLocaleString(),
        color: textColor,
        font: {
          weight: "bold",
          size: 11,
        },
      },
    },
  };

  return (
    <div className="w-[90%] h-[160px] mt-6">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartStep;
