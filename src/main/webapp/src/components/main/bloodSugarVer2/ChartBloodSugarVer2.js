import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import useBloodSugarsVer2Store from "../../../store/useBloodSugarsVer2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return daysOfWeek[date.getDay() - 1];
};

const processData = (data) => {
  const processedData = {};
  let totalBloodSugar = 0;
  let count = 0;

  data.forEach((item) => {
    const day = getDayOfWeek(item.dateTime);
    if (!processedData[day]) {
      processedData[day] = [];
    }
    processedData[day].push(item.bloodSugarVer2);
    totalBloodSugar += item.bloodSugarVer2;
    count += 1;
  });

  const averageBloodSugar = count > 0 ? totalBloodSugar / count : 0;

  return { processedData, averageBloodSugar };
};

const generateChartData = (processedData) => {
  const labels = [];
  const data = [];

  daysOfWeek.forEach((day) => {
    if (processedData[day]) {
      labels.push(day);
      data.push({
        x: day,
        y:
          processedData[day].reduce((a, b) => a + b, 0) /
          processedData[day].length,
      });
    }
  });

  return { labels, data };
};

const ChartBloodSugarVer2 = () => {
  const { bloodSugarVer2InPeriod } = useBloodSugarsVer2Store();
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [averageBloodSugar, setAverageBloodSugar] = useState(140);

  useEffect(() => {
    if (bloodSugarVer2InPeriod && bloodSugarVer2InPeriod.length > 0) {
      const { processedData, averageBloodSugar } = processData(
        bloodSugarVer2InPeriod
      );
      const { labels, data } = generateChartData(processedData);
      setChartData({ labels, data });
      setAverageBloodSugar(averageBloodSugar);
    }
  }, [bloodSugarVer2InPeriod]);

  const chartColor = averageBloodSugar > 140 ? "orange-400" : "#00B050";

  const options = {
    scales: {
      x: {
        type: "category",
        labels: chartData.labels,
        offset: true, // x축 오프셋 설정
      },
      y: {
        beginAtZero: true,
        min: 100, // y축 최소값 설정
        max: 200, // y축 최대값 설정
        offset: true, // y축 오프셋 설정
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 비활성화
      },
      // x라벨은 표시하지않고 y라벨만 표시
      tooltip: {
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `평균 혈당: ${Math.round(context.parsed.y)}`;
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Blood Sugar Levels",
        data: chartData.data,
        backgroundColor: chartColor,
      },
    ],
  };

  return (
    <div className="w-[90%] h-[160px] mt-6">
      <Scatter options={options} data={data} />
    </div>
  );
};

export default ChartBloodSugarVer2;
