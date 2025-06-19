"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface iapp {
  data: {
    date: string;
    rev: number;
  }[];
}
const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.rev;
    } else {
      acc[curr.date] = curr.rev;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    rev: aggregated[date],
  }));
};
const Chart = ({ data }: iapp) => {
  const proc = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={proc}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          dataKey="rev"
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
