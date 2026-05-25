import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  Clock3,
  Radar,
  ShieldAlert,
  TrendingUp,
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
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import GlassPanel from "./ui/GlassPanel";
import MetricCard from "./ui/MetricCard";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import SectionHeader from "./ui/SectionHeader";
import Sparkline from "./ui/Sparkline";
import { formatINR, formatPercent } from "../utils/format";
import { useNavigate } from "react-router-dom";

const areaData = [
  { day: "Mon", value: 108 },
  { day: "Tue", value: 116 },
  { day: "Wed", value: 121 },
  { day: "Thu", value: 119 },
  { day: "Fri", value: 126 },
  { day: "Sat", value: 130 },
  { day: "Sun", value: 135 },
];

const sectorCards = [
  { label: "Technology", pct: 34, tone: "accent" },
  { label: "Financials", pct: 22, tone: "success" },
  { label: "Energy", pct: 14, tone: "warning" },
  { label: "Consumer", pct: 18, tone: "neutral" },
  { label: "Industrial", pct: 12, tone: "danger" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { balance, holdings, orders, loading } = useContext(GeneralContext);

  const portfolioValue = useMemo(() => {
    return holdings.reduce((sum, stock) => sum + stock.qty * (stock.price || stock.avg), balance);
  }, [balance, holdings]);

  const invested = useMemo(
    () => holdings.reduce((sum, stock) => sum + stock.qty * stock.avg, 0),
    [holdings]
  );

  const pnl = portfolioValue - invested;
  const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
  const profitable = pnl >= 0;

  const metrics = [
    {
      label: "Portfolio value",
      value: formatINR(portfolioValue, 2),
      delta: formatPercent(pnlPct),
      tone: profitable ? "success" : "danger",
      footnote: `${holdings.length} active holdings linked to your live portfolio`,
      icon: <Wallet className="h-4 w-4" />,
    },
    {
      label: "Cash balance",
      value: formatINR(balance, 2),
      delta: "+2.8% vs yesterday",
      tone: "accent",
      footnote: "Immediate buying power available for new orders",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
    },
    {
      label: "Realized P&L",
      value: formatINR(Math.abs(pnl), 2),
      delta: profitable ? "Positive" : "Under water",
      tone: profitable ? "success" : "danger",
      footnote: "Mark-to-market view across current holdings",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      label: "Active orders",
      value: orders.length.toString().padStart(2, "0"),
      delta: "Streaming feed",
      tone: "accent",
      footnote: "Recent trades and queued executions",
      icon: <Activity className="h-4 w-4" />,
    },
  ];

  const insights = [
    {
      title: "AI market pulse",
      body: "Momentum remains constructive in large-cap financials. Risk appetite is still tilted toward quality names.",
    },
    {
      title: "Rebalance suggestion",
      body: "Trim the weakest 10% of positions and move capital into higher relative-strength names from the watchlist.",
    },
    {
      title: "Risk snapshot",
      body: "Portfolio beta is balanced. Volatility exposure is controlled, but earnings-season gaps remain the key risk.",
    },
  ];

  const activity = orders.slice().reverse().slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,182,246,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_22%)]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge tone="accent">Portfolio command center</Badge>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                A cleaner way to watch markets, manage risk, and place trades.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                TradeNova combines live market context, portfolio intelligence, and a calm fintech UI designed for serious trading workflows.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => navigate("/watchlist")}>
                  Open watchlist
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => navigate("/orders")}>
                  View orders
                  <Clock3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/[0.08] bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Market tone</p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">Constructive</p>
                <div className="mt-3 h-16">
                  <Sparkline
                    data={[
                      { value: 12 },
                      { value: 18 },
                      { value: 16 },
                      { value: 24 },
                      { value: 22 },
                      { value: 30 },
                    ]}
                  />
                </div>
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">AI insights</p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">3 fresh signals</p>
                <p className="mt-2 text-sm text-slate-400">Updated from relative strength, volume, and portfolio drift.</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Portfolio trend</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-white">
                Growth curve
              </h2>
            </div>
            <Badge tone="success">{formatPercent(pnlPct)}</Badge>
          </div>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#29b6f6" stopOpacity={0.42} />
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
                  strokeWidth={2.5}
                  fill="url(#portfolioFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[166px] animate-pulse rounded-3xl border border-white/[0.08] bg-white/[0.04]" />
            ))
          : metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel>
          <SectionHeader
            eyebrow="Watchlist pulse"
            title="What's moving right now"
            subtitle="A concise view of the instruments you're likely to care about first."
            action={
              <Button variant="secondary">
                Open full watchlist
                <Radar className="h-4 w-4" />
              </Button>
            }
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {watchlist.slice(0, 6).map((stock, index) => {
              const series = Array.from({ length: 8 }).map((_, i) => ({
                value:
                  stock.price *
                  (1 + (Math.sin(i + index) * 0.015 + (i % 2 === 0 ? 0.008 : -0.004))),
              }));
              const isPositive = !stock.isDown;
              return (
                <motion.button
                  key={stock.name}
                  whileHover={{ y: -2 }}
                  className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{stock.name}</p>
                      <p className={`mt-1 text-sm ${isPositive ? "text-emerald-300" : "text-rose-300"}`}>
                        {stock.percent}
                      </p>
                    </div>
                    <Badge tone={isPositive ? "success" : "danger"}>
                      {formatINR(stock.price, 2)}
                    </Badge>
                  </div>
                  <div className="mt-4 h-16">
                    <Sparkline
                      data={series}
                      stroke={isPositive ? "#22c55e" : "#ef4444"}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel>
            <SectionHeader
              eyebrow="AI desk"
              title="Smart recommendations"
              subtitle="Short, high-signal guidance meant to support decision making."
            />
            <div className="mt-5 space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight.title}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-accent-400" />
                    <h3 className="font-semibold text-white">{insight.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{insight.body}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <SectionHeader
              eyebrow="Sector spread"
              title="Portfolio distribution"
              subtitle="An elegant summary of exposure across the current mix."
            />
            <div className="mt-5 space-y-3">
              {sectorCards.map((sector) => (
                <div key={sector.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{sector.label}</p>
                    <p className="text-sm text-slate-400">{sector.pct}%</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={`h-full rounded-full ${
                        sector.tone === "accent"
                          ? "bg-accent-400"
                          : sector.tone === "success"
                          ? "bg-emerald-400"
                          : sector.tone === "warning"
                          ? "bg-amber-400"
                          : sector.tone === "danger"
                          ? "bg-rose-400"
                          : "bg-slate-400"
                      }`}
                      style={{ width: `${sector.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel>
          <SectionHeader
            eyebrow="Recent activity"
            title="Activity timeline"
            subtitle="Your latest executed or queued actions, rendered as a calm timeline."
          />
          <div className="mt-5 space-y-4">
            {activity.length ? (
              activity.map((order) => (
                <div
                  key={`${order.name}-${order.time}`}
                  className="flex items-start gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className={`mt-1 h-3 w-3 rounded-full ${order.type === "BUY" ? "bg-emerald-400" : "bg-rose-400"}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-white">{order.name}</p>
                      <Badge tone={order.type === "BUY" ? "success" : "danger"}>{order.type}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      {order.qty} shares at {formatINR(order.price, 2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">
                <ShieldAlert className="mx-auto h-8 w-8 text-slate-500" />
                <p className="mt-4 font-semibold text-white">No recent activity</p>
                <p className="mt-2 text-sm text-slate-400">
                  Once orders start flowing, they will appear here with timestamps and status tags.
                </p>
              </div>
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            eyebrow="Signal board"
            title="Risk and opportunity"
            subtitle="A few concise indicators for the next decision."
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {[
              { label: "Momentum", value: "Strong", tone: "success" },
              { label: "Volatility", value: "Controlled", tone: "accent" },
              { label: "News flow", value: "Neutral", tone: "neutral" },
              { label: "Liquidity", value: "Healthy", tone: "success" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <Badge tone={item.tone}>{item.value}</Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}



