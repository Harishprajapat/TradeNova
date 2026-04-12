import React, { useState, useEffect } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
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

  useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("tradeData"));

  if (savedData) {
    setBalance(savedData.balance || 100000);
    setHoldings(savedData.holdings || []);
    setOrders(savedData.orders || []);
  }
}, []);
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

  const buyStock = (stockName, qty, price) => {
    const total = qty * price;

    if (balance < total) {
      alert("Not enough balance");
      return;
    }

    setBalance((prev) => prev - total);

    setHoldings((prev) => {
      const existing = prev.find((s) => s.name === stockName);

      if (existing) {
        return prev.map((s) =>
          s.name === stockName ? { ...s, qty: s.qty + Number(qty), price } : s,
        );
      } else {
        return [...prev, { name: stockName, qty: Number(qty), price }];
      }
    });

    setOrders((prev) => [
      ...prev,
      {
        type: "BUY",
        name: stockName,
        qty,
        price,
        time: new Date(),
      },
    ]);
  };

  const sellStock = (stockName, qty, price) => {
    const existing = holdings.find((s) => s.name === stockName);

    if (!existing || existing.qty < qty) {
      alert("Not enough stock");
      return;
    }

    const total = qty * price;

    setBalance((prev) => prev + total);

    setHoldings((prev) =>
      prev
        .map((s) =>
          s.name === stockName ? { ...s, qty: s.qty - Number(qty) } : s,
        )
        .filter((s) => s.qty > 0),
    );

    setOrders((prev) => [
      ...prev,
      {
        type: "SELL",
        name: stockName,
        qty,
        price,
        time: new Date(),
      },
    ]);
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
  useEffect(() => {
  localStorage.setItem(
    "tradeData",
    JSON.stringify({
      balance,
      holdings,
      orders,
    })
  );
}, [balance, holdings, orders]);
};

export default GeneralContext;
