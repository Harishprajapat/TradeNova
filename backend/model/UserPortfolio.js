const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 100000,
  },
  holdings: [
    {
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  orders: [
  {
    type: {
      type: String,
    },
    name: String,
    qty: Number,
    price: Number,
    time: Date,
  },
],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);