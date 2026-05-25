import React from "react";

export default function GlassPanel({
  children,
  className = "",
  padded = true,
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-border-soft bg-surface-900 backdrop-blur-xl shadow-panel",
        padded ? "p-4 sm:p-5 lg:p-6" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}


