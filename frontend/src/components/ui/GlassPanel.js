import React from "react";

export default function GlassPanel({
  children,
  className = "",
  padded = true,
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/[0.06] bg-slate-900/95 shadow-[0_16px_40px_rgba(0,0,0,0.24)]",
        padded ? "p-4 sm:p-5 lg:p-6" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}


