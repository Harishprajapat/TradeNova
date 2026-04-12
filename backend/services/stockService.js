// const axios = require("axios");

// const API_KEY = process.env.ALPHA_API_KEY;

// const getStockPrice = async (symbol) => {
//   try {
//     const response = await axios.get(
//       `https://www.alphavantage.co/query`,
//       {
//         params: {
//           function: "GLOBAL_QUOTE",
//           symbol,
//           apikey: API_KEY,
//         },
//       }
//     );

//     return response.data["Global Quote"];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// module.exports = { getStockPrice };