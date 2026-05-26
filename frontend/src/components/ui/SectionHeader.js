import React from "react";
import Badge from "./Badge";

export default function SectionHeader({
  title,
  subtitle,
  action,
  eyebrow,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div>
        {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
        <h2 className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}


