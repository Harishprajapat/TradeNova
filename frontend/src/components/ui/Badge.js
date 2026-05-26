import React from "react";

export default function Badge({ children, tone = "neutral", className = "" }) {
  const styles = {
    neutral: "bg-white/[0.05] text-slate-300 border-white/[0.08]",
    success: "bg-emerald-500/[0.12] text-emerald-300 border-emerald-500/20",
    danger: "bg-rose-500/[0.12] text-rose-300 border-rose-500/20",
    accent: "bg-sky-500/[0.12] text-sky-300 border-sky-500/20",
    warning: "bg-amber-500/[0.12] text-amber-300 border-amber-500/20",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
        styles[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}


