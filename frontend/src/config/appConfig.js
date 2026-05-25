export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://tradenova-backend-a300.onrender.com";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Holdings", path: "/holdings" },
  { label: "Positions", path: "/positions" },
  { label: "Watchlist", path: "/watchlist" },
];

export const QUICK_ACTIONS = [
  { label: "Open Dashboard", path: "/" },
  { label: "Review Orders", path: "/orders" },
  { label: "Check Holdings", path: "/holdings" },
  { label: "Inspect Watchlist", path: "/watchlist" },
];


