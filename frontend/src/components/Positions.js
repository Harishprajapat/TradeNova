import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, TrendingUp, Wallet } from "lucide-react";
import axios from "axios";
import { positions as samplePositions } from "../data/data";
import { API_BASE_URL } from "../config/appConfig";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import { formatINR } from "../utils/format";

export default function Positions() {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/allPositions`);
        setAllPositions(res.data);
      } catch {
        setAllPositions(samplePositions);
      } finally {
        setLoading(false);
      }
    };

    loadPositions();
  }, []);

  const summary = useMemo(() => {
    const pnl = allPositions.reduce((sum, stock) => {
      const current = stock.price * stock.qty;
      const invested = stock.avg * stock.qty;
      return sum + (current - invested);
    }, 0);
    return {
      pnl,
      profitable: pnl >= 0,
    };
  }, [allPositions]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Open positions"
        title="Positions"
        subtitle="A streamlined overview of open exposure, current mark-to-market, and trade direction."
        action={<Badge tone={summary.profitable ? "success" : "danger"}>{allPositions.length} open</Badge>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open positions",
            value: allPositions.length.toString().padStart(2, "0"),
            tone: "accent",
            icon: <Wallet className="h-4 w-4" />,
          },
          {
            label: "Net P&L",
            value: formatINR(Math.abs(summary.pnl), 2),
            tone: summary.profitable ? "success" : "danger",
            icon: <TrendingUp className="h-4 w-4" />,
          },
          {
            label: "Exposure",
            value: "Controlled",
            tone: "success",
            icon: <ShieldAlert className="h-4 w-4" />,
          },
          {
            label: "Strategy",
            value: "Intraday + CNC",
            tone: "neutral",
            icon: <TrendingUp className="h-4 w-4" />,
          },
        ].map((item) => (
          <motion.div key={item.label} whileHover={{ y: -2 }}>
            <GlassPanel>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.value}</h3>
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

      <GlassPanel>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.08] text-left">
            <thead className="bg-white/[0.03]">
              <tr className="text-xs uppercase tracking-[0.2em] text-slate-500">
                <th className="px-4 py-4">Product</th>
                <th className="px-4 py-4">Instrument</th>
                <th className="px-4 py-4">Qty</th>
                <th className="px-4 py-4">Avg</th>
                <th className="px-4 py-4">LTP</th>
                <th className="px-4 py-4">P&L</th>
                <th className="px-4 py-4">Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      {Array.from({ length: 7 }).map((__, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-5">
                          <div className="h-3 rounded-full bg-white/[0.08]" />
                        </td>
                      ))}
                    </tr>
                  ))
                : allPositions.map((stock) => {
                    const pnl = stock.price * stock.qty - stock.avg * stock.qty;
                    const isProfit = pnl >= 0;
                    return (
                      <tr key={`${stock.name}-${stock.qty}`} className="transition hover:bg-white/[0.03]">
                        <td className="px-4 py-5 text-slate-300">{stock.product}</td>
                        <td className="px-4 py-5">
                          <p className="font-semibold text-white">{stock.name}</p>
                        </td>
                        <td className="px-4 py-5 text-slate-300">{stock.qty}</td>
                        <td className="px-4 py-5 text-slate-300">{formatINR(stock.avg, 2)}</td>
                        <td className="px-4 py-5 text-slate-200">{formatINR(stock.price, 2)}</td>
                        <td className={`px-4 py-5 font-semibold ${isProfit ? "text-emerald-300" : "text-rose-300"}`}>
                          {isProfit ? "+" : ""}
                          {formatINR(Math.abs(pnl), 2)}
                        </td>
                        <td className={`px-4 py-5 font-semibold ${isProfit ? "text-emerald-300" : "text-rose-300"}`}>
                          {stock.day}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {!loading && !allPositions.length ? (
          <div className="border-t border-white/[0.08] px-4 py-16 text-center">
            <ShieldAlert className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-4 font-semibold text-white">No open positions</p>
            <p className="mt-2 text-sm text-slate-400">
              Your open exposure will appear here once positions are present in the portfolio.
            </p>
          </div>
        ) : null}
      </GlassPanel>
    </div>
  );
}


