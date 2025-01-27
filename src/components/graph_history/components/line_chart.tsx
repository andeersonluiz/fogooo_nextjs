import React, { useEffect } from "react";
import { VictoryInfo } from "@/modules/domain/victory_info";
import MyUtils from "@/utils/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function CardLineChart({
  victoryInfo,
}: {
  victoryInfo: VictoryInfo[];
}) {
  const maxAttempts = Math.max(...victoryInfo.map((item) => item.attempts));

  const yMax = Math.ceil(maxAttempts * 1.2);
  const data = {
    labels: victoryInfo.map((item) => MyUtils.normalizeDate(item.date)),
    datasets: [
      {
        yAxisID: "yAxis",
        xAxisID: "xAxis",

        label: "Tentativas",
        backgroundColor: "#000000",
        borderColor: "#ffffff",

        data: victoryInfo.map((item) => item.attempts),
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: false,
        text: "Gráfico de tentativas",
      },
    },
    legend: {
      labels: {
        fontColor: "white",
      },
      align: "end",
      position: "bottom",
    },

    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
      xAxis: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Dias",
          font: {
            size: 16,
          },
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)",
          lineWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderDash: [5, 5],
        },
      },
      yAxis: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Numero de tentativas",
          font: {
            size: 16,
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        max: yMax,
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)",
          lineWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderDash: [5, 5],
        },
      },
    },
  };

  useEffect(() => {}, []);
  return (
    <>
      <div
        className="p-8"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "450px",

          width: "100%",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
}
