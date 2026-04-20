import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

const userName = localStorage.getItem("userName") || "";

const userInitials = userName
  .trim()
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0].toUpperCase())
  .join("") || "?";

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="nav-logo">
        <div className="nav-logo-icon">
          <svg viewBox="0 0 16 16" fill="none">
            <polyline
              points="2,11 6,6 9,9 14,3"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="11,3 14,3 14,6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="nav-logo-text">
          Trade<span>Nova</span>
        </span>
      </div>

      {/* DESKTOP MENU — center column */}
      <div className="desktop-menu">
        {isAuthenticated() ? (
          <>
            <Link className={`nav-link${isActive("/") ? " active" : ""}`} to="/">
              Dashboard
            </Link>
            <Link className={`nav-link${isActive("/orders") ? " active" : ""}`} to="/orders">
              Orders
            </Link>
            <Link className={`nav-link${isActive("/holdings") ? " active" : ""}`} to="/holdings">
              Holdings
            </Link>
            <Link className={`nav-link${isActive("/positions") ? " active" : ""}`} to="/positions">
              Positions
            </Link>
            <Link className={`nav-link${isActive("/watchlist") ? " active" : ""}`} to="/watchlist">
              WatchList
            </Link>
          </>
        ) : (
          <>
            {!isActive("/login") && (
              <Link className="nav-link" to="/login">Login</Link>
            )}
            {!isActive("/signup") && (
              <Link className="nav-link" to="/signup">Signup</Link>
            )}
          </>
        )}
      </div>

      {/* RIGHT SECTION — right column */}
      <div className="nav-right">
        {isAuthenticated() ? (
          <>
            {/* Market status badge */}
            <div className="nav-market-badge">
              <div className="nav-market-dot" />
              <span className="nav-market-label">Market Open</span>
            </div>

            {/* User avatar */}
            <div className="nav-avatar">{userInitials}</div>

            {/* Logout */}
            <button
              className="nav-btn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5" />
                <polyline points="9,9.5 12,7 9,4.5" />
                <line x1="12" y1="7" x2="5" y2="7" />
              </svg>
              Logout
            </button>
          </>
        ) : null}
      </div>

      {/* MOBILE MENU ICON */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="mobile-menu">
          {isAuthenticated() ? (
            <>
              <Link
                className={`mobile-link${isActive("/") ? " active" : ""}`}
                to="/"
                onClick={handleCloseMenu}
              >
                Dashboard
              </Link>
              <Link
                className={`mobile-link${isActive("/orders") ? " active" : ""}`}
                to="/orders"
                onClick={handleCloseMenu}
              >
                Orders
              </Link>
              <Link
                className={`mobile-link${isActive("/holdings") ? " active" : ""}`}
                to="/holdings"
                onClick={handleCloseMenu}
              >
                Holdings
              </Link>
              <Link
                className={`mobile-link${isActive("/positions") ? " active" : ""}`}
                to="/positions"
                onClick={handleCloseMenu}
              >
                Positions
              </Link>
              <Link
                className={`mobile-link${isActive("/watchlist") ? " active" : ""}`}
                to="/watchlist"
                onClick={handleCloseMenu}
              >
                WatchList
              </Link>

              <div className="mobile-menu-divider" />

              <button
                className="nav-btn"
                onClick={() => {
                  handleCloseMenu();
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="mobile-link" to="/login" onClick={handleCloseMenu}>
                Login
              </Link>
              <Link className="mobile-link" to="/signup" onClick={handleCloseMenu}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}