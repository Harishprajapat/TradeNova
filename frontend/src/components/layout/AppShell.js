import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Command,
  LayoutDashboard,
  LineChart,
  Menu,
  MoonStar,
  Search,
  ShieldCheck,
  ShoppingCart,
  SunMedium,
  Wallet,
  X,
} from "lucide-react";
import { NAV_ITEMS } from "../../config/appConfig";
import CommandPalette from "./CommandPalette";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { initialsFromName } from "../../utils/format";
import { isAuthenticated } from "../../utils/auth";

const iconMap = {
  Dashboard: LayoutDashboard,
  Orders: ShoppingCart,
  Holdings: Wallet,
  Positions: LineChart,
  Watchlist: Search,
};

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("tradenova-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("tradenova-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((curr) => (curr === "dark" ? "light" : "dark"))}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-soft bg-white/5 text-slate-200 transition hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
    </button>
  );
}

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  const userName = localStorage.getItem("userName") || "TradeNova User";
  const initials = initialsFromName(userName);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const statusLabel = useMemo(
    () => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [now]
  );

  const notifications = [
    {
      title: "AI found a momentum cluster",
      detail: "NSE midcaps showing elevated relative strength over 5 sessions.",
    },
    {
      title: "Risk check complete",
      detail: "Portfolio beta remains within target range after last order batch.",
    },
    {
      title: "Watchlist alert",
      detail: "RELIANCE is trading near the upper bound of the 20-day channel.",
    },
  ];

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authchange"));
    navigate("/login");
  };

  if (!isAuthenticated()) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(41,182,246,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_18%),linear-gradient(180deg,#020617_0%,#030712_100%)] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-[290px] border-r border-white/[0.08] bg-slate-950/[0.78] backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className="flex items-center justify-between rounded-3xl border border-border-soft bg-white/[0.03] p-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-cyan-300 text-slate-950 shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold tracking-tight text-white">
                  TradeNova
                </div>
                <div className="text-xs text-slate-400">AI trading workspace</div>
              </div>
            </button>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          <div className="mt-5 rounded-3xl border border-border-soft bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Market status
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  Live session
                </h3>
              </div>
              <Badge tone="success">Open</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Streaming quotes, portfolio sync, and AI signals update in near real time.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Session
                </div>
                <div className="mt-1 font-semibold text-white">{statusLabel}</div>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Mode
                </div>
                <div className="mt-1 font-semibold text-white">Premium</div>
              </div>
            </div>
          </div>

          <nav className="mt-5 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const ActiveIcon = iconMap[item.label] || LayoutDashboard;
              const active = location.pathname === item.path || (item.path === "/" && location.pathname === "/dashboard");
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={[
                    "group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200",
                    active
                      ? "border-accent-500/30 bg-accent-500/10 text-white shadow-glow"
                      : "border-transparent bg-transparent text-slate-400 hover:border-white/[0.08] hover:bg-white/5 hover:text-slate-100",
                  ].join(" ")}
                >
                  <ActiveIcon className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="rounded-3xl border border-border-soft bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/5 text-white">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{userName}</p>
                  <p className="text-xs text-slate-500">Founder account</p>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="w-full justify-start" onClick={() => setCommandOpen(true)}>
              <Command className="h-4 w-4" />
              Command palette
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[290px]">
        <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-slate-950/[0.70] backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-soft bg-white/5 text-slate-200 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>

            <button
              onClick={() => setCommandOpen(true)}
              className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-left text-sm text-slate-400 transition hover:bg-white/[0.06] lg:flex"
            >
              <Search className="h-4 w-4" />
              <span>Search actions, routes, or market insight...</span>
              <span className="ml-auto rounded-lg border border-white/10 px-2 py-1 text-[11px] text-slate-500">
                Ctrl K
              </span>
            </button>

            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setNotificationsOpen((v) => !v)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-soft bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Open notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_0_4px_rgba(41,182,246,0.15)]" />
              </button>
              <button
                onClick={signOut}
                className="hidden rounded-2xl border border-border-soft bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex"
              >
                Logout
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-soft bg-gradient-to-br from-white/[0.12] to-white/5 text-sm font-semibold text-white">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <button
        onClick={() => setCommandOpen(true)}
        className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-slate-950 shadow-glow lg:hidden"
        aria-label="Open command palette"
      >
        <Command className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {notificationsOpen ? (
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            className="fixed right-4 top-20 z-40 w-[min(92vw,24rem)] rounded-[28px] border border-border-soft bg-slate-950/[0.95] p-4 shadow-panel backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Notifications
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  Activity feed
                </h3>
              </div>
              <button onClick={() => setNotificationsOpen(false)}>
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="secondary" className="w-full" onClick={() => navigate("/orders")}>
                View full activity
              </Button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      {sidebarOpen ? (
        <button
          className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar backdrop"
        />
      ) : null}
    </div>
  );
}


