const CryptoData = require("../models/cryptoData");
const handleError = require("../utils/handleError");
const { validationResult } = require("express-validator");

// Utility function to calculate the standard deviation of prices
// This will be used to measure price volatility
const calculateStandardDeviation = (prices) => {
  // Calculate the mean of the prices
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  // Calculate the squared differences from the mean
  const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));

  // Calculate the variance and then the standard deviation
  const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / squaredDifferences.length;
  return Math.sqrt(variance).toFixed(2); // Return standard deviation rounded to 2 decimal places
};

// Controller function to get the latest data for a requested cryptocurrency
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;  // Get the cryptocurrency name from query parameters

  // Validate query parameters to ensure they are correct
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, 400, errors.array()[0].msg); // Respond with the first validation error
  }

  try {
    // Fetch the latest data for the requested coin, sorted by timestamp (most recent first)
    const latestData = await CryptoData.findOne({}, { [coin]: 1, timestamp: 1 }).sort({ timestamp: -1 });

    // Check if data for the requested coin is available
    if (!latestData || !latestData[coin]) {
      return handleError(res, 404, `No data found for ${coin}.`); // Respond with an error if no data is found
    }

    const coinData = latestData[coin];  // Extract the data for the requested coin

    // Respond with the cryptocurrency's price, market cap, and 24h change
    return res.json({
      price: coinData.usd,
      marketCap: coinData.usd_market_cap,
      "24hChange": coinData.usd_24h_change,
    });
  } catch (error) {
    // Log and respond with an internal server error if something goes wrong
    console.error("Error fetching data:", error);
    return handleError(res, 500, "Internal server error.");
  }
};

// Controller function to get the price deviation (standard deviation) for a requested cryptocurrency
const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;  // Get the cryptocurrency name from query parameters

  // Validate query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, 400, errors.array()[0].msg); // Respond with the first validation error
  }

  try {
    // Fetch the last 100 records for the requested coin
    const records = await CryptoData.find({}, { [coin]: 1 }).sort({ timestamp: -1 }).limit(100);

    // Check if we have any records for the requested coin
    if (records.length === 0 || !records[0][coin]) {
      return handleError(res, 404, `No price data found for ${coin}.`); // Respond with an error if no price data is found
    }

    // Extract the price data for the requested coin
    const prices = records.map((record) => record[coin]?.usd);

    // Calculate and return the price deviation (standard deviation)
    const deviation = calculateStandardDeviation(prices);
    return res.json({ deviation });
  } catch (error) {
    // Log and respond with an internal server error if something goes wrong
    console.error("Error calculating price deviation:", error);
    return handleError(res, 500, "Internal server error.");
  }
};

module.exports = { getCryptoStats, getPriceDeviation };
