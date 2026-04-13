// import React, { useState, useEffect } from "react";

// import BuyActionWindow from "./BuyActionWindow";
// import SellActionWindow from "./SellActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
//   openSellWindow: (uid) => {},
//   closeSellWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");

//   const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
//   const [selectedSellStockUID, setSelectedSellStockUID] = useState("");

//   const [balance, setBalance] = useState(() => {
//   const saved = JSON.parse(localStorage.getItem("tradeData"));
//   return saved?.balance || 100000;
// });

// const [holdings, setHoldings] = useState(() => {
//   const saved = JSON.parse(localStorage.getItem("tradeData"));
//   return saved?.holdings || [];
// });

// const [orders, setOrders] = useState(() => {
//   const saved = JSON.parse(localStorage.getItem("tradeData"));
//   return saved?.orders || [];
// });

// // useEffect(() => {
// //   localStorage.setItem(
// //     "tradeData",
// //     JSON.stringify({
// //       balance,
// //       holdings,
// //       orders,
// //     })
// //   );
// // }, [balance, holdings, orders]);

//   const handleOpenBuyWindow = (uid) => {
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   const handleOpenSellWindow = (uid) => {
//     setIsSellWindowOpen(true);
//     setSelectedSellStockUID(uid);
//   };

//   const handleCloseSellWindow = () => {
//     setIsSellWindowOpen(false);
//     setSelectedSellStockUID("");
//   };

//   const buyStock = (stockName, qty, price) => {
//     const total = qty * price;

//     if (balance < total) {
//       alert("Not enough balance");
//       return;
//     }

//     setBalance((prev) => prev - total);

//     setHoldings((prev) => {
//       const existing = prev.find((s) => s.name === stockName);

//       if (existing) {
//         return prev.map((s) =>
//           s.name === stockName ? { ...s, qty: s.qty + Number(qty), price } : s,
//         );
//       } else {
//         return [...prev, { name: stockName, qty: Number(qty), price }];
//       }
//     });

//     setOrders((prev) => [
//       ...prev,
//       {
//         type: "BUY",
//         name: stockName,
//         qty,
//         price,
//         time: new Date(),
//       },
//     ]);
//   };

//   const sellStock = (stockName, qty, price) => {
//     const existing = holdings.find((s) => s.name === stockName);

//     if (!existing || existing.qty < qty) {
//       alert("Not enough stock");
//       return;
//     }

//     const total = qty * price;

//     setBalance((prev) => prev + total);

//     setHoldings((prev) =>
//       prev
//         .map((s) =>
//           s.name === stockName ? { ...s, qty: s.qty - Number(qty) } : s,
//         )
//         .filter((s) => s.qty > 0),
//     );

//     setOrders((prev) => [
//       ...prev,
//       {
//         type: "SELL",
//         name: stockName,
//         qty,
//         price,
//         time: new Date(),
//       },
//     ]);
//   };
//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//         openSellWindow: handleOpenSellWindow,
//         closeSellWindow: handleCloseSellWindow,

//         balance,
//         holdings,
//         orders,
//         buyStock,
//         sellStock,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
//       {isSellWindowOpen && <SellActionWindow uid={selectedSellStockUID} />}
//     </GeneralContext.Provider>

    
//   );
// };

// export default GeneralContext;


import React, { useState, useEffect } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedSellStockUID, setSelectedSellStockUID] = useState("");

  const [balance, setBalance] = useState(100000);
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔥 Get logged-in user
  const userId = localStorage.getItem("currentUser");

  // ✅ FETCH USER PORTFOLIO FROM BACKEND
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/portfolio/${userId}`
        );

        setBalance(res.data.balance);
        setHoldings(res.data.holdings);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };

    if (userId) fetchPortfolio();
  }, [userId]);

  // 🟢 UI HANDLERS
  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedSellStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedSellStockUID("");
  };

  // 🔥 BUY STOCK (BACKEND)
  const buyStock = async (stockName, qty, price) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/portfolio/buy",
        {
          userId,
          name: stockName,
          qty: Number(qty),
          price: Number(price),
        }
      );

      setBalance(res.data.balance);
      setHoldings(res.data.holdings);
      setOrders(res.data.orders);
    } catch (err) {
      alert(err.response?.data?.error || "Buy failed");
    }
  };

  // 🔴 SELL STOCK (BACKEND)
  const sellStock = async (stockName, qty, price) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/portfolio/sell",
        {
          userId,
          name: stockName,
          qty: Number(qty),
          price: Number(price),
        }
      );

      setBalance(res.data.balance);
      setHoldings(res.data.holdings);
      setOrders(res.data.orders);
    } catch (err) {
      alert(err.response?.data?.error || "Sell failed");
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,

        balance,
        holdings,
        orders,
        buyStock,
        sellStock,
      }}
    >
      {props.children}

      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedSellStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;