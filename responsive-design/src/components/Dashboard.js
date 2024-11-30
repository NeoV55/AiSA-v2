import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/api";
import GaugeComponent from "./charts/GaugeComponent"; // Import GaugeComponent
import "../styles/_dashboard.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line, Bubble, Doughnut } from 'react-chartjs-2';

// Register the necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  // Chart Data
  const scamVsUserData = {
    labels: ["Scammers", "Users"],
    datasets: [
      {
        label: "Scam vs User",
        data: [data.scamVsUser.scammers, data.scamVsUser.users],
        backgroundColor: ["red", "blue"],
      },
    ],
  };

  const industriesData = {
    labels: Object.keys(data.industries),
    datasets: [
      {
        data: Object.values(data.industries),
        backgroundColor: ["orange", "purple", "green", "gray"],
      },
    ],
  };

  const scamVsAgeData = {
    labels: data.scamVsAge.map((age) => age.ageGroup),
    datasets: [
      {
        label: "Scams by Age",
        data: data.scamVsAge.map((age) => age.scams),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: Object.values(data.genderStats),
        backgroundColor: ["blue", "pink"],
      },
    ],
  };

  const bubbleData = {
    datasets: data.victimTypes.map((victim) => ({
      label: victim.type,
      data: [{ x: Math.random() * 10, y: Math.random() * 10, r: victim.count }],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    })),
  };

  return (
    <div className="dashboard">
      <h1>NFCC Dashboard</h1>
      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <button onClick={() => window.location.href = '/servicemanager'}>Service Manager</button>
        <button onClick={() => window.location.href = '/cpanel'}>Control Panel</button>
      </div>
      <div className="dashboard-grid">
        {/* Risky Entities Table */}
        <div className="dashboard-item">
          <h3>Risky Entities</h3>
          <table className="risky-entities-table">
            <thead>
              <tr>
                <th>Entity</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tbody>
              {data.riskyEntities.map((entity, idx) => (
                <tr key={idx}>
                  <td>{entity.entity}</td>
                  <td>{entity.reports}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie Chart */}
        <div className="dashboard-item">
          <h3>Industries Used by Scammers</h3>
          <Pie data={industriesData} />
        </div>

        {/* Bar Chart */}
        <div className="dashboard-item">
          <h3>Scam vs User Statistics</h3>
          <Bar data={scamVsUserData} />
        </div>

        {/* Line Chart */}
        <div className="dashboard-item">
          <h3>Scam vs Age</h3>
          <Line data={scamVsAgeData} />
        </div>

        {/* Doughnut Chart */}
        <div className="dashboard-item">
          <h3>Gender-Based Scams</h3>
          <Doughnut data={genderData} />
        </div>

        {/* Bubble Chart */}
        <div className="dashboard-item">
          <h3>Victim Types</h3>
          <Bubble data={bubbleData} />
        </div>

        {/* Gauge Component */}
        <div className="dashboard-item gauge-container">
          <h3>Daily Scam Rate</h3>
          <GaugeComponent value={data.dailyScamRate} />
        </div>
      </div>
    </div>
  );  
};

export default Dashboard;
