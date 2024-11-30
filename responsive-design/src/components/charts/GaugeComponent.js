import React from "react";
import GaugeChart from "react-gauge-chart";

const GaugeComponent = ({ value }) => (
  <GaugeChart
    id="daily-scam-rate"
    nrOfLevels={20}
    percent={value / 100}
    colors={["#FF5F6D", "#FFC371"]}
    arcWidth={0.3}
    textColor="#000"
  />
);

export default GaugeComponent;
