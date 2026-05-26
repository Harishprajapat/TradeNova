import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CandlestickChart,
  ChevronLeft,
  ClipboardList,
  Eye,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Wallet,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import useIsMobile from "../../hooks/useIsMobile";
import { NAV_ITEMS } from "../../config/appConfig";

const SIDEBAR_COLLAPSED_WIDTH = 80;
const SIDEBAR_EXPANDED_WIDTH = 256;
const SIDEBAR_STORAGE_KEY = "tradenova.sidebarCollapsed";

const NAV_ICONS = {
  Dashboard: LayoutDashboard,
  Orders: ClipboardList,
  Holdings: Wallet,
  Positions: BarChart3,
  Watchlist: Eye,
};

function resolveDefaultSidebarState() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
  if (stored === "true" || stored === "false") return stored === "true";
  return window.innerWidth < 1440;
}

function SidebarNavItem({ label, icon: Icon, active, collapsed, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "group flex h-11 w-full items-center rounded-xl border px-2 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/30",
        active
          ? "border-white/10 bg-white/[0.06] text-white"
          : "border-transparent bg-transparent text-slate-400 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-100",
        collapsed ? "justify-center" : "justify-start",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150",
          active
            ? "border-white/10 bg-slate-900 text-white"
            : "border-white/[0.06] bg-white/[0.03] text-slate-300 group-hover:text-white",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
      </span>

      {!collapsed ? (
        <span className="ml-3 min-w-0 truncate text-sm font-medium">{label}</span>
      ) : null}
    </button>
  );
}

function TopBar({ onMobileMenuOpen, onDesktopToggle, onCommandOpen, onLogout }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/[0.06] bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white xl:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onDesktopToggle}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white xl:inline-flex"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onCommandOpen}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-left text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-slate-300"
        >
          <Search className="h-4 w-4 shrink-0 text-slate-500" />
          <span className="truncate text-sm">Search routes, orders, watchlist...</span>
          <span className="ml-auto hidden rounded-md border border-white/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:inline-flex">
            Ctrl K
          </span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}

function DesktopSidebar({ collapsed, setCollapsed, pathname, navigate, closeMobile }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-white/[0.06] bg-slate-950 xl:flex"
      style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
    >
      <div className="flex h-full w-full flex-col p-3">
        <div className="flex h-14 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-accent-300">
            <CandlestickChart className="h-4 w-4" />
          </div>

          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">TradeNova</div>
              <div className="truncate text-[11px] text-slate-500">Paper trading workspace</div>
            </div>
          ) : null}

          {!collapsed ? (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICONS[item.label] || LayoutDashboard;
              const active =
                item.path === "/"
                  ? pathname === "/" || pathname === "/dashboard"
                  : pathname.startsWith(item.path);

              return (
                <SidebarNavItem
                  key={item.path}
                  label={item.label}
                  icon={Icon}
                  active={active}
                  collapsed={collapsed}
                  onClick={() => {
                    navigate(item.path);
                    closeMobile();
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-xs font-semibold text-white">
              PA
            </div>

            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">Paper account</div>
                <div className="truncate text-xs text-slate-500">Demo workspace</div>
              </div>
            ) : null}

            {!collapsed ? (
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("currentUser");
                  window.dispatchEvent(new Event("authchange"));
                  navigate("/login");
                }}
                className="ml-auto inline-flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs font-medium text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("currentUser");
                  window.dispatchEvent(new Event("authchange"));
                  navigate("/login");
                }}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </motion.aside>
  );
}

function MobileDrawer({ open, onClose, pathname, navigate }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-[2px] xl:hidden"
          />

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-[min(84vw,320px)] border-r border-white/[0.06] bg-slate-950 xl:hidden"
          >
            <div className="flex h-full flex-col p-3">
              <div className="flex h-14 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-accent-300">
                  <CandlestickChart className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">TradeNova</div>
                  <div className="text-[11px] text-slate-500">Paper trading workspace</div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300"
                  aria-label="Close navigation"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = NAV_ICONS[item.label] || LayoutDashboard;
                    const active =
                      item.path === "/"
                        ? pathname === "/" || pathname === "/dashboard"
                        : pathname.startsWith(item.path);

                    return (
                      <SidebarNavItem
                        key={item.path}
                        label={item.label}
                        icon={Icon}
                        active={active}
                        collapsed={false}
                        onClick={() => {
                          navigate(item.path);
                          onClose();
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900 text-xs font-semibold text-white">
                    PA
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Paper account</div>
                    <div className="text-xs text-slate-500">Demo workspace</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default function AppShell() {
  const isMobile = useIsMobile(1280);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(resolveDefaultSidebarState);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const desktopSidebarWidth = sidebarCollapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_EXPANDED_WIDTH;

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (isMobile) setMobileSidebarOpen(false);
  }, [isMobile]);
  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (event.key === "Escape") setMobileSidebarOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen || commandPaletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen, commandPaletteOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("authchange"));
    navigate("/login");
  };

  const shellStyle = useMemo(
    () => ({
      "--desktop-shell-width": `${desktopSidebarWidth}px`,
    }),
    [desktopSidebarWidth]
  );

  return (
    <div className="min-h-screen bg-transparent" style={shellStyle}>
      {!isMobile ? (
        <DesktopSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          pathname={pathname}
          navigate={navigate}
          closeMobile={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <MobileDrawer
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        pathname={pathname}
        navigate={navigate}
      />

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <div className="min-h-screen transition-[padding-left] duration-200 ease-out xl:pl-[var(--desktop-shell-width)]">
        <TopBar
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
          onDesktopToggle={() => setSidebarCollapsed((value) => !value)}
          onCommandOpen={() => setCommandPaletteOpen(true)}
          onLogout={handleLogout}
        />

        <main className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
