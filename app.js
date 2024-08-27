
const express = require('express');
const app = express();

// Import the connection setup
const conn = require('./connection/connection');

// Connect to MongoDB
conn();

// Create server and listen on the port
const PORT = process.env.PORT || 1000; // Fallback to 1000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server running started at port ${PORT}`);
});

// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});
