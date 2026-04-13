const express = require("express");
const router = express.Router();
const Portfolio = require("../model/UserPortfolio");

// 🔥 Get user portfolio
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  let portfolio = await Portfolio.findOne({ userId });

  if (!portfolio) {
    portfolio = await Portfolio.create({ userId });
  }

  res.json(portfolio);
});

// 🔥 Buy stock
router.post("/buy", async (req, res) => {
  const { userId, name, qty, price } = req.body;

 let portfolio = await Portfolio.findOne({ userId });

if (!portfolio) {
  portfolio = await Portfolio.create({ userId });
}

  const total = qty * price;

  if (portfolio.balance < total) {
    return res.status(400).json({ error: "Not enough balance" });
  }

  portfolio.balance -= total;

  const existing = portfolio.holdings.find((s) => s.name === name);

  if (existing) {
    existing.qty += qty;
    existing.price = price;
  } else {
    portfolio.holdings.push({ name, qty, price });
  }

  portfolio.orders.push({
    type: "BUY",
    name,
    qty,
    price,
    time: new Date(),
  });

  await portfolio.save();

  res.json(portfolio);
});

// 🔥 Sell stock
router.post("/sell", async (req, res) => {
  const { userId, name, qty, price } = req.body;

  let portfolio = await Portfolio.findOne({ userId });

if (!portfolio) {
  return res.status(400).json({ error: "Portfolio not found" });
}

  const stock = portfolio.holdings.find((s) => s.name === name);

  if (!stock || stock.qty < qty) {
    return res.status(400).json({ error: "Not enough stock" });
  }

  stock.qty -= qty;
  portfolio.balance += qty * price;

  portfolio.holdings = portfolio.holdings.filter((s) => s.qty > 0);

  portfolio.orders.push({
    type: "SELL",
    name,
    qty,
    price,
    time: new Date(),
  });

  await portfolio.save();

  res.json(portfolio);
});

module.exports = router;