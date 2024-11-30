import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const scamVsUserConfig = {
  labels: ["Scammers", "Users"],
  datasets: [
    {
      label: "Population",
      data: [1200, 3000], // Replace with dynamic data
      backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const scamVsUserOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: true },
  },
};
