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

   const updatePortfolio = (data) => {
  setBalance(data.balance);
  setHoldings(data.holdings);
  setOrders(data.orders);
};

  // 🔥 Get logged-in user
const userId = localStorage.getItem("currentUser") || "testuser";
console.log("Current User:", userId);

  // ✅ FETCH USER PORTFOLIO FROM BACKEND
  // useEffect(() => {
  //   const fetchPortfolio = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3002/portfolio/${userId}`
  //       );

  //       setBalance(res.data.balance);
  //       setHoldings(res.data.holdings);
  //       setOrders(res.data.orders);
  //     } catch (err) {
  //       console.error("Error fetching portfolio:", err);
  //     }
  //   };

  //   if (userId) fetchPortfolio();
  // }, [userId]);

useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/portfolio/${userId}`
      );

      console.log("FETCHED DATA:", res.data); // 🔥 debug

      updatePortfolio(res.data);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (userId) fetchPortfolio();

  const interval = setInterval(fetchPortfolio, 5000);
  return () => clearInterval(interval);

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
    await axios.post("http://localhost:3002/portfolio/buy", {
      userId,
      name: stockName,
      qty: Number(qty),
      price: Number(price),
    });

    await axios
      .get(`http://localhost:3002/portfolio/${userId}`)
      .then((res) => updatePortfolio(res.data));

  } catch (err) {
    console.log(err);
    alert("Buy failed");
  }
};

  // 🔴 SELL STOCK (BACKEND)
const sellStock = async (stockName, qty, price) => {
  try {
    await axios.post("http://localhost:3002/portfolio/sell", {
      userId,
      name: stockName,
      qty: Number(qty),
      price: Number(price),
    });

    await axios
      .get(`http://localhost:3002/portfolio/${userId}`)
      .then((res) => updatePortfolio(res.data));

  } catch (err) {
    console.log(err);
    alert("Sell failed");
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