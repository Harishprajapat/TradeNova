import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);
  const [activeTab, setActiveTab] = useState("market");

  const marginRequired = (Number(stockQuantity) * Number(stockPrice) * 0.2).toFixed(2);

  const handleBuyClick = async () => {
    try {
      await axios.post("http://localhost:3002/portfolio/buy", {
        userId: "testuser",
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
      });
      context.closeBuyWindow();
    } catch (err) {
      console.error(err);
      alert("Buy failed");
    }
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="buy-window-overlay" onClick={handleCancelClick} />

      {/* Window */}
      <div className="container" id="buy-window">

        {/* Header */}
        <div className="buy-window-header">
          <div className="buy-window-stock">
            <span className="buy-window-stock-name">{uid || "INFY"}</span>
            <span className="buy-window-stock-sub">NSE · Equity</span>
          </div>
          <span className="buy-window-tag">Buy</span>
        </div>

        {/* Order type tabs */}
        <div className="buy-window-tabs">
          <button
            className={`buy-tab${activeTab === "market" ? " active" : ""}`}
            onClick={() => setActiveTab("market")}
          >
            Market
          </button>
          <button
            className={`buy-tab${activeTab === "limit" ? " active" : ""}`}
            onClick={() => setActiveTab("limit")}
          >
            Limit
          </button>
          <button
            className={`buy-tab${activeTab === "sl" ? " active" : ""}`}
            onClick={() => setActiveTab("sl")}
          >
            SL
          </button>
        </div>

        {/* Inputs */}
        <div className="regular-order">
          <div className="inputs">
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
          <div className="margin-info">
            <span className="margin-info-label">Margin required</span>
            <span className="margin-info-value">₹{marginRequired}</span>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="buttons">
          <div className="buttons-left">
            <span className="margin-label">Total</span>
            <span className="margin-amount">
              ₹{(Number(stockQuantity) * Number(stockPrice)).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="buttons-right">
            <Link className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </Link>
            <Link className="btn btn-blue" onClick={handleBuyClick}>
              Buy {stockQuantity} {stockQuantity > 1 ? "shares" : "share"}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default BuyActionWindow;