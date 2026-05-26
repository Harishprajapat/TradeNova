import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Brain,
  Clock3,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import GlassPanel from "./ui/GlassPanel";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import SectionHeader from "./ui/SectionHeader";
import Sparkline from "./ui/Sparkline";
import { formatINR } from "../utils/format";

const areaData = [
  { day: "Mon", value: 108 },
  { day: "Tue", value: 116 },
  { day: "Wed", value: 121 },
  { day: "Thu", value: 119 },
  { day: "Fri", value: 126 },
  { day: "Sat", value: 130 },
  { day: "Sun", value: 135 },
];

const allocation = [
  { label: "Technology", pct: 34, tone: "accent" },
  { label: "Financials", pct: 22, tone: "success" },
  { label: "Energy", pct: 14, tone: "warning" },
  { label: "Consumer", pct: 18, tone: "neutral" },
  { label: "Industrial", pct: 12, tone: "danger" },
];

function CompactStat({ label, value, delta, note, tone = "neutral", icon }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
          <div className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            {value}
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-slate-200">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <Badge tone={tone}>{delta}</Badge>
      </div>
      {note ? <p className="mt-2 text-xs text-slate-500">{note}</p> : null}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { balance, holdings, orders } = useContext(GeneralContext);

  const portfolioValue = useMemo(
    () => holdings.reduce((sum, stock) => sum + stock.qty * (stock.price || stock.avg), balance),
    [balance, holdings]
  );

  const invested = useMemo(
    () => holdings.reduce((sum, stock) => sum + stock.qty * stock.avg, 0),
    [holdings]
  );

  const pnl = portfolioValue - invested;
  const isPositive = pnl >= 0;
  const openPositions = holdings.length;
  const marketSentiment = isPositive ? "Risk-on" : "Cautious";
  const dayChange = isPositive ? "+1.8%" : "-0.9%";
  const netExposure = invested > 0 ? ((invested / portfolioValue) * 100).toFixed(0) : "0";
  const startingCapital = 100000;

  const summaryStats = [
    {
      label: "Cash balance",
      value: formatINR(balance, 0),
      delta: "Paper money",
      note: `Starts at ${formatINR(startingCapital, 0)} and updates after each trade`,
      tone: "accent",
      icon: <Wallet className="h-4 w-4" />,
    },
    {
      label: "Net exposure",
      value: `${netExposure}%`,
      delta: `${holdings.length} books`,
      note: "Capital currently deployed",
      tone: "neutral",
      icon: <ShieldAlert className="h-4 w-4" />,
    },
    {
      label: "Sentiment",
      value: marketSentiment,
      delta: dayChange,
      tone: isPositive ? "success" : "warning",
      icon: <ShieldAlert className="h-4 w-4" />,
    },
    {
      label: "Open positions",
      value: openPositions.toString().padStart(2, "0"),
      delta: `${orders.length} orders`,
      tone: "neutral",
      icon: <Activity className="h-4 w-4" />,
    },
  ];

  const activity = orders.slice().reverse().slice(0, 3);
  const topWatchlist = watchlist.slice(0, 5);

  return (
    <div className="space-y-5">
      <GlassPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="success">Live</Badge>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Market open
              </span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Portfolio overview
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Net exposure, day P&L, sentiment, and open positions in one compact view.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate("/orders")}>
              Orders
              <Clock3 className="h-4 w-4" />
            </Button>
            <Button onClick={() => navigate("/watchlist")}>
              Watchlist
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryStats.map((stat) => (
            <CompactStat key={stat.label} {...stat} />
          ))}
        </div>
      </GlassPanel>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassPanel>
          <SectionHeader
            eyebrow="Equity curve"
            title="Trend"
            subtitle="Weekly mark-to-market movement."
          />
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#29b6f6" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#29b6f6" stopOpacity={0.02} />
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
                  stroke="#29b6f6"
                  strokeWidth={2.2}
                  fill="url(#portfolioFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            eyebrow="Watchlist"
            title="Active names"
            subtitle="Compact live cards with quick readouts."
            action={<Badge tone="accent">{topWatchlist.length} tracked</Badge>}
          />
          <div className="mt-4 space-y-3">
            {topWatchlist.map((stock, index) => {
              const isUp = !stock.isDown;
              const series = Array.from({ length: 7 }).map((_, i) => ({
                value:
                  stock.price *
                  (1 + (Math.sin(i + index) * 0.01 + (i % 2 === 0 ? 0.006 : -0.003))),
              }));
              return (
                <motion.button
                  key={stock.name}
                  whileHover={{ y: -1 }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.05]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-white">{stock.name}</p>
                      <Badge tone={isUp ? "success" : "danger"}>{stock.percent}</Badge>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {formatINR(stock.price, 2)}
                    </p>
                  </div>
                  <div className="h-10 w-24 shrink-0">
                    <Sparkline data={series} stroke={isUp ? "#22c55e" : "#ef4444"} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.9fr_0.75fr]">
        <GlassPanel>
          <SectionHeader
            eyebrow="AI desk"
            title="Signals"
            subtitle="Short context, not marketing copy."
          />
          <div className="mt-4 space-y-3">
            {[
              "Momentum is strongest in financials and selective tech names.",
              "Trim weak names before adding to higher relative-strength stocks.",
              "Use limit orders near earnings to avoid avoidable slippage.",
            ].map((text) => (
              <div key={text} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-accent-400" />
                  <p className="text-sm leading-6 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            eyebrow="Recent"
            title="Activity"
            subtitle="Latest executions."
          />
          <div className="mt-4 space-y-3">
            {activity.length ? (
              activity.map((order) => (
                <div
                  key={`${order.name}-${order.time}`}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-white">{order.name}</p>
                    <Badge tone={order.type === "BUY" ? "success" : "danger"}>{order.type}</Badge>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {order.qty} @ {formatINR(order.price, 2)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.03] p-4 text-sm text-slate-400">
                No recent activity.
              </div>
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader eyebrow="Allocation" title="Mix" subtitle="Value split." />
          <div className="mt-4 space-y-3">
            {allocation.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-sm text-slate-400">{item.pct}%</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={`h-full rounded-full ${
                      item.tone === "accent"
                        ? "bg-accent-400"
                        : item.tone === "success"
                        ? "bg-emerald-400"
                        : item.tone === "warning"
                        ? "bg-amber-400"
                        : item.tone === "danger"
                        ? "bg-rose-400"
                        : "bg-slate-400"
                    }`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}
