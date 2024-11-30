import { Doughnut } from "react-chartjs-2";

const genderConfig = {
  labels: ["Male", "Female"],
  datasets: [
    {
      data: [60, 40], // Replace with dynamic data
      backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
      hoverOffset: 4,
    },
  ],
};

const genderOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
};
