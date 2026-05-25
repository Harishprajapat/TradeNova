import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function VerticalGraph({ data }) {
  const chartData =
    (data?.labels || []).map((label, index) => ({
      name: label,
      value: Number(data?.datasets?.[0]?.data?.[index] ?? 0),
    })) || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: "rgba(3, 7, 18, 0.95)",
            border: "1px solid rgba(148,163,184,0.18)",
            borderRadius: 16,
            color: "#fff",
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#29b6f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}


