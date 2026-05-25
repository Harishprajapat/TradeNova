import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, ShieldHalf, TriangleAlert, TrendingUp } from "lucide-react";
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
      datasets: [
        {
          data: holdings.map((stock) => (stock.price ?? stock.avg) * stock.qty),
        },
      ],
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

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Portfolio"
        title="Holdings overview"
        subtitle="A clearer breakdown of invested capital, live value, and asset-level performance."
        action={<Badge tone="success">{holdings.length} live holdings</Badge>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Invested capital",
            value: formatINR(summary.invested, 2),
            delta: "Cost basis",
            tone: "neutral",
            icon: <ShieldHalf className="h-4 w-4" />,
          },
          {
            label: "Current value",
            value: formatINR(summary.current, 2),
            delta: "Market marked",
            tone: "accent",
            icon: <TrendingUp className="h-4 w-4" />,
          },
          {
            label: "Total P&L",
            value: formatINR(Math.abs(summary.pnl), 2),
            delta: formatPercent(summary.pnlPct),
            tone: summary.pnl >= 0 ? "success" : "danger",
            icon: <BarChart3 className="h-4 w-4" />,
          },
          {
            label: "Risk view",
            value: "Balanced",
            delta: "Within target",
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
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/5 text-slate-200">
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

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <GlassPanel>
          <SectionHeader
            eyebrow="Holdings matrix"
            title="Asset-level performance"
            subtitle="A more premium table layout for positions, pricing, and quick comparison."
          />
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/[0.08] text-left">
                <thead className="bg-white/[0.03]">
                  <tr className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-4 py-4">Instrument</th>
                    <th className="px-4 py-4">Qty</th>
                    <th className="px-4 py-4">Avg</th>
                    <th className="px-4 py-4">LTP</th>
                    <th className="px-4 py-4">Invested</th>
                    <th className="px-4 py-4">Value</th>
                    <th className="px-4 py-4">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          {Array.from({ length: 7 }).map((__, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-5">
                              <div className="h-3 rounded-full bg-white/[0.08]" />
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
                            <td className="px-4 py-5">
                              <div>
                                <p className="font-semibold text-white">{stock.name}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                                  {isPositive ? "Gain" : "Loss"} / Live
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-5 text-slate-300">{stock.qty}</td>
                            <td className="px-4 py-5 text-slate-300">{formatINR(stock.avg, 2)}</td>
                            <td className="px-4 py-5 text-slate-200">{formatINR(ltp, 2)}</td>
                            <td className="px-4 py-5 text-slate-300">{formatINR(invested, 2)}</td>
                            <td className="px-4 py-5 text-slate-200">{formatINR(value, 2)}</td>
                            <td className={`px-4 py-5 font-semibold ${isPositive ? "text-emerald-300" : "text-rose-300"}`}>
                              {isPositive ? "+" : ""}
                              {formatINR(Math.abs(pnl), 2)}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel>
            <SectionHeader
              eyebrow="Composition"
              title="Portfolio allocation"
              subtitle="A clean visual split of holdings by value."
            />
            <div className="mt-5 h-[280px]">
              <DoughoutChart data={donutData} />
            </div>
          </GlassPanel>

          <GlassPanel>
            <SectionHeader
              eyebrow="Performance"
              title="Rolling trend"
              subtitle="A compact trend line that shows whether your book is drifting upward."
            />
            <div className="mt-5 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="holdingsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.38} />
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
                    strokeWidth={2.4}
                    fill="url(#holdingsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel>
            <SectionHeader
              eyebrow="Allocation detail"
              title="Breakdown chart"
              subtitle="A bar chart that makes it easier to compare position weights."
            />
            <div className="mt-5 h-[240px]">
              <VerticalGraph data={chartData} />
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}


