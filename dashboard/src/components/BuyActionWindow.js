import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, buyStock, balance } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice]       = useState(100);
  const [activeTab, setActiveTab]         = useState("market");

  const totalCost      = Number(stockQuantity) * Number(stockPrice);
  const marginRequired = (totalCost * 0.2).toFixed(2);
  const canAfford      = balance >= totalCost;

  const handleBuyClick = async () => {
    if (!canAfford) return alert("Insufficient balance!");
    await buyStock(uid, stockQuantity, stockPrice);
    closeBuyWindow();
  };

  return (
    <>
      <div className="buy-window-overlay" onClick={closeBuyWindow} />
      <div className="container" id="buy-window">

        {/* Header */}
        <div className="buy-window-header">
          <div className="buy-window-stock">
            <span className="buy-window-stock-name">{uid || "INFY"}</span>
            <span className="buy-window-stock-sub">NSE · Equity</span>
          </div>
          <span className="buy-window-tag">Buy</span>
        </div>

        {/* Available balance */}
        <div className="buy-balance-row">
          <span className="buy-balance-label">Available Balance</span>
          <span className={`buy-balance-value ${canAfford ? "" : "insufficient"}`}>
            ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Tabs */}
        <div className="buy-window-tabs">
          {["market", "limit", "sl"].map((tab) => (
            <button
              key={tab}
              className={`buy-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="regular-order">
          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                min="1"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <legend>Price (₹)</legend>
              <input
                type="number"
                step="0.05"
                value={stockPrice}
                onChange={(e) => setStockPrice(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="margin-info">
            <span className="margin-info-label">Margin required</span>
            <span className="margin-info-value">₹{marginRequired}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="buttons">
          <div className="buttons-left">
            <span className="margin-label">Total Cost</span>
            <span className={`margin-amount ${!canAfford ? "insufficient" : ""}`}>
              ₹{totalCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              {!canAfford && <span className="insufficient-tag"> · Insufficient</span>}
            </span>
          </div>
          <div className="buttons-right">
            <Link className="btn btn-grey" onClick={closeBuyWindow}>Cancel</Link>
            <Link
              className={`btn btn-blue${!canAfford ? " btn-disabled" : ""}`}
              onClick={handleBuyClick}
            >
              Buy {stockQuantity} {Number(stockQuantity) > 1 ? "shares" : "share"}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default BuyActionWindow;