import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
  balance: 100000,
  holdings: [],
  orders: [],
  buyStock: async () => {},
  sellStock: async () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen]   = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedSellUID, setSelectedSellUID]   = useState("");

  const [balance, setBalance]   = useState(100000);
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders]     = useState([]);

  // ✅ reads the real MongoDB userId saved by Login
  const userId = localStorage.getItem("currentUser");

  const updatePortfolio = (data) => {
    setBalance(data.balance ?? 100000);
    setHoldings(data.holdings ?? []);
    setOrders(data.orders ?? []);
  };

  // fetch portfolio on mount + every 5 s
  useEffect(() => {
    if (!userId) return;

    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`https://tradenova-backend-a300.onrender.com/portfolio/${userId}`);
        updatePortfolio(res.data);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
      }
    };

    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // ── Buy ──────────────────────────────────────────────
  const buyStock = async (stockName, qty, price) => {
    if (!userId) return alert("Please login first");
    try {
      const res = await axios.post("https://tradenova-backend-a300.onrender.com/portfolio/buy", {
        userId,
        name: stockName,
        qty: Number(qty),
        price: Number(price),
      });
      updatePortfolio(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Buy failed";
      alert(msg);
    }
  };

  // ── Sell ─────────────────────────────────────────────
  const sellStock = async (stockName, qty, price) => {
    if (!userId) return alert("Please login first");
    try {
      const res = await axios.post("https://tradenova-backend-a300.onrender.com/portfolio/sell", {
        userId,
        name: stockName,
        qty: Number(qty),
        price: Number(price),
      });
      updatePortfolio(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Sell failed";
      alert(msg);
    }
  };

  // ── Window handlers ──────────────────────────────────
  const handleOpenBuyWindow  = (uid) => { setSelectedStockUID(uid); setIsBuyWindowOpen(true); };
  const handleCloseBuyWindow = ()    => { setIsBuyWindowOpen(false); setSelectedStockUID(""); };
  const handleOpenSellWindow  = (uid) => { setSelectedSellUID(uid); setIsSellWindowOpen(true); };
  const handleCloseSellWindow = ()    => { setIsSellWindowOpen(false); setSelectedSellUID(""); };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow:  handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow:  handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        balance,
        holdings,
        orders,
        buyStock,
        sellStock,
      }}
    >
      {props.children}

      {isBuyWindowOpen  && <BuyActionWindow  uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedSellUID}  />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;