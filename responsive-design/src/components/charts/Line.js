import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const scamVsAgeConfig = {
  labels: ["18-25", "26-35", "36-50", "50+"],
  datasets: [
    {
      label: "Scams by Age",
      data: [30, 50, 70, 40], // Replace with dynamic data
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.3,
    },
  ],
};

const scamVsAgeOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: true },
  },
};
