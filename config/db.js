const mongoose = require("mongoose");

const dbConnect = async (URL) => {
    // Connect to the database using the provided URL
    await mongoose.connect(URL, {})

    // Log a success message when the connection is established
    console.log('Connected to Database');
}

module.exports = dbConnect;