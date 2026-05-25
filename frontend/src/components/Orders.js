import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal } from "lucide-react";
import GeneralContext from "./GeneralContext";
import GlassPanel from "./ui/GlassPanel";
import Badge from "./ui/Badge";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import { SkeletonLine } from "./ui/Skeleton";
import { formatINR } from "../utils/format";

const PAGE_SIZE = 6;

export default function Orders() {
  const { orders, loading } = useContext(GeneralContext);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = [...orders];

    if (normalized) {
      result = result.filter(
        (order) =>
          order.name.toLowerCase().includes(normalized) ||
          order.type.toLowerCase().includes(normalized)
      );
    }

    if (status !== "ALL") {
      result = result.filter((order) => order.type === status);
    }

    result.sort((a, b) => {
      const aTime = new Date(a.time).getTime();
      const bTime = new Date(b.time).getTime();
      return sort === "latest" ? bTime - aTime : aTime - bTime;
    });

    return result;
  }, [orders, query, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filters = [
    { label: "All", value: "ALL" },
    { label: "Buy", value: "BUY" },
    { label: "Sell", value: "SELL" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Execution"
        title="Orders"
        subtitle="A clean transaction journal with search, filters, sorting, and a more premium table presentation."
        action={
          <Badge tone="accent">
            {filtered.length.toString().padStart(2, "0")} orders
          </Badge>
        }
      />

      <GlassPanel>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_auto_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search orders by symbol or type..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
            />
          </label>

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
            <Filter className="h-4 w-4 text-slate-500" />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-sm text-slate-200"
            >
              {filters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-sm text-slate-200"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/[0.08] text-left">
            <thead className="bg-white/[0.03]">
              <tr className="text-xs uppercase tracking-[0.2em] text-slate-500">
                <th className="px-4 py-4">Instrument</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Qty</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Value</th>
                <th className="px-4 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              {loading
                ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: 6 }).map((__, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-5">
                          <SkeletonLine className="h-3 w-24" />
                        </td>
                      ))}
                    </tr>
                  ))
                : pageItems.map((order) => {
                    const isBuy = order.type === "BUY";
                    return (
                      <motion.tr
                        key={`${order.name}-${order.time}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.16 }}
                        className="transition hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-5">
                          <div>
                            <p className="font-semibold text-white">{order.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                              Trade executed
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <Badge tone={isBuy ? "success" : "danger"}>{order.type}</Badge>
                        </td>
                        <td className="px-4 py-5 text-slate-300">{order.qty}</td>
                        <td className="px-4 py-5 text-slate-200">{formatINR(order.price, 2)}</td>
                        <td className="px-4 py-5 text-slate-200">
                          {formatINR(order.qty * order.price, 2)}
                        </td>
                        <td className="px-4 py-5 text-sm text-slate-400">
                          {new Date(order.time).toLocaleString()}
                        </td>
                      </motion.tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {!loading && !pageItems.length ? (
          <div className="border-t border-white/[0.08] px-4 py-16 text-center">
            <p className="font-semibold text-white">No orders found</p>
            <p className="mt-2 text-sm text-slate-400">
              Try adjusting the search or filter chips to reveal more activity.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
          <p className="text-sm text-slate-400">
            Showing {pageItems.length} of {filtered.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Badge tone="neutral">
              Page {page} / {totalPages}
            </Badge>
            <Button
              variant="secondary"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}


