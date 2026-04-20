import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow, sellStock, balance, holdings } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice]       = useState(100);
  const [activeTab, setActiveTab]         = useState("market");

  const stockName     = typeof uid === "object" ? uid.name : uid;
  const holding       = holdings.find((h) => h.name === stockName);
  const maxQty        = holding?.qty ?? 0;
  const totalReturn   = Number(stockQuantity) * Number(stockPrice);
  const canSell       = maxQty > 0 && Number(stockQuantity) <= maxQty;

  const handleSellClick = async () => {
    if (!canSell) return alert(maxQty === 0 ? "You don't hold this stock!" : `Max qty is ${maxQty}`);
    await sellStock(stockName, stockQuantity, stockPrice);
    closeSellWindow();
  };

  return (
    <>
      <div className="sell-window-overlay" onClick={closeSellWindow} />
      <div className="sell-container" id="sell-window">

        {/* Header */}
        <div className="sell-window-header">
          <div className="sell-window-stock">
            <span className="sell-window-stock-name">{stockName || "INFY"}</span>
            <span className="sell-window-stock-sub">NSE · Equity</span>
          </div>
          <span className="sell-window-tag">Sell</span>
        </div>

        {/* Holdings info + balance */}
        <div className="sell-balance-row">
          <div>
            <span className="sell-balance-label">You Hold</span>
            <span className="sell-balance-value">
              {maxQty > 0 ? `${maxQty} shares` : "Not in holdings"}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="sell-balance-label">Balance After</span>
            <span className="sell-balance-value">
              ₹{(balance + totalReturn).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="sell-window-tabs">
          {["market", "limit", "sl"].map((tab) => (
            <button
              key={tab}
              className={`sell-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="sell-regular-order">
          <div className="sell-inputs">
            <fieldset>
              <legend>Qty. {maxQty > 0 && <span style={{ color: "#4b5563" }}>(max {maxQty})</span>}</legend>
              <input
                type="number"
                min="1"
                max={maxQty}
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

          <div className="sell-margin-info">
            <span className="sell-margin-info-label">You will receive</span>
            <span className="sell-margin-info-value">
              ₹{totalReturn.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="sell-buttons">
          <div className="sell-buttons-left">
            <span className="sell-total-label">Total Return</span>
            <span className="sell-total-amount">
              ₹{totalReturn.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="sell-buttons-right">
            <Link className="sell-btn-grey" onClick={closeSellWindow}>Cancel</Link>
            <Link
              className={`sell-btn-red${!canSell ? " btn-disabled" : ""}`}
              onClick={handleSellClick}
            >
              Sell {stockQuantity} {Number(stockQuantity) > 1 ? "shares" : "share"}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default SellActionWindow;