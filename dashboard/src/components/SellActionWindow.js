import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";



const SellActionWindow = ({ uid }) => {
  const context = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);


  const handleSellClick = async () => {
  try {
    const res = await axios.post("http://localhost:3002/newOrder", {
      name: typeof uid === "object" ? uid.name : uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",
    });

    console.log(res.data);
    context.closeSellWindow();
  } catch (err) {
    console.log(err);
  }
};

  const handleCancelClick = () => {
      context.closeSellWindow();
  };

return (
  <div id="sell-window">
    <div className="modal">

      {/* Header */}
      <div className="modal-header">
        <h2>{typeof uid === "object" ? uid.name : uid}</h2>
        <span className="sell-tag">SELL</span>
      </div>

      {/* Body */}
      <div className="modal-body">
        <div className="input-group">
          <label>Quantity</label>
          <input
  type="number"
  value={stockQuantity}
  onChange={(e) => setStockQuantity(Number(e.target.value))}
/>
        </div>

        <div className="input-group">
          <label>Price</label>
          <input
  type="number"
  value={stockPrice}
  onChange={(e) => setStockPrice(Number(e.target.value))}
/>
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <span>Margin ₹140.65</span>

        <div className="actions">
          <button className="btn sell-btn" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn cancel-btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>

    </div>
  </div>
);
};

export default SellActionWindow;