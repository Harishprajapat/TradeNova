import React, { useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, TrendingDown } from "lucide-react";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { formatINR } from "../utils/format";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow, sellStock, balance, holdings } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);

  const stockName = typeof uid === "object" ? uid.name : uid;
  const holding = holdings.find((h) => h.name === stockName);
  const maxQty = holding?.qty ?? 0;
  const totalReturn = Number(stockQuantity) * Number(stockPrice);
  const canSell = maxQty > 0 && Number(stockQuantity) <= maxQty;

  const balanceAfter = useMemo(() => balance + totalReturn, [balance, totalReturn]);

  const handleSellClick = async () => {
    if (!canSell) return;
    await sellStock(stockName, stockQuantity, stockPrice);
    closeSellWindow();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-4 py-8 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSellWindow}
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
                  <Badge tone="danger">Sell order</Badge>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    NSE Equity
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                  {stockName || "INFY"}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Reduce risk or lock gains with a structured exit.
                </p>
              </div>
              <button
                onClick={closeSellWindow}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/5 text-slate-300 transition hover:bg-white/10"
                aria-label="Close sell window"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 pt-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Quantity
                    </span>
                    <input
                      type="number"
                      min="1"
                      max={maxQty || 1}
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
                    />
                  </label>
                  <label className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Exit price</span>
                    <input
                      type="number"
                      step="0.05"
                      value={stockPrice}
                      onChange={(e) => setStockPrice(e.target.value)}
                      className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
                    />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-rose-500/10 to-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Exit projection
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        Estimated cash inflow from this trade
                      </p>
                    </div>
                    <TrendingDown className="h-5 w-5 text-rose-300" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Trade value</p>
                      <p className="mt-2 font-display text-2xl font-semibold text-white">
                        {formatINR(totalReturn, 2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Available quantity
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold text-white">
                        {maxQty || 0} shares
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Balance after trade
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    {formatINR(balanceAfter, 2)}
                  </p>
                  <p className="mt-3 text-sm text-slate-400">
                    {maxQty > 0
                      ? `Holding available. Maximum exit size is ${maxQty} shares.`
                      : "You do not currently hold this instrument."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Execution note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Use smaller slices when liquidity is thin. Fast exits can improve certainty, but limit orders protect price.
                  </p>
                </div>

                <div className="flex gap-3 pt-1">
                  <Button variant="secondary" className="flex-1" onClick={closeSellWindow}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={handleSellClick}
                    disabled={!canSell}
                    title={!canSell ? "Invalid quantity" : "Place sell order"}
                  >
                    Place sell
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

export default SellActionWindow;


