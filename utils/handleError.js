// Custom error handler for consistent error responses
const handleError = (res, statusCode, msg) => {
    // Send the error response with the provided status code and message
    return res.status(statusCode).json({ status: false, msg });
};

// Export the error handler function for use in other files
module.exports = handleError;
