import React from "react";
import GlassPanel from "./GlassPanel";
import Badge from "./Badge";

export default function MetricCard({
  label,
  value,
  delta,
  tone = "neutral",
  footnote,
  icon,
}) {
  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            {label}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            {value}
          </h3>
          {footnote ? (
            <p className="mt-2 text-sm text-slate-400">{footnote}</p>
          ) : null}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200">
          {icon}
        </div>
      </div>
      {delta ? (
        <div className="mt-5">
          <Badge tone={tone}>{delta}</Badge>
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent" />
    </GlassPanel>
  );
}


