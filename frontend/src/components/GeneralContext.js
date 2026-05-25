import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import { API_BASE_URL } from "../config/appConfig";
import { holdings as sampleHoldings, positions as samplePositions } from "../data/data";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
  balance: 100000,
  holdings: [],
  orders: [],
  loading: true,
  refreshPortfolio: async () => {},
  buyStock: async () => {},
  sellStock: async () => {},
});

const DEMO_ORDERS = [
  {
    name: "RELIANCE",
    type: "BUY",
    qty: 4,
    price: 2098.4,
    time: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
  },
  {
    name: "TCS",
    type: "SELL",
    qty: 1,
    price: 3201.2,
    time: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    name: "HDFCBANK",
    type: "BUY",
    qty: 2,
    price: 1534.9,
    time: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

const buildDemoHoldings = () =>
  sampleHoldings.map((item) => ({
    name: item.name,
    qty: item.qty,
    avg: item.avg,
    price: item.price,
    day: item.day,
  }));

const seedDemoPortfolio = () => ({
  balance: 126450.65,
  holdings: buildDemoHoldings(),
  orders: DEMO_ORDERS,
  positions: samplePositions,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedSellUID, setSelectedSellUID] = useState("");

  const [balance, setBalance] = useState(100000);
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(localStorage.getItem("currentUser"));

  const updatePortfolio = (data) => {
    setBalance(data.balance ?? 100000);
    setHoldings(data.holdings ?? []);
    setOrders(data.orders ?? []);
    setLoading(false);
  };

  const fetchPortfolio = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    if (userId === "demo-user") {
      updatePortfolio(seedDemoPortfolio());
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/portfolio/${userId}`);
      updatePortfolio(res.data);
    } catch (err) {
      updatePortfolio(seedDemoPortfolio());
      console.error("Portfolio fetch error:", err);
      toast.info("Showing demo portfolio data");
    }
  }, [userId]);

  useEffect(() => {
    const syncUser = () => setUserId(localStorage.getItem("currentUser"));
    window.addEventListener("authchange", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authchange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 5000);
    return () => clearInterval(interval);
  }, [fetchPortfolio, userId]);

  const buyStock = async (stockName, qty, price) => {
    if (!userId) return toast.error("Please login first");
    try {
      const res = await axios.post(`${API_BASE_URL}/portfolio/buy`, {
        userId,
        name: stockName,
        qty: Number(qty),
        price: Number(price),
      });
      updatePortfolio(res.data);
      toast.success(`${stockName} buy order placed`);
    } catch (err) {
      const msg = err.response?.data?.message || "Buy failed";
      toast.error(msg);
    }
  };

  const sellStock = async (stockName, qty, price) => {
    if (!userId) return toast.error("Please login first");
    try {
      const res = await axios.post(`${API_BASE_URL}/portfolio/sell`, {
        userId,
        name: stockName,
        qty: Number(qty),
        price: Number(price),
      });
      updatePortfolio(res.data);
      toast.success(`${stockName} sell order placed`);
    } catch (err) {
      const msg = err.response?.data?.message || "Sell failed";
      toast.error(msg);
    }
  };

  const handleOpenBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid) => {
    setSelectedSellUID(uid);
    setIsSellWindowOpen(true);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedSellUID("");
  };

  const value = {
    openBuyWindow: handleOpenBuyWindow,
    closeBuyWindow: handleCloseBuyWindow,
    openSellWindow: handleOpenSellWindow,
    closeSellWindow: handleCloseSellWindow,
    balance,
    holdings,
    orders,
    loading,
    refreshPortfolio: fetchPortfolio,
    buyStock,
    sellStock,
  };

  return (
    <GeneralContext.Provider value={value}>
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedSellUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;


