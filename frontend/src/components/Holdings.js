// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import GeneralContext from "./GeneralContext";
// import { VerticalGraph } from "./VerticalGraph";

// import "./Holding.css";
// // import { holdings } from "../data/data";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3002/allHoldings").then((res) => {
//       // console.log(res.data);
//       setAllHoldings(res.data);
//     });
//   }, []);

//   const labels = allHoldings.map((subArray) => subArray["name"]);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => stock.price),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="holdings-container">
//         <h3 className="title">Holdings ({allHoldings.length})</h3>
//         {/* order-table */}
//         <div className="main-grid">
//           <div className="table-section">
//             <div className="table-card">
//               <table>
//                 <tr>
//                   <th>Instrument</th>
//                   <th>Qty.</th>
//                   <th>Avg. cost</th>
//                   <th>LTP</th>
//                   <th>Cur. val</th>
//                   <th>P&L</th>
//                   <th>Net chg.</th>
//                   <th>Day chg.</th>
//                 </tr>

//                 {allHoldings.map((stock, index) => {
//                   const currValue = stock.price * stock.qty;
//                   const isProfit = currValue - stock.avg * stock.qty >= 0.0;
//                   const profClass = isProfit ? "profit" : "loss";
//                   const dayClass = stock.isLoss ? "loss" : "profit";

//                   return (
//                     <tr key={index}>
//                       <td>{stock.name}</td>
//                       <td>{stock.qty}</td>
//                       <td>{stock.avg.toFixed(2)}</td>
//                       <td>{stock.price.toFixed(2)}</td>
//                       <td>{currValue.toFixed(2)}</td>
//                       <td className={profClass}>
//                         {(currValue - stock.avg * stock.qty).toFixed(2)}
//                       </td>
//                       <td className={profClass}>{stock.net}.</td>
//                       <td className={profClass}>{stock.day}.</td>
//                     </tr>
//                   );
//                 })}
//               </table>
//             </div>
//           </div>
//           <div className="graph-section">
//             <div className="graph-card">
//               <VerticalGraph data={data} />
//             </div>
//           </div>
//         </div>

//         <div className="summary-row">
//           <div className="col">
//             <h5>
//               29,875.<span>55</span>{" "}
//             </h5>
//             <p>Total investment</p>
//           </div>
//           <div className="col">
//             <h5>
//               31,428.<span>95</span>{" "}
//             </h5>
//             <p>Current value</p>
//           </div>
//           <div className="col">
//             <h5>1,553.40 (+5.20%)</h5>
//             <p>P&L</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Holdings;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "./Holding.css";

/* ─── price simulator ───────────────────────────────────
   Each stock gets a random walk: every 2 s the price
   moves ±0–1.2 % so it feels like a live feed.          */
const simulatePriceMove = (price) => {
  const change = (Math.random() - 0.48) * 0.012; // slight upward bias
  return Math.max(1, parseFloat((price * (1 + change)).toFixed(2)));
};

const Holdings = () => {
  const [allHoldings, setAllHoldings]   = useState([]);
  const [livePrices, setLivePrices]     = useState({});   // { stockName: price }
  const [flashMap, setFlashMap]         = useState({});   // { stockName: 'up'|'down' }
  const prevPricesRef                   = useRef({});
  const intervalRef                     = useRef(null);

  /* ── fetch holdings once ── */
  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      const data = res.data;
      setAllHoldings(data);

      // seed live prices from DB price
      const initial = {};
      data.forEach((s) => { initial[s.name] = s.price; });
      setLivePrices(initial);
      prevPricesRef.current = { ...initial };
    });
  }, []);

  /* ── tick every 2 s ── */
  useEffect(() => {
    if (Object.keys(livePrices).length === 0) return;

    intervalRef.current = setInterval(() => {
      setLivePrices((prev) => {
        const next    = {};
        const flashes = {};
        Object.entries(prev).forEach(([name, price]) => {
          const newPrice = simulatePriceMove(price);
          next[name]     = newPrice;
          flashes[name]  = newPrice >= price ? "up" : "down";
        });
        prevPricesRef.current = { ...next };
        setFlashMap(flashes);
        // clear flash highlight after 600 ms
        setTimeout(() => setFlashMap({}), 600);
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [Object.keys(livePrices).length]); // re-run only when stocks load

  /* ── derived summary numbers ── */
  const totalInvested = allHoldings.reduce(
    (sum, s) => sum + s.avg * s.qty, 0
  );
  const totalCurrent = allHoldings.reduce(
    (sum, s) => sum + (livePrices[s.name] ?? s.price) * s.qty, 0
  );
  const totalPnL      = totalCurrent - totalInvested;
  const totalPnLPct   = totalInvested > 0
    ? ((totalPnL / totalInvested) * 100).toFixed(2)
    : "0.00";
  const isOverallProfit = totalPnL >= 0;

  /* ── chart data (uses live prices) ── */
  const labels = allHoldings.map((s) => s.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Current Value (₹)",
        data: allHoldings.map(
          (s) => ((livePrices[s.name] ?? s.price) * s.qty).toFixed(2)
        ),
        backgroundColor: allHoldings.map((s) => {
          const ltp  = livePrices[s.name] ?? s.price;
          const curr = ltp * s.qty;
          const inv  = s.avg * s.qty;
          return curr >= inv
            ? "rgba(34, 197, 94, 0.6)"
            : "rgba(239, 68, 68, 0.6)";
        }),
        borderColor: allHoldings.map((s) => {
          const ltp  = livePrices[s.name] ?? s.price;
          const curr = ltp * s.qty;
          const inv  = s.avg * s.qty;
          return curr >= inv ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)";
        }),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="holdings-container">

      {/* ── Header ── */}
      <div className="holdings-header">
        <div>
          <h3 className="title">Holdings</h3>
          <span className="holdings-subtitle">
            {allHoldings.length} stocks · live prices updating
          </span>
        </div>
        <div className="live-badge">
          <span className="live-dot" />
          Live
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="summary-row">
        <div className="summary-card">
          <p className="summary-label">Total Invested</p>
          <h4 className="summary-value neutral">
            ₹{totalInvested.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h4>
        </div>
        <div className="summary-card">
          <p className="summary-label">Current Value</p>
          <h4 className="summary-value neutral">
            ₹{totalCurrent.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h4>
        </div>
        <div className="summary-card">
          <p className="summary-label">Total P&amp;L</p>
          <h4 className={`summary-value ${isOverallProfit ? "profit" : "loss"}`}>
            {isOverallProfit ? "+" : ""}
            ₹{Math.abs(totalPnL).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            <span className="summary-pct">
              &nbsp;({isOverallProfit ? "+" : "-"}{Math.abs(totalPnLPct)}%)
            </span>
          </h4>
        </div>
      </div>

      {/* ── Main grid: table + chart ── */}
      <div className="main-grid">

        {/* TABLE */}
        <div className="table-section">
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty</th>
                  <th>Avg Cost</th>
                  <th>LTP</th>
                  <th>Invested</th>
                  <th>Cur. Value</th>
                  <th>P&amp;L</th>
                  <th>P&amp;L %</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const ltp       = livePrices[stock.name] ?? stock.price;
                  const invested  = stock.avg * stock.qty;
                  const currVal   = ltp * stock.qty;
                  const pnl       = currVal - invested;
                  const pnlPct    = ((pnl / invested) * 100).toFixed(2);
                  const isProfit  = pnl >= 0;
                  const profClass = isProfit ? "profit" : "loss";
                  const flash     = flashMap[stock.name];

                  return (
                    <tr key={index} className="holding-row">
                      <td className="stock-name-cell">{stock.name}</td>
                      <td className="muted">{stock.qty}</td>
                      <td className="muted">₹{stock.avg.toFixed(2)}</td>
                      <td className={`ltp-cell ${flash ? `flash-${flash}` : ""}`}>
                        ₹{ltp.toFixed(2)}
                        {flash === "up"   && <span className="tick up-tick">▲</span>}
                        {flash === "down" && <span className="tick down-tick">▼</span>}
                      </td>
                      <td className="muted">₹{invested.toFixed(2)}</td>
                      <td>₹{currVal.toFixed(2)}</td>
                      <td className={profClass}>
                        {isProfit ? "+" : ""}₹{Math.abs(pnl).toFixed(2)}
                      </td>
                      <td className={profClass}>
                        {isProfit ? "+" : ""}{pnlPct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHART */}
        <div className="graph-section">
          <div className="graph-card">
            <p className="graph-title">Portfolio Breakdown</p>
            <VerticalGraph data={data} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Holdings;