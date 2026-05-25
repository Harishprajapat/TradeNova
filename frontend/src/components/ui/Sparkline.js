import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

export default function Sparkline({ data, stroke = "#4cc9f0" }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Tooltip
          cursor={false}
          contentStyle={{
            background: "rgba(3, 7, 18, 0.95)",
            border: "1px solid rgba(148,163,184,0.18)",
            borderRadius: 14,
            color: "#fff",
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={2.25}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}


