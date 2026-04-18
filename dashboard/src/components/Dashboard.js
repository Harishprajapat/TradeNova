import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import WatchList from "./WatchList";
import "./Dashboard.css";

export default function Dashboard() {
  const { balance } = useContext(GeneralContext);

  return (
   <div className="dashboard">
      
      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* CARDS */}
        <div className="dashboard-cards">
          <div className="card">
            <p>Portfolio Value</p>
            <h2>₹{balance}</h2>
          </div>

          <div className="card profit">
            <p>Total Profit</p>
            <h2>+₹8,500</h2>
          </div>

          <div className="card loss">
            <p>Total Loss</p>
            <h2>-₹2,300</h2>
          </div>
        </div>

        {/* WATCHLIST */}
        <div className="dashboard-section">
          <h3>Watchlist</h3>
          <div className="watchlist-box">
            <WatchList />
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <p className="empty-text">No recent trades yet...</p>
        </div>
      </div>
    </div>
  );
}


