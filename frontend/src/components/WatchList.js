import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Search, Sparkles, TrendingUp } from "lucide-react";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Sparkline from "./ui/Sparkline";
import { formatINR } from "../utils/format";

export default function WatchList() {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return watchlist.filter((stock) => stock.name.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Realtime watchlist"
        title="Watchlist"
        subtitle="High-signal stock cards with compact charts, quick actions, and a calmer trading feel."
        action={
          <Badge tone="accent">
            {filtered.length} tracked
          </Badge>
        }
      />

      <GlassPanel>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symbols, sectors, or momentum themes..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Momentum leaders</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">8 of 9</p>
              <p className="mt-1 text-sm text-slate-400">Names trending above the recent baseline.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">AI scan</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">3 signals</p>
              <p className="mt-1 text-sm text-slate-400">Fresh opportunities flagged for review.</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length ? (
          filtered.map((stock, index) => {
            const isUp = !stock.isDown;
            const series = Array.from({ length: 10 }).map((_, i) => ({
              value:
                stock.price *
                (1 + (Math.sin(i / 2 + index) * 0.012 + (isUp ? i * 0.0015 : -i * 0.001))),
            }));

            return (
              <motion.div
                key={stock.name}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-semibold text-white">{stock.name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge tone={isUp ? "success" : "danger"}>
                        {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {stock.percent}
                      </Badge>
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        LTP
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-semibold text-white">
                      {formatINR(stock.price, 2)}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">Live quote</p>
                  </div>
                </div>

                <div className="mt-4 h-20">
                  <Sparkline data={series} stroke={isUp ? "#22c55e" : "#ef4444"} />
                </div>

                <div className="mt-4 flex gap-3">
                  <Button className="flex-1" onClick={() => openBuyWindow(stock.name)}>
                    Buy
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={() => openSellWindow(stock.name)}>
                    Sell
                  </Button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-12 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-4 font-semibold text-white">No matching symbols</p>
            <p className="mt-2 text-sm text-slate-400">
              Adjust the search term to bring the stock back into view.
            </p>
          </div>
        )}
      </section>

      <GlassPanel>
        <SectionHeader
          eyebrow="Market radar"
          title="Quick read"
          subtitle="The watchlist is intentionally compact so the highest-signal names stay visible."
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Breakout names", value: "4", tone: "success" },
            { label: "Under pressure", value: "2", tone: "danger" },
            { label: "Near highs", value: "5", tone: "accent" },
            { label: "Set for review", value: "1", tone: "neutral" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="font-display text-3xl font-semibold text-white">{item.value}</p>
                <TrendingUp className="h-5 w-5 text-accent-400" />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}


