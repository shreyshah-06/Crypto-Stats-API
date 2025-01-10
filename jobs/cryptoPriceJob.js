require('dotenv').config();
const axios = require('axios');
const cron = require('node-cron');
const CryptoData = require('../models/cryptoData'); // Mongoose model for storing crypto data

// API URL to fetch cryptocurrency data (Bitcoin, Ethereum, Matic) from .env
const url = process.env.FETCH_API_URL;  // The API URL is stored in the environment variable

// API request options, including the method and headers (with API key from .env)
const options = {
  method: 'GET',
  headers: { 
    accept: 'application/json', // Accept JSON response from the API
    'x-cg-demo-api-key': process.env.FETCH_API_KEY // API key for CoinGecko, stored securely in .env
  },
};

// Function to fetch cryptocurrency data and save it to the database
const fetchCryptoPrices = async () => {
  try {
    // Make a GET request to the CoinGecko API to fetch crypto data
    const response = await axios(url, options);

    // Extract the data for Bitcoin, Ethereum, and Matic from the API response
    const bitcoinData = response.data.bitcoin;
    const ethereumData = response.data.ethereum;
    const maticData = response.data['matic-network'];

    // Prepare the data to be saved in the database
    const cryptoData = {
      bitcoin: {
        usd: bitcoinData.usd, // USD price of Bitcoin
        usd_market_cap: bitcoinData.usd_market_cap, // Market cap of Bitcoin
        usd_24h_change: bitcoinData.usd_24h_change, // 24h change percentage for Bitcoin
      },
      ethereum: {
        usd: ethereumData.usd, // USD price of Ethereum
        usd_market_cap: ethereumData.usd_market_cap, // Market cap of Ethereum
        usd_24h_change: ethereumData.usd_24h_change, // 24h change percentage for Ethereum
      },
      matic: {
        usd: maticData.usd, // USD price of Matic
        usd_market_cap: maticData.usd_market_cap, // Market cap of Matic
        usd_24h_change: maticData.usd_24h_change, // 24h change percentage for Matic
      },
      timestamp: new Date(),  // Timestamp of when the data was fetched
    };

    // Create a new Mongoose document with the fetched crypto data
    const newCryptoData = new CryptoData(cryptoData);

    // Save the document to the database
    await newCryptoData.save();

    console.log('Successfully fetched and saved crypto data.');
  } catch (error) {
    // Log any errors that occur during the fetch or save process
    console.error('Error fetching cryptocurrency data:', error);
  }
};

// Schedule the background job to run every 2 hours
// Cron job syntax: '0 */2 * * *' means 'at the start of every 2nd hour'
cron.schedule('0 */2 * * *', fetchCryptoPrices);  // Runs every 2 hours at the start of the hour

module.exports = fetchCryptoPrices;
