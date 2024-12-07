import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const data = [
  {
    name: "Tuổi thọ trung bình",
    value: 81,
    fill: "#4285F4",
  },
];

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  lineHeight: "24px",
};

const GaugeChart = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Tuổi thọ trung bình (Tuổi)</h3>
      <RadialBarChart
        width={400}
        height={300}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          // minAngle={15}
          background
          // clockWise
          dataKey="value"
        />
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
      <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>81,0</p>
    </div>
  );
};

export default GaugeChart;
