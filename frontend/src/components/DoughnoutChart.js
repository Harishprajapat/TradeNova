import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#29b6f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#14b8a6"];

export function DoughoutChart({ data }) {
  const pieData = (data?.labels || []).map((label, index) => ({
    name: label,
    value: data?.datasets?.[0]?.data?.[index] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            background: "rgba(3, 7, 18, 0.95)",
            border: "1px solid rgba(148,163,184,0.18)",
            borderRadius: 16,
            color: "#fff",
            fontSize: 12,
          }}
        />
        <Legend verticalAlign="bottom" iconType="circle" />
        <Pie
          data={pieData}
          innerRadius={72}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}


