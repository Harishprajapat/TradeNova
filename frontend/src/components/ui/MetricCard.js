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
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-[2rem]">
            {value}
          </h3>
          {footnote ? (
            <p className="mt-2 text-sm text-slate-400">{footnote}</p>
          ) : null}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-200">
          {icon}
        </div>
      </div>
      {delta ? (
        <div className="mt-5">
          <Badge tone={tone}>{delta}</Badge>
        </div>
      ) : null}
    </GlassPanel>
  );
}


