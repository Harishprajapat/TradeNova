import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import "./Order.css";

const Orders = () => {
  const { orders } = useContext(GeneralContext);
return(
  <div className="orders-container">
  <h2>Order History</h2>

  {orders.length === 0 ? (
    <p className="empty">No orders yet</p>
  ) : (
    <div className="orders-grid">
      {orders
        .slice()
        .reverse() // 🔥 latest order on top
        .map((order, index) => (
          <div key={index} className="order-card">
            
            <div className="card-header">
              <h3>{order.name}</h3>
              <span className={order.type === "BUY" ? "buy" : "sell"}>
                {order.type}
              </span>
            </div>

            <div className="card-body">
              <div>
                <p>Qty</p>
                <h4>{order.qty}</h4>
              </div>

              <div>
                <p>Price</p>
                <h4>₹{order.price}</h4>
              </div>
            </div>

            <div className="card-footer">
              {new Date(order.time).toLocaleString()}
            </div>

          </div>
        ))}
    </div>
  )}
</div>
);
};

export default Orders;
