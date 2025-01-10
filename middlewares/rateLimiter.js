const rateLimit = require('express-rate-limit'); // Import the express-rate-limit package to handle rate limiting

// Rate limiter middleware to prevent DDoS (Distributed Denial of Service) attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // Set the time window to 15 minutes (in milliseconds)
  max: 100,  // Limit each IP to a maximum of 100 requests within the 15-minute window
  message: 'Too many requests from this IP, please try again later.', // Custom error message for rate-limited requests
});

// Export the rate limiter middleware to be used in other parts of the application
module.exports = limiter;
