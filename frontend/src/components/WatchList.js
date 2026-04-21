import React, { useState, useContext, useRef, useEffect } from "react";
import { watchlist } from "../data/data";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import GeneralContext from "./GeneralContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DoughoutChart } from "./DoughnoutChart";
import "./WatchList.css";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 200, 0.5)",
          "rgba(100, 200, 132, 0.5)",
          "rgba(200, 162, 50, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 200, 1)",
          "rgba(100, 200, 132, 1)",
          "rgba(200, 162, 50, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="wl-wrapper">

      {/* ── Left: stock list ── */}
      <div className="wl-panel">

        {/* Search */}
        <div className="wl-search-row">
          <div className="wl-search-box">
            <svg className="wl-search-icon" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search eg: infy, bse, nifty fut weekly…"
              className="wl-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="wl-count">{watchlist.length} / 50</span>
        </div>

        {/* Column headers */}
        <div className="wl-col-headers">
          <span>Symbol</span>
          <span>Chg% &nbsp;&nbsp; LTP</span>
        </div>

        {/* Stock list */}
        <ul className="wl-list">
          {filteredWatchlist.length > 0 ? (
            filteredWatchlist.map((stock, index) => (
              <WatchListItem stock={stock} key={index} />
            ))
          ) : (
            <li className="wl-empty">No stocks match "{searchQuery}"</li>
          )}
        </ul>
      </div>

      {/* ── Right: donut chart ── */}
      <div className="wl-chart-panel">
        <p className="wl-chart-title">Portfolio Mix</p>
        <DoughoutChart data={data} />
      </div>

    </div>
  );
};

export default WatchList;

/* ─────────────────────────────── */
/*  WatchListItem                  */
/* ─────────────────────────────── */

const WatchListItem = ({ stock }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const itemRef = useRef(null);

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (!actionsVisible) return;
    const handleOutside = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setActionsVisible(false);
      }
    };
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [actionsVisible]);

  return (
    <li
      ref={itemRef}
      className={`wl-item${actionsVisible ? " wl-item--open" : ""}`}
      onMouseEnter={() => !isTouchDevice() && setActionsVisible(true)}
      onMouseLeave={() => !isTouchDevice() && setActionsVisible(false)}
      onClick={() => isTouchDevice() && setActionsVisible((p) => !p)}
    >
      {/* Main info row — always visible */}
      <div className="wl-item-row">
        <span className={`wl-name ${stock.isDown ? "wl-down" : "wl-up"}`}>
          {stock.name}
        </span>

        {/* Desktop: replace meta with actions on hover */}
        <div className="wl-item-right wl-desktop-right">
          {actionsVisible ? (
            <WatchListActions uid={stock.name} onClose={() => setActionsVisible(false)} />
          ) : (
            <div className="wl-meta">
              <span className={`wl-percent ${stock.isDown ? "wl-down" : "wl-up"}`}>
                {stock.isDown
                  ? <KeyboardArrowDown style={{ fontSize: 14, verticalAlign: "middle" }} />
                  : <KeyboardArrowUp style={{ fontSize: 14, verticalAlign: "middle" }} />
                }
                {stock.percent}
              </span>
              <span className="wl-price">{stock.price}</span>
            </div>
          )}
        </div>

        {/* Mobile: meta always visible */}
        <div className="wl-item-right wl-mobile-right">
          <div className="wl-meta">
            <span className={`wl-percent ${stock.isDown ? "wl-down" : "wl-up"}`}>
              {stock.isDown
                ? <KeyboardArrowDown style={{ fontSize: 14, verticalAlign: "middle" }} />
                : <KeyboardArrowUp style={{ fontSize: 14, verticalAlign: "middle" }} />
              }
              {stock.percent}
            </span>
            <span className="wl-price">{stock.price}</span>
          </div>
        </div>
      </div>

      {/* Mobile actions — slide down below row on tap */}
      {actionsVisible && (
        <div className="wl-mobile-actions-row">
          <WatchListActions uid={stock.name} onClose={() => setActionsVisible(false)} mobile />
        </div>
      )}
    </li>
  );
};

/* ─────────────────────────────── */
/*  WatchListActions               */
/* ─────────────────────────────── */

const WatchListActions = ({ uid, onClose, mobile = false }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <div className={`wl-actions${mobile ? " wl-actions--mobile" : ""}`}>
      <button
        className="wl-action-btn wl-buy"
        onClick={(e) => { e.stopPropagation(); openBuyWindow(uid); onClose(); }}
      >
        Buy
      </button>
      <button
        className="wl-action-btn wl-sell"
        onClick={(e) => { e.stopPropagation(); openSellWindow(uid); onClose(); }}
      >
        Sell
      </button>
      <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
        <button className="wl-action-btn wl-icon-btn" onClick={(e) => e.stopPropagation()}>
          <BarChartOutlined style={{ fontSize: 15 }} />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="wl-action-btn wl-icon-btn" onClick={(e) => e.stopPropagation()}>
          <MoreHoriz style={{ fontSize: 15 }} />
        </button>
      </Tooltip>
    </div>
  );
};