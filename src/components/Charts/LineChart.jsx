import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const AdvLineChart = props => {
  var chartData = [];
  props.data.forEach(element => {
    chartData.push({
      value: element
    });
  });

  return (
    <ResponsiveContainer aspect={props.aspect}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 50,
          left: 0,
          bottom: 0
        }}
      >
        <XAxis
          tickFormatter={value => props.labelsX[value]}
          tick={{
            fill: "#ffffff",
            fontSize: 10,
            fontWeight: "bold"
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={value => {
            if (value > 0) {
              return value / 1000 + "k";
            } else {
              return value;
            }
          }}
          tick={{
            fill: "#ffffff",
            fontSize: 10,
            fontWeight: "bold"
          }}
          axisLine={false}
          tickLine={false}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
        <Tooltip
          position={{ x: 11, y: -95 }}
          labelFormatter={value => props.labelsX[value]}
          contentStyle={{
            backgroundColor: "#313131",
            borderRadius: "5px",
            fontWeight: "400",
            color: "#ffffff"
          }}
          cursor={{ stroke: "#313131", strokeWidth: 1 }}
        />
        <Line
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={3}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

AdvLineChart.propTypes = {
  labelsX: PropTypes.array,
  data: PropTypes.array,
  aspect: PropTypes.number
};

export default AdvLineChart;
