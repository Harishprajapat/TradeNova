import React, { useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, TrendingUp } from "lucide-react";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { formatINR } from "../utils/format";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, buyStock, balance } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);

  const totalCost = Number(stockQuantity) * Number(stockPrice);
  const marginRequired = totalCost * 0.2;
  const canAfford = balance >= totalCost;

  const impact = useMemo(() => {
    const pct = balance > 0 ? (totalCost / balance) * 100 : 0;
    return pct.toFixed(1);
  }, [balance, totalCost]);

  const handleBuyClick = async () => {
    if (!canAfford) return;
    await buyStock(uid, stockQuantity, stockPrice);
    closeBuyWindow();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-4 py-8 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBuyWindow}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          <GlassPanel className="overflow-hidden">
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="accent">Buy order</Badge>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    NSE Equity
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                  {uid || "INFY"}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Build position with precision. You can tune size and price before sending.
                </p>
              </div>
              <button
                onClick={closeBuyWindow}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/5 text-slate-300 transition hover:bg-white/10"
                aria-label="Close buy window"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 pt-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Quantity</span>
                    <input
                      type="number"
                      min="1"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
                    />
                  </label>
                  <label className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Limit price</span>
                    <input
                      type="number"
                      step="0.05"
                      value={stockPrice}
                      onChange={(e) => setStockPrice(e.target.value)}
                      className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
                    />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-accent-500/10 to-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Capital impact
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        Margin required for this order
                      </p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-accent-400" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Order value</p>
                      <p className="mt-2 font-display text-2xl font-semibold text-white">
                        {formatINR(totalCost, 2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Approx margin</p>
                      <p className="mt-2 font-display text-2xl font-semibold text-white">
                        {formatINR(marginRequired, 2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Available buying power
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    {formatINR(balance, 2)}
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={`h-full rounded-full ${canAfford ? "bg-emerald-400" : "bg-rose-400"}`}
                      style={{ width: `${Math.min(100, Number(impact) || 0)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    Order consumes about {impact}% of your current balance.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Risk note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Use limit orders for precision. Market orders execute faster but can slip in fast conditions.
                  </p>
                </div>

                <div className="flex gap-3 pt-1">
                  <Button variant="secondary" className="flex-1" onClick={closeBuyWindow}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleBuyClick}
                    disabled={!canAfford}
                    title={!canAfford ? "Insufficient balance" : "Place buy order"}
                  >
                    Place buy
                  </Button>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BuyActionWindow;


