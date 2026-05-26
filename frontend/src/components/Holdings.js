import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  LayoutGrid,
  Rows3,
  ShieldHalf,
  TriangleAlert,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import Badge from "./ui/Badge";
import SectionHeader from "./ui/SectionHeader";
import { VerticalGraph } from "./VerticalGraph";
import { DoughoutChart } from "./DoughnoutChart";
import { SkeletonLine } from "./ui/Skeleton";
import { formatINR, formatPercent } from "../utils/format";

const trendData = [
  { day: "1W", value: 118 },
  { day: "2W", value: 124 },
  { day: "3W", value: 122 },
  { day: "4W", value: 131 },
  { day: "5W", value: 136 },
  { day: "6W", value: 142 },
];

const sectorPalette = ["#29b6f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#14b8a6"];

export default function Holdings() {
  const { holdings, loading } = useContext(GeneralContext);
  const [density, setDensity] = useState("comfortable");

  const summary = useMemo(() => {
    const invested = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
    const current = holdings.reduce((sum, stock) => sum + (stock.price ?? stock.avg) * stock.qty, 0);
    const pnl = current - invested;
    const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
    return { invested, current, pnl, pnlPct };
  }, [holdings]);

  const chartData = useMemo(
    () => ({
      labels: holdings.map((stock) => stock.name),
      datasets: [{ data: holdings.map((stock) => (stock.price ?? stock.avg) * stock.qty) }],
    }),
    [holdings]
  );

  const donutData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [
      {
        data: holdings.map((stock) => stock.qty * stock.avg),
        backgroundColor: sectorPalette,
      },
    ],
  };

  const rowPad = density === "compact" ? "px-3 py-3" : "px-4 py-4";

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Portfolio"
        title="Holdings"
        subtitle="Invested capital, live value, and position quality."
        action={<Badge tone="success">{holdings.length} live</Badge>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Invested",
            value: formatINR(summary.invested, 2),
            delta: "Cost basis",
            tone: "neutral",
            icon: <ShieldHalf className="h-4 w-4" />,
          },
          {
            label: "Current",
            value: formatINR(summary.current, 2),
            delta: "Marked live",
            tone: "accent",
            icon: <TrendingUp className="h-4 w-4" />,
          },
          {
            label: "P&L",
            value: formatINR(Math.abs(summary.pnl), 2),
            delta: formatPercent(summary.pnlPct),
            tone: summary.pnl >= 0 ? "success" : "danger",
            icon: <BarChart3 className="h-4 w-4" />,
          },
          {
            label: "Risk",
            value: "Balanced",
            delta: "Within band",
            tone: "success",
            icon: <TriangleAlert className="h-4 w-4" />,
          },
        ].map((item) => (
          <motion.div key={item.label} whileHover={{ y: -2 }}>
            <GlassPanel>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.value}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.delta}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-slate-200">
                  {item.icon}
                </div>
              </div>
              <div className="mt-4">
                <Badge tone={item.tone}>{item.label}</Badge>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassPanel className="p-0">
          <div className="border-b border-white/[0.08] px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Positions</p>
                <h2 className="mt-1 font-display text-xl font-semibold text-white">Table</h2>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-2 py-2">
                <button
                  onClick={() => setDensity("comfortable")}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    density === "comfortable" ? "bg-white/[0.12] text-white" : "text-slate-500 hover:text-white"
                  }`}
                  aria-label="Comfortable density"
                >
                  <Rows3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDensity("compact")}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    density === "compact" ? "bg-white/[0.12] text-white" : "text-slate-500 hover:text-white"
                  }`}
                  aria-label="Compact density"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-[72vh] overflow-auto">
            <table className="hidden min-w-full divide-y divide-white/[0.08] text-left md:table">
            <thead className="sticky top-0 z-10 bg-slate-950/95">
                <tr className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-4 py-4">Instrument</th>
                  <th className="px-4 py-4">Qty</th>
                  <th className="px-4 py-4">Avg</th>
                  <th className="px-4 py-4">LTP</th>
                  <th className="px-4 py-4">Value</th>
                  <th className="px-4 py-4">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className={density === "compact" ? "h-14" : "h-16"}>
                        {Array.from({ length: 6 }).map((__, cellIndex) => (
                          <td key={cellIndex} className={rowPad}>
                            <SkeletonLine className="h-3 w-24" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : holdings.map((stock) => {
                      const ltp = stock.price ?? stock.avg;
                      const invested = stock.avg * stock.qty;
                      const value = ltp * stock.qty;
                      const pnl = value - invested;
                      const isPositive = pnl >= 0;
                      return (
                        <tr key={stock.name} className="transition hover:bg-white/[0.03]">
                          <td className={rowPad}>
                            <div>
                              <p className="font-semibold text-white">{stock.name}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                                {isPositive ? "Gain" : "Loss"}
                              </p>
                            </div>
                          </td>
                          <td className={`${rowPad} text-slate-300`}>{stock.qty}</td>
                          <td className={`${rowPad} text-slate-300`}>{formatINR(stock.avg, 2)}</td>
                          <td className={`${rowPad} text-slate-200`}>{formatINR(ltp, 2)}</td>
                          <td className={`${rowPad} text-slate-200`}>{formatINR(value, 2)}</td>
                          <td className={`${rowPad} font-semibold ${isPositive ? "text-emerald-300" : "text-rose-300"}`}>
                            {isPositive ? "+" : ""}
                            {formatINR(Math.abs(pnl), 2)}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>

            <div className="space-y-3 p-4 md:hidden">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                      <SkeletonLine className="h-4 w-28" />
                      <SkeletonLine className="mt-3 h-3 w-20" />
                      <SkeletonLine className="mt-4 h-10 w-full rounded-2xl" />
                    </div>
                  ))
                : holdings.map((stock) => {
                    const ltp = stock.price ?? stock.avg;
                    const invested = stock.avg * stock.qty;
                    const value = ltp * stock.qty;
                    const pnl = value - invested;
                    const isPositive = pnl >= 0;
                    return (
                      <div key={stock.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{stock.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                              {stock.qty} shares
                            </p>
                          </div>
                          <Badge tone={isPositive ? "success" : "danger"}>
                            {isPositive ? "+" : ""}
                            {formatINR(Math.abs(pnl), 2)}
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Avg</p>
                            <p className="mt-1 text-sm text-slate-200">{formatINR(stock.avg, 2)}</p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">LTP</p>
                            <p className="mt-1 text-sm text-slate-200">{formatINR(ltp, 2)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-5">
          <GlassPanel>
            <SectionHeader eyebrow="Allocation" title="Split" subtitle="Value mix." />
            <div className="mt-4 h-[260px]">
              <DoughoutChart data={donutData} />
            </div>
          </GlassPanel>

          <GlassPanel>
            <SectionHeader eyebrow="Trend" title="Curve" subtitle="Rolling value." />
            <div className="mt-4 h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="holdingsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} />
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
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2.2}
                    fill="url(#holdingsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel>
            <SectionHeader eyebrow="Comparison" title="Bars" subtitle="Position values." />
            <div className="mt-4 h-[220px]">
              <VerticalGraph data={chartData} />
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}
