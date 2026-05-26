import React, { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, TrendingDown } from "lucide-react";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { formatINR } from "../utils/format";
import useIsMobile from "../hooks/useIsMobile";

const SellActionWindow = ({ uid }) => {
  const isMobile = useIsMobile();
  const { closeSellWindow, sellStock, balance, holdings } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);

  const stockName = typeof uid === "object" ? uid.name : uid;
  const holding = holdings.find((h) => h.name === stockName);
  const maxQty = holding?.qty ?? 0;
  const totalReturn = Number(stockQuantity) * Number(stockPrice);
  const canSell = maxQty > 0 && Number(stockQuantity) <= maxQty;

  const balanceAfter = useMemo(() => balance + totalReturn, [balance, totalReturn]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSellWindow();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeSellWindow]);

  const handleSellClick = async () => {
    if (!canSell) return;
    await sellStock(stockName, stockQuantity, stockPrice);
    closeSellWindow();
  };

  const sheetDragEnd = (_, info) => {
    if (info.offset.y > 80 || info.velocity.y > 700) {
      closeSellWindow();
    }
  };

  const content = (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Qty</span>
          <input
            type="number"
            min="1"
            max={maxQty || 1}
            value={stockQuantity}
            autoFocus={!isMobile}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
          />
        </label>
        <label className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</span>
          <input
            type="number"
            step="0.05"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
            className="mt-3 w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-500"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Trade value</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">
                {formatINR(totalReturn, 2)}
              </p>
            </div>
            <TrendingDown className="h-5 w-5 text-rose-300" />
          </div>
          <p className="mt-3 text-sm text-slate-400">
            You can exit up to {maxQty || 0} shares.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Balance after</p>
          <p className="mt-2 font-display text-2xl font-semibold text-white">
            {formatINR(balanceAfter, 2)}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-rose-400" style={{ width: `${Math.min(100, (totalReturn / (balanceAfter || 1)) * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Risk</p>
          <Badge tone={canSell ? "success" : "danger"}>{canSell ? "Ready" : "No position"}</Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Smaller slices help preserve price when liquidity is thin.
        </p>
      </div>

      <div className="flex gap-3 pt-1">
        <Button variant="secondary" className="flex-1" onClick={closeSellWindow}>
          Cancel
        </Button>
        <Button variant="danger" className="flex-1" onClick={handleSellClick} disabled={!canSell}>
          Sell
        </Button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-slate-950/72 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSellWindow}
      >
        {isMobile ? (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={sheetDragEnd}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl border border-white/[0.06] bg-slate-950 px-4 pb-6 pt-3 shadow-[0_12px_32px_rgba(0,0,0,0.24)]"
            style={{ touchAction: "pan-y" }}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/[0.18]" />
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="danger">Sell</Badge>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-500">NSE</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  {stockName || "INFY"}
                </h3>
              </div>
              <button
                onClick={closeSellWindow}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300"
                aria-label="Close sell sheet"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="pt-4">{content}</div>
          </motion.div>
        ) : (
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <GlassPanel className="overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge tone="danger">Sell order</Badge>
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-500">NSE Equity</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                      {stockName || "INFY"}
                    </h3>
                  </div>
                  <button
                    onClick={closeSellWindow}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300"
                    aria-label="Close sell window"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="pt-4">{content}</div>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SellActionWindow;
