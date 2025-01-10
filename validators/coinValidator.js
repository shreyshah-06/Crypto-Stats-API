// server/validators/coinValidator.js
const { query } = require("express-validator"); // Importing the query method from express-validator to validate query parameters

// Validator middleware to validate the 'coin' query parameter
const validateCoinParam = [
  query("coin")
    .trim() // Sanitize the input by removing any leading or trailing spaces
    .toLowerCase() // Convert the input to lowercase to ensure case insensitivity
    .isIn(["bitcoin", "ethereum", "matic"]) // Validate that the coin parameter is one of the allowed values
    .withMessage('Invalid coin parameter. Must be "bitcoin", "ethereum", or "matic".'), // Custom error message if validation fails
];

module.exports = { validateCoinParam }; // Export the validator function for use in other files
