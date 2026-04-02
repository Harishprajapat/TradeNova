import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function Navbar() {
   const location = useLocation();
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: "#0f172a",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>TradeNova</h2>

      {isAuthenticated() ? (
        <div style={{ display: "flex", gap: "15px" }}>
          <Link style={linkStyle} to="/">Dashboard</Link>
          <Link style={linkStyle} to="/orders">Orders</Link>
          <Link style={linkStyle} to="/holdings">Holdings</Link>
          <Link style={linkStyle} to="/positions">Positions</Link>
           <Link style={linkStyle} to="/signup">SignUp</Link>

          <button style={btnStyle} onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "15px" }}>
           {/* 👇 SHOW LOGIN ONLY IF NOT ON LOGIN PAGE */}
          {location.pathname !== "/login" && (
            <Link style={linkStyle} to="/login">Login</Link>
          )}

          {/* 👇 SHOW SIGNUP ONLY IF NOT ON SIGNUP PAGE */}
          {location.pathname !== "/signup" && (
            <Link style={btnStyle} to="/signup">Signup</Link>
          )}
        </div>
      )}
    </div>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
};

const btnStyle = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};