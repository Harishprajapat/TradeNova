import React, { useState, useEffect } from "react";
import axios from "axios";

// import { positions } from "../data/data";

const Positions = () => {
   const [allPositions, setAllPositions] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3002/allPositions").then((res) => {
        setAllPositions(res.data);
      });
    }, []);
  return (
   <div className="holdings-container">
  <h3 className="title">Positions ({allPositions.length})</h3>

  <div className="table-card">
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Instrument</th>
          <th>Qty</th>
          <th>Avg</th>
          <th>LTP</th>
          <th>P&L</th>
          <th>Chg</th>
        </tr>
      </thead>

      <tbody>
        {allPositions.map((stock, index) => {
          const currValue = stock.price * stock.qty;
          const isProfit = currValue - stock.avg * stock.qty >= 0;
          const profClass = isProfit ? "profit" : "loss";

          return (
            <tr key={index}>
              <td>{stock.product}</td>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.avg.toFixed(2)}</td>
              <td>{stock.price.toFixed(2)}</td>
              <td className={profClass}>
                {(currValue - stock.avg * stock.qty).toFixed(2)}
              </td>
              <td className={profClass}>{stock.day}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default Positions;
