import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [activeTab, setActiveTab] = useState("market");
  const context = useContext(GeneralContext);

  const stockName = typeof uid === "object" ? uid.name : uid;

  const marginRequired = (Number(stockQuantity) * Number(stockPrice) * 0.2).toFixed(2);

  const handleSellClick = () => {
    context.sellStock(stockName, stockQuantity, stockPrice);
    context.closeSellWindow();
  };

  const handleCancelClick = () => {
    context.closeSellWindow();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="sell-window-overlay" onClick={handleCancelClick} />

      {/* Window */}
      <div className="sell-container" id="sell-window">

        {/* Header */}
        <div className="sell-window-header">
          <div className="sell-window-stock">
            <span className="sell-window-stock-name">{stockName || "INFY"}</span>
            <span className="sell-window-stock-sub">NSE · Equity</span>
          </div>
          <span className="sell-window-tag">Sell</span>
        </div>

        {/* Order type tabs */}
        <div className="sell-window-tabs">
          <button
            className={`sell-tab${activeTab === "market" ? " active" : ""}`}
            onClick={() => setActiveTab("market")}
          >
            Market
          </button>
          <button
            className={`sell-tab${activeTab === "limit" ? " active" : ""}`}
            onClick={() => setActiveTab("limit")}
          >
            Limit
          </button>
          <button
            className={`sell-tab${activeTab === "sl" ? " active" : ""}`}
            onClick={() => setActiveTab("sl")}
          >
            SL
          </button>
        </div>

        {/* Inputs */}
        <div className="sell-regular-order">
          <div className="sell-inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                onChange={(e) => setStockQuantity(e.target.value)}
                value={stockQuantity}
              />
            </fieldset>
            <fieldset>
              <legend>Price (₹)</legend>
              <input
                type="number"
                name="price"
                id="price"
                step="0.05"
                onChange={(e) => setStockPrice(e.target.value)}
                value={stockPrice}
              />
            </fieldset>
          </div>

          {/* Margin info */}
          <div className="sell-margin-info">
            <span className="sell-margin-info-label">Margin required</span>
            <span className="sell-margin-info-value">₹{marginRequired}</span>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="sell-buttons">
          <div className="sell-buttons-left">
            <span className="sell-total-label">Total</span>
            <span className="sell-total-amount">
              ₹{(Number(stockQuantity) * Number(stockPrice)).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="sell-buttons-right">
            <Link className="sell-btn-grey" onClick={handleCancelClick}>
              Cancel
            </Link>
            <Link className="sell-btn-red" onClick={handleSellClick}>
              Sell {stockQuantity} {stockQuantity > 1 ? "shares" : "share"}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default SellActionWindow;