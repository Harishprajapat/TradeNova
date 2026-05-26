import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Lock, Activity, CandlestickChart } from "lucide-react";

export default function AuthShell({ children, title, subtitle, eyebrow }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#030712_100%)] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative flex items-center overflow-hidden border-b border-white/[0.08] px-6 py-10 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">
              <CandlestickChart className="h-3.5 w-3.5 text-accent-400" />
              {eyebrow}
            </div>

            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built for trading workflows, not presentation slides.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              TradeNova keeps portfolio, orders, positions, and watchlists in one calm workspace.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: <ShieldCheck className="h-4 w-4" />,
                  title: "Clear hierarchy",
                  text: "Readable data, restrained surfaces, and efficient spacing.",
                },
                {
                  icon: <BarChart3 className="h-4 w-4" />,
                  title: "Market overview",
                  text: "Compact analytics and portfolio context at a glance.",
                },
                {
                  icon: <Activity className="h-4 w-4" />,
                  title: "Motion with restraint",
                  text: "Fast transitions that support the interface, not distract from it.",
                },
                {
                  icon: <Lock className="h-4 w-4" />,
                  title: "Secure by default",
                  text: "Authentication, protected routes, and clear session handling.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-accent-300">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-slate-950/95 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.24)] sm:p-8"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-accent-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl font-semibold text-white">
                    TradeNova
                  </div>
                  <div className="text-sm text-slate-400">Paper trading workspace</div>
                </div>
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{subtitle}</p>
            </div>

            {children}
          </motion.div>
        </section>
      </div>
    </div>
  );
}


