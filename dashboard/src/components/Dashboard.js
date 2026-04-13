// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";

// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import Signup from "./auth/SignUp";
// import Login from "./auth/Login";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">

//       <GeneralContextProvider>
//         <WatchList />
//       </GeneralContextProvider>

//       <div className="content">
//          <Routes>
//           <Route exact path="/" element={<Summary />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/holdings" element={<Holdings />} />
//           <Route path="/positions" element={<Positions />} />
//           <Route path="/funds" element={<Funds />} />
//           <Route path="/apps" element={<Apps />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//         </Routes>

//       </div>

//     </div>

//   );
// };

// export default Dashboard;

import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Link } from "react-router-dom";
import WatchList from "./WatchList";
export default function Dashboard() {
  const { balance } = useContext(GeneralContext);
  const container = {
    display: "flex",
    background: "linear-gradient(135deg, #0f172a, #020617)",
  };

  const sidebar = {
    width: "220px",
    padding: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const link = {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "6px",
  };

  const main = {
    flex: 1,
    padding: "30px",
    color: "white",
  };

  const cardContainer = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  };

  const card = {
    flex: 1,
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  };

  const section = {
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    overflow: "visible",
  };
  return (
    <div style={container}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "20px" }}>TradeNova</h2>

        <Link to="/" style={link}>
          Dashboard
        </Link>
        <Link to="/orders" style={link}>
          Orders
        </Link>
        <Link to="/holdings" style={link}>
          Holdings
        </Link>
        <Link to="/positions" style={link}>
          Positions
        </Link>
      </div>

      {/* Main Content */}
    <div style={main}>
  <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

  {/* Cards */}
  <div style={cardContainer}>
    <div style={card}>
      <h3>Portfolio Value</h3>
     <h2>Balance: ₹{balance}</h2>
    </div>
    <div style={card}>
      <h3>Total Profit</h3>
      <p style={{ color: "#22c55e" }}>+₹8,500</p>
    </div>
    <div style={card}>
      <h3>Total Loss</h3>
      <p style={{ color: "#ef4444" }}>-₹2,300</p>
    </div>
  </div>

  {/* Watchlist — its own section */}
  <div style={section}>
    <h3>Watchlist</h3>
    <div className="dashboard-watchlist">
 <WatchList />
    </div>
   
  </div>

  {/* Recent Activity — separate section below */}
  <div style={{ ...section, marginTop: "20px" }}>
    <h3>Recent Activity</h3>
    <p style={{ color: "#94a3b8" }}>No recent trades yet...</p>
  </div>
</div>
    </div>
  );
}
