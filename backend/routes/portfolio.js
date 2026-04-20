const express = require("express");
const router = express.Router();
const Portfolio = require("../model/UserPortfolio");

// ─── GET PORTFOLIO ────────────────────────────────────
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let portfolio = await Portfolio.findOne({ userId });

    // safety: if somehow no portfolio exists, create one
    if (!portfolio) {
      portfolio = new Portfolio({
        userId,
        balance: 100000,
        holdings: [],
        orders: [],
      });
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching portfolio" });
  }
});

// ─── BUY ─────────────────────────────────────────────
router.post("/buy", async (req, res) => {
  try {
    const { userId, name, qty, price } = req.body;
    const totalCost = qty * price;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Check sufficient balance
    if (portfolio.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance
    portfolio.balance -= totalCost;

    // Update holdings — add to existing or create new
    const existingIndex = portfolio.holdings.findIndex((h) => h.name === name);
    if (existingIndex >= 0) {
      const existing = portfolio.holdings[existingIndex];
      const newQty   = existing.qty + qty;
      // recalculate average price
      const newAvg   = ((existing.avg ?? existing.price) * existing.qty + price * qty) / newQty;
      portfolio.holdings[existingIndex].qty   = newQty;
      portfolio.holdings[existingIndex].avg   = parseFloat(newAvg.toFixed(2));
      portfolio.holdings[existingIndex].price = price;
    } else {
      portfolio.holdings.push({ name, qty, price, avg: price });
    }

    // Log order
    portfolio.orders.push({
      type: "BUY",
      name,
      qty,
      price,
      time: new Date(),
    });

    await portfolio.save();

    res.json({
      message: "Buy successful",
      balance: portfolio.balance,
      holdings: portfolio.holdings,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Buy failed" });
  }
});

// ─── SELL ─────────────────────────────────────────────
router.post("/sell", async (req, res) => {
  try {
    const { userId, name, qty, price } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Find holding
    const holdingIndex = portfolio.holdings.findIndex((h) => h.name === name);
    if (holdingIndex < 0) {
      return res.status(400).json({ message: "Stock not in holdings" });
    }

    const holding = portfolio.holdings[holdingIndex];
    if (holding.qty < qty) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    // Add balance back
    portfolio.balance += qty * price;

    // Update or remove holding
    if (holding.qty === qty) {
      portfolio.holdings.splice(holdingIndex, 1);
    } else {
      portfolio.holdings[holdingIndex].qty -= qty;
    }

    // Log order
    portfolio.orders.push({
      type: "SELL",
      name,
      qty,
      price,
      time: new Date(),
    });

    await portfolio.save();

    res.json({
      message: "Sell successful",
      balance: portfolio.balance,
      holdings: portfolio.holdings,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sell failed" });
  }
});

module.exports = router;