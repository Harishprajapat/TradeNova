// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Order.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   const userId = "testuser"; // 🔥 later replace with logged-in user

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3002/portfolio/${userId}`,
//         );

//         setOrders(res.data.orders || []);
//         console.log(res.data);
//         console.log(res.data.orders);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };
// //first call
//     fetchOrders();
//     //auto refresh every 3sec
//     const interval = setInterval(fetchOrders, 3000);
//     //cleanup
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="orders-container">
//       <h2>Order History</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Stock</th>
//             <th>Qty</th>
//             <th>Price</th>
//             <th>Type</th>
//             <th>Time</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.length === 0 ? (
//             <tr>
//               <td colSpan="5">No orders yet</td>
//             </tr>
//           ) : (
//             orders.map((order, index) => (
//               <tr key={index}>
//                 <td>{order.name}</td>
//                 <td>{order.qty}</td>
//                 <td>₹{order.price}</td>
//                 <td className={order.type === "BUY" ? "buy" : "sell"}>
//                   {order.type}
//                 </td>
//                 <td>{new Date(order.time).toLocaleString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;


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
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders yet</td>
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
                <td>{new Date(order.time).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;