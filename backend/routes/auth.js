const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Portfolio = require("../model/UserPortfolio");

const JWT_SECRET = process.env.JWT_SECRET || "tradenova_secret_key";

// ─── SIGNUP ───────────────────────────────────────────
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 4. Create portfolio with ₹1,00,000 virtual balance
    const portfolio = new Portfolio({
      userId: user._id.toString(),
      balance: 100000,
      holdings: [],
      orders: [],
    });
    await portfolio.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── LOGIN ────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Sign real JWT containing userId and name
    const token = jwt.sign(
      { userId: user._id.toString(), name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      userId: user._id.toString(),   // ← frontend stores this
      name: user.name,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;