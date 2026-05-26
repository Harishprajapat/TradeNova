import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const styles = {
    primary:
      "bg-accent-500 text-slate-950 hover:bg-accent-400",
    secondary:
      "border border-white/[0.08] bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]",
    ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
    danger:
      "border border-danger/30 bg-danger/10 text-red-200 hover:bg-danger/20",
  };

  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}


