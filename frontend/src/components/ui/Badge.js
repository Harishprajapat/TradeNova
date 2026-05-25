import React from "react";

export default function Badge({ children, tone = "neutral", className = "" }) {
  const styles = {
    neutral: "bg-white/[0.06] text-slate-300 border-white/10",
    success: "bg-emerald-500/[0.12] text-emerald-300 border-emerald-500/25",
    danger: "bg-rose-500/[0.12] text-rose-300 border-rose-500/25",
    accent: "bg-sky-500/[0.12] text-sky-300 border-sky-500/25",
    warning: "bg-amber-500/[0.12] text-amber-300 border-amber-500/25",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        styles[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}


