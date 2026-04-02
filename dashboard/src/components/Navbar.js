import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", background: "#111", color: "white" }}>
      <h3>TradeNova</h3>

      {isAuthenticated() ? (
        <>
          <Link to="/">Dashboard</Link> |{" "}
          <Link to="/orders">Orders</Link> |{" "}
          <Link to="/holdings">Holdings</Link> |{" "}
          <Link to="/positions">Positions</Link> |{" "}
          
          <button
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
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
}