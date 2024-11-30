import { Bubble } from "react-chartjs-2";

const victimTypesConfig = {
  datasets: [
    {
      label: "Investors",
      data: [{ x: 1, y: 2, r: 50 }], // Replace with dynamic data
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Shoppers",
      data: [{ x: 3, y: 4, r: 30 }], // Replace with dynamic data
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
    {
      label: "Job Seekers",
      data: [{ x: 5, y: 6, r: 20 }], // Replace with dynamic data
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
  ],
};

const victimTypesOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
};
