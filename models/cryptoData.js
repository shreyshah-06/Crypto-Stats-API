const mongoose = require('mongoose');

// Define the schema for storing cryptocurrency data
const cryptoDataSchema = new mongoose.Schema(
  {
    // Schema for Bitcoin data
    bitcoin: {
      usd: { type: Number, required: true },  // USD price of Bitcoin
      usd_market_cap: { type: Number, required: true },  // Market cap of Bitcoin in USD
      usd_24h_change: { type: Number, required: true },  // 24-hour price change of Bitcoin in USD
    },
    // Schema for Ethereum data
    ethereum: {
      usd: { type: Number, required: true },  // USD price of Ethereum
      usd_market_cap: { type: Number, required: true },  // Market cap of Ethereum in USD
      usd_24h_change: { type: Number, required: true },  // 24-hour price change of Ethereum in USD
    },
    // Schema for Matic data
    matic: {
      usd: { type: Number, required: true },  // USD price of Matic
      usd_market_cap: { type: Number, required: true },  // Market cap of Matic in USD
      usd_24h_change: { type: Number, required: true },  // 24-hour price change of Matic in USD
    },
    timestamp: { 
      type: Date, 
      default: Date.now,  // Automatically sets the timestamp when the data is fetched
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields to track when documents are created/updated
);

// Create indexes for efficient querying and sorting
cryptoDataSchema.index({ 'bitcoin.usd': 1, timestamp: -1 });  // Index on Bitcoin price (ascending) and timestamp (descending)
cryptoDataSchema.index({ 'ethereum.usd': 1, timestamp: -1 });  // Index on Ethereum price (ascending) and timestamp (descending)
cryptoDataSchema.index({ 'matic.usd': 1, timestamp: -1 });  // Index on Matic price (ascending) and timestamp (descending)
cryptoDataSchema.index({ timestamp: -1 });  // Index on timestamp to allow fast sorting of records by date

// Create the model based on the schema
const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);

// Export the model so it can be used in other files
module.exports = CryptoData;
