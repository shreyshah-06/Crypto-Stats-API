const handleError = require('../utils/handleError'); // Assuming you have a custom error handler

// Middleware to authenticate requests using an API key
const apiKeyAuth = (req, res, next) => {
  // Extract the API key from the request headers
  const apiKey = req.headers['x-api-key']; 

  // Check if the API key is missing
  if (!apiKey) {
    return handleError(res, 400, 'API key is missing'); // Respond with error if API key is not provided
  }

  // Check if the provided API key is invalid
  if (apiKey !== process.env.API_KEY) {
    return handleError(res, 403, 'Invalid API key'); // Respond with error if API key is incorrect
  }

  // If the API key is valid, pass control to the next middleware or route handler
  next();
};

module.exports = apiKeyAuth;