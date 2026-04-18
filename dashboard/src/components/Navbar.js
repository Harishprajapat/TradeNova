import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileLinkHover = (e) => {
    e.target.style.background = "#1e293b";
  };
  const mobileLinkLeave = (e) => {
    e.target.style.background = "transparent";
  };

  return (
    <div style={navContainer}>
      {/* LEFT: LOGO */}
      <h2 style={{ margin: 0 }}>TradeNova</h2>

      {/* RIGHT: DESKTOP MENU */}
      <div className="desktop-menu" style={desktopMenu}>
        {isAuthenticated() ? (
          <>
            <Link style={linkStyle} to="/">
              Dashboard
            </Link>
            <Link style={linkStyle} to="/orders">
              Orders
            </Link>
            <Link style={linkStyle} to="/holdings">
              Holdings
            </Link>
            <Link style={linkStyle} to="/positions">
              Positions
            </Link>
            <Link style={linkStyle} to="/watchlist">
              WatchList
            </Link>

            <button
              style={btnStyle}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <Link style={linkStyle} to="/login">
                Login
              </Link>
            )}
            {location.pathname !== "/signup" && (
              <Link style={btnStyle} to="/signup">
                Signup
              </Link>
            )}
          </>
        )}
      </div>

      {/* 🍔 MOBILE MENU ICON */}
      <div
        className="mobile-menu-icon"
        style={menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* 📱 MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div style={mobileMenu}>
          {isAuthenticated() ? (
            <>
              <Link
                style={mobileLink}
                to="/"
                onMouseEnter={mobileLinkHover}
                onMouseLeave={mobileLinkLeave}
                 onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                style={mobileLink}
                to="/orders"
                onMouseEnter={mobileLinkHover}
                onMouseLeave={mobileLinkLeave}
                 onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                style={mobileLink}
                to="/holdings"
                onMouseEnter={mobileLinkHover}
                onMouseLeave={mobileLinkLeave}
                 onClick={() => setMenuOpen(false)}
              >
                Holdings
              </Link>
              <Link
                style={mobileLink}
                to="/positions"
                onMouseEnter={mobileLinkHover}
                onMouseLeave={mobileLinkLeave}
                 onClick={() => setMenuOpen(false)}
              >
                Positions
              </Link>
              <Link
                style={mobileLink}
                to="/watchlist"
                onMouseEnter={mobileLinkHover}
                onMouseLeave={mobileLinkLeave}
                 onClick={() => setMenuOpen(false)}
              >
                WatchList
              </Link>

              <button
                style={btnStyle}
                onClick={() => {
                  setMenuOpen(false); 
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link style={mobileLink} to="/login">
                Login
              </Link>
              <Link style={mobileLink} to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "14px",
};

const btnStyle = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const navContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#1e293b",
  color: "white",
  position: "relative",
};

const desktopMenu = {
  display: "flex",
  gap: "15px",
};

const menuIcon = {
  display: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.08)"
};

const mobileMenu = {
  position: "absolute",
  top: "60px",
  right: "12px",
  width: "200px",

  background: "rgba(15, 23, 42, 0.95)", // 🔥 dark solid glass
  backdropFilter: "blur(12px)",

  padding: "15px",
  borderRadius: "12px",

  display: "flex",
  flexDirection: "column",
  gap: "12px",

  border: "1px solid rgba(255,255,255,0.08)",

  boxShadow: "0 15px 35px rgba(0,0,0,0.6)",

  zIndex: 999, // 🔥 IMPORTANT FIX (overlap issue)
};

const mobileLink = {
  color: "#e2e8f0",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
};
