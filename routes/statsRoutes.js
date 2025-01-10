const express = require('express');
const { getCryptoStats, getPriceDeviation } = require('../controllers/statsController'); // Import controller functions for handling the routes
const { validateCoinParam } = require("../validators/coinValidator"); // Import the coin parameter validator for request validation
const router = express.Router(); // Initialize the Express router

// Define the GET route for /stats - Fetch the latest cryptocurrency data
router.get('/stats', validateCoinParam, getCryptoStats); // Validate the 'coin' query parameter and then call the controller to fetch crypto stats

// Define the GET route for /deviation - Fetch the price deviation for a cryptocurrency
router.get('/deviation', validateCoinParam, getPriceDeviation); // Validate the 'coin' query parameter and then call the controller to calculate price deviation

// Export the router so it can be used in the main app.js file
module.exports = router;
