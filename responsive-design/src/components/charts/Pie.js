import { Pie } from "react-chartjs-2";
import {
  ArcElement,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const industriesConfig = {
  labels: ["Finance", "Real Estate", "Tech", "Other"],
  datasets: [
    {
      label: "Industries Affected",
      data: [60, 20, 10, 10], // Replace with dynamic data
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
      ],
      hoverOffset: 4,
    },
  ],
};

const industriesOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    tooltip: { enabled: true },
  },
};
