import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QUICK_ACTIONS } from "../../config/appConfig";

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUICK_ACTIONS;
    return QUICK_ACTIONS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.path.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/[0.70] px-4 pt-24 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-border-soft bg-slate-950 shadow-panel"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-4">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search routes, insights, or actions..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
              >
                <Command className="h-3.5 w-3.5" />
                Esc
              </button>
            </div>
            <div className="max-h-[58vh] overflow-y-auto p-2">
              {filtered.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500">{item.path}</span>
                </button>
              ))}
              {!filtered.length ? (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No actions matched your search.
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}


