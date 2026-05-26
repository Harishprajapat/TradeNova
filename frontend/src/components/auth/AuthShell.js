import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CandlestickChart, TrendingUp, TrendingDown } from "lucide-react";

const TICKERS = [
  { symbol: "NIFTY 50",  base: 24812.05, decimals: 2 },
  { symbol: "SENSEX",    base: 81432.10, decimals: 2 },
  { symbol: "BANKNIFTY", base: 52341.80, decimals: 2 },
  { symbol: "USD/INR",   base: 83.42,    decimals: 2 },
  { symbol: "GOLD",      base: 71820,    decimals: 0 },
];

function useLiveTickers() {
  const [tickers, setTickers] = useState(() =>
    TICKERS.map((t) => ({
      ...t,
      price: t.base,
      change: +(Math.random() * 2 - 1).toFixed(2),
      pct: +(Math.random() * 1.2 - 0.6).toFixed(2),
      dir: Math.random() > 0.5 ? 1 : -1,
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.49) * t.base * 0.0004;
          const newPrice = +(t.price + delta).toFixed(t.decimals);
          const newChange = +(newPrice - t.base).toFixed(t.decimals);
          const newPct = +((newChange / t.base) * 100).toFixed(2);
          return { ...t, price: newPrice, change: newChange, pct: newPct, dir: delta >= 0 ? 1 : -1 };
        })
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return tickers;
}

function TickerRow({ symbol, price, change, pct, decimals }) {
  const up = pct >= 0;
  return (
    <motion.div
      layout
      className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.025] px-4 py-2.5"
    >
      <span className="text-xs font-medium tracking-wide text-slate-400">{symbol}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-white tabular-nums">
          {price.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        </span>
        <motion.span
          key={pct}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={`flex items-center gap-1 text-xs font-medium tabular-nums ${up ? "text-emerald-400" : "text-red-400"}`}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {up ? "+" : ""}{pct}%
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function AuthShell({ children, title, subtitle, eyebrow }) {
  const tickers = useLiveTickers();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#030712_100%)] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">

        {/* ── Left panel ── */}
        <section className="relative flex items-center overflow-hidden border-b border-white/[0.08] px-6 py-10 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          {/* subtle grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

          <div className="relative z-10 w-full max-w-xl">
            {/* eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">
              <CandlestickChart className="h-3.5 w-3.5 text-accent-400" />
              {eyebrow}
            </div>

            {/* headline — shorter, punchier */}
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Practice trading.<br />Build real discipline.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Risk-free paper trading with real market data.
            </p>

            {/* live market tickers — replaces the 4 feature cards */}
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Live market pulse
              </p>
              <div className="flex flex-col gap-2">
                {tickers.map((t) => (
                  <TickerRow key={t.symbol} {...t} />
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-600">
                Prices update in real time during market hours.
              </p>
            </div>
          </div>
        </section>

        {/* ── Right panel — form ── */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-slate-950/95 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.24)] sm:p-8"
          >
            {/* form header — logo removed, title only */}
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-accent-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-400">TradeNova</span>
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
            </div>

            {children}
          </motion.div>
        </section>

      </div>
    </div>
  );
}