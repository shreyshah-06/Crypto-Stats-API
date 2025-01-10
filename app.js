const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dbConnect = require('./config/db');
require('dotenv').config(); // Load environment variables from .env file

// Import middleware
const limiter = require('./middlewares/rateLimiter'); // Import rate limiter middleware to prevent DDoS attacks
// const apiKeyAuth = require('./middlewares/apiKeyAuth'); // Import API key authentication middleware to secure the API

// Import routes and background jobs
const statsRoutes = require('./routes/statsRoutes'); // Import stats routes for handling cryptocurrency data requests
const fetchCryptoPrices = require('./jobs/cryptoPriceJob'); // Import the background job for fetching cryptocurrency prices

const app = express();
const PORT = process.env.PORT || 5000;  // Port for the server, fallback to 5000 if not specified in .env
const MONGO_URI = process.env.MONGO_URI;  // MongoDB connection URI from .env file

// Apply middleware
app.use(cors());  // Allow all domains to make requests (you might customize this for specific origins in production)
app.use(helmet());  // Apply Helmet for adding security-related HTTP headers
app.use(express.json());  // Parse incoming JSON requests

// Apply rate limiter and API key authentication middleware globally
app.use(limiter);       // Apply rate limiter across all routes to prevent abuse (max 100 requests per 15 minutes)
// app.use(apiKeyAuth);    // Apply API key authentication to all routes for access control

// Use the statsRoutes for any API route under /api
app.use('/api', statsRoutes);  // All routes under /api will use the statsRoutes for handling crypto stats and deviation requests

// Start the background job (fetchCryptoPrices will be scheduled by cron)
fetchCryptoPrices();  // Immediately invoke the job to start fetching cryptocurrency prices on a scheduled basis

// Function to connect to the database and start the server
const serverStart = async () => {
  try {
    await dbConnect(MONGO_URI);  // Connect to the MongoDB database using the URI from .env
    app.listen(PORT, () => {  // Start the Express server and listen on the specified port
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log('Error connecting to database:', error);  // Log any error while connecting to the database
  }
};

serverStart();  // Start the server by calling the serverStart function
