// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.get("/:symbol", async (req, res) => {
//   try {
//     const { symbol } = req.params;

//     const response = await axios.get(
//       `https://www.alphavantage.co/query`,
//       {
//         params: {
//           function: "GLOBAL_QUOTE",
//           symbol: symbol,
//           apikey: process.env.ALPHA_API_KEY,
//         },
//       }
//     );

//     const data = response.data["Global Quote"];

//     res.json({
//       symbol: data["01. symbol"],
//       price: data["05. price"],
//       change: data["09. change"],
//       changePercent: data["10. change percent"],
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stock data" });
//   }
// });

// module.exports = router;