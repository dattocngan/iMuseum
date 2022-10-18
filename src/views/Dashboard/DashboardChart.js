import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardChart({ statistics }) {
  const data = {
    labels: ["Đã được duyệt", "Chưa được duyệt"],
    datasets: [
      {
        data: statistics,
        backgroundColor: ["rgba(34, 197, 94, 0.4)", "rgba(239, 68, 68, 0.4)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        spacing: "1",
        plugins: {
          legend: { align: "start", position: "bottom" },
        },
      }}
    />
  );
}
