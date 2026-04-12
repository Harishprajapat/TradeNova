import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import "./Order.css";

const Orders = () => {
  const { orders } = useContext(GeneralContext);

  return (
    <div className="orders-container">
      <h2>Order History</h2>

      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">No orders yet</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>₹{order.price}</td>
                <td className={order.type === "BUY" ? "buy" : "sell"}>
                  {order.type}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;