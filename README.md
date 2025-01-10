# Crypto Stats API

This is a RESTful API for fetching cryptocurrency statistics, including the latest price, market cap, 24-hour price change, and price deviation for Bitcoin, Ethereum, and Matic. The API pulls data from the CoinGecko API and stores it in a MongoDB database for efficient querying.

The API is deployed and accessible at: [https://crypto-stats-api-xn2z.onrender.com](https://crypto-stats-api-xn2z.onrender.com)


## Features

- Fetch the latest price, market cap, and 24-hour change for Bitcoin, Ethereum, and Matic.
- Calculate the standard deviation of the prices over the last 100 data points.
- Rate limiting to prevent abuse (100 requests per 15 minutes).
- API key authentication for access control.
- Background job to fetch crypto prices every 2 hours.
- Efficient indexing in the database for faster queries and optimized performance.

## Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for building APIs
- **MongoDB** - NoSQL database for storing cryptocurrency data
- **Axios** - HTTP client for making API requests
- **Node-cron** - For scheduling background jobs
- **Express-validator** - Input validation middleware
- **Helmet** - For securing HTTP headers
- **Cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - For managing environment variables
- **Mongoose** - ODM for MongoDB

## API Endpoints

### `GET /api/stats`

Fetches the latest data (price, market cap, and 24-hour change) for the requested cryptocurrency.

#### Query Parameters:
- `coin`: The cryptocurrency to fetch data for. Options: `bitcoin`, `ethereum`, `matic`.

#### Example Request:
```bash
GET /api/stats?coin=bitcoin
```

#### Example Response:
```json
{
  "price": 45000.00,
  "marketCap": 850000000000,
  "24hChange": -2.5
}
```

### `GET /api/deviation`

Fetches the latest data (price, market cap, and 24-hour change) for the requested cryptocurrency.

#### Query Parameters:
- `coin`: The cryptocurrency to fetch data for. Options: `bitcoin`, `ethereum`, `matic`.

#### Example Request:
```bash
GET /api/deviation?coin=ethereum
```

#### Example Response:
```json
{
  "deviation": "120.45"
}
```

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** - A running MongoDB instance or use MongoDB Atlas for cloud hosting
- **API key from CoinGecko** - You can get one from [CoinGecko](https://www.coingecko.com/en/api)

## Cron Jobs

The background job for fetching cryptocurrency prices runs every 2 hours, automatically updating the database. No additional setup is required for this feature.

---

## Security

This API is protected by the following mechanisms:

### 1. **API Key Authentication**:
Access to the endpoints requires a valid API key, passed in the `x-api-key` header.

### 2. **Rate Limiting**:
To prevent DDoS attacks, the API limits each IP to 100 requests every 15 minutes.
