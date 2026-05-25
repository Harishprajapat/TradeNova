import React from "react";

export function SkeletonLine({ className = "" }) {
  return (
    <div
      className={`animate-shimmer rounded-full bg-gradient-to-r from-white/[0.08] via-white/[0.16] to-white/[0.08] bg-[length:200%_100%] ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-border-soft bg-white/[0.04] p-5">
      <SkeletonLine className="h-3 w-24" />
      <SkeletonLine className="mt-4 h-8 w-40" />
      <SkeletonLine className="mt-6 h-32 w-full rounded-2xl" />
    </div>
  );
}


